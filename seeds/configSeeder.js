
exports.seed = function (knex) {
  return knex('configs').del()
    .then(function () {
      return knex('configs').insert([
        { name: 'First-Application', description: 'Awesome config', command: 'ls -la' },
        { name: 'Second-Application', description: 'Awesome config', command: 'ls -la' },
        { name: 'Third-Application', description: 'Awesome config', command: 'ls -la' },
        { name: 'deployer', description: 'Awesome config', command: 'ls -la' },
        { name: 'client-web-app', description: 'Awesome config', command: 'ls -la' },
      ]);
    });
};
