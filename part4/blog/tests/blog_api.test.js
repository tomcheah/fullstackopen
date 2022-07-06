const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    // Clear the database
    await Blog.deleteMany({})

    // Set up the database with blogs
    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier property is named id', async () => {
    response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: "Test blog",
        author: "Jest", 
        url: "test.org",
        likes: 252,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length+1)
})

test('a new blog missing likes property should default to 0 likes', async () => {
    const newBlog = {
        title: "Blog without likes",
        author: "Jest", 
        url: "jest",
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    expect(blogsAtEnd[helper.initialBlogs.length].likes).toEqual(0)
})

test('a blog missing title and url should not be created', async () => {
    const newBlog = {
        author: "jest",
        url: "jest",
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})


test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)
    
    expect(titles).not.toContain(blogToDelete.title)
})



afterAll(() => {
  mongoose.connection.close()
})