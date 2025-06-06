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
    table.string('description').defaultTo('No description provided')
    table.string('clone_url')
    table.string('deploy_branch').defaultTo('main')
    table.string('deploy_directory').defaultTo('/var/www/')
    table.text('deploy_script').defaultTo('echo "Hello World"')
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
