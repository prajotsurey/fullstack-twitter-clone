import React, { useEffect, useState } from 'react';
import { 
  Route,
  Switch,
} from 'react-router-dom'
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import BlogAddView from './components/BlogAdd';
import LoginView from './components/Login';
import blogService from './services/blogService';
import Landing from './components/Landing';

import axios from 'axios';
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';
import Profile from './components/Profile';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';

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
    <Switch>
      <Route path='/login'>
        <LoginView user={user} setUser={setUser}/>
      </Route>
      <Route path='/addBlog'>
        <BlogAddView user={user}/>
      </Route>
      <Route path='/blog/:id'>
        <BlogDetail user={user}/>
      </Route>
      <Route path='/blogs'>
        <div className="flex flex-row justify-center">
          <LeftSidebar/>
          <div className="flex-grow max-w-screen-md"> 
            <BlogList blogs={blogs} user={user} handleLogout={handleLogout}/>
          </div>
        </div>
      </Route>
      <Route path='/signup'>
        <SignUp blogs={blogs} user={user}/>
      </Route>
      <Route path='/profile'>
        {
          user
          ?<Profile user={user}/>
          :<></>
        }
      </Route>
      <Route path='/'>
        <Landing blogs={blogs} user={user} setUser={setUser}/>
      </Route>
    </Switch>
    </>
  )
}

export default App