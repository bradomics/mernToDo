import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import { Navbar, Container, Nav, Link as NavLink, Button } from 'react-bootstrap';
import { User } from 'react-feather';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Dashboard from "./pages/Dashboard";

export const AuthContext = React.createContext();

function App() {
  const authState = useState(null);
  return (
    <div className="App">
      <AuthContext.Provider value={authState}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/tasks">
              <Tasks />
            </Route>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
