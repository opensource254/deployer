const knex = require('knex')({
    client: process.env.DATABASE_CLIENT || 'sqlite3',
    connection: {
        host: process.env.DATABASE_HOST || 'localhost',
        user: process.env.DATABASE_USER || 'deployer',
        password: process.env.DATABASE_PASSWORD || '',
        database: process.env.DATABASE_NAME || 'deployer'
    }
})

module.exports = knex
