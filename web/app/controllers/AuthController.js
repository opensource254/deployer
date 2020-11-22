const Validator = require('mevn-validator')
const User = require('../models/User')
const Controller = require('./Controller')
const { compareSync } = require('bcrypt')

class AuthController extends Controller {
    /**
     * Login a user with ID
     * @param {number} id 
     */
    async login(id = 0) {
        const u = await User.whereFirst({ id })
        if (u) {
            return this.response(u, 200)
        }
        return this.response('The specified user was not found', 401)
    }

    /**
     * Attempt to authenticate a user using provided credentials
     * 
     * @param {Object} credentials 
     */
    async attempt(credentials = []) {
        try {
            await new Validator(credentials, { email: 'required|email', password: 'required' }).validate()
            const u = await User.whereFirst({ 'email': credentials.email })
            if (u) {
                const { password } = u
                if (compareSync(credentials.password, password)) {
                    return this.response(u, 200)
                }
            }
            return this.response('These credentials do not match our records', 401)
        } catch (error) {
            this.response(error, error.status | 500)
        }
    }

    /**
     * Register an new User
     * @param {Array} credentials 
     */
    async register(credentials = []) {
        try {
            // Validate the input
            await new Validator(credentials, { email: 'required|email', password: 'required|min:8' }).validate()
            // Check if email exists
            const exists = await User.whereFirst({ 'email': credentials['email'] })
            if (exists) {
                throw new Error({
                    errors: {
                        email: ['This email has been registered']
                    }
                })

            }
            const { message, status } = await User.register(credentials)
            if (status === 200) {
                return this.login(message)
            }
            return this.response(message, status)
        } catch (error) {
            return this.response(error, error.status | 422)
        }
    }
}

module.exports = new AuthController()
