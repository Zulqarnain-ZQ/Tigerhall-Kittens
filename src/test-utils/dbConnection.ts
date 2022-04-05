import Container from 'typedi'
import * as TypeORM from 'typeorm'
import { getConnection } from 'typeorm'

// register 3rd party IOC container
TypeORM.useContainer(Container)

export async function createConnection() {
  const name = process.env.NODE_ENV || 'default'

  console.log('name', name)

  await TypeORM.createConnection()
}

export async function closeConnection() {
  const connection = await getConnection()

  connection.close()
}
