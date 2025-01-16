const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}
  
const favoriteBlog = (blogs) => {
    const maxLikes = Math.max(...blogs.map(blog => blog.likes))
    const mostLikedBlogs = blogs.find(blog => blog.likes === maxLikes)
    if (mostLikedBlogs === undefined) {
        return null
    } 
    return mostLikedBlogs
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const authors = lodash.groupBy(blogs, 'author')
    const authorWithMostBlogs = lodash.maxBy(Object.keys(authors), author => authors[author].length)
    return {
        author: authorWithMostBlogs,
        blogs: authors[authorWithMostBlogs].length
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const authors = lodash.groupBy(blogs, 'author')
    const authorWithMostLikes = lodash.maxBy(Object.keys(authors), author => totalLikes(authors[author]))
    return {
        author: authorWithMostLikes,
        likes: totalLikes(authors[authorWithMostLikes])
    }
}

  module.exports = {
    dummy,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    totalLikes
  }