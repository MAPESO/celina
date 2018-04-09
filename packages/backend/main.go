package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/graph-gophers/graphql-go"
	"github.com/graph-gophers/graphql-go/relay"
)

var schema *graphql.Schema

func init() {
	schema = graphql.MustParseSchema(Schema, &Resolver{})
}

func main() {
	http.Handle("/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		file, err := ioutil.ReadFile("./graphiql.html")
		if err != nil {
			w.Write([]byte("There is no graphiql.html file"))
		}
		w.Write(file)
	}))

	http.Handle("/graphql", &relay.Handler{Schema: schema})

	fmt.Println("Server runnning at localhost:4001")
	log.Fatal(http.ListenAndServe(":4001", nil))
}
