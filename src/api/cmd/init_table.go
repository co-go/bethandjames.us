package main

import (
	"context"
	"fmt"
	"os"
	"strings"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/aws/retry"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
	"github.com/go-gota/gota/dataframe"
	"github.com/jam/bethandjames.us/api/rsvp"

	"github.com/joho/godotenv"
)

const tableName = "rsvp-wedding-table"

func initDynamo() (*dynamodb.Client, error) {
	cfg, err := config.LoadDefaultConfig(context.TODO(), config.WithRegion("us-east-1"), config.WithRetryer(func() aws.Retryer {
		return retry.AddWithErrorCodes(retry.NewStandard(), (*types.ProvisionedThroughputExceededException)(nil).ErrorCode())
	}))
	if err != nil {
		return nil, err
	}

	return dynamodb.NewFromConfig(cfg), nil
}

func parseList() (*dataframe.DataFrame, error) {
	f, err := os.Open("./resources/list.csv")
	if err != nil {
		return nil, err
	}

	df := dataframe.
		ReadCSV(f).
		Drop([]string{"Invitee", "Address"})

	return &df, nil
}

func main() {
	err := godotenv.Load()

	if err != nil {
		fmt.Printf("error loading .env file (%v)\n", err)
		os.Exit(1)
	}

	db, err := initDynamo()
	if err != nil {
		fmt.Printf("error when creating client (%v)", err)
	}

	df, err := parseList()
	if err != nil {
		fmt.Printf("dataframe parse err: %v\n", err)
		os.Exit(1)
	}

	createInput := func() *dynamodb.BatchWriteItemInput {
		return &dynamodb.BatchWriteItemInput{
			RequestItems: map[string][]types.WriteRequest{
				tableName: make([]types.WriteRequest, 0, 25),
			},
		}
	}

	input := createInput()
	for _, row := range df.Maps() {
		person := rsvp.Person{
			Name:            row["Person"].(string),
			EMail:           row["EMail"].(string),
			InvitedToBrunch: row["Brunch"].(string) == "Yes",
			GroupMembers:    strings.Split(row["Group"].(string), ","),
			Titling:         row["Titling"].(string),
			Family:          row["Family"].(string),
			Attending:       "UNKNOWN",
			AttendingBrunch: "",
			Restrictions:    "",
		}

		item, err := attributevalue.MarshalMap(person)
		if err != nil {
			fmt.Printf("error when creating item: %v\n", err)
			os.Exit(1)
		}

		input.RequestItems[tableName] = append(input.RequestItems[tableName], types.WriteRequest{
			PutRequest: &types.PutRequest{Item: item},
		})

		if len(input.RequestItems[tableName]) == 25 {
			for {
				resp, err := db.BatchWriteItem(context.TODO(), input)
				if err != nil {
					fmt.Printf("error when writing items: %v\n", err)
					os.Exit(1)
				}

				if len(resp.UnprocessedItems) == 0 {
					break
				}

				input.RequestItems = resp.UnprocessedItems
			}

			input = createInput()
		}
	}

	if len(input.RequestItems[tableName]) > 0 {
		for {
			resp, err := db.BatchWriteItem(context.TODO(), input)
			if err != nil {
				fmt.Printf("error when writing items: %v\n", err)
				os.Exit(1)
			}

			if len(resp.UnprocessedItems) == 0 {
				break
			}

			input.RequestItems = resp.UnprocessedItems
		}
	}
}
