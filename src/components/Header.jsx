import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

// Header component: handles top navigation, mobile menu, sticky behavior,
// and shows quick-access icons for profile, wishlist and cart.
export const Header = () => {
  const { cart, wishlist, currentUser, logoutUser } = useApp();
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // mobile menu open state
  const navigate = useNavigate();

  // Compute counts for badge indicators
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalWishlistItems = wishlist.length;

  // Add/remove scroll listener to toggle sticky header class
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Logout handler: sign out, close menu and redirect home
  const handleHeaderLogout = () => {
    logoutUser();
    setIsMenuOpen(false);
    navigate('/');
  };

  return (
    <header className={`navbar navbar-expand-lg navbar-dark bg-dark ${isSticky ? 'sticky-top shadow' : ''}`} style={{ transition: 'all 0.3s' }}>
      <div className="container">

        {/* Mobile hamburger toggle button */}
        <button
          className="navbar-toggler me-2"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Brand / logo link */}
        <Link className="navbar-brand fw-bold me-auto" to="/" onClick={() => setIsMenuOpen(false)}>
          <i className="bi bi-shop me-2 text-warning"></i>E-SHOP
        </Link>

        {/* Quick action icons (profile/wishlist/cart) - visible on mobile and desktop */}
        <div className="d-flex align-items-center gap-2 gap-sm-3 order-lg-3">
          {/* Profile / Login section */}
          {currentUser ? (
            <div className="d-flex align-items-center gap-2">
              <Link to="/profile" className="text-white text-decoration-none small fw-semibold border-end pe-2 pe-sm-3 me-1" onClick={() => setIsMenuOpen(false)}>
                <i className="bi bi-person-circle me-1 text-warning fs-5 fs-lg-6"></i>
                <span className="d-none d-sm-inline">Hi, {currentUser.fullName.split(' ')[0]}</span>
              </Link>
              <button
                onClick={handleHeaderLogout}
                className="btn btn-sm btn-link text-secondary p-0 text-decoration-none me-1 me-sm-2"
                title="Log Out"
              >
                <i className="bi bi-box-arrow-right fs-5"></i>
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-sm btn-outline-secondary text-white border-0 px-2 py-1 small fw-semibold me-1 me-sm-2" onClick={() => setIsMenuOpen(false)}>
              <i className="bi bi-box-arrow-in-right fs-5 d-sm-none"></i>
              <span className="d-none d-sm-inline"><i className="bi bi-box-arrow-in-right me-1"></i>Sign In</span>
            </Link>
          )}

          {/* Wishlist button with badge */}
          <Link to="/wishlist" className="btn btn-outline-light position-relative px-2 py-1" onClick={() => setIsMenuOpen(false)}>
            <i className="bi bi-heart-fill text-danger"></i>
            {totalWishlistItems > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark small" style={{ fontSize: '0.7rem' }}>
                {totalWishlistItems}
              </span>
            )}
          </Link>

          {/* Cart button with badge */}
          <Link to="/cart" className="btn btn-warning position-relative px-2 px-sm-3 py-1 fw-semibold" onClick={() => setIsMenuOpen(false)}>
            <i className="bi bi-cart3"></i> <span className="d-none d-sm-inline">Cart</span>
            {totalCartItems > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger small" style={{ fontSize: '0.7rem' }}>
                {totalCartItems}
              </span>
            )}
          </Link>
        </div>

        {/* Collapsible navigation links (Shop, Admin) - toggled on mobile */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show mt-3 mt-lg-0' : ''}`} id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 border-top border-secondary pt-2 pt-lg-0 border-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/" onClick={() => setIsMenuOpen(false)}>Shop</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin" onClick={() => setIsMenuOpen(false)}>Admin Dashboard</Link>
            </li>
          </ul>
        </div>

      </div>
    </header>
  );
};