const userRouter = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const db = require('../db');

userRouter.post('/', async (request, response, next) => {
  const saltRounds = 10;
  const body = request.body;
  if(body.username && body.password && body.password.length > 7){
    const passwordHash = await bcrypt.hash(body.password, saltRounds);
    
    // postgres
    const result = await db.query(
      "INSERT INTO users (username, password_hash) values ($1,$2) returning *",
      [body.username,passwordHash]
    );
    console.log('postResult: ' + JSON.stringify(result.rows))
  }
});

userRouter.get('/:id', async (request,response) => {
  // get posts
  const result = await db.query(
    "SELECT username,content,posts.id FROM users INNER JOIN posts ON users.id = posts.user_id WHERE users.id = $1",
    [request.params.id]
  )
  
  // get user
  const userResult = await db.query(
    "SELECT username FROM users WHERE id = $1",
    [request.params.id]
  )

  //format
  const user = {
    ...userResult.rows[0],
    blogs: result.rows,
  }

  return response.status(200).json(user);  
});

module.exports = userRouter;