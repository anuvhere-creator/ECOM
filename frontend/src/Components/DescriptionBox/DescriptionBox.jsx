import React from 'react';
import './DescriptionBox.css';

const DescriptionBox = () => {
    return (
        <div className='descriptionbox'>
            <div className="descriptionbox-navigator">
                <div className="descriptionbox-navi-box">Description</div>
                <div className="descriptionbox-navi-fade">Reviews</div>
            </div>
            <div className="descriptionbox-description">
                <p>
                    An e-commerce website is an online platform that allows people to buy and sell products or services through the internet.
                    It provides customers with the convenience of browsing different categories, comparing prices, reading reviews,
                    and placing orders from anywhere and at any time.
                    E-commerce websites can be of different types such as B2B (business-to-business), B2C (business-to-customer), C2C (customer-to-customer),
                    and subscription-based models. They usually include features like product catalogs, shopping carts, secure payment gateways,
                    and delivery tracking to ensure smooth transactions. Popular examples of e-commerce websites include Amazon, Flipkart, eBay, and Alibaba,
                    which have transformed the way people shop by making it faster, easier, and more accessible.
                </p>
                <p>
                    E-commerce websites have revolutionized the way people shop by providing a convenient
                    and efficient platform for buying and selling products and services online.
                </p>
            </div>
        </div>
    );
}

export default DescriptionBox;
