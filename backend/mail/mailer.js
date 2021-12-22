require('dotenv').config()
const transport = require('nodemailer')
const email = require('../config/config').email

let auth
if (email.auth.user && email.auth.password) {
  auth = {
    user: email.auth.user,
    pass: email.auth.password,
  }
} else {
  auth = false
}

console.log(email)
const mailer = transport.createTransport({
  host: '127.0.0.1',
  port: email.port,
  secure: email.secure,
  auth,
})

module.exports = mailer
