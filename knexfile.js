require('dotenv').config()

module.exports = {

    development: {
        client: 'sqlite3',
        connection: {
            filename: './dev.sqlite3'
        },
        useNullAsDefault: true
    },

    staging: {
        client: 'mysql',
        connection: {
            database: 'deployer',
            user: '',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'migrations'
        }
    },

    production: {
        client: process.env.DATABASE_CLIENT || 'mysql',
        connection: {
            database: process.env.DATABASE_NAME || 'deployer',
            user: process.env.DATABASE_USER || 'deployer',
            password: process.env.DATABASE_PASSWORD || 'secret'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'migrations'
        }
    }

}
