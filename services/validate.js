const fs = require('fs')

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
     * Validate the payload's body
     * @param {Array} payload 
     */
    static #validateBody = (payload = []) => {
        if (payload.repository) {
            return true
        }
        return false
    }
    /**
     * Validate the bitbucket payload
     * @param {Array} body 
     * @returns Promise
     */
    static bitbucket = (body = []) => new Promise((resolve, reject) => {

        /** Ensure the request body has a repository field */
        if (!this.#validateBody(body)) {
            return reject({ message: "Invalid Payload" })
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
        if (!this.#validateBody(body)) {
            return reject({ message: "Invalid Payload" })
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

    /**
    * Validate the Gitlab's payload
    * @param {Array} body 
    */
    static gitlab = (body = []) => new Promise((resolve, reject) => {
        /** Ensure the request body has a repository field */
        if (!this.#validateBody(body)) {
            return reject({ message: "Invalid Payload" })
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
}

module.exports = Validate
