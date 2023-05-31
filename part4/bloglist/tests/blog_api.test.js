const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { initialBlog } = require('../utils/list_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('Before each: data cleared...')

  const blogObj = initialBlog().map((blog) => new Blog(blog))
  const promiseArr = blogObj.map((blog) => blog.save())
  await Promise.all(promiseArr)

  console.log('Before each completed..')
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 8000)

test('unique identifier property', async () => {
  const blogs = await api.get('/api/blogs')
  for (const blog of blogs.body) {
    expect(blog.id).toBeDefined()
  }
}, 8000)

test('create new blog', async () => {
  const newBlog = {
    title: 'Divergent',
    author: 'Veronica Roth',
    url: 'http://www.veronicarothbooks.com/',
    likes: 30,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await api.get('/api/blogs')
  const title = blogs.body.map((blog) => blog.title)

  expect(blogs.body).toHaveLength(initialBlog().length + 1)
  expect(title).toContain(`${newBlog.title}`)
})

test('auto fill likes to 0 if missing', async () => {
  const newBlog = {
    title: 'Danger’s Kiss',
    author: 'Glynnis Campbell',
    url: 'http://www.veronicarothbooks.com/',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await api.get('/api/blogs')
  const latestBlog = blogs.body.find((blog) => blog.title === newBlog.title)

  expect(latestBlog.likes).toBe(0)
})

test('response with 400 if missing properties', async () => {
  const newBlog = {
    title: 'Danger’s Kiss',
    author: 'Glynnis Campbell',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('delete blog', async () => {
  const blogs = await api.get('/api/blogs')
  const lastBlogId = blogs.body[blogs.body.length - 1].id

  await api.delete(`/api/blogs/${lastBlogId}`).expect(204)

  const blogsAfterDeleted = await api.get('/api/blogs')

  expect(blogsAfterDeleted.body).toHaveLength(initialBlog().length - 1)
})

test('update blog', async () => {
  const blogs = await api.get('/api/blogs')
  const lastBlog = blogs.body[blogs.body.length - 1]

  const updatedBlog = {
    ...lastBlog,
    title: 'Updated blog title',
  }

  await api
    .put(`/api/blogs/${lastBlog.id}`)
    .send(updatedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAfterUpdated = await api.get('/api/blogs')
  const title = blogsAfterUpdated.body.map((blog) => blog.title)

  expect(blogs.body).toHaveLength(initialBlog().length)
  expect(title).toContain('Updated blog title')
})

afterAll(async () => {
  await mongoose.connection.close()
})
