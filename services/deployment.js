const fs = require('fs')
const { exec } = require('child_process')
const NotificationService = require('./notifications')
const { config } = require('process')

/**
 * Handle deployment
 * @param {Array} Config 
 */
const deployment = (Config = []) => {
    exec(`${Config.command}`, (_err, stdout, stderr) => {
        /**The output logged during the command excecution */
        if (stdout) {
            const outPutString = (`
            *Deployment for _${Config.name}_ was successful 😃* \n*Output*: \`\`\`${stdout.trim()}\`\`\`
            `)
            new NotificationService(outPutString, 'success').sendNotifications()
        }
        /** If an error occoured */
        if (stderr) {
            const notificationString = (`
                *Deployment for * _${Config.name}_ failed 😢 \n*Date* \`${new Date().toUTCString()}\` \n*The following error was logged:* \`\`\`${stderr.trim()}\`\`\`
            `)

            /** Send error notification */
            new NotificationService(notificationString, 'error').sendNotifications()

            /**
             * Write error log
             */
            fs.writeFileSync('error.log', `${new Date().toUTCString()}, Config: ${Config.name}, Error: ${stderr.trim()}`, {
                encoding: 'utf-8',
                flag: 'a',
            })
        }
    })
}


module.exports = deployment
