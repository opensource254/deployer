class Auth {
    /**
     * Authenticate a user with given credentials
     * @param {Array} credentials 
     * @returns Boolean
     */
    attempt(credentials = {}) {

    }

    /**
     * Authenticate a user using only the ID
     * @param {Number} userId
     * @returns Boolean
     */
    login(userId = 1) {

    }

    /**
     * 
     * End a user's session
     * 
     */
    logout() {

    }
}

module.exports = new Auth()
