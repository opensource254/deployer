
exports.seed = function (knex) {
  return knex('configs').del()
    .then(function () {
      return knex('configs').insert([
        { name: 'First-Application', description: 'Awesome config', command: 'ls -la' },
        { name: 'Second-Application', description: 'Awesome config', command: 'ls -la' },
        { name: 'Third-Application', description: 'Awesome config', command: 'ls -la' },
        { name: 'Fourth-Application', description: 'Awesome config', command: 'ls -la' },
        { name: 'Fifth-Application', description: 'Awesome config', command: 'ls -la' },
      ]);
    });
};
