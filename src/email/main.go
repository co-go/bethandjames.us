package main

import (
	"fmt"
	"io"
	"log"
	"os"
	"strings"

	"github.com/joho/godotenv"
	"github.com/mailjet/mailjet-apiv3-go"
	"github.com/tobgu/qframe"
	"github.com/tobgu/qframe/config/groupby"
)

func createClient(clientId, clientSecret string) *mailjet.Client {
	return mailjet.NewMailjetClient(clientId, clientSecret)
}

func send(client *mailjet.Client, emailAddress, name, familyName string) {
	fmt.Printf("Sending email to: %s", emailAddress)

	recipientName := name
	if familyName != "" {
		recipientName = familyName
	}

	messagesInfo := []mailjet.InfoMessagesV31{
		{
			From: &mailjet.RecipientV31{
				Email: "hello@bethandjames.us",
				Name:  "Beth and James Corley-Goldberg",
			},
			To: &mailjet.RecipientsV31{
				mailjet.RecipientV31{
					Email: emailAddress,
					Name:  recipientName,
				},
			},
			Subject:          "Let's Celebrate | Save the Date",
			TemplateID:       4375156,
			TemplateLanguage: true,
			Variables:        map[string]interface{}{"name": name, "family_name": familyName},
		},
	}

	res, err := client.SendMailV31(&mailjet.MessagesV31{Info: messagesInfo})
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Response: %+v\n", res)
}

func load(reader io.Reader) qframe.QFrame {
	listFn := func(emails []*string) *string {
		combined := ""
		for _, email := range emails {
			if len(*email) > 0 {
				combined += *email + ","
			}
		}

		combined = strings.TrimSuffix(combined, ",")
		return &combined
	}

	trim := func(str *string) *string {
		// fmt.Println(*str)
		s := strings.TrimSpace(*str)
		return &s
	}

	fixName := func(name, familyName *string) *string {
		cleanName := strings.TrimSpace(*name)
		if strings.TrimSpace(*familyName) != "" {
			splitCleanName := strings.Split(cleanName, " ")
			cleanName = strings.Join(splitCleanName[:len(splitCleanName)-1], " ")
		}
		return &cleanName
	}

	f := qframe.ReadCSV(reader)
	f = f.
		GroupBy(groupby.Columns("Titling", "Family")).
		Aggregate(qframe.Aggregation{Fn: listFn, Column: "EMail"}).
		Filter(qframe.Filter{Column: "EMail", Comparator: "=", Arg: "Unknown", Inverse: true}).
		Apply(
			qframe.Instruction{Fn: trim, DstCol: "email", SrcCol1: "EMail"},
			qframe.Instruction{Fn: trim, DstCol: "family_name", SrcCol1: "Family"},
			qframe.Instruction{Fn: fixName, DstCol: "name", SrcCol1: "Titling", SrcCol2: "Family"},
		).
		Drop("Titling", "Family", "EMail")

	return f

	// file, err := os.OpenFile("output.json", os.O_WRONLY|os.O_CREATE|os.O_TRUNC, 0600)
	// if err != nil {
	// 	panic(err)
	// }
	// defer file.Close()

	// f.ToJSON(file)

}

func main() {
	err := godotenv.Load()

	if err != nil {
		log.Fatalf("Error loading .env file (%v)", err)
	}

	f, err := os.Open("./resources/list.csv")

	if err != nil {
		log.Fatalf("Error reading list (%v)", err)
	}

	list := load(f)

	nameView := list.MustStringView("name")
	emailView := list.MustStringView("email")
	familyNameView := list.MustStringView("family_name")

	if nameView.Len() != emailView.Len() || emailView.Len() != familyNameView.Len() {
		log.Fatalf("Dataframe generated incorrectly!")
	}

	mailjetClient := createClient(os.Getenv("MAILJET_CLIENT_ID"), os.Getenv("MAILJET_CLIENT_SECRET"))

	for i := 0; i < nameView.Len(); i++ {
		fmt.Printf("\n%s | %s | %s\n", *emailView.ItemAt(i), *nameView.ItemAt(i), *familyNameView.ItemAt(i))
		addresses := strings.Split(*emailView.ItemAt(i), ",")
		for _, email := range addresses {
			fmt.Printf(" -> %s\n", email)
			send(mailjetClient, email, *nameView.ItemAt(i), *familyNameView.ItemAt(i))
		}
	}

	fmt.Printf("\nlist.Len(): %v\n", list.Len())
}
