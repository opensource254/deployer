const crypto = require('crypto')
const router = require('express').Router()
const { DB } = require('mevn-orm')
const User = require('../app/models/user')
const mailer = require('../mail/mailer')

router.post('/reset', async (req, res, next) => {
  const { email } = req.body
  const user = await User.where({ email }).first()

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

    await mailer.sendMail({
      to: email,
      subject: 'Your password reset request',
      from: 'no-reply@deployer.com', // TODO Make this configurable
      text: `
            You are receiving this email because you (or someone else) have requested the reset of the password for your account.
            Please click on the following link, or paste this into your browser to complete the process:
            http://localhost:3000/new/?&email=${email}&token=${token}.
            If you did not request this, please ignore this email and your password will remain unchanged.
            This token will expire in 30 minutes.
        `,
      html: `
        <table style="width: 100%;">
            <tr>
                <td>
                    <h1>Your password reset request</h1>
                    <p>You are receiving this email because you (or someone else) have requested the reset of the password for your account.</p>
                    <p>Please click on the following link, or paste this into your browser to complete the process:</p>
                    <table style="width: 100%;">
                        <tr>
                            <td width="33%">
                            </td>
                            <td width="33%">
                    <a href="http://localhost:3000/new/?&email=${email}&token=${token}">
                    <button style="background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px;">
                        Reset password
                    </button>
                    </a>
                            </td>
                            <td width="33%">
                            </td>
                        </tr>
                    </table>
                    <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
                    <p>This token will expire in 30 minutes.</p>
                </td>
            </tr>
            <tr>
                <td>
                    Thanks,<br>
                    The Deployer Team
                </td>
            </tr>
        </table>
        <style>
        body {
            font-family: Apple System, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            font-size: 16px;
            line-height: 1.5;
            color: #333;
            text-align: center;
            letter-spacing: 0.5px;
            margin: 0;
            padding: 0;
            justify-content: center;
            align-items: center;
            background-color: #fafafa;
            display: flex;
            quotes: "“" "”";
            vertical-align: middle;
        }
        h1 {
            font-size: 2em;
            margin: 0.67em 0;
        }
        button {
            background-color: #4CAF50;
            border-radius: 5px;
            border: none;
            color: white;
            padding: 15px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
        }
            table {
                border-collapse: collapse;
                width: 100%;
            }
            td, th {
                border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;
            }
            tr:nth-child(even) {
                background-color: #dddddd;
            }
        </style>
        `,
    })

    return res.json({
      message: 'Check your email for a reset link',
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
