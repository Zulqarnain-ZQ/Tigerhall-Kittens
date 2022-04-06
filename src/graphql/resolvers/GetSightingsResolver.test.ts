import { createTestClient } from 'apollo-server-testing'
import { ApolloServer } from 'apollo-server-express'
import { creteApolloServer } from '../../test-utils/createApolloServer'
import {
  closeConnection,
  createConnection,
} from '../../test-utils/dbConnection'
import { createTestTigers } from '../../test-utils/createTestTigers'
import { removeTestTigers } from '../../test-utils/removeTestTigers'

describe('Get Sighting resolver', () => {
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

  it('Should return tiger sightings', async () => {
    const { query } = createTestClient(server)

    // graphl query
    const GET_SIGHTINGS = `
  {
    getTigerSightings(take:1, skip: 0, tigerId: 1) {
        id
        imageURL
        location { lat }
        tiger {
            id
            name
            dateOfBirth
        }
    }
  }
  `

    // act
    const result = await query({ query: GET_SIGHTINGS })

    expect(result.data['getTigerSightings']).toBeTruthy()
    expect(result.data['getTigerSightings']).toHaveLength(1)
    expect(result.errors).toBeFalsy()
  })

  it('Should fail with invalid schema', async () => {
    const { query } = createTestClient(server)

    // invalid graphql query picture does not exist on tigers
    const GET_SIGHTINGS = `
  {
    getTigerSightings(tigerId: 1) {
        id
        imageURL
        picture
        location { lat }
        tiger {
            id
            name
            dateOfBirth
        }
    }
  }
  `

    // act
    const result = await query({ query: GET_SIGHTINGS })

    expect(result.errors).toBeTruthy()
    expect(result.errors[0].message.toLowerCase()).toContain(
      `cannot query field "picture" on type `
    )
  })

  it('Should fail if take request is less than 1', async () => {
    const { query } = createTestClient(server)

    // invalid graphql query picture does not exist on tigers
    const GET_SIGHTINGS = `
  {
    getTigerSightings(skip:0 , take: 0, tigerId: 1) {
        id
        imageURL
        location { lat }
        tiger {
            id
            name
            dateOfBirth
        }
    }
  }
  `

    // act
    const result = await query({ query: GET_SIGHTINGS })

    expect(result.errors).toBeTruthy()
    expect(result.errors[0].message.toLowerCase()).toContain(
      `argument validation error`
    )
  })

  it('Should fail if tigerid is missing', async () => {
    const { query } = createTestClient(server)

    // invalid graphql query picture does not exist on tigers
    const GET_SIGHTINGS = `
  {
    getTigerSightings(skip:0 , take: 10) {
        id
        imageURL
        location { lat }
        tiger {
            id
            name
            dateOfBirth
        }
    }
  }
  `

    // act
    const result = await query({ query: GET_SIGHTINGS })

    expect(result.errors).toBeTruthy()
    expect(result.errors[0].message.toLowerCase()).toContain(
      `argument \"tigerid\" of type \"int!\" is required`
    )
  })
})
