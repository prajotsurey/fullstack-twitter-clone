const userRouter = require('express').Router();
const User = require('../models/User');
const logger = require('../utils/logger');
const bcrypt = require('bcrypt');

userRouter.post('/', async (request, response, next) => {
  const saltRounds = 10;
  const body = request.body;
  if(body.username && body.password && body.password.length > 7){
    const passwordHash = await bcrypt.hash(body.password, saltRounds);
    return response.status(200).json({
      username: body.username,
      passwordHash
    });
  } else {
    return response.status(400).json({ error: 'username or password too short' });
  }
});

module.exports = userRouter;