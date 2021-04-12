const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Blog 1',
    author: 'Author 1',
    url: 'http://blogs.com/1',
    likes: 3
  },
  {
    title: 'Blog 2',
    author: 'Author 2',
    url: 'http://blogs.com/2',
    likes: 22
  },
]

// eslint-disable-next-line no-unused-vars
const dummy = (blog) => {
  return 1
}

const totalLikes = (blogs) => {
  let total = 0
  blogs
    .forEach(element => {
      total += element.likes
    })
  return total
}

const favoriteBlog = (blogs) => {
  let blog = null
  if(blogs.length !== 0){
    blog = blogs.reduce(function(x, y) {
      return(x.likes > y.likes ? x : y )
    })
  }
  return(blog)
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  dummy, totalLikes, favoriteBlog, initialBlogs, usersInDb
}