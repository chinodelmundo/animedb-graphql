const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express = require('express');
const http = require('http');
const resolvers = require('./Schema/Resolvers');
const typeDefs = require('./Schema/TypeDefs');
const AnimeAPI = require('./DataSources/AnimeAPI');

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    dataSources: () => {
      return {
        animeAPI: new AnimeAPI()
      };
    }
  });
  const port = process.env.PORT || 4000;

  await server.start();
  server.applyMiddleware({ app });
  await new Promise((resolve) => httpServer.listen({ port }, resolve));
  console.log(`🚀 Server ready at :${port}${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);
