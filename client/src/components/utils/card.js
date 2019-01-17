import React, { Component } from 'react';
import { connect } from 'react-redux';

import MyButton from './buttom';
import { addToUserCart } from '../../redux/actions/user_actions';
import DialogBox from './dialogBox';

class Card extends Component {
    state = {
        openDialog: false
    }

    renderCardImage(images) {
        if (images.length > 0) {
            return images[0].url;
        } else {
            return '/images/image_not_availble.png';
        }
    }

    render() {
        const props = this.props;
        return (
            <div className={`card_item_wrapper ${props.grid}`}>
                <div 
                    className="image" 
                    style={{
                        background:`url(${this.renderCardImage(props.images)}) no-repeat`
                    }}
                />
                <div className="action_container">
                    <div className="tags">
                        <div className="brand">
                            {props.brand.name}
                        </div>
                        <div className="name">
                            {props.name}
                        </div>
                        <div className="price">
                            ${props.price}
                        </div>
                    </div>
                    {
                        props.grid ?
                            <div className="description">
                                <p>
                                    {props.description}
                                </p>
                            </div>
                        : null
                    }
                    <div className="actions">
                        <div className="button_wrapp">
                            <MyButton
                                type='default'
                                altClass='card_link'
                                title='View product'
                                linkTo={`/product_detail/${props._id}`}
                                addStyle={{
                                    margin:'10px 0 0 0'
                                }}
                            />
                        </div>
                        <div className="button_wrapp">
                            <MyButton
                                type='bag_link'
                                runAction={() => {
                                    props.user.userData.isAuth ?
                                        this.props.dispatch(addToUserCart(props._id))
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
                                }}
                                altClass='card_link'
                                title='View product'
                                linkTo={`/product_detail/${props._id}`}
                                addStyle={{
                                    margin:'10px 0 0 0'
                                }}
                            />
                        </div>
                    </div>
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
        user: state.user
    }
}

export default connect(mapStateToProps)(Card);