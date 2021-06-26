/**
 * Run the migrations
 * @param {import('knex')} knex
 * @returns
 */
exports.up = function (knex) {
  return knex.schema.createTable('applications', (table) => {
    table.bigIncrements('id')
    table.string('name')
    table.string('full_name')
    table.text('command')
    table.timestamps(true, true)
  })
}

/**
 * Rollback the migrations
 * @param {import('knex')} knex
 * @returns
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('applications')
}
