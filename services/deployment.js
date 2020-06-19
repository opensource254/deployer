const fs = require('fs')
const { exec } = require('child_process')

/**
 * Handle deployment
 * @param {Array} Config 
 */
const deployment = (Config = []) => {
    exec(`${Config.command}`, (_err, stdout, stderr) => {
        if (stdout) {
            // TODO Make this available to the user
        }
        if (stderr) {
            fs.writeFileSync('error.log', `${new Date().toUTCString()}, Config: ${Config.name}, Error: ${stderr}`, {
                encoding: 'utf-8',
                flag: 'a',
            })
        }
    })
}

module.exports = deployment
