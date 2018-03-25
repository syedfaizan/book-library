import React, { Component } from 'react';
import http  from './utils/axios';

export default class Books extends Component {
  componentDidMount() {
    let dashboardDataPromises = [];

    dashboardDataPromises.push(http.get('book'));
    dashboardDataPromises.push(http.get('review'));
    Promise.all(dashboardDataPromises)
      .then(console.log)
  }
  render() {
    return (
      <p>Books</p>
    );
  }
}
