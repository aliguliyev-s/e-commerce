// src/pages/ProductPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Hooks for working with URL params and links
import { products } from '../data/products';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';

export const ProductPage = () => {
  // Get id from URL (for example, /product/5 -> id "5")
  const { id } = useParams();
  
  // Include cart in context destructuring
  const { addToCart, toggleWishlist, wishlist, cart } = useApp();

  // Find the product in the products array by ID
  const product = products.find(p => p.id === parseInt(id));
  
  // If the product with this ID is not found
  if (!product) {
    return (
      <div className="container my-5 text-center">
        <i className="bi bi-exclamation-triangle text-danger display-1"></i>
        <h2 className="fw-bold mt-3">Product not found</h2>
        <Link to="/" className="btn btn-warning mt-3 rounded-pill px-4">Back to Catalog</Link>
      </div>
    );
  }

  // Page state variables
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [activeTab, setActiveTab] = useState('description');
  const [quantity, setQuantity] = useState(1);

  const currentImages = product.images[selectedColor] || [];
  const [mainImage, setMainImage] = useState(currentImages[0] || '');

  // Sync states when the product or selected color changes
  useEffect(() => {
    setSelectedColor(product.colors?.[0] || '');
    setSelectedSize(product.sizes?.[0] || '');
    setQuantity(1);
  }, [id, product]);

  useEffect(() => {
    if (currentImages.length > 0) {
      setMainImage(currentImages[0]);
    }
  }, [selectedColor, currentImages]);

  // --- ZOOM EFFECT LOGIC ---
  const [zoomStyle, setZoomStyle] = useState({ display: 'none', backgroundImage: '', backgroundPosition: '0% 0%' });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    
    setZoomStyle({
      display: 'block',
      backgroundImage: `url(${mainImage})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: '200%'
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none', backgroundImage: '', backgroundPosition: '0% 0%' });
  };

  // Related products (from same category, excluding current)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  // FIXED: safe type coercion for accurate wishlist membership checks
  const isInWishlist = wishlist.some(item => Number(item.id) === Number(product.id));

  // Check whether this specific variant is already in the cart
  const isAlreadyInCart = cart?.some(
    (item) => Number(item.id) === Number(product.id) && item.color === selectedColor && item.size === selectedSize
  );

  return (
    <div className="container my-4">
      {/* Breadcrumbs via <Link> */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none fw-semibold text-primary">
              ← Back to Catalog
            </Link>
          </li>
          <li className="breadcrumb-item text-muted text-capitalize">{product.category}</li>
          <li className="breadcrumb-item active text-dark fw-bold" aria-current="page">{product.title}</li>
        </ol>
      </nav>

      <div className="row g-5 mb-5">
        {/* LEFT COLUMN: IMAGE + ZOOM */}
        <div className="col-12 col-md-6">
          <div 
            className="position-relative border rounded overflow-hidden bg-white mb-3 shadow-sm"
            style={{ height: '450px', cursor: 'zoom-in' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img src={mainImage} alt={product.title} className="w-100 h-100" style={{ objectFit: 'contain' }} />
            <div className="position-absolute top-0 start-0 w-100 h-100" style={{ ...zoomStyle, pointerEvents: 'none' }} />
          </div>

          {/* Thumbnails gallery */}
          <div className="d-flex gap-2 overflow-x-auto pb-2">
            {currentImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setMainImage(img)}
                className={`btn p-0 border rounded bg-white ${mainImage === img ? 'border-warning border-2' : ''}`}
                style={{ width: '80px', height: '80px', flexShrink: 0 }}
              >
                <img src={img} alt="thumbnail" className="w-100 h-100" style={{ objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: PRODUCT INFORMATION */}
        <div className="col-12 col-md-6">
          <span className="text-muted text-uppercase small fw-bold">{product.category}</span>
          <h1 className="fw-bold my-2">{product.title}</h1>
          
          <div className="d-flex align-items-center mb-3 text-warning">
            <div className="me-2">
              {Array(5).fill().map((_, i) => (
                <i key={i} className={`bi ${i < Math.floor(product.rating) ? 'bi-star-fill' : 'bi-star'} me-1`}></i>
              ))}
            </div>
            <span className="text-dark fw-bold me-2">{product.rating}</span>
            <span className="text-muted">({product.reviewsCount || 0} reviews)</span>
          </div>

          <h2 className="text-dark fw-bold mb-4">${product.price.toFixed(2)}</h2>
          <hr />

          {/* Color selection */}
          <div className="mb-4">
            <label className="fw-bold text-secondary small mb-2 d-block">Color: <span className="text-dark text-capitalize">{selectedColor}</span></label>
            <div className="d-flex gap-2">
              {product.colors?.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className="btn p-0 rounded-circle"
                  style={{ 
                    width: '32px', 
                    height: '32px', 
                    backgroundColor: color === 'khaki' ? '#f0e68c' : color,
                    border: color === 'white' ? '1px solid #ddd' : '1px solid transparent',
                    boxShadow: selectedColor === color ? '0 0 0 2px #fff, 0 0 0 4px #000' : 'none'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Size selection */}
          <div className="mb-4">
            <label className="fw-bold text-secondary small mb-2 d-block">Size: <span className="text-dark text-uppercase">{selectedSize}</span></label>
            <div className="d-flex gap-2">
              {product.sizes?.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`btn py-2 px-3 fw-semibold text-uppercase ${selectedSize === size ? 'btn-dark' : 'btn-outline-secondary'}`}
                  style={{ minWidth: '45px', fontSize: '13px' }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Add-to-Cart */}
          <div className="d-flex gap-3 align-items-end mb-4">
            <div>
              <label className="fw-bold text-secondary small mb-2 d-block">Quantity</label>
              <div className="input-group" style={{ width: '120px' }}>
                <button className="btn btn-outline-secondary" type="button" onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={isAlreadyInCart}>-</button>
                <input type="text" className="form-control text-center bg-white" value={quantity} readOnly />
                <button className="btn btn-outline-secondary" type="button" onClick={() => setQuantity(q => Math.min(product.stock || 10, q + 1))} disabled={isAlreadyInCart}>+</button>
              </div>
            </div>

            {/* Button changes styles and is disabled if variant already in cart */}
            <div className="flex-grow-1">
              <button 
                className={`btn w-100 py-2.5 fw-bold rounded-pill shadow-sm ${
                  product.stock === 0 
                    ? 'btn-secondary' 
                    : isAlreadyInCart 
                      ? 'btn-success text-white' 
                      : 'btn-warning'
                }`}
                onClick={() => addToCart(product, selectedColor, selectedSize, quantity)}
                disabled={product.stock === 0 || isAlreadyInCart}
              >
                {product.stock === 0 ? (
                  <>Out of Stock</>
                ) : isAlreadyInCart ? (
                  <>
                    <i className="bi bi-check-circle-fill me-2"></i> Added to Cart
                  </>
                ) : (
                  <>
                    <i className="bi bi-cart-plus-fill me-2"></i> Add to Cart
                  </>
                )}
              </button>
            </div>

            <button 
              className={`btn ${isInWishlist ? 'btn-danger' : 'btn-outline-secondary'} py-2.5 px-3 rounded-circle`}
              onClick={() => toggleWishlist(product)}
            >
              <i className={`bi ${isInWishlist ? 'bi-heart-fill' : 'bi-heart'}`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* TABS system (description, specifications, reviews) */}
      <div className="card border-0 shadow-sm mb-5 bg-white">
        <div className="card-header bg-light border-0 p-0">
          <ul className="nav nav-tabs card-header-tabs m-0">
            {['description', 'specifications', 'reviews'].map((tab) => (
              <li className="nav-item" key={tab}>
                <button 
                  className={`nav-link border-0 py-3 px-4 fw-bold text-capitalize ${activeTab === tab ? 'active text-warning bg-white' : 'text-muted'}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="card-body p-4">
          {/* Tab: Description */}
          {activeTab === 'description' && (
            <div>
              <h5 className="fw-bold mb-3">Product Description</h5>
              <p className="text-muted lh-lg mb-0">{product.description}</p>
            </div>
          )}

          {/* Tab: Specifications */}
          {activeTab === 'specifications' && (
            <div>
              <h5 className="fw-bold mb-3">Technical Specifications</h5>
              {product.specs && Object.keys(product.specs).length > 0 ? (
                <table className="table table-striped table-bordered mb-0 small">
                  <tbody>
                    {Object.entries(product.specs).map(([key, value]) => (
                      <tr key={key}>
                        <td className="fw-bold text-secondary w-25">{key}</td>
                        <td className="text-dark">{value}</td>
                      </tr>
                    ))}
                    <tr>
                      <td className="fw-bold text-secondary">Product ID</td>
                      <td className="text-dark">PROD-{product.id}026</td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <p className="text-muted small mb-0">No technical specifications available for this product.</p>
              )}
            </div>
          )}

          {/* Tab: Reviews */}
          {activeTab === 'reviews' && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0">Customer Reviews</h5>
                <button className="btn btn-outline-dark btn-sm fw-bold rounded-pill px-3">Write a Review</button>
              </div>
              
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((review) => (
                  <div key={review.id} className="border-bottom pb-3 mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="fw-bold small">{review.username}</span>
                      <span className="text-muted small">{review.date}</span>
                    </div>
                    
                    <div className="text-warning mb-2 small">
                      {Array(5).fill().map((_, starIdx) => (
                        <i 
                          key={starIdx} 
                          className={`bi ${starIdx < review.rating ? 'bi-star-fill' : 'bi-star'} me-1`}
                        ></i>
                      ))}
                    </div>
                    
                    <p className="text-muted small mb-0">{review.comment}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-muted small">
                  <i className="bi bi-chat-left-text fs-3 d-block mb-2"></i>
                  No reviews yet. Be the first to leave a review!
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* RELATED PRODUCTS BLOCK */}
      <div className="mt-5">
        <h3 className="fw-bold mb-4 position-relative pb-2">
          Related Products
          <span className="position-absolute bottom-0 start-0 bg-warning" style={{ width: '60px', height: '3px' }}></span>
        </h3>
        <div className="row">
          {relatedProducts.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
};