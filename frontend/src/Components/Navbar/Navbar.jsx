import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();
  const [menu, setMenu] = useState("shop");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getTotalCartItems } = useContext(ShopContext);

  // Update active menu based on current path
  useEffect(() => {
    const path = location.pathname;
    if (path === "/") setMenu("shop");
    else if (path === "/mens") setMenu("mens");
    else if (path === "/womens") setMenu("womens");
    else if (path === "/kids") setMenu("kids");
  }, [location]);

  const navItems = [
    { id: "shop", label: "Shop", path: "/" },
    { id: "mens", label: "Men", path: "/mens" },
    { id: "womens", label: "Women", path: "/womens" },
    { id: "kids", label: "Kids", path: "/kids" },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="navbar">
      {/* Left side logo */}
      <div className="nav-logo">
        <Link to="/">
          <img src={logo} alt="Shopper Logo" />
        </Link>
        <p>SHOPPER</p>
      </div>

      {/* Mobile menu toggle */}
      <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Middle menu */}
      <ul className={`nav-menu ${mobileMenuOpen ? 'mobile-active' : ''}`}>
        {navItems.map((item) => (
          <li
            key={item.id}
            onClick={() => {
              setMenu(item.id);
              setMobileMenuOpen(false);
            }}
            className={menu === item.id ? "active" : ""}
          >
            <Link to={item.path}>{item.label}</Link>
            {menu === item.id && <hr />}
          </li>
        ))}
      </ul>

      {/* Right side login & cart */}
      <div className="nav-login-cart">
        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>

        <Link to="/cart" className="cart-wrapper">
          <img src={cart_icon} alt="Cart" />
          <span className="nav-cart-count">{getTotalCartItems()}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
