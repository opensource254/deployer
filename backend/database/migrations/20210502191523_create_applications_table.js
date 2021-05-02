exports.up = function (knex) {
  return knex.schema.createTable('applications', (table) => {
    table.bigIncrements('id')
    table.string('name')
    table.string('repository_name')
    table.text('command')
    table.timestamps()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('applications')
}
