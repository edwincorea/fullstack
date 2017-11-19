import React from "react";
import {Nav, NavItem, Navbar, Badge} from "react-bootstrap";

class Menu extends React.Component {
    render() {
        const totalCartItems = this.props.totalCartItems;
        
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
                            { (totalCartItems > 0) ? <Badge className="badge">{totalCartItems}</Badge> : ""}
                        </NavItem>
                    </Nav>                    
                </Navbar.Collapse>
            </Navbar>                                        
        );
    }
}

export default Menu;