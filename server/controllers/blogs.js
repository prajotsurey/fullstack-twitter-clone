const blogRouter = require('express').Router();
const models = require('../models');
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

  const result = await models.post.findAll();
  console.log(result.dataValues);

  return response.json(result);
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

    const result = await models.user.findOne({where: {id: decodedToken.id}})

    const user = result.dataValues;



    if(!body.content) { 
      return response.status(400).json({error: 'content missing'});
    }

    const savedBlog = await models.post.create({ content:body.content, user_id:user.id}) 

    response.json(savedBlog);
  
  } catch(error) {
    next(error);
  }

});

blogRouter.get('/:id', async (request, response, next) => {

  const result = await models.posts.findOne({where: {id: request.params.id}})
  
  const post = result.dataValues;

  if(post) {
    response.json(post);
  } else {
    response.status(404).end();
  }
});

blogRouter.delete('/:id', async (request, response, next) => {
  await models.User.destroy({
    where: { id: request.params.id }
  })
  response.status(204).json({
    status: 'success'
  })
});

module.exports = blogRouter;