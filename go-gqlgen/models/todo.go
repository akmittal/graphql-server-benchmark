package models

type Todo struct {
	ID   string
	Text string
	Done bool
}

func CreateTodo(text string) (Todo, error) {
	return Todo{}, nil
}
func (todo *Todo) UpdateTodo() (Todo, error) {
	return Todo{}, nil
}
func (todo *Todo) MarkComplete() (Todo, error) {
	return Todo{}, nil
}
func (todo *Todo) DeleteTodo() error {
	return nil
}

func AllTodos() ([]*Todo, error) {
	var todos []*Todo
	return todos, nil
}

func GetByID(id string) (Todo, error) {
	return Todo{}, nil
}
