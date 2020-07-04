const mail = {
    /**The email host */
    SMTP_HOST: process.env.SMTP_HOST || 'smtp.mailtrap.io',
    SMTP_PORT: process.env.SMTP_PORT || 25,
    SMTP_USERNAME: process.env.SMTP_USERNAME || '',
    SMTP_PASSWORD: process.env.SMTP_PASSWORD || ''
}

module.exports = Object.freeze(mail)
