const { DB } = require('mevn-orm')
class Controller {
  constructor() {
    this._DB = DB
  }
}

module.exports = Controller
