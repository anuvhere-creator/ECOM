import React, { useContext, useState } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart, user, updateCartCount } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState('M'); // Default size
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const addToCartFun = async () => {
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }
    try {
      const response = await fetch("http://localhost:4000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
          
        },
        body: JSON.stringify({
          userId: user.id,
          product: {
            productId: product.id,
            name: product.name,
            image: product.image,
            price: product.new_price,
            size: selectedSize
          }
        })
      });
      if (response.ok) {
        setPopupMessage('Item added to cart successfully!');
        setShowPopup(true);
        updateCartCount(); // Update cart count in navbar
      } else {
        setPopupMessage('Failed to add item to cart. Please try again.');
        setShowPopup(true);
      }
    } catch (error) {
      setPopupMessage('Error adding item to cart. Please check your connection.');
      setShowPopup(true);
    }
  };


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
            <div 
              className={`product-right-size-div ${selectedSize === 'S' ? 'selected' : ''}`} 
              onClick={() => setSelectedSize('S')}
            >
              S
            </div>
            <div 
              className={`product-right-size-div ${selectedSize === 'M' ? 'selected' : ''}`} 
              onClick={() => setSelectedSize('M')}
            >
              M
            </div>
            <div 
              className={`product-right-size-div ${selectedSize === 'L' ? 'selected' : ''}`} 
              onClick={() => setSelectedSize('L')}
            >
              L
            </div>
            <div 
              className={`product-right-size-div ${selectedSize === 'XL' ? 'selected' : ''}`} 
              onClick={() => setSelectedSize('XL')}
            >
              XL
            </div>
            <div 
              className={`product-right-size-div ${selectedSize === 'XXL' ? 'selected' : ''}`} 
              onClick={() => setSelectedSize('XXL')}
            >
              XXL
            </div>
          </div>
          <button
            onClick={addToCartFun}
          >
            ADD TO CART
          </button>

          <p className='productdisplay-right-category'><span>Category :</span> {product.category}</p>
          <p className='productdisplay-right-category'><span>Tags :</span> {product.tags}</p>
        </div>
      </div>

      {/* Popup Message */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p>{popupMessage}</p>
            <button onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDisplay;
