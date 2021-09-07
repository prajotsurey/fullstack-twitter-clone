const postRouter = require('express').Router();
const models = require('../models');
const jwt = require('jsonwebtoken');
const sequelize = require('../db');
const { Sequelize } = require('sequelize');

const getTokenFrom = request => {
  const authorization = request.get('Authorization');
  if(authorization && authorization.toLowerCase().startsWith('bearer')) {
    return authorization.substring(7);
  }
  return null;
};

postRouter.get('/', async (request,response,next) => {
  const token = getTokenFrom(request);

  try{
    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log(decodedToken);
    if(!token || !decodedToken.id) {
      return response.status(401).json({error: 'token missing or invalid'});
    }

    const userResult = await models.user.findOne({where: {id: decodedToken.id}});

    const user = userResult.dataValues;

    const result = await sequelize.query(`
    select p.*,json_build_object('id',u.id,'username',u.username) creator, 
    (select value from likes where "userId" = ? and "postId" = p.id) "likeStatus",
    (select "postId" from bookmarks where "userId" = ? and "postId" = p.id) "bookmarkeStatus"
    from posts p inner join users u on u.id = p."userId" order by p."createdAt" DESC;
    `, { replacements: [user.id, user.id],type: Sequelize.QueryTypes.SELECT});

    return response.json(result);
  } catch(error) {
    next(error);
  }
});

postRouter.get('/user/:id', async (request,response,next) => {
  const id = request.params.id;
  try{
    const result = await models.post.findAll({include: [{model: models.user, as:'creator'},{model: models.user, as:'likers'}]});
    console.log('here');
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
    if(!token || !decodedToken.id) {
      return response.status(401).json({error: 'token missing or invalid'});
    }

    const result = await models.user.findOne({where: {id: decodedToken.id}});

    const user = result.dataValues;

    if(!body.content) { 
      return response.status(400).json({error: 'content missing'});
    }

    const savedBlog = await models.post.create({ content:body.content, userId:user.id}); 

    return response.json({
      ...savedBlog.dataValues,
      likeStatus:0,
      creator:{
        id: user.id,
        username: user.username
      }
    });
  
  } catch(error) {
    console.log(error)
    next(error);
  }

});

postRouter.get('/:id', async (request, response, next) => {
  try{
    const post = await models.post.findOne({where: {id: request.params.id}, include: [models.user]});
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
  console.log(token);
  try{
    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log(decodedToken);
    if(!token || !decodedToken.id) {
      return response.status(401).json({error: 'token missing or invalid'});
    }

    const result = await models.user.findOne({where: {id: decodedToken.id}});
    const user = result.dataValues;
    try{
      const like = await models.likes.create({
        userId: user.id,
        postId: request.params.id
      });
      const post = await models.post.increment({
        likes: +1
      }, {
        where: {
          id: request.params.id
        },
        returning: true,
        plain: true
      });
      console.log(post)
      return response.status(200).json(
        {
          ...post[0][0],
          likeStatus: 1 //current user's like status
        });
 
    } catch(err) {
      // this means another like with same userid and postid is being created
      // implement the code to unlike i.e. delete like object, decrement post's like & set votestatuts to null
      console.log(err)
      if(err.errors[0].message.includes('must be unique')){ 
        await models.likes.destroy({
          where:{
            userId: user.id,
            postId: request.params.id
          }
        });
        const post = await models.post.decrement({
          likes: 1
        }, {
          where: {
            id: request.params.id
          },
          returning: true,
          plain: true
        });
        return response.status(200).json({
          ...post[0][0],
          likeStatus: null
        });
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
    });
    response.status(204).json({
      status: 'success'
    });
  } catch (error) {
    next(error);
  }
});

postRouter.post('/addBookmark/:id', async (request,response) => {
  const token = getTokenFrom(request);
  try{
    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log(decodedToken);
    if(!token || !decodedToken.id) {
      return response.status(401).json({error: 'token missing or invalid'});
    }
    
    const data = await models.bookmarks.create({
      userId:decodedToken.id,
      postId:request.params.id
    });
    console.log(data.dataValues);
    return response.status(200).json({...data.dataValues});
  } catch(err) {
    console.log(err);
    return response.status(400).json({error: err.errors[0].message});
  }

});

postRouter.delete('/removeBookmark/:id', async (request,response) => {
  const token = getTokenFrom(request);
  console.log(token)
  try{
    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log(decodedToken);
    if(!token || !decodedToken.id) {
      return response.status(401).json({error: 'token missing or invalid'});
    }
    
    const data = await models.bookmarks.destroy({
      where:{
        userId:decodedToken.id,
        postId:request.params.id
      }
    });
    console.log(data);
    return response.status(200).json({...data.dataValues});
  } catch(err) {
    console.log(err);
    return response.status(400).json({error: err.errors[0].message});
  }

});

postRouter.get('/bookmarks/all', async (request,response,next) => {
  const token = getTokenFrom(request);
  console.log(request.headers)
  try{
    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log(decodedToken);
    if(!token || !decodedToken.id) {
      return response.status(401).json({error: 'token missing or invalid'});
    }

    const userResult = await models.user.findOne({where: {id: decodedToken.id}});

    const user = userResult.dataValues;

    const result = await sequelize.query(`
    select p.*,json_build_object('id',u.id,'username',u.username) creator, 
    (select value from likes where "userId" = ? and "postId" = p.id) "likeStatus",
    (select "postId" from bookmarks where "userId" = ? and "postId" = p.id) "bookmarkStatus"
    from posts p inner join users u on u.id = p."userId" 
    where p.id in (select "postId" from bookmarks where "userId" = ? and "postId" = p.id)
    order by p."createdAt" DESC;
    `, { replacements: [user.id, user.id, user.id],type: Sequelize.QueryTypes.SELECT});

    return response.json(result);
  } catch(error) {
    next(error);
  }
});

module.exports = postRouter;