module.exports = {
  apps: [
    {
      name: 'Deployer',
      script: 'npm',
      args: '-- run start --spa',
      watch: false,
      exec_mode: 'cluster',
      instances: 1,
    },
  ],
}
