import React, { useEffect, useState } from 'react';
import { 
  Route,
  Switch,
  Link
} from 'react-router-dom'
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import BlogAddView from './components/BlogAdd';
import LoginView from './components/Login';
import blogService from './services/blogService';

import axios from 'axios';
import SignUp from './components/SignUp';

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

  return(
    <>
    {
      user
      ?<>
        <Link to='/'>home</Link>
        <Link to='/blogs'>blogs</Link>
        <Link to='/addblog'>Add blog</Link>
        <button onClick={handleLogout}>Logout</button>
        </>
      : <></>
    }
    <Switch>
      <Route path='/login'>
        <LoginView setUser={setUser}/>
      </Route>
      <Route path='/addBlog'>
        <BlogAddView user={user}/>
      </Route>
      <Route path='/blog/:id'>
        <BlogDetail user={user}/>
      </Route>
      <Route path='/blogs'>
        <BlogList blogs={blogs} user={user}/>
      </Route>
      <Route path='/signup'>
        <SignUp blogs={blogs} user={user}/>
      </Route>
      <Route path='/'>
        home <Link to='/login'>Login</Link>
        <Link to='/signup'>Signup</Link>
      </Route>
    </Switch>
    </>
  )
}

export default App