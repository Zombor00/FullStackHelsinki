const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('../utils/list_helper')

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared')

  helper.initialBlogs.forEach(async (blog) => {
    let noteObject = new Blog(blog)
    await noteObject.save().then(console.log('saved'))
  })
})

test('blogs are returned as json and return the correct number of blogs', async () => {
  const response = await api
    .get('/api/blog')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blog have the attribute id', async () => {
  const response = await api
    .get('/api/blog')

  expect(response.body[0].id).toBeDefined()
})

test('post to /api/blogs working correctly', async () => {
  const newBlog = {
    title: 'Blog 3',
    author: 'Author 3',
    url: 'http://blogs.com/3',
    likes: 10
  }

  await api
    .post('/api/blog')
    .send(newBlog)
    .expect(201)

  const response = await api.get('/api/blog')

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  const newBlogPost = response.body.pop()
  delete newBlogPost.id
  delete newBlogPost.__v
  expect(newBlogPost).toEqual(newBlog)
})

test('if likes misses in the post is assigned value 0 automatically', async () => {
  const newBlog = {
    title: 'Blog 3',
    author: 'Author 3',
    url: 'http://blogs.com/3'
  }

  await api
    .post('/api/blog')
    .send(newBlog)
    .expect(201)

  const response = await api.get('/api/blog')

  const lastBlog = response.body.pop()
  expect(lastBlog.likes).toBe(0)
})

test('if titles and url are missing backend sends back 400 Bad Request', async () => {
  const newBlog = {
    author: 'Author 3',
    likes: 10
  }

  await api
    .post('/api/blog')
    .send(newBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})

