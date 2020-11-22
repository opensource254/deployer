/** @var knex  = require("knex")() */
//const knexx = require('knex')()
exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
        table.bigIncrements('id')
        table.string('name').nullable()
        table.string('email').notNullable().unique()
        table.string('password').notNullable()
    })
}

exports.down = function (knex) {
    return knex.schema.dropTable('users')
}
