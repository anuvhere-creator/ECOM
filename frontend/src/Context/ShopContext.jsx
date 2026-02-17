import React, { createContext, useState, useEffect } from "react";
import all_product from "../Components/Assets/all_product";

// Context creation
export const ShopContext = createContext(null);

// Provider component
const ShopContextProvider = ({ children }) => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('userData');
    
    if (token) {
      setIsAuthenticated(true);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  // Fetch cart count when user changes
  useEffect(() => {
    if (user) {
      fetchCartCount();
    } else {
      setCartCount(0);
    }
  }, [user]);

  const fetchCartCount = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/cart/${user.id}`);
      const data = await response.json();
      const total = data.items ? data.items.reduce((sum, item) => sum + item.quantity, 0) : 0;
      setCartCount(total);
    } catch (error) {
      console.error("Error fetching cart count:", error);
      setCartCount(0);
    }
  };

  // Login function
  const login = (token, userData) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userData', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUser(null);
    setCartCount(0);
  };
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
    // Authentication
    isAuthenticated,
    user,
    login,
    logout,
    cartCount,
    updateCartCount: fetchCartCount,
  };

  return <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
