import Knex from "knex"

export class Todo {
    id = ""
    text = ""
    done = false
   
    constructor(id:string, text:string, done:boolean){
        this.id = id
        this.text = text
        this.done = done

    }
    async updateTodo(connection:Knex){
        return connection('todos').where({id:this.id}).update({text:this.text, done:this.done}, ['id', 'text', 'done']);

    }
    async markComplete(connection:Knex){
        const todo = await connection('todos').where({id:this.id}).update({done:true},  ['id', 'text', 'done'])
      
        return todo[0];

    }
    async deleteTodo(connection:Knex) {
        return connection('todos').where({id:this.id}).del();
    }


}
/**
 * 
 * @param {string} id - ID
 * @param {Knex} connection 
 */
export const getByID = async (id:string, connection:Knex): Promise<any> => {
    const todo = await connection('todos').where({id}).first();
 
    return todo;
    
}
export const allTodos = async (connection:Knex) => {
    const todos  =await connection('todos').select().limit(500)
    return todos;
}
export const createTodo = async (text:string, connection:Knex) => {
    const newTodo = await connection('todos').insert({text, done:false}, ['id', 'text','done']);
    return newTodo[0];
}