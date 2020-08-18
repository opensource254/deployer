const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const logger = require('morgan')

const apiRouter = require('./routes/index')

const web = express()

web.use(logger('dev'))
web.use(express.json())
web.use(express.urlencoded({ extended: false }))
web.use(cookieParser())
web.use(cookieSession({ name: 'deployer', keys: ['mysupersecret'] }))
web.use(express.static(path.join(__dirname, 'public')))

web.use('/', apiRouter)

module.exports = web
