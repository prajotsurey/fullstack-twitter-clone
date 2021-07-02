const userRouter = require('express').Router();
const models = require('../models');
const bcrypt = require('bcrypt');

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
  const User = await models.user.findOne({ where: {id: request.params.id}, include: models.post})

  return response.status(200).json(User);  
});

module.exports = userRouter;