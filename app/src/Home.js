import React, { Component } from 'react';
import http from '../src/utils/axios';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        }
    }
    componentDidMount(){
        http.get('/books')
            .then( res => {
                console.log(res);
                let books = res.data.items;
                this.setState({books});
            })
    }
  render() {
    return (
        <div className="container">
            <div className="jumbotron">
                <ul>
                    {this.state.books.map( book => (
                        <li key={book.id}>{book.title}</li>
                    ))}
                </ul>
                
            </div>
        </div>
    );
  }
}
