import React from "react";
import {Button} from "react-bootstrap";

class DeleteCartItemButton extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onDeleteCartItem(this.props.cartId);
    }

    render() {
        return (
            <Button bsStyle="danger" bsSize="small" onClick={this.handleClick}>Delete</Button>
        );
    }
} 

export default DeleteCartItemButton;
