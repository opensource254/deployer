/* eslint no-unused-vars: "off" */
// TODO Enable the disabled rules when done
const Controller = require('./Controller')

module.exports = new class ConfigController extends Controller {
    /**
     * Get all the config from the database
     * @returns Array
     */
    index() { }

    /**
     * Show the specified config
     * @param {Number} config 
     * @returns Array
     */
    show(config) { }

    /**
     * Update a config in the database
     * @param {Number} config 
     * @param {Array} body
     * @returns Object
     */
    update(config, body) { }

    /**
     * Remove a config from the database
     * @param {Number} config 
     * @returns Boolean
     */
    delete(config) { }
}