import React, { Component } from 'react';
import { connect } from 'react-redux';

import PageTop from './../utils/page_top';
import { getProductDetail, clearPayload } from './../../redux/actions/products_actions';
import { CLEAR_PRODUCT_DETAIL } from './../../redux/actions/types';
import ProductInfo from './ProductInfo';
import { CircularProgress } from '@material-ui/core';
import ProductImgs from './ProductImgs';
import { addToUserCart } from './../../redux/actions/user_actions';
import DialogBox from './../utils/dialogBox';

class Product extends Component {
    state = {
        openDialog: false
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.dispatch(getProductDetail(id)).then(() => {
            if (!this.props.products.productDetail) {
                this.props.history.push('/');
            }
        });
    }

    componentWillUnmount() {
        this.props.dispatch(clearPayload(CLEAR_PRODUCT_DETAIL));
    }

    addToCartHandler = (id) => {
        this.props.user.userData.isAuth ?
            this.props.dispatch(addToUserCart(id))
        : 
            this.setState({
                openDialog: true
            }, () => {
                setTimeout(() => {
                    this.setState({
                        openDialog: false
                    });
                }, 3000);
            });
    }
    

    render() {
        const product = this.props.products.productDetail;
        return (
            <div>
                <PageTop
                    title='Product detail'
                />
                <div className="container">
                    {
                        product ? 
                            <div className="product_detail_wrapper">
                                <div className="left">
                                    <div style={{width:'500px'}}>
                                        <ProductImgs
                                            product={product}
                                        />
                                    </div>
                                </div>
                                <div className="right">
                                    <ProductInfo
                                        product={product}
                                        addToCart={(id) => this.addToCartHandler(id)}
                                    />
                                </div>
                            </div>
                        : 
                            <div className="main_loader">
                                <CircularProgress
                                    style={{color:'#00bcd4'}}
                                    thickness={7}
                                />
                            </div>
                    }
                </div>

                <DialogBox
                    open={this.state.openDialog}
                    title='Atention!!!'
                    msg='You need to log in to add products to you cart'
                />

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
        user: state.user
    }
}

export default connect(mapStateToProps)(Product);