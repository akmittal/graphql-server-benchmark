import Knex from 'knex';
import { allTodos, createTodo, getByID, Todo } from '../models/Todo';

export const getTodosResolver = (connection: Knex) => async (
  parent: any,
  args: any,
  context: any
) => {
  return allTodos(connection);
};
export const createTodoResolver = (connection: Knex) => async (
  parent: any,
  args: any,
  context: any
) => {
  const { text } = args.input;
  return await createTodo(text, connection);
};
export const markCompleteResolver = (connection: Knex) => async (
  parent: any,
  args: any,
  context: any
) => {
  const { id } = args;
  let todo = await getByID(id, connection);
  todo = new Todo(todo.id, todo.text, todo.done);
  return todo.markComplete(connection);
};
export const deleteTodoResolver = (connection: Knex) => async (
  parent: any,
  args: any,
  context: any
) => {
  const { id } = args;
  let todo = await getByID(id, connection);
  todo = new Todo(todo.id, todo.text, todo.done);
  todo.deleteTodo(connection);
};
