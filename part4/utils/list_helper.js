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

module.exports = {
  dummy, totalLikes, favoriteBlog
}