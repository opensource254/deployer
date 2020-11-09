/* eslint no-undef: "off" */
const assert = require('assert')
const { expect } = require('chai')
const chai = require('chai')
const chaiHttp = require('chai-http')
const web = require('../app')
chai.use(chaiHttp)
const http = chai
    .request
    .agent(web)
    .keepOpen()

/**
 * --------------------------------------------------------
 * All the Web API tests are here
 * 
 */
describe('Web API test', () => {
    /**
     * Ping the API to ensure it is working
     */
    it('Should respond with a 200 status', (done) => {
        http.get('/api', (err) => {
            if (err) {
                return done(err)
            }
        }).then((res) => {
            expect(res.status).equals(200)
            return done()
        }).catch((err) => done(err))
    })

    /**
     * Should set the csrf cookie header
     */
    it('Should set the csrf cookie header', (done) => {
        http.get('/api/csrf-cookie')
            .then((res) => {
                expect(res.status).equals(204)
                expect(res).to.have.cookie('XSRF-TOKEN')
                done()
            })
            .catch((error) => {
                done(error)
            })
    })

    /**
     * Log
     */

    /**
     * Test the validation of login credentials
     * 
     */
    it('Login should return a 422 when no credentials are given', (done) => {
        http
            .post('/api/login')
            .then((res) => {
                expect(res.status).equals(422)
                return done()
            }).catch((err) => {
                done(err)
            })
    })


    /**
 * Test the validation of user registration
 * 
 */
    it('Register should return a 422 status when no credentials are present', (done) => {
        http.post('/api/register').then((res) => {
            expect(res.status).equals(422)
            return done()
        }).catch((err) => {
            done(err)
        })
    })

    /**
 * Test the registration functionality
 * 
 */
    it('Should register a new user', (done) => {
        http.post('/api/register')
            .send(
                {
                    email: 'test@mail.com',
                    password: 'sixdigitpassword'
                }
            ).then((res) => {
                expect(res.status).equals(200)
                return done()
            })
            .catch((err) => {
                done(err)
            })
    })

    /**
 * Logout a user for the next test
 * 
 */
    it('Should logout a user', (done) => {
        http.post('/api/logout')
            .then((res) => {
                expect(res.status).equals(200)
                done()
            })
            .catch((err) => {
                done(err)
            })
    })

    /**
 * Test the registration with existing email
 * 
 */
    it('Should return 422 on existing email', (done) => {
        http.post('/api/register')
            .send(
                {
                    email: 'test@mail.com',
                    password: 'sixdigitpassword'
                }
            ).then((res) => {
                expect(res.status).equals(422)
                return done()
            })
            .catch((err) => {
                done(err)
            })
    })

    /**
 * Should login a user for the net tests
 */
    it('Should login a user', (done) => {
        http.post('/api/login')
            .send(
                {
                    email: 'test@mail.com',
                    password: 'sixdigitpassword'
                }
            ).then((res) => {
                expect(res.status).equals(200)
                expect(res).to.have.cookie('deployer_session')
                done()
            })
            .catch((e) => {
                done(e)
            })
    })
})
/**
 * This is used to test the ability to CRUD configs
 * 
 */
describe('Config API test', () => {
    it('Should return all configs', (done) => {
        http.get('/api/config')
            .then((res) => {
                assert.ok(res)
                done()
            }).catch((err) => {
                done(err)
            })
    })

    /**
     * Test the creation of a config
     * 
     * Should return a 201 on a complete creation
     */
    it('Should Create a config', (done) => {
        http.post('/api/config')
            .send(
                {
                    name: 'TestConfig', description: 'Awesome test config', command: 'ls -la'
                }
            )
            .then((res) => {
                expect(res.status).equals(201)
                done()
            }).catch((err) => {
                done(err)
            })
    })

    /**
     * Test the reading of a config
     * 
     */
    it('Should get a config by ID', (done) => {
        http.get('/api/config/1')
            .then((res) => {
                expect(res.status).equals(200)
                done()
            }).catch((err) => {
                done(err)
            })
    })

    /**
     * Test the updating of a config
     * 
     */
    it('Should update a config', (done) => {
        http.put('/api/config/1')
            .send(
                {
                    name: 'UpdatedTestConfig', description: 'Awesome test config', command: 'ls -la'
                }
            )
            .then((res) => {
                expect(res.status).equals(200)
                done()
            }).catch((err) => {
                done(err)
            })
    })

    /**
     * Test the deletion of a config
     * 
     */
    it('Should delete a config', (done) => {
        http.delete('/api/config/1')
            .then((res) => {
                expect(res.status).equals(200)
                done()
            }).catch((err) => {
                done(err)
            })
    })
})
