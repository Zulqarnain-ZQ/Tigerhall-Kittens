import { createTestClient } from 'apollo-server-testing'
import { ApolloServer } from 'apollo-server-express'
import { creteApolloServer } from '../../test-utils/createApolloServer'
import {
  closeConnection,
  createConnection,
} from '../../test-utils/dbConnection'
import { removeTestTigers } from '../../test-utils/removeTestTigers'
import { Readable } from 'stream'
import { Upload } from 'graphql-upload/public'
import { GraphQLUpload } from 'graphql-upload'

describe('Create sighting resolver', () => {
  let server: ApolloServer

  // before the tests we will spin up a new Apollo Server
  beforeAll(async () => {
    server = await creteApolloServer()
    server.start()

    await createConnection()
  })

  // after the tests we will stop our server
  afterAll(async () => {
    await server?.stop()

    await removeTestTigers()

    /** Close db connection  */
    await closeConnection()
  })

  it('Should fail if image file is not uploaded', async () => {
    const { mutate } = createTestClient(server)

    const file = Readable.from(Buffer.from('hello upload', 'utf-8'))

    const upload = new Upload()

    const fileUpload: GraphQLUpload = {
      filename: 'a.txt',
      mimetype: 'text',
      encoding: 'text/plain',
      createReadStream: () => file,
    }

    upload.promise = new Promise((resolve) => resolve(fileUpload))
    upload.file = fileUpload

    // graphl query
    const CREATE_SIGHTING = `
  mutation createSighting {
  createSighting(
    data: {
      tigerId: 1
      lastSeenAt: "2021-02-22"
      location: {
        lat: 172,
        lon: 12
      }
      file: ${fileUpload}
    }
  ) {
      id
      lastSeenAt
      imageURL
      location {
        lat
        lon
      }
      tiger {
          id
          dateOfBirth
      }
  }
}
  `

    // act
    const result = await mutate({ mutation: CREATE_SIGHTING })

    expect(result.errors).toBeTruthy()
  })

  it('Should fail with missing required field', async () => {
    const { query } = createTestClient(server)

    // graphl query
    const CREATE_SIGHTING = `
  mutation createSighting {
  createSighting(
    data: {
      tigerId: 1
      lastSeenAt: "2021-02-22"
      location: {
        lat: 172,
        lon: 12
      }
    }
  ) {
      id
      lastSeenAt
      imageURL
      location {
        lat
        lon
      }
      tiger {
          id
          dateOfBirth
      }
  }
}
  `

    // act
    const result = await query({ query: CREATE_SIGHTING })

    expect(result.errors).toBeTruthy()

    expect(result.errors[0].message.toLowerCase()).toContain(
      `field \"createsightinginput.file\" of required type \"upload!\" was not provided.`
    )
  })
})
