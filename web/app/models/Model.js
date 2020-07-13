const queryBuilder = require('./database')
const plurarize = require('pluralize')

class Model {
    /** The table for the current table */
    table
    /** The limit of the records to return */
    static limit = 15

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
    static tableName() {
        return plurarize(this.name.toLowerCase())
    }

    /**
     * Returns all records of the current model
     * @returns Promise
     */
    static all() {
        try {
            return queryBuilder(this.tableName()).select('*').limit(this.limit)
        } catch (error) {
            return error
        }
    }

    /**
     * Get the first record
     * @returns Promise
     */
    static first() {
        try {
            return queryBuilder(this.tableName()).select('*').first()
        } catch (error) {
            return error
        }
    }
}

module.exports = Model
