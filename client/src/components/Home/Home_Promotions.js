import React from 'react';

import MyButton from './../utils/buttom';

const Home_Promotions = (props) => {
    const promotions = {
        img: '/images/featured/featured_home_3.jpg',
        lineOne: 'Up to 40% off',
        lineTwo: 'In second hand guitars',
        linkTitle: 'Shop now',
        linkTo: '/shop',
    }

    const renderPromotions = () => (
        promotions ? 
            <div className="home_promotion_img" style={{
                background:`url(${promotions.img})`
            }}>
                <div className="tag title">{promotions.lineOne}</div>
                <div className="tag low_title">{promotions.lineTwo}</div>
                <div>
                    <MyButton
                        type='default'
                        title={promotions.linkTitle}
                        linkTo={promotions.linkTo}
                        addStyles={{
                            margin:'10px 0 0 0'
                        }}
                    />
                </div>
            </div>
        : null
    )
    
    return (
        <div className='home_promotion'>
            {renderPromotions()}
        </div>
    );
};

export default Home_Promotions;