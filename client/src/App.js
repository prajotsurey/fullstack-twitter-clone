import React, { useEffect, useState } from 'react';
import { 
  Switch,
} from 'react-router-dom'

import { PrivateRoute, PublicRoute } from './helpers/routes';

import Browse from './pages/Browse';
import BlogDetail from './pages/BlogDetail';
import CreateBlog from './pages/CreateBlog';
import CentreSpace from './components/CenterSpace';
import Login from './pages/Login';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import Bookmarks from './pages/Bookmarks';
import Profile from './pages/Profile';
import useAuthStorage from './hooks/useAuthStorage';
import userService from './services/userService';
import Testing from './pages/Testing';
import postService from './services/postService';
const App = () => {
  const [user, setUser] = useState(null)
  const auth = useAuthStorage();

  useEffect(() => {
    const fetchUser = async () => {
      console.log('in app.js')
      const user = await JSON.parse(auth.getToken());
      if(user){
        const returnedUser = await userService.getUser(user.id);
        await setUser(returnedUser);
        console.log('set token in app js: ', user.token)
        await postService.setToken(user.token)
      }
    }

    fetchUser();
  },[auth])

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
        <CentreSpace user={user}>
          <Browse />
        </CentreSpace>
      </PrivateRoute>
      <PrivateRoute path='/bookmarks'>
        <CentreSpace user={user}>
          <Bookmarks />
        </CentreSpace>
      </PrivateRoute>
      <PrivateRoute path='/profile/:id'>
        <CentreSpace user={user}>
          <Profile />
        </CentreSpace>
      </PrivateRoute>
      <PublicRoute path='/signup'>
        <SignUp user={1}/>
      </PublicRoute>
      <PublicRoute path='/login'>
        <Login />
      </PublicRoute>
      <PublicRoute path='/testing'>
        <Testing />
      </PublicRoute>
      <PublicRoute path='/'>
        <Landing />
      </PublicRoute>
    </Switch>
    </>
  )
}

export default App