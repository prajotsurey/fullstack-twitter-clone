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
  const [user, setUser] = useState(null);

  const fetchBlogs = async () => {
    const response = await axios.get('http://localhost:3001/api/blogs');
    setBlogs(response.data);
  }

  useEffect( () => {
    fetchBlogs();
  },[])

  useEffect( () => {
    const loggedInUser = window.localStorage.getItem('blogappuser')
    if(loggedInUser){
      const parsedUser = JSON.parse(loggedInUser)
      setUser(parsedUser)
      blogService.setToken(parsedUser.token)
    }
  },[])

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('blogappuser')
  }
  console.log('user in app.js - ',user)
  return(
    <>
    <Switch>
      <PrivateRoute user={user} path='/addBlog'>
        <CreateBlog />
      </PrivateRoute>
      <PrivateRoute user={user} path='/blog/:id'>
        <BlogDetail />
      </PrivateRoute>
      <PrivateRoute user={user} path='/blogs'>
        <Browse blogs={blogs} handleLogout={handleLogout}/>
      </PrivateRoute>
      <PrivateRoute user={user} path='/profile'>
        <Profile user={user}/>
      </PrivateRoute>
      <Route path='/signup'>
        <SignUp blogs={blogs} user={user}/>
      </Route>
      <Route path='/login'>
        <Login setUser={setUser}/>
      </Route>
      <Route path='/'>
        <Landing blogs={blogs} user={user} setUser={setUser}/>
      </Route>
    </Switch>
    </>
  )
}

export default App