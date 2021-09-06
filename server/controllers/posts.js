const postRouter = require('express').Router();
const models = require('../models');
const jwt = require('jsonwebtoken');
const db = require('../db');


const getTokenFrom = request => {
  const authorization = request.get('Authorization');
  if(authorization && authorization.toLowerCase().startsWith('bearer')) {
    return authorization.substring(7);
  }
  return null;
};

postRouter.get('/', async (request,response,next) => {
  try{
    const result = await models.post.findAll({include: [{model: models.user, as:'creator'}]});
    console.log('here')
    return response.json(result);
  } catch(error) {
    next(error);
  }
});

postRouter.get('/user/:id', async (request,response,next) => {
  const id = request.params.id
  try{
    const result = await models.post.findAll({include: [{model: models.user, as:'creator'},{model: models.user, as:'likers'}]});
    console.log('here')
    return response.json(result);
  } catch(error) {
    next(error);
  }
});

postRouter.post('/', async (request,response, next) => {
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

postRouter.get('/:id', async (request, response, next) => {
  try{
    const post = await models.post.findOne({where: {id: request.params.id}, include: [models.user]})
    if(post) {
      response.json(post);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

postRouter.post('/like/:id', async (request, response, next) => {
  const token = getTokenFrom(request);
  console.log(token)
  try{
    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log(decodedToken)
    if(!token || !decodedToken.id) {
      return response.status(401).json({error: 'token missing or invalid'});
    }

    const result = await models.user.findOne({where: {id: decodedToken.id}})
    const user = result.dataValues;
    try{
      const like = await models.likes.create({
        user_id: user.id,
        post_id: request.params.id
      })
      const post = await models.post.increment({
        likes: +1
      }, {
        where: {
          id: request.params.id
        }
      })
      response.json(post);
 
    } catch(err) {
      console.log(err.errors[0].message)
      if(err.errors[0].message.includes('must be unique')){
        await models.likes.destroy({
          where:{
            user_id: user.id,
            post_id: request.params.id
          }
        })
        const post = await models.post.decrement({
          likes: 1
        }, {
          where: {
            id: request.params.id
          }
        })
        response.json(post);
      }
    }
    
  }  catch (error) {
    next(error);
  }
});


postRouter.delete('/:id', async (request, response, next) => {
  try{
    await models.post.destroy({
      where: { id: request.params.id }
    })
    response.status(204).json({
      status: 'success'
    })
  } catch (error) {
    next(error);
  }
});

module.exports = postRouter;