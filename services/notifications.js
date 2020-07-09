/**
 * ------------------------------------------------------------------------
 * This file contains the notification services that are supported
 * This includes Slack,Email,Telegram
 * ------------------------------------------------------------------------
 */
const config = require('../config/notifications')
const https = require('https')
const transport = require('./mail')

class NotificationService {
    /**
     * Notification service is enabled
     */
    notificationEnabled = Boolean
    /**
     * The Slack Webhook URL
     */
    slackURL = String
    /**
     * Successful build notification
     */
    notifyOnSuccess = Boolean
    /**
     * Error Notifications
     */
    notifyOnError = Boolean
    /**
     * The email for notifications
     */
    notificationEmail = String

    /**
     * The notification payload
     */
    notificationData = String

    /**
     * The notification type
     */
    notificationType = Boolean

    /**
     * initialise the service
     * @param {Array} data 
     * @param {String} type 
     */
    constructor(data = {}, type = '') {
        this.notificationEnabled = config.allowNotifications
        this.slackURL = config.slackWebhookURL
        this.notifyOnError = config.notifyOnErrors
        this.notifyOnSuccess = config.notifyOnSucess
        this.notificationEmail = config.notificationEmail
        this.notificationData = data
        this.notificationType = type
    }

    /**
     * Send notifications
     * @param {Array} services 
     * @returns void
     */
    sendNotifications() {
        if (!this.notificationEnabled) {
            return
        }
        if (this.notificationType === 'success' && this.notifyOnSuccess === 'false') {
            return
        }
        if (this.notificationType === 'error' && this.notifyOnError === 'false') {
            return
        }
        const services = this.getSupportedServices()
        services.forEach((service) => {
            switch (service.name) {
                case 'Slack':
                    this.sendSlackWebhook(service.value)
                    break;
                case 'email':
                    this.sendEmails()
                    break;
                default:
                    break;
            }
        })
    }

    /**
     * Get the supported services
     * @returns Array []
     */
    getSupportedServices() {
        const supportedServices = []
        if (this.slackURL) {
            supportedServices.push({
                name: 'Slack',
                value: this.slackURL
            })
        }
        if (this.notificationEmail) {
            supportedServices.push({
                name: 'email', value: this.notificationEmail
            })
        }
        return supportedServices
    }

    /**
     * Send slack webhook
     * @param {String} url 
     * @returns Boolean
     */
    sendSlackWebhook(url = '') {
        const fullURL = new URL(url)
        const payload = Buffer.from(JSON.stringify({
            text: this.notificationData.slack,
            mrkdwn: true
        }))
        const request = https.request({
            host: fullURL.host,
            path: fullURL.pathname,
            method: 'POST',
            port: 443,
            protocol: 'https:'
        }, (res) => {
            res.setEncoding('utf-8');
        })
        request.on('error', (err) => {
            throw err
        })
        request.write(payload)
        request.end()
    }

    /**
     * Send Email(s)
     * @param {String} emails 
     * @returns Boolean
     */
    sendEmails() {
        transport.sendMail({
            from: config.notificationFrom,
            to: config.notificationEmail,
            subject: this.notificationData.mail.subject,
            html: this.notificationData.mail.data,
        });
        return true
    }
}

module.exports = NotificationService
