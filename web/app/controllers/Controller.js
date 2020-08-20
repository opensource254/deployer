class Controller {
    /**
    * Return a response Object
    * @param {any} message 
    * @param {Number} status 
    */
    response(message = '', status = 200) {
        return { status, message }
    }
}

module.exports = Controller