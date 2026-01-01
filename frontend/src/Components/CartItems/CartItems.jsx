import React, { useContext, useState, useEffect } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";

const CartItems = () => {
  const { user, updateCartCount } = useContext(ShopContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart items on component mount
  useEffect(() => {
    if (user) {
      fetchCartItems();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchCartItems = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/cart/${user.id}`);
      const data = await response.json();
      setCartItems(data.items || []);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

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
  };

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
  };

  // Calculate total amount
  const getTotalCartAmount = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (loading) {
    return (
      <div className="cartitems">
        <p>Loading products...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cartitems">
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="cartitems">
      {/* Cart Header */}
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Size</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {/* Cart Items */}
      {cartItems.map((item) => (
        <div key={`${item.productId}-${item.size}`}>
          <div className="cartitems-format">
            <img src={item.image} alt="" className="carticon-product-icon" />
            <p>{item.name}</p>
            <p>${item.price}</p>
            <p>{item.size}</p>
            <div className="cartitems-quantity-controls">
              <button onClick={() => removeQuantity(item.productId, item.size)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => addQuantity(item)}>+</button>
            </div>
            <p>${item.price * item.quantity}</p>
            <img
              src={remove_icon}
              onClick={() => removeItem(item.productId, item.size)}
              alt="remove"
              className="cartitems-remove-icon"
            />
          </div>
          <hr />
        </div>
      ))}

      {/* Cart Totals Section */}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>

        {/* Promo Code Section */}
        <div className="cartitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
