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

import axios from 'axios';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  
  const fetchBlogs = async () => {
    const response = await axios.get('http://localhost:3001/api/blogs');
    setBlogs(response.data);
  }

  useEffect( () => {
    fetchBlogs();
  },[])

  return(
    <>
    <Link to='/'>home</Link>
    <Link to='/blogs'>blogs</Link>
    <Link to='/addblog'>Add blog</Link>
    <Link to='/login'>Login</Link>
    <Switch>
      <Route path='/login'>
        <LoginView />
      </Route>
      <Route path='/addBlog'>
        <BlogAddView />
      </Route>
      <Route path='/blog/:id'>
        <BlogDetail />
      </Route>
      <Route path='/blogs'>
        <BlogList blogs={blogs}/>
      </Route>
      <Route path='/'>
        home
      </Route>
    </Switch>
    </>
  )
}

export default App