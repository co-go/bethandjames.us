package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
	"github.com/jam/bethandjames.us/api/rsvp"
)

type PersonResponse struct {
	BaseResponse
	Result *rsvp.Person `json:"result"`
}

type FailureResponse struct {
	Error string `json:"error"`
}

type BaseResponse struct {
	Message string `json:"message"`
}

type handler struct {
	client *dynamodb.Client
}

func (h *handler) handleRequest(ctx context.Context, request events.LambdaFunctionURLRequest) (events.LambdaFunctionURLResponse, error) {
	// filter out requests not to /rsvp
	if request.RequestContext.HTTP.Path != "/rsvp" {
		return events.LambdaFunctionURLResponse{
			StatusCode: http.StatusNotFound,
			Body:       http.StatusText(http.StatusNotFound),
		}, nil
	}

	if request.RequestContext.HTTP.Method == http.MethodGet {
		if request.QueryStringParameters["name"] == "" {
			return createResponse(FailureResponse{Error: "no 'name' parameter provided"}, http.StatusBadRequest), nil
		}

		response, err := h.client.Query(context.TODO(), &dynamodb.QueryInput{
			TableName:              aws.String(os.Getenv("DYNAMODB_TABLE")),
			KeyConditionExpression: aws.String("#n = :name"),
			ExpressionAttributeNames: map[string]string{
				"#n": "Name",
			},
			ExpressionAttributeValues: map[string]types.AttributeValue{
				":name": &types.AttributeValueMemberS{Value: request.QueryStringParameters["name"]},
			},
		})

		if err != nil {
			return createResponse(FailureResponse{Error: err.Error()}, http.StatusInternalServerError), nil
		}

		if len(response.Items) != 1 {
			return createResponse(PersonResponse{Result: nil}, http.StatusOK), nil
		}

		var person *rsvp.Person
		err = attributevalue.UnmarshalMap(response.Items[0], &person)
		if err != nil {
			return createResponse(FailureResponse{Error: err.Error()}, http.StatusInternalServerError), nil
		}

		return createResponse(PersonResponse{Result: person}, http.StatusOK), nil
	} else if request.RequestContext.HTTP.Method == http.MethodPost {
		return createResponse(BaseResponse{Message: "Invoked POST Handler"}, http.StatusOK), nil
	}

	return events.LambdaFunctionURLResponse{
		StatusCode: http.StatusNotFound,
		Body:       http.StatusText(http.StatusNotFound),
	}, nil
}

func createResponse(v any, status int) events.LambdaFunctionURLResponse {
	body, err := json.Marshal(v)
	if err != nil {
		fmt.Printf("Error while marshalling response: %v\n", err)
		return events.LambdaFunctionURLResponse{
			StatusCode: http.StatusInternalServerError,
			Body:       http.StatusText(http.StatusInternalServerError),
		}
	}

	return events.LambdaFunctionURLResponse{
		StatusCode: status,
		Body:       string(body),
	}
}

func main() {
	cfg, err := config.LoadDefaultConfig(context.TODO(), config.WithRegion("us-east-1"))
	if err != nil {
		fmt.Printf("error when loading AWS configuration: %v\n", err)
		panic(err)
	}

	h := handler{
		client: dynamodb.NewFromConfig(cfg),
	}

	lambda.Start(h.handleRequest)
}
