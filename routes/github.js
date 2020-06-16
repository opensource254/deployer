const express = require('express');
const router = express.Router();
const fs = require('fs');
const { exec } = require('child_process');


const deploymentConfig = JSON.parse(fs.readFileSync('deployment.config.json', 'utf-8'))

/* GET home Route. */
router.get('/', function (req, res, next) {
  res.json({
    'Message': 'Hurray! 🙌. Your Github Deployer is live'
  })
});

// Receive the webhook and handle it
router.post('/', (req, res) => {
  if (!req.body.repository) {
    res.status(400).json({ error: 'Bad request' })
    return
  }
  const repositoryName = req.body.repository.name;
  const [repositoryConfig] = deploymentConfig.filter((config) => {
    return config.name === repositoryName
  })
  if (!repositoryConfig) {
    res.status(422).json({
      errors: {
        config: [`Config entry for ${repositoryName} was not found in the config file`]
      }
    })
    return
  }
  exec(`${repositoryConfig.command}`, (_err, stdout, stderr) => {
    if (stdout) {
      // TODO Make this avialable to the user
    }
    if (stderr) {
      fs.writeFileSync('error.log', `${new Date().toUTCString()}, Config: ${repositoryConfig.name}, Error: ${stderr}`, {
        encoding: 'utf-8',
        flag: 'a',
      })
    }
  })
  return res.status(201).json('')
})

module.exports = router;
