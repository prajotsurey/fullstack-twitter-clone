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
  console.log('token: ', token)
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
    (select cast("userId" as BOOLEAN) from bookmarks where "userId" = ? and "postId" = p.id) "bookmarkStatus"
    from posts p inner join users u on u.id = p."userId" order by p."createdAt" DESC;
    `, { replacements: [user.id, user.id],type: Sequelize.QueryTypes.SELECT});

    return response.json(result);
  } catch(error) {
    next(error);
  }
});

postRouter.get('/:id', async (request,response,next) => {
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
    (select cast("userId" as BOOLEAN) from bookmarks where "userId" = ? and "postId" = p.id) "bookmarkStatus"
    from posts p inner join users u on u.id = p."userId" where p.id = ? order by p."createdAt" DESC;
    `, { replacements: [user.id, user.id, request.params.id],type: Sequelize.QueryTypes.SELECT});

    return response.json(result[0]);
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

postRouter.post('/like/:id', async (request, response, next) => {
  const token = getTokenFrom(request);
  try{
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if(!token || !decodedToken.id) {
      return response.status(401).json({error: 'token missing or invalid'});
    }

    const result = await models.user.findOne({where: {id: decodedToken.id}});
    const user = result.dataValues;
    try{

      const result = await sequelize.query(`
        insert into likes ("userId", "postId", "createdAt" )
        values (:userid, :postid, NOW());

        update posts 
        set likes = likes + 1
        where id = :postid;

        select p.*,json_build_object('id',u.id,'username',u.username) creator, 
        (select value from likes where "userId" = :userid and "postId" = p.id) "likeStatus",
        (select cast("userId" as BOOLEAN) from bookmarks where "userId" = :userid and "postId" = p.id) "bookmarkStatus"
        from posts p inner join users u on u.id = p."userId" where p.id = :postid order by p."createdAt" DESC;
      `,{
        replacements: {
          userid: user.id,
          postid: request.params.id
        }
      });
      return response.status(200).json(result[0][0]);
 
    } catch(err) {
      // this means another like with same userid and postid is being created
      // implement the code to unlike i.e. delete like object, decrement post's like & set votestatuts to null
      console.log('error message: ',err.errors[0].message);
      if(err.errors[0].message.includes('must be unique')){ 

        const result = await sequelize.query(`
        delete from  likes
        where "userId" = :userid and "postId" = :postid;

        update posts 
        set likes = likes - 1
        where id = :postid;

        select p.*,json_build_object('id',u.id,'username',u.username) creator, 
        (select value from likes where "userId" = :userid and "postId" = p.id) "likeStatus",
        (select cast("userId" as BOOLEAN) from bookmarks where "userId" = :userid and "postId" = p.id) "bookmarkStatus"
        from posts p inner join users u on u.id = p."userId" where p.id = :postid order by p."createdAt" DESC;
      `,{
          replacements: {
            userid: user.id,
            postid: request.params.id
          }
        });
        return response.status(200).json(result[0][0]);
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
    if(!token || !decodedToken.id) {
      return response.status(401).json({error: 'token missing or invalid'});
    }
    
    const data = await models.bookmarks.create({
      userId:decodedToken.id,
      postId:request.params.id
    });
    return response.status(200).json({...data.dataValues});
  } catch(err) {
    console.log(err);
    return response.status(400).json({error: err.errors[0].message});
  }

});

postRouter.delete('/removeBookmark/:id', async (request,response) => {
  const token = getTokenFrom(request);
  try{
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if(!token || !decodedToken.id) {
      return response.status(401).json({error: 'token missing or invalid'});
    }
    
    const data = await models.bookmarks.destroy({
      where:{
        userId:decodedToken.id,
        postId:request.params.id
      }
    });
    return response.status(200).json({...data.dataValues});
  } catch(err) {
    console.log(err);
    return response.status(400).json({error: err.errors[0].message});
  }

});

postRouter.get('/bookmarks/all', async (request,response,next) => {
  const token = getTokenFrom(request);
  try{
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if(!token || !decodedToken.id) {
      return response.status(401).json({error: 'token missing or invalid'});
    }

    const userResult = await models.user.findOne({where: {id: decodedToken.id}});

    const user = userResult.dataValues;

    const result = await sequelize.query(`
    select p.*,json_build_object('id',u.id,'username',u.username) creator, 
    (select value from likes where "userId" = ? and "postId" = p.id) "likeStatus",
    (select cast("userId" as BOOLEAN) from bookmarks where "userId" = ? and "postId" = p.id) "bookmarkStatus"
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