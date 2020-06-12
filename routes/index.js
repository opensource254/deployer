const express = require('express');
const router = express.Router();
const fs = require('fs');
const { exec } = require('child_process')


const deploymentConfig = JSON.parse(fs.readFileSync('deployment.config.json', 'utf-8'))

/* GET home Route. */
router.get('/', function (req, res, next) {
  res.json({
    'Message': 'Hurray! 🙌. Your Deployer is live ninja. Time to be productive'
  })
});

// Receive the webhook and handle it
router.post('/', (req, res, next) => {
  if (!req.body.repository) {
    res.status(400).json({ error: 'Bad request' })
    return
  }
  const repositoryName = req.body.repository.name;
  const [repositoryConfig] = deploymentConfig.filter((config) => {
    return config.name === repositoryName
  })
  if (!repositoryConfig) {
    res.json(400)
    return
  }
  exec(`${repositoryConfig.command}`, (err, stdout, stderr) => {
    if (err) {
      console.error(err)
    }
    if (stdout) {
      console.log(stdout)
    }
    if (stderr) {
      console.warn(stderr)
    }
  })
  res.status(201).json('')
})

module.exports = router;
