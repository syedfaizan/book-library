import React, { Component } from 'react';
import http from '../src/utils/axios';

export default class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ISBN: null,
            title: null,
            duplicateISBN: null
        }
    }

    handleISBNChange (event) {
        this.setState({ISBN: event.target.value})
    }

    handleTitleChange (event) {
        this.setState({title: event.target.value})
    }
    handleSubmit () {
        let newBook = {
            ISBN: this.state.ISBN,
            title: this.state.title
        };
        if( newBook.ISBN && newBook.title ){
            http.post('/book', newBook)
                .then( (response) => {
                    console.log(response)
                    window.location.href = `/book/${response.data.id}`;
                })
                .catch( err => {
                    console.log('its coming', err)
                    if(err.errors){
                        this.setState({duplicateISBN: err.errors[0].message });
                    }
                })
        }
    }
    render() {
        let duplicateISBN = this.state.duplicateISBN;
        return (
            <div className="container jumbotron">
                <div className="row">
                    <label className="col-md-4">Unique ISBN number</label>
                    <input className="form-control col-md-8 inputMargin" required="true" name="ISBN" onChange={this.handleISBNChange.bind(this)} placeholder="Enter ISBN"/>
                    {duplicateISBN && 
                        <span className="red">{duplicateISBN}</span>
                    }
                </div>
                <div className="row">
                    <label className="col-md-4">Book Title</label>            
                    <input className="form-control col-md-8 inputMargin" required="true" name="Title" onChange={this.handleTitleChange.bind(this)} placeholder="Title of the Book"/>
                </div>
                <br/>
                <div className="row">
                    <button type="submit" className="btn btn-submit col-md-12" onClick={this.handleSubmit.bind(this)}>Submit</button>
                </div>
            </div>
        );
  }
}
