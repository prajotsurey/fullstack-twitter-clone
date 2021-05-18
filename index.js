require('dotenv').config();
const express = require('express');
const app = express();
const Blog = require('./models/Blog');

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

const requestLogger = (request, response, next) => {
  console.log('Method: ', request.method);
  console.log('Path: ', request.path);
  console.log('Body: ', request.body);
  next();
};

app.use(requestLogger);

app.post('/api/blogs/', (request,response) => {
  const body = request.body;

  if(!body.content) { 
    return response.status(400).json({error: 'content missing'});
  }

  const blog = new Blog({
    title: body.title,
    content: body.content,
    date: new Date()
  });

  blog.save().then(savedBlog => {
    response.json(savedBlog);
  });

});

app.get('/api/blogs/', async (request,response) => {
  const blogs = await Blog.find({});
  return response.json(blogs);
});

app.get('/api/blogs/:id', async (request, response, next) => {
  Blog.findById(request.params.id)
    .then( blog => {
      if(blog) {
        response.json(blog);
      } else {
        response.status(404).end();
      }
    })
    .catch( error => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if(error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }

  next(error);
};

app.use(errorHandler);
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});