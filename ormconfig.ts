import { ConnectionOptions } from 'typeorm'
import dotenv from 'dotenv'

dotenv.config()

const { DB_USER, DB_HOST, DB_PASSWORD, DB_PORT, DB_NAME, NODE_ENV } =
  process.env

const isTestEnv = NODE_ENV === 'test'

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT || 5432),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: false,
  migrationsRun: false,
  migrations: [`src/db/migrations/*.ts`],
  entities: [`src/db/models/*.ts`],
  logging: !!process.env.LOG_QUERIES,
  cli: { migrationsDir: 'src/db/migrations', entitiesDir: 'src/db/entities' },
  dropSchema: isTestEnv,
}

export = [{ ...connectionOptions, name: 'default', migrationsRun: isTestEnv }]
