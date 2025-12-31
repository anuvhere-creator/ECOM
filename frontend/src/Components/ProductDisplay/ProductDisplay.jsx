import React, { useContext } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);

  return (
    <div className='productdisplay'>
      {/* LEFT SIDE */}
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt={product.name} />
          <img src={product.image} alt={product.name} />
          <img src={product.image} alt={product.name} />
          <img src={product.image} alt={product.name} />  
        </div>
        <div className="productdisplay-img">
          <img className='productdisplay-main-img' src={product.image} alt={product.name} />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="productdisplay-right">
        <h1>{product.name}</h1>

        {/* Stars */}
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="star" />
          <img src={star_icon} alt="star" />
          <img src={star_icon} alt="star" />
          <img src={star_icon} alt="star" />
          <img src={star_dull_icon} alt="star" />
          <p>(122)</p>
        </div>

        {/* Prices */}
        <div className="productdisplay-right-prices">
          <div className='productdisplay-right-price-new'>${product.new_price}</div>
          <div className='productdisplay-right-price-old'>${product.old_price}</div>
        </div>

        {/* Description */}
        <div className="productdisplay-right-description">
          A lightweight, water-resistant jacket that's perfect for travel and outdoor adventures.
          Made from recycled materials, this jacket features a comfortable fit, adjustable hood, and multiple pockets for convenience.
        </div>

        {/* Sizes */}
        <div className="productdisplay-right-size">
          <h1 className="productdisplay-right-size-h1">Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div className="product-right-size-div">S</div>
            <div className="product-right-size-div">M</div>
            <div className="product-right-size-div">L</div>
            <div className="product-right-size-div">XL</div>
            <div className="product-right-size-div">XXL</div>
          </div>
          <button onClick={() => addToCart(product.id)}>ADD TO CART</button>
          <p className='productdisplay-right-category'><span>Category :</span> {product.category}</p>
          <p className='productdisplay-right-category'><span>Tags :</span> {product.tags}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
