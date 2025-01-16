const { application } = require('express')
const Blog = require('../models/blog')
const app = require('../app')
const supertest = require('supertest')

const api = supertest(app)

const initialBlogs = [
    {
        title: 'Unit Tests are Good',
        author: 'Unit Test',
        url: 'url1',
        likes: 15,
    },
    {
        title: 'Eat Your Fruits and Veggies',
        author: 'Fruit',
        url: 'fruiturl',
        likes: 200,
    },
    {
        title: 'Eep Well',
        author: 'Eep',
        url: 'eepurl',
        likes: 50,
    },
    {
        title: 'Meow',
        author: 'Cat',
        url: 'caturl',
        likes: 200,
    },
    {
        title: 'Gym Time',
        author: 'Jim',
        url: 'gymurl',
        likes: 25,
    },
    {
        title: 'Gym Time 2',
        author: 'Jim',
        url: 'gymurl',
        likes: 100,
    }, 
    {
        title: 'Gym Time 3',
        author: 'Jim',
        url: 'gymurl',
        likes: 50,
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'temp', author: 'temp', url: 'temp', likes: 0 })
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const authHeader = async () => {
    const user = {
        username: 'nodetest',
        password: 'nodetest',
        id: "1234"
    }

    const loginResponse = await api
        .post('/api/login')
        .send(user)

    return `Bearer ${loginResponse.body.token}`
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, authHeader
}