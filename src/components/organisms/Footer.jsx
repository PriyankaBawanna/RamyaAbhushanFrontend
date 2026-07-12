import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container container">
        <div className="footer-col">
          <h4>Aabhira Jewels</h4>
          <p>India's fashion jewellery destination — rings, earrings, necklaces and bridal sets.</p>
        </div>
        <div className="footer-col">
          <h4>Shop</h4>
          <Link to="/shop?category=earrings">Earrings</Link>
          <Link to="/shop?category=necklaces">Necklaces</Link>
          <Link to="/shop?category=rings">Rings</Link>
          <Link to="/shop?category=bridal-sets">Bridal Sets</Link>
        </div>
        <div className="footer-col">
          <h4>Help</h4>
          <Link to="/">Contact Us</Link>
          <Link to="/">Track Order</Link>
          <Link to="/">Returns &amp; Exchange</Link>
        </div>
        <div className="footer-col">
          <h4>Newsletter</h4>
          <p>Get updates on new arrivals &amp; offers.</p>
          <input type="email" placeholder="Your email" className="input" />
        </div>
      </div>
      <div className="footer-bottom">© {new Date().getFullYear()} Aabhira Jewels. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
