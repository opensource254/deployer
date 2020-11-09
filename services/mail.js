const mailer = require('nodemailer')
const mail = require('../config/mail')

const transport = mailer.createTransport({
    host: mail.SMTP_HOST,
    port: mail.SMTP_PORT,
    auth: {
        user: mail.SMTP_USERNAME,
        pass: mail.SMTP_PASSWORD
    }
})

module.exports = transport
