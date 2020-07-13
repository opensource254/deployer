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
// TODO This middleware does not work correctly app.use(verifyHostName())

app.use('/github', githubRouter)
app.use('/bitbucket', bitbucketRouter)
app.use('/gitlab', gitlabRouter)
app.all('*', web)

module.exports = app;
