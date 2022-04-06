import { createTestClient } from 'apollo-server-testing'
import { ApolloServer } from 'apollo-server-express'
import { creteApolloServer } from '../../test-utils/createApolloServer'
import {
  closeConnection,
  createConnection,
} from '../../test-utils/dbConnection'
import { removeTestTigers } from '../../test-utils/removeTestTigers'
import { Tiger } from '../../db/models'

describe('Create tiger resolver', () => {
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

  it('Should create tiger', async () => {
    const { mutate } = createTestClient(server)

    // graphl query
    const CREATE_TIGER = `
  mutation createTiger {
  createTiger(
    data: {
      name: "New tiger"
      dateOfBirth: "2021-02-21"
      lastSeenAt: "2021-02-22"
      location: {
        lat: 172,
        lon: 12
      }
    }
  ) {
    id
    name
    dateOfBirth
    sightings {
      id
      lastSeenAt
      imageURL
      location {
        lat
        lon
      }
    }
  }
}
  `

    // act
    const result = await mutate({
      mutation: CREATE_TIGER,
    })

    const tiger: Tiger = result.data['createTiger']

    console.log(result.data['createTiger'])

    expect(result.data['createTiger']).toBeTruthy()
    expect(tiger.name).toEqual('New tiger')
    expect(result.errors).toBeFalsy()
  })

  it('Should fail with missing required field', async () => {
    const { query } = createTestClient(server)

    // graphl query
    const CREATE_TIGER = `
  mutation createTiger {
  createTiger(
    data: {
      dateOfBirth: "2021-02-21"
      lastSeenAt: "2021-02-22"
      location: {
        lat: 172,
        lon: 12
      }
    }
  ) {
    id
    name
    dateOfBirth
    sightings {
      id
      lastSeenAt
      imageURL
      location {
        lat
        lon
      }
    }
  }
}
  `

    // act
    const result = await query({ query: CREATE_TIGER })

    expect(result.errors).toBeTruthy()
    expect(result.errors[0].message.toLowerCase()).toContain(
      `field \"createtigerinput.name\" of required type \"string!\" was not provided.`
    )
  })

  it('Should fail if date of birth is greater than last seen at', async () => {
    const { query } = createTestClient(server)

    // graphl query
    const CREATE_TIGER = `
  mutation createTiger {
  createTiger(
    data: {
      name: "Tiger 4"
      dateOfBirth: "2021-02-23"
      lastSeenAt: "2021-02-22"
      location: {
        lat: 172,
        lon: 12
      }
    }
  ) {
    id
    name
    dateOfBirth
    sightings {
      id
      lastSeenAt
      imageURL
      location {
        lat
        lon
      }
    }
  }
}
  `

    // act
    const result = await query({ query: CREATE_TIGER })

    expect(result.errors).toBeTruthy()
    expect(result.errors[0].message.toLowerCase()).toContain(
      `tiger date of brith should be less than last seen at`
    )
  })
})
