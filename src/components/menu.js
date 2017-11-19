import React from "react";
import {Nav, NavItem, Navbar, Badge} from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCart } from "../../src/actions/cartActions";

class Menu extends React.Component {
    componentDidMount(){
        this.props.getCart();
    }

    render() {
        const totalQty = this.props.totalQty;
        
        return (
            <Navbar inverse fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">Amazonian BooksShop</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="/about">About</NavItem>
                        <NavItem eventKey={2} href="/contact">Contact Us</NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="/admin">Admin</NavItem>
                        <NavItem eventKey={2} href="/cart">Your Cart
                            { totalQty > 0 ? <Badge className="badge">{totalQty}</Badge> : ""}
                        </NavItem>
                    </Nav>                    
                </Navbar.Collapse>
            </Navbar>                                        
        );
    }
}

const mapStateToProps = (state) => {
    return {
        totalQty: state.cart.totalQty
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            getCart
        }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);