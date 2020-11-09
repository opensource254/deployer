const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const logger = require('morgan')
const cors = require('cors')
const csrf = require('csurf')
const bodyParser = require('body-parser')

const apiRouter = require('./routes/index')
const configRouter = require('./routes/config')

const web = express()

web.use(logger('dev'))
web.use(express.json())
web.use(express.urlencoded({ extended: false }))
web.use(cookieParser())
web.use(cors({ origin: true, credentials: true }))
web.use(bodyParser.urlencoded({ extended: false }))

/**Error handling */
web.use(function (err, _req, res, next) {
    if (err.code === 'EBADCSRFTOKEN') {
        return res.status(403).json(err.message)
    }
    next(err)
})
/** */
const nextYear = new Date().getFullYear() + 1
const exp = new Date().setFullYear(nextYear)
/** */
web.use(cookieSession({ name: 'deployer_session', keys: ['mysupersecret'], expires: new Date(exp), sameSite: 'lax', secure: false }))
web.use(csrf({
    cookie: {
        sameSite: 'lax',
        secure: false
    },
    ignoreMethods: process.env.NODE_ENV === 'development' ? ['POST', 'PUT', 'DELETE', 'GET', 'OPTIONS'] : ['GET', 'HEAD', 'OPTIONS'],
    sessionKey: 'de'
}))
web.use(express.static(path.join(__dirname, 'public')))

web.use('/', apiRouter)
web.use('/config', configRouter)

module.exports = web
