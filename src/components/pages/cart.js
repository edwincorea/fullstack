import React from "react";
import {connect} from "react-redux";
import {Panel, Col, Row, Well, Button, ButtonGroup, Label} from "react-bootstrap";

class Cart extends React.Component {
    constructor(props){
        super(props);

        this.renderEmptyCart = this.renderEmptyCart.bind(this);
        this.renderCart = this.renderCart.bind(this);        
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
                                <Button bsStyle="danger" bsSize="small">Delete</Button>
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

export default connect(mapStateToProps)(Cart);

