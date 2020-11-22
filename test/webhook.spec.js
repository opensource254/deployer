/* eslint-disable no-undef */
const { expect } = require('chai')
const chai = require('chai')
const chaiHttp = require('chai-http')
const web = require('../app')
chai.use(chaiHttp)
const http = chai.request.agent(web)

/**
 * --------------------------------------------
 * All github webhook tests are here
 * --------------------------------------------
 */
describe('Github webhook handler tests', () => {
    /**
     * Ping the API to ensure it
     */
    it('#Github webhook root should respond with a 200', (done) => {
        http.get('/github', (err) => {
            if (err) {
                return done(err)
            }
        }).then((res) => {
            expect(res.status).equals(200)
            return done()
        }).catch((err) => done(err))
    })

    /**
     * Send a webhook to github's handler
     */
    it('Should handle the incoming webhook and respond with a 201 status', (done) => {
        http.post('/github')
            .send(
                {
                    'repository': {
                        'name': 'deployer',
                        'full_name': 'opensource254/deployer',
                        'private': false,

                    }
                }
            )
            .then((res) => {
                expect(res.status).equals(201)
                done()
            }).catch((err) => {
                done(err)
            })
    })
})

/**
 * ----------------------------------------------------
 * All the bitbucket webhook tests are here
 * ----------------------------------------------------
 */
describe('Bitbucket webhook handler tests', () => {
    /**
     * Ping the API to ensure it
     */
    it('#Bitbucket webhook root should respond with a 200', (done) => {
        http.get('/bitbucket', (err) => {
            if (err) {
                return done(err)
            }
        }).then((res) => {
            expect(res.status).equals(200)
            return done()
        }).catch((err) => done(err))
    })

    // /**
    //  * Handle the bitbucket webhook
    //  */
    // it('Should handle the #Bitbucket webhook and respond with 201', (done) => {
    //     http.post('/bitbucket').send().then((res) => {
    //         expect(res.status).equals(201)
    //     }).catch((err) => {
    //         done(err)
    //     })
    // })
})

/**
 * ----------------------------------------------------
 * All gitlab webhook tests are here
 * ----------------------------------------------------
 */
describe('Gitlab webhook handler tests', () => {
    /**
     * Ping the API to ensure it
     */
    it('#Gitlab webhook root should respond with a 200', (done) => {
        http.get('/gitlab', (err) => {
            if (err) {
                return done(err)
            }
        }).then((res) => {
            expect(res.status).equals(200)
            return done()
        }).catch((err) => done(err))
    })

    // /**
    //  * Handle the bitbucket webhook
    //  */
    // it('Should handle the #Gitlab webhook and respond with 201', (done) => {
    //     http.post('/gitlab').send(
    //         {
    //             'repository': {
    //                 'name': 'TestConfig',
    //                 'url': 'git@example.com:mike/TestConfig.git',
    //                 'description': '',
    //                 'homepage': 'http://example.com/mike/TestConfig',
    //                 'git_http_url': 'http://example.com/mike/TestConfig.git',
    //                 'git_ssh_url': 'git@example.com:mike/TestConfig.git',
    //                 'visibility_level': 0
    //             },

    //         }
    //     ).then((res) => {
    //         expect(res.status).equals(201)
    //         done()
    //     }).catch((err) => {
    //         done(err)
    //     })
    // })
})

