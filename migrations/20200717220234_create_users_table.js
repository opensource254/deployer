/** @var knex = require('knex')() */
exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
        table.bigIncrements('id')
        table.string('name').nullable()
        table.string('email').unique()
        table.string('password')
    })
}

exports.down = function (knex) {
    knex.schema.dropTable('users')
}
