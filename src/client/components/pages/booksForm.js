import React from "react";
import {findDOMNode} from "react-dom";
import {Well, Panel, FormGroup, FormControl, ControlLabel, Button} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {postBooks, deleteBook} from "../../actions/booksActions";

class BooksForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    handleSubmit(){        
        const title = findDOMNode(this.refs.title).value;
        const description = findDOMNode(this.refs.description).value;
        const price = findDOMNode(this.refs.price).value;

        if (title && description && price) {
            const book = [{
                title,
                description,
                price 
            }];
    
            this.props.postBooks(book, () => {
                this.props.history.push("/");
            });        
        }        
    }

    onDelete(){
        const bookId = findDOMNode(this.refs.delete).value;

        if (bookId > 0) {
            this.props.deleteBook(bookId);
        }        
    }

    render() {
        const bookList = this.props.books.map((book) => {
            return (
                <option key={book._id} value={book._id}>{book.title}</option>
            );
        });

        return (
            <Well>
                <Panel>
                    <FormGroup controlId="title">
                        <ControlLabel>Title</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter Title"
                            ref="title" />           
                    </FormGroup>
                    <FormGroup controlId="description">
                        <ControlLabel>Description</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter Description"
                            ref="description" />           
                    </FormGroup>                
                    <FormGroup controlId="price">
                        <ControlLabel>Price</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter Price"
                            ref="price" />           
                    </FormGroup>   
                    <Button bsStyle="primary" onClick={this.handleSubmit}>Save book</Button>
                </Panel>
                <Panel style={{marginTop: "25px"}}>
                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Select a book to delete</ControlLabel>
                        <FormControl ref="delete" componentClass="select" placeholder="select">
                            <option value="0">select</option>
                            {bookList}
                        </FormControl>
                    </FormGroup>
                    <Button onClick={this.onDelete} bsStyle="danger">Delete book</Button>
                </Panel>
            </Well>
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
        postBooks,
        deleteBook
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);

