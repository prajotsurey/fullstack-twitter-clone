const blogRouter = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const getTokenFrom = request => {
  const authorization = request.get('authorization');
  if(authorization && authorization.toLowerCase().startsWith('bearer')) {
    return authorization.substring(7);
  }
  return null;
};

blogRouter.get('/', async (request,response) => {
  const blogs = await Blog.find({});
  return response.json(blogs);
});

blogRouter.post('/', async (request,response, next) => {
  const body = request.body;
  const token = getTokenFrom(request);
  try{
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if(!token || !decodedToken.id) {
      return response.status(401).json({error: 'token missing or invalid'});
    }

    const user = await User.findById(decodedToken.id);

    if(!body.content) { 
      return response.status(400).json({error: 'content missing'});
    }

    const blog = new Blog({
      title: body.title,
      content: body.content,
      date: new Date()
    });

    const savedBlog = await blog.save();
    response.json(savedBlog);
  
  } catch(error) {
    next(error);
  }

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