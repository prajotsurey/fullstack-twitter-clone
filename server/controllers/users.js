const userRouter = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

userRouter.post('/', async (request, response, next) => {
  const saltRounds = 10;
  const body = request.body;
  if(body.username && body.password && body.password.length > 7){
    const passwordHash = await bcrypt.hash(body.password, saltRounds);
    const newUser = new User({
      username: body.username,
      passwordHash: passwordHash
    });
    newUser.save()
      .then(savedBlog => response.json(savedBlog))
      .catch(error => next(error));
  } else {
    return response.status(400).json({ error: 'username or password too short' });
  }
});

userRouter.get('/:id', async (request,response) => {
  const returnedUser = await User.findById(request.params.id).populate('blogs');
  console.log(returnedUser);
  return response.status(200).json(returnedUser); 
});

module.exports = userRouter;