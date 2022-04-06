import { createTestClient } from 'apollo-server-testing'
import { ApolloServer } from 'apollo-server-express'
import { creteApolloServer } from '../../test-utils/createApolloServer'
import {
  closeConnection,
  createConnection,
} from '../../test-utils/dbConnection'
import { createTestTigers } from '../../test-utils/createTestTigers'
import { removeTestTigers } from '../../test-utils/removeTestTigers'

describe('Get Tiger resolver', () => {
  let server: ApolloServer

  // before the tests we will spin up a new Apollo Server
  beforeAll(async () => {
    server = await creteApolloServer()
    server.start()

    await createConnection()

    /** Creating test tigers for testing the resolver */
    await createTestTigers()
  })

  // after the tests we will stop our server
  afterAll(async () => {
    await server?.stop()

    /** Removing test tigers after running all tests */
    await removeTestTigers()

    /** Close db connection  */
    await closeConnection()
  })

  it('Should return 2 tigers', async () => {
    const { query } = createTestClient(server)

    // graphl query
    const GET_TIGERS = `
  {
    getTigers(skip:0 , take: 2) {
      name
      id
      dateOfBirth
      sightings {
        location {
          lat
        }
      }
    }
  }
  `

    // act
    const result = await query({ query: GET_TIGERS })

    expect(result.data['getTigers']).toBeTruthy()
    expect(result.data['getTigers']).toHaveLength(2)
    expect(result.errors).toBeFalsy()
  })

  it('Should fail with invalid schema', async () => {
    const { query } = createTestClient(server)

    // invalid graphql query picture does not exist on tigers
    const GET_TIGERS = `
  {
    getTigers {
      name
      id
      picture
      dateOfBirth
      sightings {
        location {
          lat
        }
      }
    }
  }
  `

    // act
    const result = await query({ query: GET_TIGERS })

    expect(result.errors).toBeTruthy()
    expect(result.errors[0].message).toContain(
      `Cannot query field "picture" on type `
    )
  })

  it('Should fail if take request is less than 1', async () => {
    const { query } = createTestClient(server)

    // invalid graphql query picture does not exist on tigers
    const GET_TIGERS = `
  {
    getTigers(skip:0 , take: 0) {
      name
      id
      dateOfBirth
      sightings {
        location {
          lat
        }
      }
    }
  }
  `

    // act
    const result = await query({ query: GET_TIGERS })

    expect(result.errors).toBeTruthy()
    expect(result.errors[0].message.toLowerCase()).toContain(
      `argument validation error`
    )
  })
})
