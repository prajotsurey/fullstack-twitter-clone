import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import AuthStorageContext from './contexts/AuthStorageContext';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

const authStorage = () =>{
  const getToken = () => {
    const returnedUser = window.localStorage.getItem('blogappuser');
    return returnedUser;
  }

  return{
    getToken
  }  
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#1D9BF0',
    }
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthStorageContext.Provider value={authStorage()}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </AuthStorageContext.Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

