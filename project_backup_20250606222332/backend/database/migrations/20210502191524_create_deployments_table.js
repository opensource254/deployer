/**
 * Run the migrations
 * @param {import('knex')} knex
 * @returns
 */
exports.up = function (knex) {
  return knex.schema.createTable('deployments', (table) => {
    table.bigIncrements('id')
    table.bigInteger('application_id').unsigned()
    table.text('log')
    table.boolean('successful')
    table.timestamps(true, true)

    table
      .foreign('application_id')
      .references('id')
      .inTable('applications')
      .onDelete('CASCADE')
  })
}

/**
 * Roll back the migrations
 * @param {import('knex')} knex
 * @returns
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('deployments')
}
