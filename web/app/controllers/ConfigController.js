const Validator = require('mevn-validator')
const Config = require('../models/Config')
/* eslint no-unused-vars: "off" */
// TODO Enable the disabled rules when done
const Controller = require('./Controller')

module.exports = new class ConfigController extends Controller {
    /**
     * Get all the config from the database
     * @returns Array
     */
    async index() {
        try {
            return this.response(await Config.all())
        } catch (error) {
            return this.response(error, 500)
        }

    }

    /**
     * Create a new config entry
     * @param {Array} body 
     */
    async create(body = []) {
        // TODO make sure the config values are unique.
        await new Validator(body, { name: 'required', description: 'required', command: 'required' }).validate()
        try {
            const cfg = await Config.create(body)
            return this.response(cfg, 201)
        } catch (error) {
            return this.response(error, 500)
        }
    }

    /**
     * Show the specified config
     * @param {Number} config 
     * @returns Array
     */
    async show(config) {
        try {
            const cfg = await Config.find(config)
            if (cfg) {
                return this.response(cfg)
            }
            return this.response('Config not found', 404)
        } catch (error) {
            return this.response(error, 500)
        }
    }

    /**
     * Update a config in the database
     * @param {Number} config 
     * @param {Array} body
     * @returns Object
     */
    async update(config, body) {
        // TODO make sure the config values are unique.
        await new Validator(body, { name: 'required', description: 'required', command: 'required' }).validate()
        try {
            const cfg = await Config.update(body, config)
            return this.response(cfg.message, cfg.status)
        } catch (error) {
            return this.response(error, 500)
        }
    }

    /**
     * Remove a config from the database
     * @param {Number} config 
     * @returns Boolean
     */
    async delete(config) {
        try {
            const cfg = await Config.delete(config)
            return this.response(cfg.message, cfg.status)
        } catch (error) {
            return this.response(error, 500)
        }
    }
}