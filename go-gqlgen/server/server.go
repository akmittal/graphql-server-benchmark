package main

import (
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/handler"
	go_gqlgen "github.com/akmittal/graphql-server-benchmark/go-gqlgen"
	"github.com/jmoiron/sqlx"

	_ "github.com/lib/pq"
)

const defaultPort = "4000"

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}
	db, err := sqlx.Connect("postgres", "user=postgres password=Oracle@123 dbname=postgres sslmode=disable")
	if err != nil {
		log.Fatal("Error connecting to database", err)
	}
	http.Handle("/", handler.Playground("GraphQL playground", "/query"))
	http.Handle("/query", handler.GraphQL(go_gqlgen.NewExecutableSchema(go_gqlgen.Config{Resolvers: &go_gqlgen.Resolver{db}})))

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
