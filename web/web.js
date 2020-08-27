const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const logger = require('morgan')
const cors = require('cors')

const apiRouter = require('./routes/index')
const configRouter = require('./routes/config')

const web = express()

web.use(logger('dev'))
web.use(express.json())
web.use(express.urlencoded({ extended: false }))
web.use(cookieParser())
web.use(cors({ origin: true, credentials: true }))
/** */
const nextYear = new Date().getFullYear() + 1
const exp = new Date().setFullYear(nextYear)
/** */
web.use(cookieSession({ name: 'deployer_session', keys: ['mysupersecret'], expires: new Date(exp) }))
web.use(express.static(path.join(__dirname, 'public')))

web.use('/', apiRouter)
web.use('/config', configRouter)

module.exports = web
