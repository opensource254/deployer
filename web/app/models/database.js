const { development, production } = require('../../../knexfile')

const knex = require('knex')(process.env.NODE_ENV === 'development' ? development : production)

module.exports = knex
