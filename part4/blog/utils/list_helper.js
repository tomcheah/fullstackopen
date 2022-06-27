var _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let totalLikes = 0
    blogs.forEach(blog => {
        totalLikes += blog.likes        
    });

    return totalLikes
}

const favoriteBlog = (blogs) => {
    if (blogs === undefined || blogs.length === 0) {
        return "Blogs do not exist"
    }
    return blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
}

const mostBlogs = (blogs) => {
    if (blogs === undefined || blogs.length === 0) {
        return "Blogs do not exist"
    }

    let blogCounts = blogs.reduce((acc, blog) => {
        if (!acc[blog.author]) {
            acc[blog.author] = 0
        }
        acc[blog.author] ++
        return acc
    }, {})

    maxBlogCount = Math.max(...Object.values(blogCounts))

    // Find the author with the same blog count
    const asArray = Object.entries(blogCounts)
    const filtered = asArray.filter(([author, blogCount]) => blogCount === maxBlogCount);
    authorObject = Object.fromEntries(filtered)

    authorObject = Object.entries(authorObject)[0]
    return {'author': authorObject[0], 'blogs': authorObject[1]}
}

const mostLikes = (blogs) => {
    if (blogs === undefined || blogs.length === 0) {
        return "Blogs do not exist"
    }

    // First create a map of author: [like_count, like_count]
    let grouped = _.reduce(blogs, (result, blog) => {
        (result[blog.author] || (result[blog.author] = [])).push(blog.likes);
        return result;
    }, {});

    // Then reduce author: [like_count]
    let authorLikesCount = {}
    for (const [author, likesArray] of Object.entries(grouped)) {
        authorLikesCount[author] = likesArray.reduce((prev, curr) => prev + curr, 0)
    }
    // Then get max like count
    maxLikeCount = Math.max(...Object.values(authorLikesCount))

    // Find the author with the same like count
    const asArray = Object.entries(authorLikesCount);
    const filtered = asArray.filter(([author, likeCount]) => likeCount === maxLikeCount);
    authorObject = Object.fromEntries(filtered)

    authorObject = Object.entries(authorObject)[0]
    return {'author': authorObject[0], 'likes': authorObject[1]}
}
  
module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}