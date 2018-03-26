import React, { Component } from 'react';
import http from '../src/utils/axios';

export default class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        }
    }
    componentDidMount(){
        http.get('/book')
            .then( res => {
                let books = res.data.items;
                this.setState({books});
            })
    }
  render() {
    return (
        <div className="container ">
            <h3 className="text-center">Book Catalog</h3>
            <hr/>
            <div>
                <div className="row ">
                    <div className="col-md-4">ISBN</div>
                    <div className="col-md-4">Title</div>
                    <div className="col-md-4">Author</div>
                </div>
                <hr/>
                {
                    this.state.books.map( book => (
                        <div className="row table table-striped" key={book.id}>
                            <div className="col-md-4 ">{book.ISBN}</div>
                            <div className="col-md-4"><a href={`/book/${book.id}`}>{book.title}</a></div>
                            <div className="col-md-4">{book.User && book.User.username}</div>
                        </div>
                    ))
                }
            </div>
            <div className="row">
                <a className="btn btn-primary" href="/create/book">+ Add Book</a>
            </div>
        </div>
    );
  }
}
