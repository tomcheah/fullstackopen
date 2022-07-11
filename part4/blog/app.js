require('dotenv').config()
require('express-async-errors')

const http = require('http')
const express = require('express')
const app = express()
const blogsRouter = require('./controllers/blog')
const usersRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const config = require('./utils/config')
const mongoose = require('mongoose')
const { application } = require('express')
const middleware = require('./utils/middleware')

app.use(middleware.tokenExtractor)
app.use(express.json())

const mongoUrl = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

mongoose
    .connect(mongoUrl)
    .then(result => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error.message)
    })

app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

module.exports = app