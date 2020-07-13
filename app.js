require('dotenv').config()
const express = require('express')
const logger = require('morgan')

const githubRouter = require('./routes/github')
const bitbucketRouter = require('./routes/bitbucket')
const gitlabRouter = require('./routes/gitlab')
const web = require('./web/web')

const app = express();

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/github', githubRouter)
app.use('/bitbucket', bitbucketRouter)
app.use('/gitlab', gitlabRouter)
app.use('/api', web)
app.all('*', (req, res) => {
    res.status(404).json({ type: 'Error', message: `Sorry ${req.method} ${req.path} is not available` })
})

module.exports = app;
