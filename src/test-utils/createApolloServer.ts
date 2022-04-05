import { Container } from 'typedi'
import express, { Application } from 'express'
import cors from 'cors'
import compression from 'compression'
import { graphqlUploadExpress } from 'graphql-upload'
import { graphQLSchema } from '../graphql/schema'
import { ApolloServer } from 'apollo-server-express'
import depthLimit from 'graphql-depth-limit'

export async function creteApolloServer() {
  const app: Application = express()

  const corsConfig = {
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    origin: [/localhost*/],
  }
  app.use(cors(corsConfig))
  app.use(compression())

  /** Restricting file upload to be 10 MB max */
  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }))

  // build TypeGraphQL executable schema
  const schema = await graphQLSchema(Container)

  // Create GraphQL server
  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
    debug: true,
    playground: true,
    validationRules: [depthLimit(3)],
    uploads: false,
  })

  return server
}
