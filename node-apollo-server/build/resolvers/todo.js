"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Todo_1 = require("../models/Todo");
exports.getTodosResolver = (connection) => async (parent, args, context) => {
    return Todo_1.allTodos(connection);
};
exports.createTodoResolver = (connection) => async (parent, args, context) => {
    const { text } = args.input;
    return await Todo_1.createTodo(text, connection);
};
exports.markCompleteResolver = (connection) => async (parent, args, context) => {
    const { id } = args;
    let todo = await Todo_1.getByID(id, connection);
    todo = new Todo_1.Todo(todo.id, todo.text, todo.done);
    return todo.markComplete(connection);
};
exports.deleteTodoResolver = (connection) => async (parent, args, context) => {
    const { id } = args;
    let todo = await Todo_1.getByID(id, connection);
    todo = new Todo_1.Todo(todo.id, todo.text, todo.done);
    todo.deleteTodo(connection);
};
