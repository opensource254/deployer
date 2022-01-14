/**
 * This file contains tests for the authentication module.
 * @author Stanley Masinde
 */
const faker = require('faker')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../backend/app')
const expect = chai.expect
const User = require('../backend/app/models/user')

chai.use(chaiHttp)

const app = chai.request.agent(server).keepOpen()

describe('Authentication', function () {
  it('should be able to login', async function () {
    const email = faker.internet.email()
    const password = faker.internet.password()
    const name = faker.name.findName()
    const user = await User.register({
      name,
      email,
      password,
    })
    const res = await app.post('/auth/login').send({
      email,
      password,
    })
    expect(res).to.have.status(200)
    expect(res.body.email).to.equal(email)

    await User.destroy(user.id)
  })

  it('should not be able to login with invalid credentials', async function () {
    const email = faker.internet.email()
    const password = faker.internet.password()
    const user = await User.register({
      email,
      password,
    })
    const res = await app.post('/auth/login').send({
      email,
      password: 'wrong password',
    })

    expect(res).to.have.status(422)
    expect(res.body.errors.email[0]).to.equal(
      'These credentials do not match our records.'
    )

    await User.destroy(user.id)
  })
  it('should be able to logout', async function () {
    const email = faker.internet.email()
    const password = faker.internet.password()
    const name = faker.name.findName()
    const user = await User.register({
      name,
      email,
      password,
    })
    const res = await app.post('/auth/login').send({
      email,
      password,
    })
    expect(res).to.have.status(200)
    const res2 = await app.post('/auth/logout')
    expect(res2).to.have.status(200)
    expect(res2.body.message).to.equal('You are now logged out.')

    await User.destroy(user.id)
  })

  it('should be able to get the current user', async function () {
    const email = faker.internet.email()
    const password = faker.internet.password()
    const name = faker.name.findName()
    const user = await User.register({
      name,
      email,
      password,
    })
    const res = await app.post('/auth/login').send({
      email,
      password,
    })
    expect(res).to.have.status(200)
    const res2 = await app.get('/auth/user')

    expect(res2).to.have.status(200)
    expect(res2.body.user.email).to.equal(email)

    await User.destroy(user.id)
  })

  it('should not be able to get the current user if not logged in', async function () {
    await app.post('/auth/logout')
    const res = await app.get('/auth/user')
    expect(res).to.have.status(401)
    expect(res.body.message).to.equal('You are not authenticated.')
  })

  // it('should be able to reset password', async function () {
  //   const email = faker.internet.email()
  //   const password = faker.internet.password()
  //   const name = faker.name.findName()
  //   const user = await User.register({
  //     name,
  //     email,
  //     password,
  //   })
  //   const res = await app.post('/auth/login').send({
  //     email,
  //     password,
  //   })
  //   expect(res).to.have.status(200)
  //   const res2 = await app.post('/password/reset').send({
  //     email,
  //   })
  //   console.log(res2.body)
  //   expect(res2).to.have.status(200)
  //   expect(res2.body.message).to.equal('Password reset email sent.')

  //   await User.destroy(user.id)
  // })

  // it('should be able to change password', async function () {
  //   const email = faker.internet.email()
  //   const password = faker.internet.password()
  //   const name = faker.name.findName()
  //   const user = await User.register({
  //     name,
  //     email,
  //     password,
  //   })
  //   const res = await app.post('/auth/login').send({
  //     email,
  //     password,
  //   })
  //   res.should.have.status(200)
  //   const res2 = await app.post('/auth/change').send({
  //     email,
  //     password,
  //     password_confirmation: password,
  //   })
  //   res2.should.have.status(200)
  //   expect(res2.body.message).to.equal('Password changed.')

  //   await User.destroy(user.id)
  // })
})