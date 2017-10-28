"use strict";
import React from "react";
import {connect} from "react-redux";

class BooksList extends React.Component {
    render() {
        const booksList = this.props.books.map((book) => {
            return (
                <div key={book.id}>
                    <h2>{book.title}</h2>
                    <h2>{book.description}</h2>
                    <h2>{book.price}</h2>
                </div>
            );
        });
        return (
            <div>    
                <h1>Hello React</h1>
                {booksList}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        books: state.books.books
    };
};

export default connect(mapStateToProps)(BooksList);
