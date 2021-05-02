const { compareSync } = require('bcrypt')
const User = require('../models/user')
const Controller = require('./controller')

class AuthController extends Controller {
  /**
   * Attempt to authenticate a user with email and pass
   * @param {*} request
   */
  async attempt(req, res, next) {
    const failedResponse = {
      errors: { email: ['These credentials do not match our records'] },
    }
    const { email, password } = req.body
    try {
      const user = await User.where({ email }).first()
      if (!user) {
        res.status(422).json(failedResponse) // The mail does not match
      }
      const passwordMatches = compareSync(password, user.password)
      if (passwordMatches) {
        delete user.password
        req.session.userId = user.id
        return res.json(user) // Login successful
      }
      res.status(422).json(failedResponse) // login failed
    } catch (error) {
      res.status(500).json(error) // A server error occoured
    }
  }

  /**
   * Get the current authenticated user
   * @param {*} req
   * @param {*} res
   */
  async getUser(req, res) {
    const failedResponse = {
      message: 'You are not authenticated',
    }
    const { userId } = req.session
    if (!userId) {
      res.status(401).json(failedResponse)
    }
    try {
      const user = await User.find(userId)
      if (!user) {
        res.status(401).json(failedResponse)
      }
      delete user.password
      res.json({ user })
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

module.exports = new AuthController()
