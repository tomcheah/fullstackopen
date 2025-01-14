const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
    const blogs = await Blog.find({})
    return response.status(201).json(blogs)
})
  
blogsRouter.post('/', (request, response, next) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: 0,
    })

    blog
        .save()
        .then(result => {
        response.status(201).json(result)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter