import React from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Login from "./Login";
import Home from "./Home";
function App() {
  return (
    <Router>
      
      <div className="container">
        <Switch>
          <PublicRoute path="/login" component={Login} />
          <PrivateRoute path="/home" component={Home} />
          <PrivateRoute path="*" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
