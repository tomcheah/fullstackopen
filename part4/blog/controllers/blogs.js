const blogsRouter = require('express').Router()
const { request, response } = require('../app')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.status(200).json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const likes = request.body.likes ?? 0

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: likes,
    })

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const newBlog = request.body
    const id = request.params.id
    const likes = newBlog.likes ?? 0
    const blog = {
        title: newBlog.title,
        author: newBlog.author,
        likes: likes,
        url: newBlog.url
    }
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true , runValidators: true})

    response.status(204).json(updatedBlog)
})

module.exports = blogsRouter