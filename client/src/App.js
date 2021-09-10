import React from 'react';
import {
  Switch
} from 'react-router-dom';
import CentreSpace from './components/CenterSpace';
import { PrivateRoute, PublicRoute } from './helpers/routes';
import Bookmarks from './pages/Bookmarks';
import Browse from './pages/Browse';
import CreateBlog from './pages/CreateBlog';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import Testing from './pages/Testing';
import PostDetail from './pages/PostDetail';


const App = () => {
  return(
    <>
    <Switch>
      <PrivateRoute path='/addBlog'>
        <CreateBlog />
      </PrivateRoute>
      <PrivateRoute path='/:username/post/:postId'>
        <CentreSpace >
          <PostDetail />
        </CentreSpace>
      </PrivateRoute>
      <PrivateRoute path='/posts'>
        <CentreSpace >
          <Browse />
        </CentreSpace>
      </PrivateRoute>
      <PrivateRoute path='/bookmarks'>
        <CentreSpace >
          <Bookmarks />
        </CentreSpace>
      </PrivateRoute>
      <PrivateRoute path='/profile'>
        <CentreSpace >
          <Profile />
        </CentreSpace>
      </PrivateRoute>
      <PublicRoute path='/signup'>
        <SignUp />
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