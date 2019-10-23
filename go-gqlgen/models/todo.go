package models

import (
	"github.com/jmoiron/sqlx"
)

type Todo struct {
	ID   string
	Text string
	Done bool
}

func CreateTodo(text string, db *sqlx.DB) (Todo, error) {
	tx, err := db.Beginx()
	if err != nil {
		return Todo{}, err
	}
	res := db.QueryRowx("INSERT INTO TODOS (text, done) values ($1, $2) returning id, text, done", text, false)
	err = tx.Commit()
	var todo Todo
	res.StructScan(&todo)
	return todo, err
}
func (todo *Todo) UpdateTodo(db *sqlx.DB) (Todo, error) {

	tx, err := db.Beginx()
	if err != nil {
		return Todo{}, err
	}
	res := tx.QueryRowx("Update TODOS set text=$1 and done=$2 where id=$3 returning id, text, done", todo.Text, todo.Done, todo.ID)
	err = tx.Commit()
	var newTodo Todo
	res.StructScan(&newTodo)
	return newTodo, err
}
func (todo *Todo) MarkComplete(db *sqlx.DB) (Todo, error) {
	tx, err := db.Beginx()
	if err != nil {
		return Todo{}, err
	}
	res := tx.QueryRowx("Update TODOS set done=$1 where id=$2 returning id, text, done", true, todo.ID)
	err = tx.Commit()
	var newTodo Todo
	res.StructScan(&newTodo)
	return newTodo, err
}
func (todo *Todo) DeleteTodo(db *sqlx.DB) (Todo, error) {

	_, err := db.Exec("DELETE from TODOS where id=$1 ", todo.ID)

	return *todo, err
}

func AllTodos(db *sqlx.DB) ([]*Todo, error) {
	rows, err := db.Queryx("SELECT * FROM TODOS limit 500")
	var todos []*Todo
	if err != nil {
		return todos, err
	}

	for rows.Next() {
		var t Todo
		rows.StructScan(&t)
		todos = append(todos, &t)
	}

	return todos, nil
}

func GetByID(id string, db *sqlx.DB) (Todo, error) {
	row := db.QueryRowx("SELECT * FROM TODOS where id=$1", id)
	var t Todo
	row.StructScan(&t)
	return t, nil
}
