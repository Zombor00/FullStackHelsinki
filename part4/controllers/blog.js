const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  if(blog.title === undefined && blog.url === undefined){
    response.status(400).end()
    return
  }

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const res = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(201).json(res.body)
})

module.exports = blogRouter