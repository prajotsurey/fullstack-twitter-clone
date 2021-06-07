import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export function PrivateRoute({user, children, ...rest }) {
  console.log('user in private route - ', user);
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