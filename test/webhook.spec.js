const faker = require('faker')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../backend/app')
const expect = chai.expect

chai.use(chaiHttp)

const app = chai.request.agent(server).keepOpen()

describe('Webhook ping', function () {
  it('should be able to ping', async function () {
    const res = await app.get('/webhooks/ping')
    expect(res).to.have.status(200)
  })

  it('Should handle to Github Webhook', async function () {
    const webhook = {
      ref: 'refs/heads/master',
      before: '0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c',
      after: '1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c1c',
      repository: {
        id: faker.datatype.number(),
        name: "events254",
        full_name: "opensource254/events254",
        private: false,
        owner: {
          name: "opensource254",
          email: "info@opensource254.co.ke",
          login: "opensource254",
          id: faker.datatype.number(),
          type: "Organization",
        },
      }
    }

    const res = await app.post('/webhooks/github').send(webhook)
    expect(res).to.have.status(201)
  })
})
