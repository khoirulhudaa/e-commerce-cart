import React, { Component } from 'react';
import './App.css';
import { Homepage, Admin } from './components';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


export default class App extends Component {
 
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact>
              <Homepage/> 
            </Route>
            <Route path="/admin">
              <Admin/> 
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}