"use strict";
import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Grid, Col, Row, Button} from "react-bootstrap";

import {getBooks} from "../../actions/booksActions";

class BooksList extends React.Component {
    componentDidMount() {
        // Dispatch an action
        this.props.getBooks();
    }

    render() {
        const booksList = this.props.books.map((book) => {
            return (
                <div key={book.id}>
                    <h2>{book.title}</h2>
                    <h2>{book.description}</h2>
                    <h2>{book.price}</h2>
                    <Button bsStyle="primary">Buy now</Button>
                </div>
            );
        });
        return (
            <Grid>
                <Row style={{marginTop: "15px"}}>
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
