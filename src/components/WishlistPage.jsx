// src/pages/WishlistPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';

export const WishlistPage = () => {
  const { wishlist } = useApp();

  // If wishlist is empty
  if (wishlist.length === 0) {
    return (
      <div className="container my-5 text-center py-5 bg-white rounded shadow-sm">
        <i className="bi bi-heartbreak text-muted display-1 d-block mb-3"></i>
        <h2 className="fw-bold">Your wishlist is empty</h2>
        <p className="text-muted">Browse the catalog to add products you like to your wishlist.</p>
        <Link to="/" className="btn btn-warning rounded-pill px-4 fw-bold mt-3">
          View Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold m-0">
          Wishlist <span className="text-muted fs-5">({wishlist.length} items)</span>
        </h2>
        <Link to="/" className="btn btn-outline-dark btn-sm rounded-pill px-3 fw-semibold">
          Back to catalog
        </Link>
      </div>

      {/* Grid of products from wishlist */}
      <div className="row">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};