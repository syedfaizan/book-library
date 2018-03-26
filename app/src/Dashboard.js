import React, { Component } from 'react';
import http  from './utils/axios';

export default class Dashboard extends Component {
  constructor(props){
    let session = sessionStorage.getItem('userSession');
    if(!session){
      return window.location.href = '/';
    }
    super(props);
    this.state = {
      myBooks: [],
      myReviews: [],
      UserId: JSON.parse(session).user.id
    }
  }
  componentDidMount() {
    let dashboardDataPromises = [];

    dashboardDataPromises.push(http.get('book', {params: {UserId: this.state.UserId}}));
    dashboardDataPromises.push(http.get('review', {params: {UserId: this.state.UserId}}));
    Promise.all(dashboardDataPromises)
      .then((responses)=>{
        console.log(responses)
        this.setState({myBooks: responses[0].data.items});
        this.setState({myReviews: responses[1].data.items});
      })
  }
  render() {
    return (
      <div className="container paddingTop">
        <div className="row">
          <div className="col-md-6">
            <div className="text-center">My Books</div>
            <table className="table jumbotron">
              <thead>
                <tr>
                  <th>ISBN</th>
                  <th>Title</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.myBooks.map( (book, index) => {
                    return (
                      <tr key={index}>
                        <td>{book.ISBN}</td>
                        <td><a href={'/book/'+book.id}>{book.title}</a></td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
          <div className="col-md-6">
            <div className="panel panel-primary">
            <div className="text-center">My Reviews</div>
            <table className="table jumbotron">
              <thead>
                <tr>
                  <th>Book</th>
                  <th>Rating</th>
                  <th>Comment</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.myReviews.map( (review, index) => {
                    return (
                      <tr key={index}>
                        <td><a href={'/book/'+review.Book.id}>{review.Book.title}</a></td>
                        <td>{review.rating} &#9733;</td>
                        <td>{review.comment}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
            </div>
          </div>
        </div>
        <div className="row">
          <a className="btn btn-primary col-md-12" href="/book">Browse All Books</a>
        </div>
      </div>
    );
  }
}
