import React, { Component } from 'react';

import Header from '../components/HeaderFooter/Header';
import Footer from './../components/HeaderFooter/Footer/index';

class Layout extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div className="page_container">
                    {this.props.children}
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Layout;