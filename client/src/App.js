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
import Testing from './pages/Testing';

const App = () => {
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