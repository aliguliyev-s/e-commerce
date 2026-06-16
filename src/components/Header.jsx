// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Include useNavigate for redirecting after logout
import { useApp } from '../context/AppContext';

export const Header = () => {
  // Get user data and logout helper from global App context
  const { cart, wishlist, currentUser, logoutUser } = useApp();
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalWishlistItems = wishlist.length;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHeaderLogout = () => {
    logoutUser();
    navigate('/'); // Redirect to home after logout
  };

  return (
    <header className={`navbar navbar-expand-lg navbar-dark bg-dark ${isSticky ? 'sticky-top shadow' : ''}`} style={{ transition: 'all 0.3s' }}>
      <div className="container">
        {/* Clicking logo returns to home (catalog) */}
        <Link className="navbar-brand fw-bold" to="/">
          <i className="bi bi-shop me-2 text-warning"></i>E-SHOP
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Shop</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin">Admin Dashboard</Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            {/* Dynamic auth block (shows profile or sign-in) */}
            {currentUser ? (
              <div className="d-flex align-items-center gap-2">
                {/* User name with link to profile */}
                <Link to="/profile" className="text-white text-decoration-none small fw-semibold border-end pe-3 me-1">
                  <i className="bi bi-person-circle me-1 text-warning"></i>
                  Hi, {currentUser.fullName.split(' ')[0]} {/* Show only first name */}
                </Link>
                {/* Quick logout button */}
                <button 
                  onClick={handleHeaderLogout} 
                  className="btn btn-sm btn-link text-secondary p-0 text-decoration-none me-2" 
                  title="Log Out"
                >
                  <i className="bi bi-box-arrow-right fs-5 hover-danger"></i>
                </button>
              </div>
            ) : (
              // Sign-in button for guest users
              <Link to="/login" className="btn btn-sm btn-outline-secondary text-white border-0 px-2 py-1 small fw-semibold me-2">
                <i className="bi bi-box-arrow-in-right me-1"></i>Sign In
              </Link>
            )}

            {/* Wishlist Icon */}
            <Link to="/wishlist" className="btn btn-outline-light position-relative px-2 py-1">
              <i className="bi bi-heart-fill text-danger"></i>
              {totalWishlistItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                  {totalWishlistItems}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <Link to="/cart" className="btn btn-warning position-relative px-3 py-1 fw-semibold">
              <i className="bi bi-cart3 me-1"></i> Cart
              {totalCartItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalCartItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};