const Validator = require('mevn-validator')
const User = require('../models/User')
const Controller = require('./controller')

class AuthController extends Controller {
    /**
     * Login a user with ID
     * @param {number} id 
     */
    async login(id = 0) {
        const u = await User.whereFirst({ id })
        if (u) {
            // TODO Implement the login fuctionality
        }
        return this.response('The specified user was not found', 401)
    }

    /**
     * Attempt to authenticate a user using provided credentials
     * 
     * @param {Object} credentials 
     */
    async attempt(credentials = []) {
        await new Validator(credentials, { email: 'required|email', password: 'string' }).validate()
        const u = await User.whereFirst(credentials)
        if (u) {
            // Logged in
            return this.response(u, 200)
        }
        return this.response('These credentials do not match our records', 401)
    }

    /**
     * End a users session
     */
    logout() {
        // TODO implement logout
    }

    /**
     * Register an new User
     * @param {Array} credentials 
     */
    async register(credentials = []) {
        try {
            // Validate the input
            await new Validator(credentials, { email: 'required|email', password: 'required|min:8' }).validate()
        } catch (error) {
            return this.response(error, 422)
        }
        try {
            // Check if email exists
            const exists = await User.whereFirst({ 'email': credentials['email'] })
            if (exists) {
                return this.response({
                    errors: {
                        email: ['This email has been registered']
                    }
                }, 422)
            }
            const { message, status } = await User.create(credentials)
            // TODO Login this user
            return this.response(message, status)
        } catch (error) {
            return this.response(error, 500)
        }
    }
}

module.exports = new AuthController()
