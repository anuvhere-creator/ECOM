import React, { useContext, useEffect, useState } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

const CartItems = () => {
  const { user, updateCartCount } = useContext(ShopContext);
  const [cartItems, setCartItems] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetch(`http://localhost:4000/api/cart/${user.id}`)
      .then(res => res.json())
      .then(data => setCartItems(data.items || []));
  }, [user]);

  const addQuantity = async (item) => {
    try {
      const response = await fetch("http://localhost:4000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          product: {
            productId: item.productId,
            name: item.name,
            image: item.image,
            price: item.price,
            size: item.size,
          },
        }),
      });
      if (response.ok) {
        // Update local state
        setCartItems((prev) =>
          prev.map(cartItem =>
            cartItem.productId === item.productId && cartItem.size === item.size
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        );
        updateCartCount();
      }
    } catch (error) {
      console.error("Error adding quantity:", error);
    }
  };

  const removeQuantity = async (productId, size) => {
    try {
      const response = await fetch("http://localhost:4000/api/cart/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          productId,
          size,
          quantity: 1,
        }),
      });
      if (response.ok) {
        // Update local state
        setCartItems((prev) => {
          const newItems = prev.map(item => {
            if (item.productId === productId && item.size === size) {
              const newQty = item.quantity - 1;
              if (newQty <= 0) return null;
              return { ...item, quantity: newQty };
            }
            return item;
          }).filter(item => item !== null);
          return newItems;
        });
        updateCartCount();
      }
    } catch (error) {
      console.error("Error removing quantity:", error);
    }
  }

  const removeItem = async (productId, size) => {
    const item = cartItems.find(item => item.productId === productId && item.size === size);
    if (!item) return;

    try {
      const response = await fetch("http://localhost:4000/api/cart/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          productId,
          size,
          quantity: item.quantity,
        }),
      });
      if (response.ok) {
        // Update local state
        setCartItems((prev) => prev.filter(item => !(item.productId === productId && item.size === size)));
        updateCartCount();
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  }

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


                  <button className="qty-btn minus" onClick={() => removeQuantity(item.productId, item.size)}>−</button>

                  <span className="qty-value">{item.quantity}</span>
                  <button className="qty-btn plus" onClick={() => addQuantity(item)}>+</button>
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
            <button className="qty-btn minus" onClick={() => removeQuantity(item.productId, item.size)}>−</button>


            <span className="qty-value">{item.quantity}</span>

            <button className="qty-btn plus" onClick={() => addQuantity(item)}>+</button>
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
