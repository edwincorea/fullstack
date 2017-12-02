import React from "react";
import {Button} from "react-bootstrap";

class UpdateCartItemQuantityButton extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (this.props.isIncrement){
            this.props.onIncrementCartItemQuantity(this.props.cartId);
        } else {
            this.props.onDecrementCartItemQuantity(this.props.cartId, this.props.quantity);
        }        
    }

    render() {
        return (
            <Button bsStyle="default" bsSize="small" onClick={this.handleClick}>{this.props.isIncrement ? "+" : "-"}</Button>            
        );
    }
} 

export default UpdateCartItemQuantityButton;
