/**
 * -------------------------------------------------------------------
 * This is where th notification config lives. 
 * All these values can be overwritten by the environment variables
 * -------------------------------------------------------------------
 */
const notificationConfig = {
    /**This is used to determine if notifications are enabled */
    allowNotifications: process.env.ALLOW_NOTIFCATIONS || true,


    /** 
     * Your Slack webhook URL. If empty Slack notifications will be off 
     * This is the URL you received when creating a Slack APP
     * Slack is ignored if this is null or false
     * 
    */
    slackWebhookURL: process.env.SLACK_WEBHOOK_URL,


    /** 
     * Notification Email 
     * An email will be send to this email(s) according to 
     * Your config
     * */
    notificationEmail: process.env.NOTIFICATION_EMAIL,

    /**
     * Notification from email
     * The From adress that will be shown in the email
     */
    notificationFrom: process.env.NOTIFICATION_FROM,


    /**
     * Get notifications on errors that occour 
     * during deployment
     */
    notifyOnErrors: process.env.ERROR_NOTIFICATIONS || true,

    /**
     * 
     * This is used to set notification on successful deployments
     */
    notifyOnSucess: process.env.SUCCESS_NOTIFICATIONS || true

    /**
     * Telegram
     * Coming Soon
     */
    // TODO Add telegram
}

module.exports = Object.freeze(notificationConfig)
