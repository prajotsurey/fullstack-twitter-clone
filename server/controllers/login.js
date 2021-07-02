const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const models = require('../models');

const loginRouter = require('express').Router();

loginRouter.post('/', async(request, response) => {
  const body = request.body;
  const user = await models.user.findOne({ 
    where : {username : body.username },
    attributes: {
      include:['password_hash']
    }
  })

  console.log(user.password_hash, body.password)
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.password_hash);

  if(!user || !passwordCorrect){
    return response.status(401).json({
      error: 'invalid username or password'
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };


  const token = jwt.sign(userForToken, process.env.SECRET);

  response
    .status(200)
    .send({ token, username: user.username, id: user.id});
});

module.exports = loginRouter;