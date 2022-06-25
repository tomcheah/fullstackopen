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
  
module.exports = {
    dummy, totalLikes, favoriteBlog
}