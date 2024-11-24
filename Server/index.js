const { ApolloServer } = require('apollo-server');
const { applyMiddleware } = require('graphql-middleware');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const mongoose = require('mongoose');
const { permissions } = require('./guards/index');  // Correct import
require('dotenv').config();

const MONGODB = "mongodb+srv://sohaibbaqai:8824@cluster0.tf1pd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

// Create an executable schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const schemaWithPermissions = applyMiddleware(schema, permissions);

const server = new ApolloServer({
    schema: schemaWithPermissions,
    context: ({ req }) => {
      // console.log("Request headers in context", req.headers); // Debug headers
      return { request: req };
    },
  });


mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MONGODB Connection successful');
    return server.listen({ port: 9004 });
  })
  .then(({ url }) => {
    console.log(`Server running at ${url}`);
  })
  .catch((err) => {
    console.error('Error starting server:', err);
  });
