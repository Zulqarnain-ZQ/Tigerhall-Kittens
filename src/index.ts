import 'reflect-metadata'
import { Container } from 'typedi'
import * as TypeORM from 'typeorm'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import cors from 'cors'
import { graphQLSchema } from './graphql/schema'
import depthLimit from 'graphql-depth-limit'
import compression from 'compression'
import { graphqlUploadExpress } from 'graphql-upload'

// register 3rd party IOC container
TypeORM.useContainer(Container)

const bootstrap = async () => {
  try {
    // create TypeORM connection
    await TypeORM.createConnection()

    // build TypeGraphQL executable schema
    const schema = await graphQLSchema(Container)

    const app = express()
    const corsConfig = {
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
      origin: [/localhost*/],
    }
    app.use(cors(corsConfig))
    app.use(compression())

    /** Restricting file upload to be 10 MB max */
    app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }))

    const port = 3000

    // Create GraphQL server
    const server = new ApolloServer({
      schema,
      context: ({ req, res }) => ({ req, res }),
      debug: true,
      playground: true,
      validationRules: [depthLimit(3)],
      uploads: false,
    })

    server.applyMiddleware({ app, cors: corsConfig })

    app.listen({ port }, () => {
      console.log(
        `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
      )
    })
  } catch (err) {
    console.error(err)
  }
}

bootstrap()
