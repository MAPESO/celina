package main

import (
	"io/ioutil"
)

var Schema string

func init() {
	fileBytes, err := ioutil.ReadFile("./schema.graphql")
	if err != nil {
		panic(err)
	}
	Schema = string(fileBytes)
}

type Resolver struct{}
