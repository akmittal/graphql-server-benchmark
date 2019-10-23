
import knex from 'knex';
import { createTodoResolver, deleteTodoResolver, getTodosResolver, markCompleteResolver } from './resolvers/todo';
const { ApolloServer, gql } = require('apollo-server');


const connection = knex({
  client: 'pg',
  connection:
  'postgres://postgres:"password"@localhost:5432/postgres?sslmode=disable'
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
    todos:  getTodosResolver(connection)
  },
  Mutation: {
    createTodo: createTodoResolver(connection),
    markComplete: markCompleteResolver(connection),
    deleteTodo: deleteTodoResolver(connection)
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }:{url:string}) => {
  console.log(`🚀  Server ready at ${url}`);
});
