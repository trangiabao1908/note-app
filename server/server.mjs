import express from 'express';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import bodyParser from 'body-parser';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';

import { typeDefs } from './Schema/typeDefs.js';
import { resolvers } from './resolvers/resolvers.js';
const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
   typeDefs,
   resolvers,
   plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }), // Proper shutdown for the WebSocket server.
   ],
});
// connect to MongoDB
const URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.pf7flim.mongodb.net/?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 4000;

await server.start();

app.use(cors(), bodyParser.json(), expressMiddleware(server));
mongoose.set('strictQuery', false);
mongoose
   .connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(async () => {
      console.log('Database connection');
      await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
      console.log('🚀 Server ready at http://localhost:4000');
   })
   .catch((err) => {
      console.log('Database connection error: ' + err);
   });
