import React from "react";
import {Nav, NavItem, Navbar, Badge} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getCart } from "../../client/actions/cartActions";

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
                        <LinkContainer to="/">
                            <NavItem eventKey={0}>Amazonian BooksShop</NavItem>
                        </LinkContainer>                                    
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer to="/about">
                            <NavItem eventKey={1}>About</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/contact">
                            <NavItem eventKey={2} >Contact Us</NavItem>
                        </LinkContainer>
                    </Nav>
                    <Nav pullRight>
                        <LinkContainer to="/admin">
                            <NavItem eventKey={1}>Admin</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/cart">
                            <NavItem eventKey={2}>Your Cart
                                { totalQty > 0 ? <Badge className="badge">{totalQty}</Badge> : ""}
                            </NavItem>                    
                        </LinkContainer>                                                
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