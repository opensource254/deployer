const express = require('express')
const session = require('express-session')
const sessionstore = require('sessionstore')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth')

const app = express()

app.use(
  session({
    secret: 'super-secret-cookie', // TODO add this to .env
    resave: false,
    saveUninitialized: true,
    name: 'deployer_session',
    store:
      process.env.NODE_ENV === 'testing'
        ? null
        : sessionstore.createSessionStore({
            type: 'redis',
          }),
  })
)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/auth', authRouter)

module.exports = app
