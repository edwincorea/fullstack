"use strict";
import React from "react";
import {findDOMNode} from "react-dom";
import {Well, Panel, FormGroup, FormControl, ControlLabel, Button} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {postBooks} from "../../actions/booksActions";

class BooksForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(){        
        const book = [{
            title: findDOMNode(this.refs.title).value,
            description: findDOMNode(this.refs.description).value,
            price: findDOMNode(this.refs.price).value
        }];

        this.props.postBooks(book, () => {
            this.props.history.push("/");
        });        
    }

    render() {
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
            </Well>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({postBooks}, dispatch);
};

export default connect(null, mapDispatchToProps)(BooksForm);

