const Model = require('./Model')
const { hashSync } = require('bcrypt')

class User extends Model {
    /**
     * Register a new user
     * @param {*} details 
     */
    register(details = []) {
        const { password } = details
        const hash = hashSync(password || '', 10)
        details['password'] = hash
        return this.create(details)
    }
}
module.exports = new User()
