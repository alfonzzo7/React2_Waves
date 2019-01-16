import React, { Component } from 'react';
import { connect } from 'react-redux';

import Home_Silder from './Home_Silder';
import Home_Promotions from './Home_Promotions';
import { getProductsBySell, getProductsByArrival } from '../../redux/actions/products_actions';
import CardBlock from './../utils/card_block';

class Home extends Component {
    componentDidMount() {
        this.props.dispatch(getProductsBySell());
        this.props.dispatch(getProductsByArrival());
    }


    render() {
        return (
            <div>
                <Home_Silder/>
                <CardBlock list={this.props.products.bySell} title='Best Selling Guitars'/>
                <Home_Promotions/>
                <CardBlock list={this.props.products.byArrival} title='New Arrivals'/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(Home);