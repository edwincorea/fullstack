import React from "react";
import Menu from "./components/menu";
import Footer from "./components/footer";

import {connect} from "react-redux";

class Layout extends React.Component {
    render() {
        return (
            <div>
                <Menu totalCartItems={this.props.totalQty} />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        totalQty: state.cart.totalQty
    };
};

export default connect(mapStateToProps)(Layout);