const fs = require('fs')
const { resolve } = require('path')

/**
 * ------------------------------------
 * Validate the incoming webhook
 * ------------------------------------
 */
class Validate {
    /**
     * Load the configuration file
     */
    static deploymentConfig = JSON.parse(fs.readFileSync('deployment.config.json', 'utf-8'))
    /**
     * Validate the bitbucket payload
     * @param {Array} body 
     * @returns Promise
     */
    static bitbucket = (body = []) => new Promise((resolve, reject) => {

        /** Ensure the request body has a repository field */
        if (!body.repository) {
            reject({ status: 400, message: "Repository Parameter not found in the body" })
            return
        }

        /** It is safe to decalre this variable because the param exists */
        const repositoryName = body.repository.project.name

        /** Get the config from the config file */
        const [repositoryConfig] = this.deploymentConfig.filter((config) => {
            return config.name === repositoryName
        })

        /** Tell the user about a missing config */
        if (!repositoryConfig) {
            reject({ message: `Config entry for ${repositoryName} was not found in the config file` })
            return
        }

        /** Everthing looks good resolve the reposory name */
        resolve(repositoryConfig)
    })

    /**
     * Validate the github's payload
     * @param {Array} body 
     */
    static github = (body = []) => new Promise((resolve, reject) => {
         /** Ensure the request body has a repository field */
         if (!body.repository) {
            reject({ status: 400, message: "Repository Parameter not found in the body" })
            return
        }

        /** It is safe to decalre this variable because the param exists */
        const repositoryName = body.repository.name
        

        /** Get the config from the config file */
        const [repositoryConfig] = this.deploymentConfig.filter((config) => {
            return config.name === repositoryName
        })

        /** Tell the user about a missing config */
        if (!repositoryConfig) {
            reject({ message: `Config entry for ${repositoryName} was not found in the config file` })
            return
        }

        /** Everthing looks good resolve the reposory name */
        resolve(repositoryConfig)
    })

    // TODO Add Github and Gitlab here
}

module.exports = Validate
