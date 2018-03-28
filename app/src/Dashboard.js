import React, { Component } from 'react';
import http  from './utils/axios';

export default class Dashboard extends Component {
  constructor(props){
    let session = sessionStorage.getItem('userSession');
    if(!session){
      return window.location.href = '/';
    };
    super(props);
    this.state = {
      myBooks: [],
      myReviews: [],
      UserId: JSON.parse(session).user.id,
      User: JSON.parse(session).user
    };
  };
  componentDidMount() {
    let dashboardDataPromises = [];

    dashboardDataPromises.push(http.get('book', {params: {UserId: this.state.UserId}}));
    dashboardDataPromises.push(http.get('review', {params: {UserId: this.state.UserId}}));
    return Promise.all(dashboardDataPromises)
      .then((responses)=>{
        this.setState({myBooks: responses[0].data.items});
        this.setState({myReviews: responses[1].data.items});
      });
  };
  render() {
    const books = this.state.myBooks;
    const reviews = this.state.myReviews;    
    return (
      <div className="container marginTop">
        <div className="row">
          <div className="col-md-6">
            {books.length > 0 ?

            <div>
              <div className="text-center"><h4>My Books</h4></div>
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
              :
              <div className="text-center"><p>You haven't added any Books yet!</p></div>
            }
          </div>
          <div className="col-md-6">
            <div className="panel panel-primary">
            {reviews.length > 0 ?
            <div>
              <div className="text-center"><h4>My Reviews</h4></div>
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
              :
              <div className="text-center"><p>You haven't written any reviews yet!</p></div>
              }
            </div>
          </div>
        </div>
        <div className="row">
          <a className="btn btn-primary col-md-5" href="/create/book">Add Book</a>
          <div className="col-md-2"></div>
          <a className="btn btn-primary col-md-5" href="/books">Browse All Books</a>
        </div>
      </div>
    );
  };
};
