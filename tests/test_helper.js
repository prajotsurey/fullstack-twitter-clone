const Blog = require('../models/Blog');

const initialBlogs = [
  {
    title:'title1',
    content:'content1',
    date: new Date()
  },
  {
    title:'title2',
    content:'content2',
    date: new Date()
  }
];

const nonExistingId = async() => {
  const blog = new Blog({ title:'title', content: 'content'});
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const Blogs = await Blog.find({});
  return Blogs.map(blog => blog.toJSON());
};

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
};