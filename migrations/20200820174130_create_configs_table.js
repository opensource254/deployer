exports.up = function (knex) {
    return knex.schema.createTable('configs', (table) => {
        table.bigIncrements()
        table.string('name')
        table.text('description').nullable()
        table.text('command')
    })
};

exports.down = function (knex) {
    return knex().schema.dropTable('configs')
};
