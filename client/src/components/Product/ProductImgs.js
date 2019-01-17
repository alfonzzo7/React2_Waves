import React, { Component } from 'react';

import ImageLightBox from '../utils/lightbox';

class ProductImgs extends Component {
    state = {
        lightbox: false,
        imagePos: 0,
        lightboxImages: []
    }

    componentDidMount() {
        if (this.props.product.images.length > 0) {
            let lightboxImages = [];
            this.props.product.images.forEach(image => {
                lightboxImages.push(image.url);
            });
            this.setState({
                lightboxImages
            })
        }
    }

    renderCardImage = (images) => {
        if (images.length > 0) {
            return images[0].url;
        } else {
            return `/images/image_not_availble.png`
        }
    }

    handleLightBox = (i) => {
        if (this.state.lightboxImages.length > 0) {
            this.setState({
                lightbox: true,
                imagePos: i
            });
        }
    }

    handleLightBoxClose = () => {
        this.setState({
            lightbox: false
        });
    }

    showThumbs = () => (
        this.state.lightboxImages.map((image, i) => (
            i > 0 ?
                <div 
                    className='thumb' 
                    key={i} 
                    onClick={() => this.handleLightBox(i)} 
                    style={{
                        background:`url(${image}) no-repeat`,
                        cursor:'pointer'
                    }}
                />
            : null
        ))
    ) 

    render() {
        const product = this.props.product;
        return (
            <div className='product_image_container'>
                <div className="main_pic">
                    <div
                        style={{background:`url(${this.renderCardImage(product.images)}) no-repeat`, cursor:'pointer'}}
                        onClick={() => this.handleLightBox(0)}
                    />
                </div>
                <div className="main_thumbs">
                    {this.showThumbs()}
                </div>
                {
                    this.state.lightbox ?
                        <ImageLightBox
                            id={product._id}
                            images={this.state.lightboxImages}
                            open={this.state.lightbox}
                            pos={this.state.imagePos}
                            onClose={() => this.handleLightBoxClose()}
                        />
                    : null
                }
            </div>
        );
    }
}

export default ProductImgs;