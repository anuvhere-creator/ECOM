import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo_big.png'
import { FaFacebook, FaInstagram, FaTwitter, FaPinterest, FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section">
          <div className="footer-logo">
            <img src={footer_logo} alt="Shopper Logo" />
            <p>SHOPPER</p>
          </div>
          <p className="footer-about">
            Discover the latest fashion trends with Shopper. Quality products at affordable prices, delivered to your doorstep.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/mens">Men</Link></li>
            <li><Link to="/womens">Women</Link></li>
            <li><Link to="/kids">Kids</Link></li>
          </ul>
        </div>

        {/* Help */}
        <div className="footer-section">
          <h3>Help</h3>
          <ul className="footer-links">
            <li><Link to="#">Customer Support</Link></li>
            <li><Link to="#">Shipping Info</Link></li>
            <li><Link to="#">Returns & Exchange</Link></li>
            <li><Link to="#">How To Order</Link></li>
            <li><Link to="#">Track Order</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact</h3>
          <ul className="footer-links">
            <li>Email: support@shopper.com</li>
            <li>Phone: +1 (123) 456-7890</li>
            <li>Address: 123 Fashion St, Style City</li>
          </ul>
        </div>
      </div>

      {/* Social Media */}
      <div className="footer-social">
        <h3>Follow Us</h3>
        <div className="footer-social-icons">
          <div className="footer-icons-container">
            <FaFacebook />
          </div>
          <div className="footer-icons-container">
            <FaInstagram />
          </div>
          <div className="footer-icons-container">
            <FaTwitter />
          </div>
          <div className="footer-icons-container">
            <FaPinterest />
          </div>
          <div className="footer-icons-container">
            <FaWhatsapp />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-copyright">
        <p>Copyright © {new Date().getFullYear()} Shopper - All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
