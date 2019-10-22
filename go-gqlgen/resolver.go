package go_gqlgen

import (
	"context"

	"github.com/akmittal/graphql-server-benchmark/go-gqlgen/models"
	"github.com/jmoiron/sqlx"
)

// THIS CODE IS A STARTING POINT ONLY. IT WILL NOT BE UPDATED WITH SCHEMA CHANGES.

type Resolver struct {
	DB *sqlx.DB
}

func (r *Resolver) Mutation() MutationResolver {
	return &mutationResolver{r, r.DB}
}
func (r *Resolver) Query() QueryResolver {
	return &queryResolver{r, r.DB}
}

type mutationResolver struct {
	*Resolver
	*sqlx.DB
}

func (r *mutationResolver) CreateTodo(ctx context.Context, input NewTodo) (*models.Todo, error) {
	newTodo, err := models.CreateTodo(input.Text)
	return &newTodo, err
}
func (r *mutationResolver) MarkComplete(ctx context.Context, id string) (*models.Todo, error) {
	todo, _ := models.GetByID(id)
	todo, err := todo.MarkComplete()
	return &todo, err
}
func (r *mutationResolver) DeleteTodo(ctx context.Context, id string) (*models.Todo, error) {
	todo, _ := models.GetByID(id)
	err := todo.DeleteTodo()
	return &todo, err
}

type queryResolver struct {
	*Resolver
	*sqlx.DB
}

func (r *queryResolver) Todos(ctx context.Context, typeArg *Status) ([]*models.Todo, error) {
	todos, err := models.AllTodos()
	return todos, err
}
