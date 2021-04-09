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
    await noteObject.save()
    console.log('saved')
  })
  console.log('done')
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

afterAll(() => {
  mongoose.connection.close()
})