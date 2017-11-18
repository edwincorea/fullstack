import React from "react";
import {Modal, Panel, Col, Row, Well, Button, ButtonGroup, Label} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import DeleteCartItemButton from "./deleteCartItemButton";
import UpdateCartItemQuantityButton from "./updateCartItemQuantityButton";

import {deleteCartItem, updateCart} from "../../actions/cartActions";

class Cart extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            showModal: false
        };

        this.renderEmptyCart = this.renderEmptyCart.bind(this);
        this.renderCart = this.renderCart.bind(this);        
        this.onDeleteCartItem = this.onDeleteCartItem.bind(this);        

        this.onIncrementCartItemQuantity = this.onIncrementCartItemQuantity.bind(this);        
        this.onDecrementCartItemQuantity = this.onDecrementCartItemQuantity.bind(this);        

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
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
                            <h6>qty. <Label bsStyle="success">{cart.quantity}</Label></h6>
                        </Col>
                        <Col xs={6} sm={4}>
                            <ButtonGroup style={{minWidth: "300px"}}>
                                <UpdateCartItemQuantityButton
                                    onDecrementCartItemQuantity={this.onDecrementCartItemQuantity}
                                    cartId={cart._id}
                                    quantity={cart.quantity}
                                    isIncrement={false}
                                />
                                <UpdateCartItemQuantityButton
                                    onIncrementCartItemQuantity={this.onIncrementCartItemQuantity}
                                    cartId={cart._id}
                                    isIncrement={true}
                                />                            
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
                <Row>
                    <Col xs={12}>
                        <h6>Total amount:</h6>
                        <Button onClick={this.open} bsStyle="success" bsSize="small">
                            Checkout
                        </Button>
                    </Col>
                </Row>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thank you!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>Your order has been saved</h6>
                        <p>You will receive an email confirmation.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Col xs={6}>
                            <h6>total $:</h6>
                        </Col>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>                
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
    
    onIncrementCartItemQuantity(_id){
        this.props.updateCart(_id, 1);        
    }

    onDecrementCartItemQuantity(_id, quantity){
        if (quantity > 1){
            this.props.updateCart(_id, -1);
        }        
    }

    render() {        
        if (this.props.cart.length > 0) {
            return this.renderCart();
        } else {
            return this.renderEmptyCart();
        }
    }

    open() {
        this.setState({
            showModal: true
        });
    }

    close() {
        this.setState({
            showModal: false
        });
    }    
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart.cart,

    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        deleteCartItem,
        updateCart
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

