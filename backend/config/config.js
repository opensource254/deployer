const config = Object.freeze({
  /**
   * Application name.
   * @type {string}
   */
  name: process.env.APP_NAME || 'deployer',

  /**
   * Application port.
   * @type {number}
   */
  port: process.env.PORT || 3005,

  /**
   * Application environment.
   * @type {string}
   */
  env: process.env.NODE_ENV || 'development',

  /**
   * Application secret.
   * @type {string}
   */
  secret: process.env.APP_SECRET || 'secret',

  /**
   * Database connection.
   * @type {object}
   */
  database: {
    client: process.env.DB_CLIENT || 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    schema: process.env.DB_SCHEMA || 'deployer',
  },

  /**
   * Slack connection.
   * @type {object}
   */
  slack: {
    webhook: process.env.SLACK_WEBHOOK || '',
    enabled: process.env.SLACK_ENABLED || false,
  },

  /**
   * Email notification.
   * @type {object} - email configuration
   * @property {boolean} enabled - Enable email notification.
   * @property {string} host - SMTP host.
   */
  email: {
    enabled: process.env.EMAIL_ENABLED || false,
    host: process.env.EMAIL_HOST || 'localhost',
    port: process.env.EMAIL_PORT || 465,
    secure: process.env.EMAIL_SECURE || false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    from: process.env.EMAIL_FROM || 'no-reply@deployer.app',
  },
})

module.exports = config
