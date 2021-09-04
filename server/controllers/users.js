const userRouter = require('express').Router();
const models = require('../models');
const bcrypt = require('bcrypt');
const { Model } = require('mongoose');

userRouter.post('/', async (request, response, next) => {
  const saltRounds = 10;
  const body = request.body;
  if(body.username && body.password && body.password.length > 7){
    const passwordHash = await bcrypt.hash(body.password, saltRounds);
    
    // sequelize

    const User = await models.user.create({ username: body.username, password_hash: passwordHash });
    console.log('here');
    response.status(200).json(User);
  }
});

userRouter.get('/:id', async (request,response) => {
  // get posts
  const User = await models.user.findOne({ 
    where: {id: request.params.id}, 
    include: [
      {model: models.post, as:'created_posts', include:[{model: models.user, as:'creator'},{model: models.user, as:'likers'}]},
      {model: models.post, as:'liked_posts', include:[{model: models.user, as:'creator'},{model: models.user, as:'likers'}]},
      {model: models.post, as:'bookmarked_posts', include:[{model: models.user, as:'creator'},{model: models.user, as:'likers'}]},
    ]
  })

  return response.status(200).json(User);  
});

userRouter.get('/handle/:handle', async (request,response) => {
  console.log('here')
  const User = await models.user.findOne({ 
    where: {username: request.params.handle}, 
    include: [
      {model: models.post, as:'created_posts', include:[{model: models.user, as:'creator'},{model: models.user, as:'likers'}]},
      {model: models.post, as:'liked_posts', include:[{model: models.user, as:'creator'},{model: models.user, as:'likers'}]},
      {model: models.post, as:'bookmarked_posts', include:[{model: models.user, as:'creator'},{model: models.user, as:'likers'}]},
    ]
  })

  return response.status(200).json(User);  
});


userRouter.get('/:id/clearBookmarks', async (request,response) => {
  await models.bookmarks.destroy({where: {user_id: request.params.id}})
  response.status(200).json({
    status:'success'
  })
})

userRouter.post('/:id/addBookmark/:postID', async (request,response) => {
  const Bookmark = await models.bookmarks.create({user_id:request.params.id, post_id:request.params.postID})
  console.log(Bookmark)
  return response.status(200)

})

userRouter.delete('/:id/removeBookmark/:postID', async (request,response) => {
  const Bookmark = await models.bookmarks.destroy({where: {user_id: request.params.id, post_id: request.params.postID}})
  console.log(Bookmark)
  return response.status(200)

})

module.exports = userRouter;