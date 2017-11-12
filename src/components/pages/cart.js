import React from "react";
import {Panel, Col, Row, Well, Button, ButtonGroup, Label} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import DeleteCartItemButton from "./deleteCartItemButton";
import {deleteCartItem} from "../../actions/cartActions";

class Cart extends React.Component {
    constructor(props){
        super(props);

        this.renderEmptyCart = this.renderEmptyCart.bind(this);
        this.renderCart = this.renderCart.bind(this);        
        this.onDeleteCartItem = this.onDeleteCartItem.bind(this);        
    }

    renderEmptyCart() {
        return (
            <Panel header="Cart" bsStyle="primary">
                <h6>Empty Cart</h6>
            </Panel>
        );
    }

    renderCart() {
        const cartItemsList = this.props.cart.map((cart) => {
            return (
                <Panel key={cart._id}>
                    <Row>
                        <Col xs={12} sm={4}>
                            <h6>{cart.title}</h6><span>    </span>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>usd. {cart.price}</h6>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>qty. <Label bsStyle="success"></Label></h6>
                        </Col>
                        <Col xs={6} sm={4}>
                            <ButtonGroup style={{minWidth: "300px"}}>
                                <Button bsStyle="default" bsSize="small">-</Button>
                                <Button bsStyle="default" bsSize="small">+</Button>
                                <span>     </span>
                                <DeleteCartItemButton 
                                    onDeleteCartItem={this.onDeleteCartItem}
                                    cartId={cart._id}
                                />
                            </ButtonGroup>
                        </Col>
                        
                    </Row>                
                </Panel>
            );
        });
        
        return (
            <Panel header="Cart" bsStyle="primary">
                {cartItemsList}
            </Panel>
        );
    }

    onDeleteCartItem(_id){
        // Get a copy of current books in cart
        const currentBookToDelete = this.props.cart;
        
        // Get index of book to delete
        const indexDelete = currentBookToDelete.findIndex(
            cart => cart._id === _id
        );

        // Use slice to remove the book at indexDelete
        const cartAfterDelete = [
            ...currentBookToDelete.slice(0, indexDelete), 
            ...currentBookToDelete.slice(indexDelete + 1)
        ];
                
        this.props.deleteCartItem(cartAfterDelete);
    }        

    render() {        
        if (this.props.cart.length > 0) {
            return this.renderCart();
        } else {
            return this.renderEmptyCart();
        }
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart.cart,

    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        deleteCartItem
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

