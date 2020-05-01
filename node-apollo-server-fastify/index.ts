import knex from "knex";
import {
  createTodoResolver,
  deleteTodoResolver,
  getTodosResolver,
  markCompleteResolver,
} from "./resolvers/todo";
import { ApolloServer, gql } from "apollo-server-fastify";

import fastify from "fastify";

const app = fastify();

const connection = knex({
  client: "pg",
  connection:
    'postgres://postgres:"Oracle@123"@localhost:5432/postgres?sslmode=disable',
});

const typeDefs = gql`
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
    todos: getTodosResolver(connection),
  },
  Mutation: {
    createTodo: createTodoResolver(connection),
    markComplete: markCompleteResolver(connection),
    deleteTodo: deleteTodoResolver(connection),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

(async function () {
  app.register(server.createHandler());
  await app.listen(4000);
})();
