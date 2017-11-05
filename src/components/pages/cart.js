import React from "react";
import {connect} from "react-redux";
import {Panel, Col, Row, Well, Button} from "react-bootstrap";

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
                <Panel key={cart.id}>
                    <Row>
                        <Col xs={12} sm={4}>
                            <h6>{cart.title}</h6>
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

