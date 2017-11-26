import React from "react";
import {findDOMNode} from "react-dom";
import {Well, Panel, FormGroup, MenuItem, InputGroup, DropdownButton, Image, Col, Row, FormControl, ControlLabel, Button} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import axios from "axios";

import {getBooks, postBooks, deleteBook, resetButton} from "../../actions/booksActions";

class BooksForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            images: [{}],
            currentImage: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.handleSelectImage = this.handleSelectImage.bind(this);        
        this.cleanForm = this.cleanForm.bind(this);        
    }

    componentDidMount() {
        this.props.getBooks();
        
        // Get images from API
        axios.get("/api/images")
            .then((response) => {
                this.setState({
                    images: response.data                    
                });
            })
            .catch((err) => {
                this.setState({
                    images: "error loading images from the server",
                    currentImage: ""
                });
            });
    }

    handleSubmit(){                
        const title = findDOMNode(this.refs.title).value;
        const description = findDOMNode(this.refs.description).value;
        const images = findDOMNode(this.refs.images).value; 
        const price = findDOMNode(this.refs.price).value;

        if (title && description && price) {
            const book = [{
                title,
                description,
                images,
                price
            }];
    
            this.props.postBooks(book, () => {
                this.props.history.push("/");
            });        
        }        
    }

    onDelete(){
        const bookId = findDOMNode(this.refs.delete).value;

        if (bookId.toString() !== "0") {                        
            this.props.deleteBook(bookId);
        }        
    }

    handleSelectImage(imageName) {
        this.setState({
            currentImage: `/images/${imageName}`
        });
    }

    cleanForm() {        
        findDOMNode(this.refs.title).value = "";
        findDOMNode(this.refs.description).value = "";
        findDOMNode(this.refs.price).value = "";
        this.setState({
            currentImage: ""
        });
        this.props.resetButton();
    }

    render() {
        const bookList = this.props.books.map((book) => {
            return (
                <option key={book._id} value={book._id}>{book.title}</option>
            );
        });

        const imageList = this.state.images.map((image, i) => {
            return (
                <MenuItem 
                    key={i} 
                    eventKey={image.name}
                    onClick={() => this.handleSelectImage(image.name)}>{image.name}</MenuItem>
            );
        });

        return (
            <Well>
                <Row>
                    <Col xs={12} sm={6}>
                        <Panel>
                            <InputGroup>
                                <FormControl type="text" ref="images" value={this.state.currentImage} />
                                <DropdownButton
                                    componentClass={InputGroup.Button}
                                    id="input-dropdown-addon"
                                    title="Select an image"
                                    bsStyle="primary">
                                    {imageList}
                                </DropdownButton>
                            </InputGroup>   
                            <Image src={this.state.currentImage} responsive />
                        </Panel>
                    </Col>
                    <Col xs={12} sm={6}>
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
                            <Button 
                                bsStyle={!this.props.style ? "primary" : this.props.style}
                                onClick={!this.props.msg ? this.handleSubmit : this.cleanForm}>
                                {!this.props.msg ? "Save book" : this.props.msg}
                            </Button>
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
                    </Col>
                </Row>
            </Well>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        books: state.books.books,
        msg: state.books.msg,
        style: state.books.style
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getBooks,
        postBooks,
        deleteBook,
        resetButton
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);

