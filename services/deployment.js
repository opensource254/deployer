const fs = require('fs')
const { exec } = require('child_process')
const NotificationService = require('./notifications')

/**
 * Handle deployment
 * @param {Array} Config 
 */
const deployment = (Config = []) => {
    exec(`${Config.command}`, (_err, stdout, stderr) => {
        if (stdout) {
            // TODO Make this available to the user
            new NotificationService(stdout, 'success').sendNotifications()
        }
        if (stderr) {
            new NotificationService(stderr, 'error').sendNotifications()
            fs.writeFileSync('error.log', `${new Date().toUTCString()}, Config: ${Config.name}, Error: ${stderr}`, {
                encoding: 'utf-8',
                flag: 'a',
            })
        }
    })
}

module.exports = deployment
