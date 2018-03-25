import React, { Component } from 'react';
import http  from './utils/axios';
import {Redirect } from 'react-router-dom';

export default class Auth extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: null,
      redirect: !!sessionStorage.getItem('userSession') ||false
    }
  }
  handleChange(event) {
    let username = event.target.value;
    this.setState({username});
  }
  handleFormSubmission() {
    console.log("pressed", this.state.username);
    http.post("/user", { username: this.state.username })
      .then( res => {
        sessionStorage.setItem('userSession', JSON.stringify(res.data));
        this.setState({redirect : true});
      })
  }
  render() {
    const { redirect } = this.state;

    if( redirect ){
      return <Redirect to='/Books'/>;
    }
    return (
      
        <div className="container">
          <div className="jumbotron text-center">
              <h3>Enter User Name</h3>
              <input className="form-control" type="text" onChange={(e) => {this.handleChange(e)}}/>
              <br/>
              <button className="form-control btn btn-primary" onClick={this.handleFormSubmission.bind(this)}>Submit</button>
              <p>current Username: {this.state.username}</p>
          </div>
      </div>
    );
  }
}
