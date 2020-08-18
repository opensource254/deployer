const queryBuilder = require('./database')
const plurarize = require('pluralize')

class Model {
    /** The table for the current table */
    table
    /** The limit of the records to return */
    limit = 15

    /**
     * 
     * @param {String} table 
     */
    constructor(table = '') {
        this.table = table
    }

    /**
     * Get the table name for the current model
     * 
     * @returns String
     */
    tableName() {
        return plurarize(this.constructor.name.toLowerCase())
    }

    /**
     * Returns all records of the current model
     * @returns Promise
     */
    all() {
        try {
            return queryBuilder(this.tableName()).select('*').limit(this.limit)
        } catch (error) {
            return error
        }
    }

    /**
     * Create a new Model
     * @param {Array} attributes 
     */
    async create(attributes = []) {
        try {
            await queryBuilder.table(this.tableName()).insert(attributes)
        } catch (error) {
            console.log(error);
            return { status: 500, message: error }
        }
    }

    /**
     * Get the first record
     * @returns Promise
     */
    first() {
        try {
            return queryBuilder(this.tableName()).select('*').first()
        } catch (error) {
            return error
        }
    }


    /**
     * Find a model by database ID
     * @param {Number} id
     * @returns Object
     */
    find(id = 1) {
        try {
            return queryBuilder(this.tableName()).where('id', id).select('*').first()
        } catch (error) {
            return error
        }
    }

    /**
     * Query using a condition
     * @param {Array} conditions
     * @returns Object
     */
    whereFirst(conditions = {}) {
        try {
            return queryBuilder(this.tableName()).where(conditions).select('*').first()
        } catch (error) {
            return error
        }
    }

}

module.exports = Model
