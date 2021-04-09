// eslint-disable-next-line no-unused-vars
const dummy = (blog) => {
  return 1
}

const totalLikes = (blog) => {
  let total = 0
  blog
    .forEach(element => {
      total += element.likes
    })
  return total
}

module.exports = {
  dummy, totalLikes
}