import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch  } from "react-router-dom";
import Dashboard from './Dashboard';
import Book from './Book';
import BookList from './BookList';
import BookCreate from './BookCreate';
import authComponent from './Auth';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={authComponent}/>
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/book/:id" component={Book}/>
          <Route path="/book" component={BookList}/>
          <Route path="/create/book" component={BookCreate}/>
        </Switch>
    </Router>
    );
  }
}

export default App;
