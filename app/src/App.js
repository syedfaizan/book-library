import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch  } from "react-router-dom";
import Books from './Books';
// import Home from './Home';
import authComponent from './Auth';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={authComponent}/>
          {/* <Route path="/dashboard" component={Dashboard}/> */}
          <Route path="/Books" component={Books}/>
        </Switch>
    </Router>
    );
  }
}

export default App;
