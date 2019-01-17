import React from 'react';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTruck, faCheck, faTimes } from '@fortawesome/fontawesome-free-solid';

import MyButton from './../utils/buttom';

const ProductInfo = (props) => {
    const showProdTags = (product) => (
        <div className="product_tags">
            {
                product.shipping ?
                    <div className="tag">
                        <div><FontAwesomeIcon icon={faTruck}/></div>
                        <div className="tag_text">
                            <div>Free shipping</div>
                            <div>And return</div>
                        </div>
                    </div>
                : null
            }
            {
                product.available ?
                    <div className="tag">
                        <div><FontAwesomeIcon icon={faCheck}/></div>
                        <div className="tag_text">
                            <div>Available</div>
                            <div>in store</div>
                        </div>
                    </div>
                : 
                    <div className="tag">
                        <div><FontAwesomeIcon icon={faTimes}/></div>
                        <div className="tag_text">
                            <div>Not available</div>
                            <div>in store</div>
                        </div>
                    </div>
            }
        </div>
    )

    const showProdActions = (product) => (
        <div className="product_actions">
            <div className="price">$ {product.price}</div>
            <div className="cart">
                <MyButton
                    type='add_to_cart_link'
                    runAction={() => props.addToCart(product._id)}
                />
            </div>
        </div>
    )

    const showProdSpecs = (product) => (
        <div className="product_specifications">
            <h2>Specs</h2>
            <div>
                <div className="item"><strong>Frets:</strong> {product.frets}</div>
                <div className="item"><strong>Wood:</strong> {product.wood.name}</div>
            </div>
        </div>
    )

    const product = props.product;
    return (
        <div>
            <h1>{product.brand.name} {product.name}</h1>
            <p>
                {product.description}
            </p>
            {showProdTags(product)}
            {showProdActions(product)}
            {showProdSpecs(product)}
        </div>
    );
};

export default ProductInfo;