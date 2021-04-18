const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response)  => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {
  try{
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if(body.title === undefined && body.url === undefined){
      response.status(400).end()
      return
    }

    const tmpBlog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id
    }

    const blog = new Blog(tmpBlog)

    const savedBlog = await blog.save()
    if(body.userId !== undefined){
      const user = await User.findById(blog.user)
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
    }

    return response.status(201).json(savedBlog)
  }catch(error){
    next(error)
  }

})

blogRouter.delete('/:id', async (request, response, next) => {
  try{
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = await Blog.findById(request.params.id)
    if(decodedToken.id.toString() === blog.user._id.toString()){
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    }else{
      return response.status(401).json({ error: 'You can not delete other\'s blogs' })
    }
  }catch(error){
    next(error)
  }
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