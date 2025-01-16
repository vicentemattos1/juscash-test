import { Knex } from 'knex'
import 'dotenv/config'
import { env } from '@/config/env'

const config: Knex.Config = {
  client: 'pg',
  useNullAsDefault: true,
  connection: {
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT),
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
  },
  migrations: {
    directory: './src/migrations',
    extension: 'ts',
  },
}

export default config
