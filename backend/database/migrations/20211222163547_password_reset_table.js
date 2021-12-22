/**
 * Run the migrations
 * @param {import('knex')} knex
 * @returns
 */
exports.up = function (knex) {
  return knex.schema.createTable('password_resets', (table) => {
    table.increments('id').primary()
    table.string('email').notNullable()
    table.string('token').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

/**
 * Roll back the migrations
 * @param {import('knex')} knex
 * @returns
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('password_resets')
}
