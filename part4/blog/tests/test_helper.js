const Blog = require("../models/blog")
const User = require('../models/user')
const app = require('../app')
const supertest = require('supertest')

const api = supertest(app)

const initialBlogs = [
    {
        title: 'Bedbean Explores Rito',
        author: 'Bedbean',
        url: 'test.url',
        likes: 2,
    },
    {
        title: 'Jett Takes on Pearl',
        author: 'Jett',
        url: 'test.url',
        likes: 300,
    },
    {
        title: 'Eating Food',
        author: 'Bread',
        url: 'test.url',
        likes: 1,
    }
]

const nonExistingId = async () => {
    const blog = new Note({ title: 'willremovethissoon', author: 'test', url: "url", likes: 3 })
    await blog.save()
    await blog.remove()
  
    return blog._id.toString()
  }

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }
  
const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

const authHeader = async () => {
    const user = {
        username: 'jest',
        password: 'jest',
        id: "24",
    }

    const loginResponse = await api
        .post('/api/login')
        .send(user)
        
    return `bearer ${loginResponse.body.token}`
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb, authHeader
}