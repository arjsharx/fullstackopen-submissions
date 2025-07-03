const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = blogs => {
    if(blogs.length === 0) {
        return 0
    } else { return blogs.reduce((sum, blog) => sum+blog.likes, 0)
    }
}

const favoriteBlog = blogs => {
    if(blogs.length === 0){
        return "no blogs"
    }
    const maxLikes = Math.max(...blogs.map(blog => blog.likes))
    const favorite = blogs.find(blog => blog.likes === maxLikes)
    return {
        title: favorite.title,
    }
}

const mostBlogs = blogs => {
    if(blogs.length === 0 ){
        return {}
    } else {
        const blogCount = _.countBy(blogs, 'author')
        const author  = _.maxBy(_.keys(blogCount),author=>blogCount[author])
    
    return {
        author: author,
        blogs: blogCount[author]
    }
}
}
const mostLikes = blogs => {
    if(blogs.length === 0){
        return {}
    }
    else {
        const group  = _.groupBy(blogs, 'author')
        const likeGroup = _.map(group, (posts, author) => ({
            'author': author,
            'likes' : _.sumBy(posts,'likes')

        })
    )
    const mostLiked = _.maxBy(likeGroup, 'likes')
    return mostLiked
    }
}



module.exports = {dummy, totalLikes, favoriteBlog,mostBlogs,mostLikes}