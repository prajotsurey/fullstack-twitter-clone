const blogRouter = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const db = require('../db');


const getTokenFrom = request => {
  const authorization = request.get('authorization');
  if(authorization && authorization.toLowerCase().startsWith('bearer')) {
    return authorization.substring(7);
  }
  return null;
};

blogRouter.get('/', async (request,response) => {

  const result = await db.query('SELECT * FROM posts');
  const blogs = result.rows;

  return response.json(blogs);
});

blogRouter.post('/', async (request,response, next) => {
  const body = request.body;
  const token = getTokenFrom(request);
  try{
    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log(decodedToken)
    if(!token || !decodedToken.id) {
      return response.status(401).json({error: 'token missing or invalid'});
    }

    const result = await db.query(
      "SELECT * FROM users WHERE id = $1",
      [decodedToken.id]
      );

    const user = result.rows[0];

    if(!body.content) { 
      return response.status(400).json({error: 'content missing'});
    }

    const savedBlogResult = await db.query(
      "INSERT INTO posts (content, user_id) VALUES ($1,$2) returning *",
      [body.content, user.id]
    )

    response.json(savedBlogResult.rows[0]);
  
  } catch(error) {
    next(error);
  }

});

blogRouter.get('/:id', async (request, response, next) => {

  const result = await db.query(
    "SELECT * FROM posts where id = $1",
    [request.params.id]
    )
  
  const post = result.rows[0];

  if(post) {
    response.json(post);
  } else {
    response.status(404).end();
  }
});

blogRouter.delete('/:id', async (request, response, next) => {
  const result = db.query(
    "DELETE FROM posts where id = $1",
    [request.params.id]
  )
  response.status(204).json({
    status: 'success'
  })
});

module.exports = blogRouter;