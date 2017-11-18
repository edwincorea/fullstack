import React from "react";

class Footer extends React.Component {
    render() {
        return (
            <Footer className="footer text-center">
                <div className="container">
                    <p className="footer-text">{`Copyright ${new Date().getFullYear()} Amazonian BooksShop. All rights reserved.`}</p>
                </div>
            </Footer>
        );
    }
}

export default Footer;