const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const { initialUser } = require('../utils/list_helper')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  console.log('Before each: data cleared...')

  const userObj = initialUser().map((user) => new User(user))
  const promiseArr = userObj.map((user) => user.save())
  await Promise.all(promiseArr)

  console.log('Before each completed..')
})

describe('Users test case', () => {
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 8000)

  test('create new valid user', async () => {
    const newUser = {
      username: 'veronica.roth',
      name: 'Veronica Roth',
      password: 'veronica123',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const users = await api.get('/api/users')
    const name = users.body.map((user) => user.name)

    expect(users.body).toHaveLength(initialUser().length + 1)
    expect(name).toContain(`${newUser.name}`)
  })

  test('create invalid user with missing fields', async () => {
    const newUser = {
      username: 'veronica.roth',
      name: 'Veronica Roth',
    }

    const res = await api.post('/api/users').send(newUser).expect(400)
    expect(res.body.error).toContain('Password cannot be empty and length must be at least 3 characters')
  })

  test('create invalid user with invalid fields', async () => {
    const newUser = {
      username: 'veronica.roth',
      name: 'Veronica Roth',
      password: 'P@',
    }

    await api.post('/api/users').send(newUser).expect(400)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
