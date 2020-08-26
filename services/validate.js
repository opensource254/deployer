const Config = require('../web/app/models/Config')
// TODO enable this in prod
// const verifySecret = require('./verifySecret')

/**
 * ------------------------------------
 * Validate the incoming webhook
 * ------------------------------------
 */
class Validate {
	/**
	 * Validate the payload's body
	 * @param {Array} payload
	 */
	#validateBody = (payload = []) => {
	    if (payload.repository) {
	        return true
	    }
	    return false
	}

	/**
	 * Load the config from db
	 * @param {String} name 
	 */
	#loadConfig = async (name = '') => {
	    return await Config.whereFirst({ name })
	}

	/**
	 * Validate the bitbucket payload
	 * @param {Array} body
	 * @return Promise
	 */
	async bitbucket(body = []) {
	    /** Ensure the request body has a repository field */
	    if (!this.#validateBody(body)) {
	        return Promise.reject({ message: 'Invalid Payload' })
	    }

	    /** It is safe to decalre this variable because the param exists */
	    const repositoryName = body.repository.project.name

	    /** Get the config from the config file */
	    try {
	        const cfg = await Config.whereFirst({ name: repositoryName })
	        if (!cfg) {
	            return Promise.reject('Config not found')
	        }
	        return Promise.resolve(cfg)
	    } catch (error) {
	        return Promise.reject(error)
	    }

	}

	/**
	 * Validate the github's payload
	 * @param {Array} payload
	 */
	async github(payload = []) {
	    /** Ensure the request body has a repository field */
	    if (!this.#validateBody(payload.body)) {
	        return Promise.reject({ message: 'Invalid Payload' })
	    }

	    /** Validate the X-hub signature */
	    // TODO Enable this in prod
	    // const headers = Object.entries(payload.headers)
	    // const xHubHeader = headers.filter((header) => {
	    // 	return header[0] === 'x-hub-signature'
	    // })
	    // const xhubSignature = xHubHeader[0]
	    // if (!verifySecret(payload.body, xhubSignature[1])) {
	    // 	return Promise.reject({ status: 403, message: 'Invalid Secret' })
	    // }

	    /** It is safe to decalre this variable because the param exists */
	    const repositoryName = payload.body.repository.name

	    try {
	        const cfg = await Config.whereFirst({ name: repositoryName })

	        if (!cfg) {
	            return Promise.reject({ status: 404, message: `Config for ${repositoryName} was not found` })
	        }
	        return Promise.resolve(cfg)
	    } catch (error) {

	        return Promise.reject({ status: 500, message: error })
	    }
	}

	/**
	* Validate the Gitlab's payload
	* @param {Array} body
	*/
	async gitlab(body = []) {
	    /** Ensure the request body has a repository field */
	    if (!this.#validateBody(body)) {
	        return Promise.reject({ status: 400, message: 'Invalid Payload' })
	    }

	    /** It is safe to decalre this variable because the param exists */
	    const repositoryName = body.repository.name

	    /** Get the config from the config file */
	    try {
	        const cfg = await Config.whereFirst({ name: repositoryName })
	        if (!cfg) {
	            return Promise.reject({ status: 404, message: `Config for ${repositoryName} was not found` })
	        }
	        return Promise.resolve(cfg)
	    } catch (error) {

	        return Promise.reject({ status: 500, message: error })
	    }
	}
}

module.exports = new Validate
