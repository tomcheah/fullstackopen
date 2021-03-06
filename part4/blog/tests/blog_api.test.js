const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

describe('blog tests', () => { 

    beforeEach(async () => {
        // Clear the database
        await Blog.deleteMany({})

        // Set up the database with blogs
        const blogObjects = helper.initialBlogs
            .map(blog => new Blog(blog))
        const promiseArray = blogObjects.map(blog => blog.save())
        await Promise.all(promiseArray)

        // Set up a test user
        await User.deleteMany({})

        const newUser = {
            username: 'jest',
            name: 'jest',
            password: 'jest',
          }
    
          await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
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

        const authHeader = await helper.authHeader()

        const newBlog = {
            title: "Blog without likes",
            author: "Jest", 
            url: "jest",
            likes: 300,
        }

        await api
            .post('/api/blogs')
            .set('Authorization', authHeader)
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

        const authHeader = await helper.authHeader()
        await api
            .post('/api/blogs')
            .set('Authorization', authHeader)
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

        const authHeader = await helper.authHeader()

        await api
            .post('/api/blogs')
            .set('Authorization', authHeader)
            .send(newBlog)
            .expect(400)
    })


    test('succeeds with status code 204 if id is valid', async () => {
        const authHeader = await helper.authHeader()

        const newBlog = {
            author: "jest",
            url: "jest",
            title: "test deletion story",
            "author": "jest",
        }

        const postResponse = await api
            .post('/api/blogs')
            .set('Authorization', authHeader)
            .send(newBlog)

        await api
            .delete(`/api/blogs/${postResponse.body.id}`)
            .set('Authorization', authHeader)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        const titles = blogsAtEnd.map(r => r.title)
        
        expect(titles).not.toContain(newBlog.title)
    })

    test('update put request works', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const newBlog = {
            author: "jest",
            title: "jest test",
            url: "jest",
            likes: 2034,
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(newBlog)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length
        )

        const titles = blogsAtEnd.map(r => r.title)
        
        expect(titles).toContain(newBlog.title)

    })

    test('adding blog fails without token', async() => {
        const newBlog = {
            author: "jest",
            title: "jest test",
            url: "jest",
            likes: 2034,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
    })


    afterAll(() => {
    mongoose.connection.close()
    })

})