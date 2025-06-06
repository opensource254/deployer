const fs = require('fs')
const express = require('express')
const session = require('express-session')
const sessionstore = require('sessionstore')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const authRouter = require('./routes/auth')
const passwordResetRouter = require('./routes/password')
const appsRouter = require('./routes/applications')
const webhooksRouter = require('./routes/webhooks')
const statsRouter = require('./routes/stats')

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

app.use(webhooksRouter)
app.use('/auth', authRouter)
app.use('/password', passwordResetRouter)
app.use('/applications', appsRouter)
app.use('/stats', statsRouter)

app.use(function (err, req, res, next) {
  const date = new Date()
  fs.writeFileSync(
    `logs/${date.getFullYear()}-${date.getMonth()}-${date.getDate()}.log`,
    date.toUTCString() + '\n',
    { flag: 'a' }
  )
  fs.writeFileSync(
    `logs/${date.getFullYear()}-${date.getMonth()}-${date.getDate()}.log`,
    err.message + '\n',
    { flag: 'a' }
  )
  fs.writeFileSync(
    `logs/${date.getFullYear()}-${date.getMonth()}-${date.getDate()}.log`,
    err.stack,
    { flag: 'a' }
  )
  fs.writeFileSync(
    `logs/${date.getFullYear()}-${date.getMonth()}-${date.getDate()}.log`,
    '\n-----------------------------\n',
    {
      flag: 'a',
    }
  )
  res.status(500).json('Something broke!')
})
module.exports = app
