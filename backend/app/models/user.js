const { randomBytes } = require('crypto')
const { Model, DB } = require('mevn-orm')
const { hashSync } = require('bcrypt')

class User extends Model {
  /**
   * Register a new user
   * @param {*} details
   */
  static register(details = []) {
    const { password } = details
    const hash = hashSync(password, 10)
    details.password = hash
    return this.create(details)
  }

  /**
   * Generate a password reset token
   * @returns {Promise<String>} token
   */
  async generatePasswordResetToken() {
    const token = randomBytes(64).toString('hex')
    this.passwordResetToken = token
    this.passwordResetExpires = Date.now() + 3600000

    await DB('password_resets').where({ email: this.email }).delete()
    await DB('password_resets').insert({
      email: this.email,
      token,
    })

    return token
  }
}

module.exports = User
