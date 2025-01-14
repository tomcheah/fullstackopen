const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('cleared all blogs from the database')

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('get', async () => {
    const response = await api.get('/api/blogs')
        .expect(201)
        .expect('Content-Type', /application\/json/)

    assert(response.body.length === helper.initialBlogs.length)
})

after(async () => {
    await mongoose.connection.close()
})