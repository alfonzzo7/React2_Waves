import React, { Component } from 'react';
import { connect } from 'react-redux';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faFrown, faSmile } from '@fortawesome/fontawesome-free-solid';

import UserLayout from './../../hoc/UserLayout';
import { getCartItems, removeFromUserCart, successUserBuy } from '../../redux/actions/user_actions';
import ProductBlock from '../utils/User/ProductBlock';
import Paypal from './../utils/paypal';

class Cart extends Component {
    state = {
        loading: true,
        total: 0,
        showTotal: false,
        showSuccess: false,
    }

    componentDidMount() {
        let cartItems = [];
        let user = this.props.user;

        if (user.userData.cart && user.userData.cart.length > 0) {
            user.userData.cart.forEach(item => {
                cartItems.push(item.id);
            });

            this.props.dispatch(getCartItems(cartItems, user.userData.cart)).then(() => {
                if (this.props.user.cartDetail.length > 0) {
                    this.calcTotal(this.props.user.cartDetail);
                }
            });
        }
    }

    calcTotal = (cartDetail) => {
        let total = 0;

        cartDetail.forEach(item => {
            total += parseInt(item.price, 10) * item.quantity;
        });

        this.setState({
            total,
            showTotal: true
        });
    }

    removeFromCart = (id) => {
        this.props.dispatch(removeFromUserCart(id)).then(() => {
            if (this.props.user.cartDetail.length <= 0) {
                this.setState({
                    showTotal: false
                });
            } else {
                this.calcTotal(this.props.user.cartDetail);
            }
        });
    }

    showNoItemMessage = () => (
        <div className="cart_no_items">
            <FontAwesomeIcon icon={faFrown}/>
            <div>
                You don't have items in your cart
            </div>
        </div>
    )

    transErr = (data) => {
        console.log(data);
    }

    transCanceled = (data) => {
        console.log(data);
    }

    transSuccess = (data) => {
        this.props.dispatch(successUserBuy({
            cartDetail: this.props.user.cartDetail,
            paymentData: data
        })).then(() => {
            if (this.props.user.successBuy) {
                this.setState({
                    showTotal: false,
                    showSuccess: true
                });
            }
        })

    }

    render() {
        return (
            <UserLayout>
                <div>
                    <h1>My cart</h1>
                    <div className="user_cart">
                        <ProductBlock
                            products={this.props.user}
                            type='cart'
                            removeItem={(id) => this.removeFromCart(id)}
                        />
                        {
                            this.state.showTotal ?
                                <div>
                                    <div className="user_cart_sum">
                                        <div>
                                            Total amount: ${this.state.total}
                                        </div>
                                    </div>
                                </div>

                            :
                                this.state.showSuccess ?
                                    <div className="cart_no_items">
                                        <FontAwesomeIcon icon={faSmile}/>
                                        <div>
                                            THANK YOU.
                                        </div>
                                        <div>
                                            Your order is complete.
                                        </div>
                                    </div>
                                :
                                    this.showNoItemMessage()
                        }
                    </div>
                    {
                        this.state.showTotal ?
                            <div className="paypal_button_container">
                                <Paypal
                                    toPay={this.state.total}
                                    transErr={(data) => this.transErr(data)}
                                    transCanceled={(data) => this.transCanceled(data)}
                                    onSuccess={(data) => this.transSuccess(data)}
                                />
                            </div>
                        : null
                    }
                </div>
            </UserLayout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Cart);