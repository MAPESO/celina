package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/go-zoo/bone"
	"github.com/graph-gophers/graphql-go"
	"github.com/graph-gophers/graphql-go/relay"
	"github.com/justinas/alice"
)

var schema *graphql.Schema

func init() {
	schema = graphql.MustParseSchema(Schema, &Resolver{})
}

func CorsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// allow cross domain AJAX requests
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Expose-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
		w.Header().Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
		next.ServeHTTP(w, r)
	})
}

func main() {
	r := bone.New()
	r.Get("/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		file, err := ioutil.ReadFile("./graphiql.html")
		if err != nil {
			w.Write([]byte("There is no graphiql.html file"))
		}
		w.Write(file)
	}))

	r.Options("*", http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		fmt.Fprintf(w, "Hello")
	}))

	r.Post("/graphql", &relay.Handler{Schema: schema})

	mux := alice.New(CorsMiddleware).Then(r)

	fmt.Println("Server runnning at localhost:4001")
	log.Fatal(http.ListenAndServe(":4001", mux))
}
