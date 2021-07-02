import React, { useEffect, useState } from 'react';
import { 
  Route,
  Switch,
} from 'react-router-dom'

import { PrivateRoute } from './helpers/routes';

import blogService from './services/blogService';
import axios from 'axios';

import Browse from './pages/Browse';
import BlogDetail from './pages/BlogDetail';
import CreateBlog from './pages/CreateBlog';

import Login from './pages/Login';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';

import Profile from './pages/Profile';

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const response = await axios.get('/api/posts');
    setBlogs(response.data);
  }

  useEffect( () => {
    fetchBlogs();
  },[])

  return(
    <>
    <Switch>
      <PrivateRoute path='/addBlog'>
        <CreateBlog />
      </PrivateRoute>
      <PrivateRoute path='/posts/:id'>
        <BlogDetail />
      </PrivateRoute>
      <PrivateRoute path='/posts'>
        <Browse blogs={blogs} handleLogout={1}/>
      </PrivateRoute>
      <PrivateRoute path='/profile'>
        <Profile user={1}/>
      </PrivateRoute>
      <Route path='/signup'>
        <SignUp blogs={blogs} user={1}/>
      </Route>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='/'>
        <Landing blogs={blogs} user={1} setUser={1}/>
      </Route>
    </Switch>
    </>
  )
}

export default App