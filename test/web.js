/* eslint no-undef: "off" */
const assert = require('assert')
const { expect } = require('chai')
const chai = require('chai')
const chaiHttp = require('chai-http')
const web = require('../app')
chai.use(chaiHttp)
const http = chai.request(web).keepOpen()

describe('Web API test', () => {
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

    it('Login route validation', (done) => {
        http.post('/api/login')
            .then((res) => {
                expect(res.status).equals(422)
                return done()
            }).catch((err) => {
                done(err)
            })
    })

    it('User registration validation', (done) => {
        http.post('/api/register').then((res) => {
            expect(res.status).equals(422)
            return done()
        }).catch((err) => {
            done(err)
        })
    })

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
})

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

    it('Should Create a config', (done) => {
        http.post('/api/config')
            .then((res) => {
                assert.ok(res)
                done()
            }).catch((err) => {
                done(err)
            })
    })

    it('Should get a config by ID', (done) => {
        http.get('/api/config/1')
            .then((res) => {
                assert.ok(res)
                done()
            }).catch((err) => {
                done(err)
            })
    })

    it('Should update a config', (done) => {
        http.put('/api/config/1')
            .then((res) => {
                assert.ok(res)
                done()
            }).catch((err) => {
                done(err)
            })
    })

    it('Should delete a config', (done) => {
        http.delete('/api/config/1')
            .then((res) => {
                assert.ok(res)
                done()
            }).catch((err) => {
                done(err)
            })
    })
})
