import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import AuthStorageContext from './contexts/AuthStorageContext';

const authStorage = () =>{
  const getToken = () => {
    const returnedUser = window.localStorage.getItem('blogappuser');
    return returnedUser;
  }

  return{
    getToken
  }  
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthStorageContext.Provider value={authStorage()}>
        <App />
      </AuthStorageContext.Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

