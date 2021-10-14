import React, {useContext} from "react";
import { Redirect, Route } from "react-router-dom";
import UserContext  from './../containers/LoginContext';
function ProtectedRoute({ component: Component, ...restOfProps }) {
  const {user} = useContext(UserContext)

  const isAuthenticated = user.uid;
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default ProtectedRoute;