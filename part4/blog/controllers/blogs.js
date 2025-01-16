const blogsRouter = require('express').Router()
const { request, response } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.status(200).json(blogs)
})
  
blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const body = request.body
    const likes = request.body.likes ?? 0
    const user = request.user

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: likes,
        user: user.id,
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const user = request.user
    const blog = await Blog.findById(request.params.id)

    console.log('howdy world, we are in here')

    if ( blog.user.toString() == user.id.toString() ) {
        await blog.delete()
        response.status(204).end()
    } else {
        response.status(401).json({ error: 'blog can only be deleted by user who added it' })
    }
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