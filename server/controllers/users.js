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

    response.status(200).json(User);
  }
});

userRouter.get('/:id', async (request,response) => {
  // get posts
  const User = await models.user.findOne({ 
    where: {id: request.params.id}, 
    include: [
      {model: models.post, as:'created_posts'},
      {model: models.post, as:'liked_posts'},
      {model: models.post, as:'bookmarked_posts'}
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