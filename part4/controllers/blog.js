const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response)  => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  if(body.title === undefined && body.url === undefined){
    response.status(400).end()
    return
  }

  if(body.userId === 'undefined'){
    const user = await User.findOne({})
    body.userId = user._id
  }

  const tmpBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.userId
  }

  const blog = new Blog(tmpBlog)

  const savedBlog = await blog.save()
  if(body.userId !== undefined){
    const user = await User.findById(blog.user)
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
  }

  return response.status(201).json(savedBlog)
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