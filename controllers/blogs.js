const blogRouter = require('express').Router();
const Blog = require('../models/Blog');

blogRouter.get('/', async (request,response) => {
  const blogs = await Blog.find({});
  return response.json(blogs);
});

blogRouter.post('/', (request,response) => {
  const body = request.body;

  if(!body.content) { 
    return response.status(400).json({error: 'content missing'});
  }

  const blog = new Blog({
    title: body.title,
    content: body.content,
    date: new Date()
  });

  blog.save().then(savedBlog => {
    response.json(savedBlog);
  });

});

blogRouter.get('/:id', async (request, response, next) => {
  Blog.findById(request.params.id)
    .then( blog => {
      if(blog) {
        response.json(blog);
      } else {
        response.status(404).end();
      }
    })
    .catch( error => next(error));
});

blogRouter.delete('/:id', async (request, response, next) => {
  Blog.findByIdAndDelete(request.params.id)
    .then( item => {
      if(item) {
        response.status(204).end();
      } else {
        response.status(404).send({error : 'object not found'});
      }
    })
    .catch( error => next(error));
});

module.exports = blogRouter;