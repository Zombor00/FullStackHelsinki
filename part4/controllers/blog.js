const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response)  => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {
  try{
    const body = request.body

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
    if(request.user._id !== undefined){
      request.user.blogs = request.user.blogs.concat(savedBlog._id)
      await request.user.save()
    }

    return response.status(201).json(savedBlog)
  }catch(error){
    next(error)
  }

})

blogRouter.delete('/:id', async (request, response, next) => {
  try{
    const blog = await Blog.findById(request.params.id)
    if( request.user._id.toString() === blog.user._id.toString()){
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