const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('../utils/list_helper')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const Blog = require('../models/blog')

let token
let userObj

beforeAll(async () => {
  await User.deleteMany({})

  userObj = await api
    .post('/api/users')
    .send(helper.initialUser)

  userObj = userObj.body

  const response = await api
    .post('/api/login')
    .send(helper.initialUser)

  token = response.body.token
})

beforeEach(async () => {
  await Blog.deleteMany({})

  const blog = helper.initialBlogs[0]
  blog.user = userObj.id
  let noteObject = new Blog(blog)
  await noteObject.save()

  const blog2 = helper.initialBlogs[1]
  blog2.user = userObj.id
  let noteObject2 = new Blog(blog2)
  await noteObject2.save()

  //helper.initialBlogs.forEach(async (blog) => {
  //blog.user = userObj.id
  //const response = await api
  //  .post('/api/blogs')
  //  .set('Authorization', 'bearer ' + token)
  //  .send(blog)
  //let noteObject = new Blog(blog)
  //await noteObject.save()
  //})

})

test('blogs are returned as json and return the correct number of blogs', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blog have the attribute id', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)

  expect(response.body[0].id).toBeDefined()
})

test('post to /api/blogs working correctly', async () => {
  const newBlog = {
    title: 'Blog 3',
    author: 'Author 3',
    url: 'http://blogs.com/3',
    likes: 10,
    user: userObj.id
  }

  const response = await api
    .post('/api/blogs')
    .set('Authorization', 'bearer ' + token)
    .send(newBlog)
    .expect(201)

  const response2 = await api.get('/api/blogs')

  expect(response2.body).toHaveLength(helper.initialBlogs.length + 1)
  const newBlogPost = response.body
  delete newBlogPost.id
  delete newBlogPost.__v
  expect(newBlogPost).toEqual(newBlog)
})

test('post to /api/blogs returns 401 if not token provided', async () => {
  const newBlog = {
    title: 'Blog 3',
    author: 'Author 3',
    url: 'http://blogs.com/3',
    likes: 10,
    user: userObj.id
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
})

test('if likes misses in the post is assigned value 0 automatically', async () => {
  const newBlog = {
    title: 'Blog 4',
    author: 'Author 4',
    url: 'http://blogs.com/4',
    user: userObj.id
  }

  const response = await api
    .post('/api/blogs')
    .set('Authorization', 'bearer ' + token)
    .send(newBlog)
    .expect(201)

  expect(response.body.likes).toBe(0)
})

test('if titles and url are missing backend sends back 400 Bad Request', async () => {
  const newBlog = {
    author: 'Author 3',
    likes: 10,
    user: userObj.id
  }

  await api
    .post('/api/blogs')
    .set('Authorization', 'bearer ' + token)
    .send(newBlog)
    .expect(400)
})

test('testing delete works', async () => {
  const newBlog = {
    title: 'Blog 5',
    author: 'Author 5',
    url: 'http://blogs.com/5',
    likes: 25,
    user: userObj.id
  }

  const response = await api
    .post('/api/blogs')
    .set('Authorization', 'bearer ' + token)
    .send(newBlog)
    .expect(201)

  await api
    .delete('/api/blogs/' + response.body.id)
    .set('Authorization', 'bearer ' + token)
    .expect(204)

  const response2 = await api.get('/api/blogs')
  response2.body.forEach(blog => {
    expect(blog.title).not.toContain('Blog 5')
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username has less than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'r',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username`')
    expect(result.body.error).toContain('shorter than the minimum allowed length')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password has less than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'patata',
      name: 'Superuser',
      password: 'sa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Password introduced has less than 3 characters')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})

