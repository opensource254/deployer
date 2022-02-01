const { DB } = require('mevn-orm')
class Controller {
  constructor() {
    this.DB = DB
  }
}

module.exports = Controller
