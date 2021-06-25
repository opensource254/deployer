const { compareSync } = require('bcrypt')
const User = require('../models/user')
const Controller = require('./controller')

class AuthController extends Controller {
  /**
   * Attempt to authenticate a user with email and pass
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async attempt(req, res, next) {
    const failedResponse = {
      errors: { email: ['These credentials do not match our records'] },
    }
    const { email, password } = req.body
    try {
      const user = await User.where({ email }).first()
      if (!user) {
        return res.status(422).json(failedResponse) // The mail does not match
      }
      const passwordMatches = compareSync(password, user.password)
      if (passwordMatches) {
        req.session.userId = user.id
        req.session.uu = 'hhhh'
        delete user.password
        return res.json(user) // Login successful
      }
      return res.status(422).json(failedResponse) // login failed
    } catch (error) {
      return res.status(500).json(error) // A server error occoured
    }
  }

  /**
   * Get the current authenticated user
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getUser(req, res, next) {
    const failedResponse = {
      message: 'You are not authenticated',
    }

    const { userId } = req.session
    try {
      const user = await User.find(userId)
      if (!user) {
        return res.status(401).json(failedResponse)
      }
      delete user.password
      return res.json({ user })
    } catch (error) {
      next(error)
    }
  }

  /**
   * End a user's session
   * @param {*} req
   * @param {*} res
   */
  logout(req, res) {
    const userId = req.session
    if (!userId) {
      return res.json({
        message: 'You are not authenticated',
      })
    }
    req.session = null
    return res.json({
      message: "You've been logged out",
    })
  }
}

module.exports = new AuthController()
