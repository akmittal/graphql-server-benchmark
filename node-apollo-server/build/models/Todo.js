"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Todo {
    constructor(id, text, done) {
        this.id = "";
        this.text = "";
        this.done = false;
        this.id = id;
        this.text = text;
        this.done = done;
    }
    async updateTodo(connection) {
        return connection('todos').where({ id: this.id }).update({ text: this.text, done: this.done }, ['id', 'text', 'done']);
    }
    async markComplete(connection) {
        const todo = await connection('todos').where({ id: this.id }).update({ done: true }, ['id', 'text', 'done']);
        return todo[0];
    }
    async deleteTodo(connection) {
        return connection('todos').where({ id: this.id }).del();
    }
}
exports.Todo = Todo;
/**
 *
 * @param {string} id - ID
 * @param {Knex} connection
 */
exports.getByID = async (id, connection) => {
    const todo = await connection('todos').where({ id }).first();
    return todo;
};
exports.allTodos = async (connection) => {
    return await connection('todos');
};
exports.createTodo = async (text, connection) => {
    const newTodo = await connection('todos').insert({ text, done: false }, ['id', 'text', 'done']);
    return newTodo[0];
};
