import 'reflect-metadata'
import { Container } from 'typedi'
import * as TypeORM from 'typeorm'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import cors from 'cors'
import { graphQLSchema } from './graphql/schema'

// register 3rd party IOC container
TypeORM.useContainer(Container)

const bootstrap = async () => {
  try {
    console.log('Before creating connection')

    // create TypeORM connection
    await TypeORM.createConnection()

    console.log('After creating connection')

    // build TypeGraphQL executable schema
    const schema = await graphQLSchema(Container)

    console.log('After creating schema')

    const app = express()
    const corsConfig = {
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
      origin: [/localhost*/],
    }
    app.use(cors(corsConfig))

    console.log('After setting cors')

    const port = 3000

    // Create GraphQL server
    const server = new ApolloServer({
      schema,
      context: ({ req, res }) => ({ req, res }),
      debug: true,
      playground: true,
    })

    server.applyMiddleware({ app, cors: corsConfig })

    console.log('After setting graphql')

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
