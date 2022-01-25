/* eslint-disable prefer-regex-literals */
const crypto = require('crypto')
const fs = require('fs/promises')
const router = require('express').Router()
const { DB } = require('mevn-orm')
const User = require('../app/models/user')
const mailer = require('../mail/mailer')
const mailTemplate = fs.readFile(
  './backend/mail/views/reset-password.html',
  'utf8'
)

router.post('/reset', async (req, res, next) => {
  const { email } = req.body
  const user = User.where({ email }).first()

  if (!user) {
    return res.status(422).json({
      errors: {
        email: ['This email does not match our records'],
      },
    })
  }

  const token = crypto.randomBytes(64).toString('hex')

  try {
    await DB('password_resets').where({ email }).delete()
    await DB('password_resets').insert({
      email,
      token,
    })

    let html = await mailTemplate
    const actionUrl = `${process.env.APP_URL}/new/?&email=${email}&token=${token}`
    const actionUrlRgx = new RegExp('{{actionUrl}}', 'g')
    html = html.replace(actionUrlRgx, actionUrl)
    await mailer.sendMail({
      to: email,
      subject: 'Your password reset request',
      from: 'no-reply@deployer.com', // TODO Make this configurable
      text: `
            You are receiving this email because you (or someone else) have requested the reset of the password for your account.
            Please click on the following link, or paste this into your browser to complete the process:
            ${actionUrl}.
            If you did not request this, please ignore this email and your password will remain unchanged.
            This token will expire in 30 minutes.
        `,
      html,
    })

    return res.json({
      message: 'Check your email for a reset link.',
    })
  } catch (error) {
    next(error)
  }
})

router.post('/update', async (req, res, next) => {
  const { email, token, password } = req.body
  const user = await User.where({ email }).first()

  if (!user) {
    return res.status(422).json({
      errors: {
        email: ['This email does not match our records'],
      },
    })
  }

  const passwordReset = await DB('password_resets')
    .where({
      email,
    })
    .first()

  if (!passwordReset) {
    return res.status(422).json({
      errors: {
        email: ['The given token is invalid!'],
      },
    })
  }

  if (passwordReset.token !== token) {
    return res.status(422).json({
      errors: {
        email: ['The given token is invalid!'],
      },
    })
  }

  const now = new Date()
  const expiresAt = new Date(passwordReset.created_at)
  expiresAt.setMinutes(expiresAt.getMinutes() + 30)

  if (now > expiresAt) {
    return res.status(422).json({
      errors: {
        email: ['This email does not match our records'],
      },
    })
  }

  user.password = password
  await user.save()

  await DB('password_resets').where({ email }).delete()

  return res.json({
    message: 'Password updated successfully.',
  })
})

module.exports = router
