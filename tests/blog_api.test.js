/* eslint-disable no-undef */
const mongoose = require('mongoose');
const app = require('../app');
const supertest = require('supertest');
const Blog = require('../models/Blog');
const api = supertest(app);
const helper = require('./test_helper');

beforeEach(async () => {
  await Blog.deleteMany({});
  const blog1 = new Blog(helper.initialBlogs[0]);
  const blog2 = new Blog(helper.initialBlogs[1]);
  await blog1.save();
  await blog2.save();
});

test('blogs are returned', async() => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('blog can be added', async() => {
  const response = await api.post('/api/blogs').send({
    title: 'title new',
    content: 'content new',
  });
  expect(response.body.title).toBe('title new');

  const blogs = await helper.blogsInDb();
  
  expect(blogs.length).toBe(helper.initialBlogs.length + 1);
});

test('blog can be deleted', async() => {
  const blogs = await helper.blogsInDb();
  const response = await api.delete(`/api/blogs/${blogs[0].id}`);
  expect(response.status).toBe(204);
  const updatedBlogs = helper.blogsInDb();
  expect(await updatedBlogs).toHaveLength(blogs.length - 1);
});

test('blog detail is returned', async() => {

  const blogs = await helper.blogsInDb();
  console.log(blogs);
  const response = await api.get(`/api/blogs/${blogs[0].id}`);
  expect(response.body.title).toBe(blogs[0].title);
});

afterAll(()=> {
  mongoose.connection.close();
});