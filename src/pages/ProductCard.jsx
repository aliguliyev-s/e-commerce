// src/components/ProductCard.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const ProductCard = ({ product }) => { 
  const { addToCart, toggleWishlist, wishlist, cart } = useApp();
  
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  
  // Native slider index (instead of Bootstrap)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Compute real rating
  const ratingMetrics = useMemo(() => {
    try {
      const savedComments = localStorage.getItem(`eshop_comments_${product.id}`);
      if (savedComments) {
        const comments = JSON.parse(savedComments);
        if (Array.isArray(comments) && comments.length > 0) {
          const totalSum = comments.reduce((sum, c) => sum + Number(c.rating || 0), 0);
          return {
            rating: Number((totalSum / comments.length).toFixed(1)),
            reviewCount: comments.length
          };
        }
      }
    } catch (e) {}

    try {
      const savedProducts = localStorage.getItem('eshop_products');
      if (savedProducts) {
        const parsed = JSON.parse(savedProducts);
        if (Array.isArray(parsed)) {
          const synced = parsed.find((p) => String(p.id) === String(product.id));
          if (synced && (synced.rating !== undefined || synced.reviewCount !== undefined)) {
            const r = Number(synced.rating || product.rating || 5.0);
            return {
              rating: Number(r.toFixed(1)),
              reviewCount: Number(synced.reviewCount || product.reviewCount || 0)
            };
          }
        }
      }
    } catch (e) {}

    return { rating: null, reviewCount: 0 };
  }, [product.id, product.rating, product.reviewCount]);

  const currentImages = product.images[selectedColor] || [];
  const isInWishlist = wishlist.some(item => Number(item.id) === Number(product.id));

  // Reset image index to 0 when color changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedColor]);

  // Slide navigation handlers using pure React
  const handlePrev = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? currentImages.length - 1 : prevIndex - 1
    );
  };

  const handleNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === currentImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const getStockBadge = () => {
    if (product.stock === 0) return <span className="badge bg-danger">Out of stock</span>;
    if (product.stock <= 5) return <span className="badge bg-warning text-dark">Only {product.stock} left</span>;
    return <span className="badge bg-success-subtle text-success">In Stock ({product.stock})</span>;
  };

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

        {/* Wishlist toggle button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle shadow-sm px-2 py-1"
          style={{ zIndex: 30 }}
          type="button"
        >
          <i className={`bi ${isInWishlist ? 'bi-heart-fill text-danger' : 'bi-heart'}`}></i>
        </button>

        {/* --- Pure React carousel (without Bootstrap JS) --- */}
        <div className="carousel slide bg-light position-relative">
          
          {/* Indicators (dots) */}
          <div className="carousel-indicators" style={{ marginBottom: '0.5rem', zIndex: 11 }}>
            {currentImages.map((_, index) => (
              <button 
                key={`${selectedColor}-${index}`}
                type="button" 
                className={index === currentImageIndex ? 'active' : ''}
                style={{ opacity: index === currentImageIndex ? 1 : 0.5 }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
              ></button>
            ))}
          </div>
          
          {/* Images area */}
          <Link to={`/product/${product.id}`} className="d-block text-decoration-none">
            <div className="carousel-inner" style={{ height: '250px' }}>
              {currentImages.map((img, index) => (
                <div 
                  key={`${selectedColor}-${index}`} 
                  className={`carousel-item h-100 ${index === currentImageIndex ? 'active' : ''}`}
                  style={{ display: index === currentImageIndex ? 'block' : 'none' }}
                >
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

          {/* Navigation arrows */}
          {currentImages.length > 1 && (
            <>
              <button 
                className="carousel-control-prev" 
                type="button" 
                style={{ zIndex: 15, background: 'none', border: 'none' }}
                onClick={handlePrev}
              >
                <span className="carousel-control-prev-icon" aria-hidden="true" style={{ filter: 'invert(1) grayscale(100%)' }}></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button 
                className="carousel-control-next" 
                type="button" 
                style={{ zIndex: 15, background: 'none', border: 'none' }}
                onClick={handleNext}
              >
                <span className="carousel-control-next-icon" aria-hidden="true" style={{ filter: 'invert(1) grayscale(100%)' }}></span>
                <span className="visually-hidden">Next</span>
              </button>
            </>
          )}
        </div>

          {/* --- CARD BODY --- */}
        <div className="card-body d-flex flex-column pt-3 text-start">
          <span className="text-muted small text-uppercase fw-semibold">{product.category}</span>
          
          <h5 className="card-title my-1 text-truncate" title={product.title}>
            <Link to={`/product/${product.id}`} className="text-decoration-none text-dark fw-bold text-hover-warning">
              {product.title}
            </Link>
          </h5>
          
          {/* Rating */}
          <div className="mb-2 small d-flex align-items-center gap-2">
            <div className="text-warning d-flex align-items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <i
                  key={i}
                  className={`bi ${ratingMetrics.rating !== null && i < Math.round(ratingMetrics.rating) ? 'bi-star-fill' : 'bi-star'} me-1`}
                ></i>
              ))}
            </div>
            <span className="text-dark fw-bold">{ratingMetrics.rating !== null ? ratingMetrics.rating : '—'}</span>
            <span className="text-muted ms-1">{ratingMetrics.reviewCount > 0 ? `(${ratingMetrics.reviewCount} reviews)` : 'New'}</span>
          </div>

          <p className="card-text text-muted small mb-3" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', height: '40px' }}>
            {product.description}
          </p>

          {/* Options: Colors */}
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

          {/* Options: Sizes */}
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

          {/* Price and buy button */}
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
              {product.stock === 0 ? 'Out of Stock' : isAlreadyInCart ? 'Added' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;