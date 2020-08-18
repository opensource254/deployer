const fs = require('fs')
const { exec } = require('child_process')
const NotificationService = require('./notifications')

/**
 * Handle deployment
 * @param {Array} Config
 */
const deployment = (Config = []) => {
    exec(`${Config.command}`, (_err, stdout, stderr) => {
        /** The output logged during the command excecution */
        if (stdout) {
            const slack = (`
            *Deployment for _${Config.name}_ was successful 😃* \n*Output*: \`\`\`${stdout.trim()}\`\`\`
            `)

            const mail = {
                subject: `Deployment for ${Config.name} was successfull ✅`,
                data: (`
            <h3>Deployment for <i>${Config.name}</i> was successful 😃</h3> <br/>
            <b>Output:</b> <code color="green">${stdout.trim()}</code>
            `)
            }
            new NotificationService({ slack, mail }, 'success').sendNotifications()
        }
        /** If an error occoured */
        if (stderr) {
            const slack = (`
                *Deployment for on* _${Config.name}_  \n*Date* \`${new Date().toUTCString()}\` \n*Was Completed with the following warnings logged.:* \`\`\`${stderr.trim()}\`\`\`
            `)

            const mail = {
                subject: `Deployment for ${Config.name} Complete  with warnings ❌`,
                data: (`
            <h3>Deployment for ${Config.name} is complete </h3>
            <br/>
            <b>Date</b> <date>${new Date().toUTCString()}</date> <br/>
            <b>The following warning was logged:</b> <code color="red">${stderr.trim()}</code>
            `)
            }

            /** Send error notification */
            new NotificationService({ slack, mail }, 'error').sendNotifications()

            /**
             * Write error log
             */
            fs.writeFileSync('error.log', `${new Date().toUTCString()}, Config: ${Config.name}, Error: ${stderr.trim()}`, {
                encoding: 'utf-8',
                flag: 'a'
            })
        }
    })
}

module.exports = deployment
