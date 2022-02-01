/**
 * This file is responsible for sending notificatios to users.
 * The notfications have various types, and channels.
 * All the channels/types can be turned on and off from the user settings with the default being off.
 * @author Stanley Masinde
 */
const https = require('https')
const { DB } = require('mevn-orm')
const mailer = require('../mail/mailer')

const mail = (user, type, content) => {
    const mail = {
        from: `Notifications <${process.env.MAIL_USERNAME}>`,
        to: user.email,
        subject: `${type}`,
        text: `${content}`,
        html: `<p>${content}</p>`,
    }

    mailer.sendMail(mail, (err, info) => {
        if (err) {
            console.log(err)
        } else {
            console.log(`Email sent to ${user.email}`) // TODO: Log this into the database
        }
    })
}

const notifications = async (user, type, content) => {
    try {
        await DB('notifications')
            .insert({
                user_id: user.id,
                type,
                content,
            })
    } catch (err) {
        console.log(err) // TODO: Log this into the database and send an email to the admin
    }
}

const slack = async (user, type, content) => {
    console.log('Sending to slack')
    const webhookUri = await DB('config')
        .where({
            name: 'slack_webhook_uri',
        })
        .first()

    const payload = Buffer.from(JSON.stringify({
        text: `${type}: ${content}`,
        mrkdwn: true
    }))

    const req = https.request({
        hostname: 'hooks.slack.com',
        port: 443,
        path: `/${webhookUri.value}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': payload.length,
        },
    }, (res) => {
        res.on('data', (d) => {
            console.log(d)
        })
    })

    req.write(payload)
    req.end()
    return
}

const webhooks = async (user, type, content) => {
    const webhooks = await DB('webhooks')
        .where({
            user_id: user.id,
            type,
        })

    webhooks.forEach(async (webhook) => {
        const payload = Buffer.from(JSON.stringify({
            username: `${user.first_name} ${user.last_name}`,
            text: `${type}: ${content}`,
            mrkdwn: true
        }))

        const req = https.request({
            hostname: webhook.hostname,
            port: webhook.port,
            path: webhook.path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': payload.length,
            },
        }, (res) => {
            res.on('data', (d) => {
                console.log(d)
            })
        })

        req.write(payload)
        req.end()
    })
}

module.exports = {
    mail,
    notifications,
    slack,
    webhooks,
}