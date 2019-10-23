"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const todo_1 = require("./resolvers/todo");
const { ApolloServer, gql } = require('apollo-server');
const connection = knex_1.default({
    client: 'pg',
    connection: 'postgres://postgres:"Oracle@123"@localhost:5432/postgres?sslmode=disable'
});
const typeDefs = gql `
  type Todo {
    id: ID!
    text: String!
    done: Boolean!
  }
  enum Status {
    DONE
    PENDING
  }

  type Query {
    todos(type: Status): [Todo!]!
  }

  input NewTodo {
    text: String!
  }

  type Mutation {
    createTodo(input: NewTodo!): Todo!
    markComplete(id: ID!): Todo!
    deleteTodo(id: ID!): Todo!
  }
`;
// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        todos: todo_1.getTodosResolver(connection)
    },
    Mutation: {
        createTodo: todo_1.createTodoResolver(connection),
        markComplete: todo_1.markCompleteResolver(connection),
        deleteTodo: todo_1.deleteTodoResolver(connection)
    }
};
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });
// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
