exports.up = function (knex) {
  return knex.schema.createTable('deployments', (table) => {
    table.bigIncrements('id')
    table.string('application')
    table.text('log')
    table.boolean('successful')
    table.timestamps()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('deployments')
}
