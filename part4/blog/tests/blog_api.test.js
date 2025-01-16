const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('cleared all blogs from the database')

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)

    // Set up a test user
    await User.deleteMany({})

    const newUser = {
        username: 'nodetest',
        name: 'nodetest',
        password: 'nodetest',
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

})

describe('getting blogs', () => {
    test('get', async () => {
        const response = await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert(response.body.length === helper.initialBlogs.length)
    })
})

test('toJSON', async () => {
    const blogs = await helper.blogsInDb()
    blogs.forEach((blog) => 
        assert.strictEqual(typeof blog.id, 'string', 'blog.id should be a string')
    )

})

describe('addition of new blogs', () => {
    test('a valid blog can be added', async () => {
        const newBlogTitle = 'New Blog Post'
        const newBlog = {
            title: newBlogTitle,
            author: 'Author',
            url: 'authorurl',
        }
        const authHeader = await helper.authHeader()

        await api
            .post('/api/blogs')
            .set('Authorization', authHeader)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    
        const titles = blogsAtEnd.map(b => b.title)
        assert(titles.includes(newBlogTitle))
    })
    
    test('blog without likes defaults to 0 likes', async () => {
        const newBlogTitle = 'Default Blog Post'
        const author = 'Author'
        const url = 'url'
        const newBlog = {
            title: newBlogTitle,
            author: author,
            url: url,
        }
        const authHeader = await helper.authHeader()

        await api
            .post('/api/blogs')
            .set('Authorization', authHeader)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const postedBlog = await Blog.findOne({ title: newBlogTitle, author: author, url: url })
        assert.strictEqual(postedBlog.likes, 0)
    })
    
    test('blog with likes has likes property set properly', async () => {
        const newBlogTitle = 'Default Blog Post'
        const author = 'Author'
        const url = 'url'
        const likes = 500000
        const newBlog = {
            title: newBlogTitle,
            author: author,
            url: url,
            likes: likes,
        }
        const authHeader = await helper.authHeader()

        await api
            .post('/api/blogs')
            .set('Authorization', authHeader)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const postedBlog = await Blog.findOne({ title: newBlogTitle, author: author, url: url })
        assert.strictEqual(postedBlog.likes, likes)
    })
    
    test('blog with title missing fails with 400 bad request', async () => {
        const author = 'Author'
        const url = 'url'
        const newBlog = {
            author: author,
            url: url,
        }
        const authHeader = await helper.authHeader()

        await api
            .post('/api/blogs')
            .set('Authorization', authHeader)
            .send(newBlog)
            .expect(400)
    })
    
    test('blog with url missing fails with 400 bad request', async () => {
        const title = 'title'
        const author = 'author'
        const newBlog = {
            title: title,
            author: author,
        }
        const authHeader = await helper.authHeader()

        await api
            .post('/api/blogs')
            .set('Authorization', authHeader)
            .send(newBlog)
            .expect(400)
    })
})

describe('deletion of blogs', () => {
    test('a blog can be deleted', async () => {
        const newBlogTitle = 'Blog Post to Delete'
        const newBlog = {
            title: newBlogTitle,
            author: 'Author',
            url: 'authorurl',
        }
        const authHeader = await helper.authHeader()

        postResponse = await api
            .post('/api/blogs')
            .set('Authorization', authHeader)
            .send(newBlog)

        await api
            .delete(`/api/blogs/${postResponse.body.id}`)
            .set('Authorization', authHeader)
            .expect(204)
        
        const blogsAtEnd = await helper.blogsInDb()

        const titles = blogsAtEnd.map(b => b.title)
        assert(!titles.includes(newBlogTitle))
    })
})

describe('updating of blog', () => {
    test('a blog title can be updated', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const newTitle = 'new title'
        const updatedBlog = {  ...blogToUpdate, title: newTitle}

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedBlog)
            .expect(204)
        
        const foundBlog = await Blog.findById(blogToUpdate.id)
        assert.strictEqual(foundBlog.title, updatedBlog.title)
        assert.strictEqual(foundBlog.author, updatedBlog.author)
        assert.strictEqual(foundBlog.likes, updatedBlog.likes)
        assert.strictEqual(foundBlog.url, updatedBlog.url)
    })
})


after(async () => {
    await mongoose.connection.close()
})