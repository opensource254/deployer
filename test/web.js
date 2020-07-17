const assert = require('assert')
const chai = require('chai')
const chaiHttp = require('chai-http')
const web = require('../app')

const http = chai.use(chaiHttp)

describe('Web API test', function () {
    it('Should respond with a 200 status', function (done) {
        http.request(web).get('/api', (function (err, res) {
            if (err) {
                return done(err)
            }

        })).then(res => {
            assert.equal(res.status, 200)
            return done()
        }).catch(err => {
            return done(err)
        })
    })

    it('Should POST /api/login', function (done) {
        http.request(web).post('/api/login', {}).then(res => {
            assert.equal(422, res.status)
            return done()
        }).catch(err => {
            done(err)
        })
    })
})
