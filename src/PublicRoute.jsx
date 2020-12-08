import React from "react";
import { Redirect, Route } from "react-router-dom";

const PublicRoute = ({ path, component }) => {
  const isAuthenticated = !!localStorage.getItem("jugador1");

  if (isAuthenticated) return <Redirect to={"/home"} />;

  return <Route path={path} component={component} />;
};

export default PublicRoute;