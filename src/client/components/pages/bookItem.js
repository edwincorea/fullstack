import React from "react";
import {Well, Row, Col, Button, Image} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {addToCart, updateCart} from "../../actions/cartActions";

class BookItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isClicked: false
        };

        this.onReadMore = this.onReadMore.bind(this);
        this.handleCart = this.handleCart.bind(this);
    }

    onReadMore() {
        this.setState({
            isClicked: true
        });
    }

    handleCart() {
        const book = [...this.props.cart, {
            _id: this.props._id,
            title: this.props.title,
            description: this.props.description,
            images: this.props.images,
            price: this.props.price,
            quantity: 1
        }];

        if (this.props.cart.length > 0) {
            const _id = this.props._id;
            
            const cartIndex = this.props.cart.findIndex((cart) => {
                return cart._id === _id;
            });            

            // -1: no item found in cart with that id 
            if (cartIndex === -1){
                this.props.addToCart(book);
            } else {
                // only update quantity
                this.props.updateCart(_id, 1, this.props.cart);
            }

        } else {
            // empty cart
            this.props.addToCart(book);            
        }        
    }

    render() {
        const description = this.props.description;
        const shortDescription = this.props.description.substring(0, 50);

        return (
            <Well>
                <Row>
                    <Col xs={12} sm={4}>
                        <Image src={this.props.images} responsive/>
                    </Col>
                    <Col xs={6} sm={8}>
                        <h6>{this.props.title}</h6>
                        <p>
                            {description.length > 50 && !this.state.isClicked 
                                ? shortDescription 
                                : description}
                            <button className="link" onClick={this.onReadMore}>
                                {!this.state.isClicked && description !== null && description.length > 50 
                                    ? "...read more"
                                    : ""}
                            </button>
                        </p>
                        <h6>usd. {Number(this.props.price).toFixed(2)}</h6>
                        <Button bsStyle="primary" onClick={this.handleCart}>Buy now</Button>
                    </Col>
                </Row>
            </Well>
        );
    }
} 

const mapStateToProps = (state) => {
    return {
        cart: state.cart.cart
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addToCart,
        updateCart
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BookItem);
