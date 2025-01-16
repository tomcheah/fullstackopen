const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)


describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'bedbean',
      name: 'bed bean',
      password: 'kirby',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with a repeated username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'bedbean',
      name: 'bed bean',
      password: 'kirby',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersCheck = await helper.usersInDb()
    expect(usersCheck).toHaveLength(usersAtStart.length + 1)
  })

  test('creation fails with invalid username or password', async () => {
    const usersAtStart = await helper.usersInDb()

    const noPassword = {
      username: 'noPassword',
      name: 'no password',
    }

    const noUsername = {
      name: 'noUsername',
      password: 'userasdf',
    }

    const invalidUsername = {
      username: 'b',
      name: 'invalid username',
      password: 'kirby',
    }

    const invalidPassword = {
      username: 'invalidPassword',
      name: 'invalid password',
      password: 'a',
    }

    await api
      .post('/api/users')
      .send(noPassword)
      .expect(400)

    await api
      .post('/api/users')
      .send(noUsername)
      .expect(400)

    await api
      .post('/api/users')
      .send(invalidPassword)
      .expect(400)

    await api
      .post('/api/users')
      .send(invalidUsername)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})