require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const githubRouter = require('./routes/github');
const bitbucketRouter = require('./routes/bitbucket')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/github', githubRouter);
app.use('/bitbucket', bitbucketRouter);
app.all('*', (req, res) => {
    res.status(404).json({ error: `Sorry you cannot ${req.method} ${req.path}.` })
})

module.exports = app;
