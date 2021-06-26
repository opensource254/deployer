require('dotenv').config()
module.exports = {
  development: {
    client: process.env.TEST_DB_CLIENT || 'sqlite3',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_SCHEMA || 'my_db',
      user: process.env.DB_USER || 'username',
      password: process.env.DB_PASSWORD,
    },
    migrations: {
      tableName: 'migrations',
      directory: './backend/database/migrations',
    },
    seeds: {
      directory: './backend/database/seeds',
    },
  },

  staging: {
    client: process.env.DB_CLIENT || 'mysql2',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_SCHEMA || 'my_db',
      user: process.env.DB_USER || 'username',
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'migrations',
      directory: './backend/database/migrations',
    },
    seeds: {
      directory: './backend/database/seeds',
    },
  },

  production: {
    client: process.env.DB_CLIENT || 'mysql2',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_SCHEMA || 'my_db',
      user: process.env.DB_USER || 'username',
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'migrations',
      directory: './backend/database/migrations',
    },
    seeds: {
      directory: './backend/database/seeds',
    },
  },
}
