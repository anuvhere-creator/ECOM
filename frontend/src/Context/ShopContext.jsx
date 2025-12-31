import React, { createContext, useState, useEffect } from "react";
import all_product from "../Components/Assets/all_product";

// Context creation
export const ShopContext = createContext(null);

// Provider component
const ShopContextProvider = ({ children }) => {
  // Initialize cart from localStorage or default
  const getDefaultCart = () => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      return JSON.parse(savedCart);
    }
    
    let cart = {};
    for (let i = 0; i < all_product.length; i++) {
      cart[all_product[i].id] = 0;
    }
    return cart;
  };

  const [cartItems, setCartItems] = useState(getDefaultCart());

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] + 1,
    }));
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    if (cartItems[itemId] > 0) {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: prev[itemId] - 1,
      }));
    }
  };

  // Clear item from cart completely
  const clearItemFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: 0,
    }));
  };

  // Update item quantity directly
  const updateCartItemCount = (newAmount, itemId) => {
    if (newAmount >= 0) {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: newAmount,
      }));
    }
  };

  // Calculate total cart amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = all_product.find((product) => product.id === Number(item));
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  // Total cart items
  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce((sum, val) => sum + val, 0);
  };

  // Clear entire cart
  const clearCart = () => {
    const emptyCart = {};
    for (let i = 0; i < all_product.length; i++) {
      emptyCart[all_product[i].id] = 0;
    }
    setCartItems(emptyCart);
  };

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    clearItemFromCart,
    updateCartItemCount,
    getTotalCartAmount,
    getTotalCartItems,
    clearCart,
  };

  return <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
