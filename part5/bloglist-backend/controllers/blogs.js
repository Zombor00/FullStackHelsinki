const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response)  => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {
  try{
    const body = request.body

    if(request.user === undefined){
      return response.status(401).end()
    }

    if(body.title === undefined && body.url === undefined){
      response.status(400).end()
      return
    }

    const tmpBlog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user:  request.user._id
    }
    const blog = new Blog(tmpBlog)

    const savedBlog = await blog.save()
    const newBlog = await Blog.findById(savedBlog._id).populate('user')
    if(request.user._id !== undefined){
      request.user.blogs = request.user.blogs.concat(savedBlog._id)
      await request.user.save()
    }

    return response.status(201).json(newBlog)
  }catch(error){
    next(error)
  }

})

blogRouter.delete('/:id', async (request, response, next) => {
  try{
    const blog = await Blog.findById(request.params.id)
    if(blog === undefined){
      return response.status(400).json({ error: 'No such blog' })
    }
    if(request.user._id !== undefined && request.user._id.toString() === blog.user._id.toString()){
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
    likes: body.likes,
    user: body.user
  }

  const res = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user')
  response.json(res.toJSON())
})

module.exports = blogRouter