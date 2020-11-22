/** @var knex = require('Knex')() */
exports.up = function(knex) {
    return knex.schema.createTable('deployments', (table) => {
        table.bigIncrements('id')
        table.string('application')
        table.text('output')
        table.timestamp('time')
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('deployments')
}
