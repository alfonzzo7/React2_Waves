import React, { Component } from 'react';
import { connect } from 'react-redux';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faBars, faTh } from '@fortawesome/fontawesome-free-solid';

import PageTop from '../utils/page_top';
import { getBrands, getWoods } from '../../redux/actions/products_actions';
import ColapseCheckbox from './../utils/colapse_checkbox';
import { frets, prices } from './../utils/Form/fixed_categories';
import ColapseRadio from './../utils/colapse_radio';
import { getProductsToShop } from './../../redux/actions/products_actions';
import LoadMoreCards from './LoadMoreCards';

class Shop extends Component {
    state = {
        grid: '',
        limit: 6,
        skip: 0,
        filters: {
            brand: [],
            frets: [],
            wood: [],
            price: [],
        }
    }

    componentDidMount() {
        this.props.dispatch(getBrands());
        this.props.dispatch(getWoods());

        this.props.dispatch(getProductsToShop(
            this.state.skip,
            this.state.limit,
            this.state.filters));
    }

    handlePrice = (value) => {
        const data = prices;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }

        return array;
    } 

    handleFilters = (filters, type) => {
        const newFilters = {...this.state.filters};
        newFilters[type] = filters;

        if (type === 'price') {
            let pricevalues = this.handlePrice(filters);
            newFilters[type] = pricevalues;
        }

        this.setState({
            filters: newFilters
        }, () => {
            this.showFilteredResults(newFilters);
        });
    }

    showFilteredResults = (filters) => {
        this.props.dispatch(getProductsToShop(
            0,
            this.state.limit,
            filters)).then(() => {
                this.setState({
                    skip: 0
                });
            });
    }

    loadMoreCards = () => {
        let skip = this.state.skip + this.state.limit;

        this.props.dispatch(getProductsToShop(
            skip,
            this.state.limit,
            this.state.filters,
            this.props.products.toShop)).then(() => this.setState({skip}));
    }

    handleGrid = () => {
        this.setState({
            grid: !this.state.grid ? 'grid_bars' : ''
        });
    }
    
    render() {
        const products = this.props.products;
        return (
            <div>
                <PageTop
                    title='Browse products'
                />
                <div className="container">
                    <div className="shop_wrapper">
                        <div className="left">
                            <ColapseCheckbox
                                initState={true}
                                title='Brands'
                                list={products.brands}
                                handleFilters={(filters) => this.handleFilters(filters, 'brand')}
                            />
                            <ColapseCheckbox
                                initState={false}
                                title='Frets'
                                list={frets}
                                handleFilters={(filters) => this.handleFilters(filters, 'frets')}
                            />
                            <ColapseCheckbox
                                initState={false}
                                title='Woods'
                                list={products.woods}
                                handleFilters={(filters) => this.handleFilters(filters, 'wood')}
                            />
                            <ColapseRadio
                                initState={true}
                                title='Price'
                                list={prices}
                                handleFilters={(filters) => this.handleFilters(filters, 'price')}
                            />
                        </div>
                        <div className="right">
                            <div className="shop_options">
                                <div className="shop_grids clear">
                                    <div
                                        className={`grid_btn ${this.state.grid ? '' : 'active'}`}
                                        onClick={() => this.handleGrid()}
                                    >
                                        <FontAwesomeIcon icon={faTh}/>
                                    </div>
                                    <div
                                        className={`grid_btn ${!this.state.grid ? '' : 'active'}`}
                                        onClick={() => this.handleGrid()}
                                    >
                                        <FontAwesomeIcon icon={faBars}/>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <LoadMoreCards
                                    grid={this.state.grid}
                                    limit={this.state.limit}
                                    size={products.toShopSize}
                                    products={products.toShop}
                                    loadMore={() => this.loadMoreCards()}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(Shop);