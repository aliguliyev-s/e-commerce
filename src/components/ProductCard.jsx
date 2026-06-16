// src/components/ProductCard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import { useApp } from '../context/AppContext';

export const ProductCard = ({ product }) => { 
  // Include cart in the context destructuring (used for 'already in cart' checks)
  const { addToCart, toggleWishlist, wishlist, cart } = useApp();
  
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');

  // Dynamically get image array depending on selected color
  const currentImages = product.images[selectedColor] || [];

  // FIXED: safe ID comparison using Number coercion
  const isInWishlist = wishlist.some(item => Number(item.id) === Number(product.id));

  // Reset carousel to first image when the selected color changes
  useEffect(() => {
    const carouselEl = document.getElementById(`carousel-${product.id}`);
    if (carouselEl && window.bootstrap?.Carousel) {
      const carousel = window.bootstrap.Carousel.getInstance(carouselEl);
      if (carousel) carousel.to(0);
    }
  }, [selectedColor, product.id]);

  const getStockBadge = () => {
    if (product.stock === 0) return <span className="badge bg-danger">Out of stock</span>;
    if (product.stock <= 5) return <span className="badge bg-warning text-dark">Only {product.stock} left</span>;
    return <span className="badge bg-success-subtle text-success">In Stock ({product.stock})</span>;
  };

  // FIXED: safe ID comparison for cart items
  const isAlreadyInCart = cart?.some(
    (item) => Number(item.id) === Number(product.id) && item.color === selectedColor && item.size === selectedSize
  );

  return (
    <div className="col-12 col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm position-relative border-0" style={{ transition: 'all 0.2s' }}>
        
        {/* Badges */}
        <div className="position-absolute top-0 start-0 m-2 d-flex flex-column gap-1" style={{ zIndex: 10 }}>
          {product.isNew && <span className="badge bg-success">New</span>}
          {getStockBadge()}
        </div>

        {/* FIXED: ensured proper zIndex, stopped click propagation and prevented default navigation when toggling wishlist */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle shadow-sm px-2 py-1"
          style={{ zIndex: 30, pointerEvents: 'auto' }}
          type="button"
        >
          <i className={`bi ${isInWishlist ? 'bi-heart-fill text-danger' : 'bi-heart'}`}></i>
        </button>

        {/* --- DYNAMIC BOOTSTRAP CAROUSEL FOR IMAGES --- */}
        <div id={`carousel-${product.id}`} className="carousel slide bg-light" data-bs-ride="false">
          <div className="carousel-indicators" style={{ marginBottom: '0.5rem', zIndex: 11 }}>
            {currentImages.map((_, index) => (
              <button 
                key={`${selectedColor}-${index}`}
                type="button" 
                data-bs-target={`#carousel-${product.id}`} 
                data-bs-slide-to={index} 
                className={index === 0 ? 'active' : ''}
                aria-current={index === 0 ? 'true' : 'false'}
              ></button>
            ))}
          </div>
          
          {/* Clicking the slider area (except arrows) navigates to the product page */}
          <Link to={`/product/${product.id}`} className="d-block text-decoration-none">
            <div className="carousel-inner" style={{ height: '250px' }}>
              {currentImages.map((img, index) => (
                <div key={`${selectedColor}-${index}`} className={`carousel-item h-100 ${index === 0 ? 'active' : ''}`}>
                  <img 
                    src={img} 
                    alt={`${product.title} - ${selectedColor}`} 
                    className="d-block w-100 h-100" 
                    style={{ objectFit: 'contain', backgroundColor: '#f8f9fa' }} 
                  />
                </div>
              ))}
            </div>
          </Link>

          {/* Carousel navigation arrows */}
          {currentImages.length > 1 && (
            <>
              <button className="carousel-control-prev" type="button" data-bs-target={`#carousel-${product.id}`} data-bs-slide="prev" style={{ zIndex: 12 }}>
                <span className="carousel-control-prev-icon" aria-hidden="true" style={{ filter: 'invert(1) grayscale(100%)' }}></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target={`#carousel-${product.id}`} data-bs-slide="next" style={{ zIndex: 12 }}>
                <span className="carousel-control-next-icon" aria-hidden="true" style={{ filter: 'invert(1) grayscale(100%)' }}></span>
                <span className="visually-hidden">Next</span>
              </button>
            </>
          )}
        </div>

        {/* --- CARD BODY --- */}
        <div className="card-body d-flex flex-column pt-3">
          <span className="text-muted small text-uppercase fw-semibold">{product.category}</span>
          
          {/* Product title */}
          <h5 className="card-title my-1 text-truncate" title={product.title}>
            <Link to={`/product/${product.id}`} className="text-decoration-none text-dark fw-bold text-hover-warning" style={{ transition: 'color 0.15s' }}>
              {product.title}
            </Link>
          </h5>
          
          {/* Rating */}
          <div className="mb-2 text-warning small">
            <i className="bi bi-star-fill me-1"></i>
            <span className="text-dark fw-bold">{product.rating}</span>
            <span className="text-muted ms-1">({product.reviewsCount || 0} reviews)</span>
          </div>

          <p className="card-text text-muted small mb-3" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', height: '40px' }}>
            {product.description}
          </p>

          {/* --- VARIANTS: COLORS --- */}
          <div className="mb-2">
            <div className="text-muted small mb-1">Color: <span className="text-dark text-capitalize fw-semibold">{selectedColor}</span></div>
            <div className="d-flex gap-2 flex-wrap">
              {product.colors?.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className="btn p-0 rounded-circle position-relative"
                  style={{ 
                    width: '20px', 
                    height: '20px', 
                    backgroundColor: color === 'khaki' ? '#f0e68c' : color,
                    border: color === 'white' ? '1px solid #ddd' : '1px solid transparent',
                    boxShadow: selectedColor === color ? '0 0 0 2px #fff, 0 0 0 3px #000' : 'none',
                    transition: 'all 0.1s'
                  }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* --- VARIANTS: SIZES --- */}
          <div className="mb-3">
            <div className="text-muted small mb-1">Size: <span className="text-dark fw-semibold">{selectedSize}</span></div>
            <div className="d-flex gap-1 flex-wrap">
              {product.sizes?.map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`btn btn-sm py-0 px-2 text-uppercase ${selectedSize === size ? 'btn-dark' : 'btn-outline-secondary'}`}
                  style={{ fontSize: '11px', minWidth: '28px' }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Price & Actions */}
          <div className="mt-auto pt-3 border-top d-flex align-items-center justify-content-between">
            <span className="fs-5 fw-bold text-dark">${product.price.toFixed(2)}</span>
            
            <button 
              onClick={() => addToCart(product, selectedColor, selectedSize, 1)}
              className={`btn btn-sm rounded-pill px-3 fw-semibold shadow-sm ${
                product.stock === 0 
                  ? 'btn-secondary' 
                  : isAlreadyInCart 
                    ? 'btn-success text-white' 
                    : 'btn-warning'
              }`}
              disabled={product.stock === 0 || isAlreadyInCart}
            >
              {product.stock === 0 ? (
                <>Out of Stock</>
              ) : isAlreadyInCart ? (
                <>
                  <i className="bi bi-check-lg me-1"></i> Added
                </>
              ) : (
                <>
                  <i className="bi bi-cart-plus me-1"></i> Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};