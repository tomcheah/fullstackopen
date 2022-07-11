const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user

  if (body.title === undefined || body.author === undefined) {
    response.status(400).send({error: "blog must have title and author"})
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user
  
  // await Blog.findByIdAndRemove(request.params.id)
  const blog = await Blog.findById(request.params.id)
  if ( blog === undefined || blog === null ) {
    response.status(404).send({error: `blog with id ${request.params.id} not found`})
  }

  if ( blog.user.toString() === user.id.toString() ) {
    await Blog.findByIdAndRemove(request.params.id) 
    response.status(204).end()
  } else {
    response.status(400).send({error: "invalid token"})
  }

})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const blog = {
    title: title,
    author: author,
    url: url,
    likes: likes,
  }
  
  const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})

  response.status(200).json(updatedNote)
})

module.exports = blogsRouter