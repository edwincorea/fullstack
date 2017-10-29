"use strict";
import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Grid, Col, Row} from "react-bootstrap";

import BookItem from "./bookItem";
import BooksForm from "./booksForm";
import {getBooks} from "../../actions/booksActions";

class BooksList extends React.Component {
    componentDidMount() {
        // Dispatch an action
        this.props.getBooks();
    }

    render() {
        const booksList = this.props.books.map((book) => {
            return (
                <Col xs={12} sm={6} md={4} key={book.id}>
                    <BookItem
                        id={book.id}
                        title={book.title}
                        description={book.description}
                        price={book.price}
                    />                                
                </Col>
            );
        });
        return (
            <Grid>
                <Row>
                    <Col xs={12} sm={6}>
                        <BooksForm />
                    </Col>
                    {booksList}                    
                </Row>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        books: state.books.books
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getBooks
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);
