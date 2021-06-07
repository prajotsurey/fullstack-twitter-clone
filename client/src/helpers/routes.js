import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useAuthStorage from '../hooks/useAuthStorage';

export function PrivateRoute({ children, ...rest }) {
  const auth = useAuthStorage();
  const user = auth.getToken();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}