import React, { useContext, useEffect, useState } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

const CartItems = () => {
  const { user, updateCartCount } = useContext(ShopContext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (!user) return;
    fetch(`http://localhost:4000/api/cart/${user.id}`)
      .then(res => res.json())
      .then(data => setCartItems(data.items || []));
  }, [user]);

  const addQuantity = (item) => {
    setCartItems(prev =>
      prev.map(p =>
        p.productId === item.productId && p.size === item.size
          ? { ...p, quantity: p.quantity + 1 }
          : p
      )
    );
    updateCartCount();
  };

  const removeQuantity = (productId, size) => {
    setCartItems(prev =>
      prev
        .map(p =>
          p.productId === productId && p.size === size
            ? { ...p, quantity: p.quantity - 1 }
            : p
        )
        .filter(p => p.quantity > 0)
    );
    updateCartCount();
  };

  const removeItem = (productId, size) => {
    setCartItems(prev =>
      prev.filter(p => !(p.productId === productId && p.size === size))
    );
    updateCartCount();
  };

  const totalAmount = cartItems.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  if (!cartItems.length) {
    return <div className="cartitems empty">Your cart is empty</div>;
  }

  return (
    <div className="cartitems">

      {/* DESKTOP HEADER */}
      <div className="cart-head">
        <span>Product</span>
        <span>Title</span>
        <span>Price</span>
        <span>Size</span>
        <span>Qty</span>
        <span>Total</span>
        <span></span>
      </div>

      {/* ITEMS */}
      {cartItems.map(item => (
        <div className="cart-row" key={`${item.productId}-${item.size}`}>

          <div className="image-box">
            {item.image ? (
              <img src={item.image} alt={item.name} />
            ) : (
              <div className="image-placeholder">
                {item.name.charAt(0)}
              </div>
            )}
          </div>

          <div className="cart-info">
            <h4>{item.name}</h4>
            <p className="muted">Size: {item.size}</p>

            {/* MOBILE DETAILS */}
            <div className="mobile-meta">
              <div>
                <span>Price</span>
                <strong>${item.price}</strong>
              </div>

              <div>
                <span>Qty</span>
                <div className="qty">
                  <button
                    className="qty-btn"
                    onClick={() => removeQuantity(item.productId, item.size)}
                    aria-label="Decrease quantity"
                  >
                    <FiMinus />
                  </button>

                  <span className="qty-value">{item.quantity}</span>

                  <button
                    className="qty-btn"
                    onClick={() => addQuantity(item)}
                    aria-label="Increase quantity"
                  >
                    <FiPlus />
                  </button>
                </div>

              </div>

              <div>
                <span>Total</span>
                <strong>${item.price * item.quantity}</strong>
              </div>
            </div>
          </div>

          {/* DESKTOP ONLY */}
          <div className="desktop-price">${item.price}</div>
          <div className="desktop-size">{item.size}</div>

          <div className="qty">
            <button
              className="qty-btn"
              onClick={() => removeQuantity(item.productId, item.size)}
              aria-label="Decrease quantity"
            >
              <FiMinus />
            </button>

            <span className="qty-value">{item.quantity}</span>

            <button
              className="qty-btn"
              onClick={() => addQuantity(item)}
              aria-label="Increase quantity"
            >
              <FiPlus />
            </button>
          </div>


          <div className="desktop-total">
            ${item.price * item.quantity}
          </div>

          <button
            className="remove"
            onClick={() => removeItem(item.productId, item.size)}
            aria-label="Remove item"
          >
            <FiTrash2 />
          </button>
        </div>
      ))}

      {/* BOTTOM */}
      <div className="cart-bottom">
        <div className="totals">
          <h2>Cart Totals</h2>

          <div className="line">
            <span>Subtotal</span>
            <span>${totalAmount}</span>
          </div>

          <div className="line">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <div className="line grand">
            <span>Total</span>
            <span>${totalAmount}</span>
          </div>

          <button className="checkout">PROCEED TO CHECKOUT</button>
        </div>

        <div className="promo">
          <p>If you have a promo code</p>
          <div className="promo-box">
            <input placeholder="Promo code" />
            <button>Apply</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CartItems;
