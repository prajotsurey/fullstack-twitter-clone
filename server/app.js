const logger = require('./utils/logger');
const config = require('./utils/config');
const express = require('express');
const postRouter = require('./controllers/posts');
const userRouter = require('./controllers/users');
const middleware = require('./utils/middleware');
const cors = require('cors');
const loginRouter = require('./controllers/login');
const path = require('path');

const db = require('./db');
const app = express();
require('dotenv').config();

db.authenticate()
  .then(() => {
    console.log('connected to database...')
  })
  .catch((err) => {
    console.log('error connecting to database')
  })

app.use(cors());
app.use(express.static(path.resolve(__dirname, '../client/build')));



app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/posts', postRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

app.get('*', (req,res) =>{
  res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
module.exports = app;