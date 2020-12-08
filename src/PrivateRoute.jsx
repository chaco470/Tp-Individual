import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ path, component }) => {
  const isAuthenticated = !!localStorage.getItem("jugador1");

  if (!isAuthenticated) return <Redirect to={"/login"} />;

  return <Route path={path} component={component} />;
};

export default PrivateRoute;