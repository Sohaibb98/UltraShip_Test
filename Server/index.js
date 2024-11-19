const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose')

const MONGODB = "mongodb+srv://sohaibbaqai:8824@cluster0.tf1pd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');;

const server = new ApolloServer({ typeDefs, resolvers });

mongoose.connect(MONGODB, {useNewUrlParser: true})
 .then(() => {
  console.log("MONGODB Connection succesful")
  return server
  .listen({ port: 9000 })
  .then(({ url }) => console.log(`Server running at ${url}`));
 }) 
