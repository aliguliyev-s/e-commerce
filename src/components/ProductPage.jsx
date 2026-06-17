// src/components/ProductPage.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { products as initialProducts } from '../data/products';

export const ProductPage = () => {
  const { id } = useParams();
  const { addToCart, toggleWishlist, wishlist } = useApp();

  // Active sub-tab state ('description' or 'specifications')
  const [activeTab, setActiveTab] = useState('description');

  // --- LOCAL COMMENTS STATE WITH PERSISTENCE ---
  const [comments, setComments] = useState(() => {
    const savedComments = localStorage.getItem(`eshop_comments_${id}`);
    return savedComments ? JSON.parse(savedComments) : [];
  });

  const [newAuthor, setNewAuthor] = useState('');
  const [newText, setNewText] = useState('');
  const [newRating, setNewRating] = useState(5);

  // --- HOVER IMAGE ZOOM MATRIX STATE ---
  const [zoomStyle, setZoomStyle] = useState({ display: 'none' });

  // Sync comments to localStorage whenever they mutate
  useEffect(() => {
    localStorage.setItem(`eshop_comments_${id}`, JSON.stringify(comments));
  }, [comments, id]);

  // --- DYNAMIC INVENTORY RETRIEVAL FROM LOCALSTORAGE ---
  const [productsList, setProductsList] = useState(() => {
    const savedProducts = localStorage.getItem('eshop_products');
    return savedProducts ? JSON.parse(savedProducts) : initialProducts;
  });

  // Find targeted active product item framework
  const product = useMemo(() => {
    return productsList.find((p) => String(p.id) === String(id));
  }, [id, productsList]);

  // --- DYNAMIC RATING & REVIEWS COMPUTATION METRICS ---
  const computedRating = useMemo(() => {
    if (comments.length === 0) return 5.0; // Default fallback rating score
    const totalSum = comments.reduce((sum, comment) => sum + comment.rating, 0);
    return Number((totalSum / comments.length).toFixed(1));
  }, [comments]);

  // Sync computed ratings down to global product record inside localStorage
  useEffect(() => {
    if (product) {
      const updatedList = productsList.map((p) => {
        if (String(p.id) === String(id)) {
          return { ...p, rating: computedRating, reviewCount: comments.length };
        }
        return p;
      });
      // Prevent infinite loops by verifying changes occurred before syncing states
      if (JSON.stringify(updatedList) !== localStorage.getItem('eshop_products')) {
        localStorage.setItem('eshop_products', JSON.stringify(updatedList));
        setProductsList(updatedList);
        try {
          window.dispatchEvent(new Event('eshop_products_updated'));
        } catch (e) {}
      }
    }
  }, [computedRating, comments.length, id, product, productsList]);

  // --- RECONCILE SIMILAR RECOMMENDATIONS SYSTEM ---
  const similarProducts = useMemo(() => {
    if (!product) return [];
    return productsList
      .filter((p) => p.category === product.category && String(p.id) !== String(id))
      .slice(0, 4);
  }, [product, productsList, id]);

  // Variation matrix options selectors
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  const availableColors = product?.colors || ['default'];
  const availableSizes = product?.sizes || ['Standard'];

  // Reset internal item configuration states on target item routing transitions
  useEffect(() => {
    if (product) {
      if (availableColors.length > 0) setSelectedColor(availableColors[0]);
      if (availableSizes.length > 0) setSelectedSize(availableSizes[0]);
      setQuantity(1);
    }
  }, [product]);

  // Image assets resolving fallback matrix
  const productImages = useMemo(() => {
    if (!product) return [];
    if (product.images && product.images[selectedColor]) {
      return product.images[selectedColor];
    }
    return Object.values(product.images || {}).flat() || [];
  }, [product, selectedColor]);

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  useEffect(() => {
    setActiveImgIndex(0);
  }, [selectedColor]);

  // --- HANDLERS FOR IMAGE ZOOM EVENT ---
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    // Calculate mouse position relative to image container borders
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    
    setZoomStyle({
      display: 'block',
      backgroundImage: `url(${productImages[activeImgIndex] || 'https://via.placeholder.com/400'})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: '250%' // Zoom factor scaling multiplier
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' });
  };

  if (!product) {
    return (
      <div className="container text-center py-5">
        <i className="bi bi-exclamation-triangle display-1 text-warning mb-4"></i>
        <h2 className="fw-bold">Product Not Found</h2>
        <p className="text-muted">The product you are trying to view does not exist or has been removed.</p>
        <Link to="/" className="btn btn-warning rounded-pill px-4 fw-semibold mt-3">
          Back to Catalog
        </Link>
      </div>
    );
  }

  const isWishlisted = wishlist.some((item) => String(item.id) === String(product.id));

  // --- FORM SUBMISSION TRIGGER CONTROLLER ---
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newText.trim()) return;

    const addedComment = {
      id: Date.now(),
      author: newAuthor,
      rating: Number(newRating),
      text: newText,
      date: new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })
    };

    setComments((prev) => [addedComment, ...prev]);
    setNewAuthor('');
    setNewText('');
    setNewRating(5);
  };

  return (
    <div className="container my-4 text-start">
      {/* Breadcrumb Navigation maps */}
      <nav aria-label="breadcrumb" className="breadcrumb-nav mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-secondary">Shop</Link></li>
          <li className="breadcrumb-item active text-capitalize text-dark fw-semibold" aria-current="page">{product.category}</li>
        </ol>
      </nav>

      {/* TOP COMPONENT STAGE: IMAGE DISPLAY ROW & SPEC SUMMARY CONTROLS */}
      <div className="row g-5 mb-5">
        <div className="col-12 col-md-6">
          {/* ZOOM CONTAINER STAGE BLOCK */}
          <div 
            className="bg-white p-3 rounded shadow-sm border text-center mb-3 position-relative overflow-hidden"
            style={{ cursor: 'zoom-in' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img 
              src={productImages[activeImgIndex] || 'https://via.placeholder.com/400'} 
              alt={product.title} 
              className="img-fluid rounded" 
              style={{ maxHeight: '400px', objectFit: 'contain' }}
            />
            
            {/* LENS LAYER DISPLAY OVERLAY */}
            <div 
              className="position-absolute top-0 start-0 w-100 h-100 rounded" 
              style={{
                ...zoomStyle,
                pointerEvents: 'none',
                backgroundRepeat: 'no-repeat',
                backgroundColor: '#fff',
                zIndex: 5
              }}
            />
          </div>
          
          {productImages.length > 1 && (
            <div className="d-flex gap-2 overflow-auto pb-2">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  className={`btn p-0 rounded border bg-white ${activeImgIndex === idx ? 'border-warning border-2' : 'border-light'}`}
                  onClick={() => setActiveImgIndex(idx)}
                  style={{ width: '70px', height: '70px', flexShrink: 0 }}
                >
                  <img src={img} alt="" className="img-fluid rounded" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="col-12 col-md-6">
          <div className="bg-white p-4 rounded shadow-sm border h-100 d-flex flex-column justify-content-between">
            <div>
              <div className="d-flex justify-content-between align-items-start mb-2">
                <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold text-uppercase small">
                  {product.category}
                </span>
                <button 
                  className={`btn rounded-circle shadow-sm border-0 ${isWishlisted ? 'btn-danger text-white' : 'btn-outline-secondary bg-light'}`}
                  onClick={() => toggleWishlist(product)}
                >
                  <i className={`bi ${isWishlisted ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                </button>
              </div>

              <h1 className="fw-bold text-dark display-6 mb-2">{product.title}</h1>
              
              {/* DYNAMIC RATINGS METRICS HEADER BLOCK */}
              <div className="d-flex align-items-center gap-2 mb-3">
                <div className="text-warning">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i key={i} className={`bi ${i < Math.round(computedRating) ? 'bi-star-fill' : 'bi-star'}`}></i>
                  ))}
                </div>
                <span className="text-dark fw-bold small">{computedRating}</span>
                <span className="text-muted small fw-semibold">({comments.length} verified reviews)</span>
              </div>

              <h2 className="fw-bold text-danger mb-4">${product.price.toFixed(2)}</h2>
              <p className="text-secondary mb-4 leading-relaxed">
                {product.description || 'Premium architecture layout built for structural reliability across consumer actions.'}
              </p>

              <hr className="my-4" />

              {/* Functional parameters interaction blocks */}
              <div className="row mb-3">
                {product.colors && product.colors.length > 0 && product.colors[0] !== 'default' && (
                  <div className="col-6">
                    <label className="form-label small fw-bold text-muted text-uppercase">Select Color</label>
                    <select className="form-select text-capitalize fw-semibold" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
                      {product.colors.map((c, i) => <option key={i} value={c}>{c}</option>)}
                    </select>
                  </div>
                )}
                {product.sizes && product.sizes.length > 0 && product.sizes[0] !== 'Standard' && (
                  <div className="col-6">
                    <label className="form-label small fw-bold text-muted text-uppercase">Select Size</label>
                    <select className="form-select fw-semibold" value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                      {product.sizes.map((s, i) => <option key={i} value={s}>{s}</option>)}
                    </select>
                  </div>
                )}
              </div>

              <div className="mb-4" style={{ maxWidth: '140px' }}>
                <label className="form-label small fw-bold text-muted text-uppercase">Quantity</label>
                <div className="input-group input-group-sm rounded border">
                  <button className="btn btn-light fw-bold px-3" type="button" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                  <input type="text" className="form-control text-center bg-transparent border-0 fw-bold" value={quantity} readOnly />
                  <button className="btn btn-light fw-bold px-3" type="button" onClick={() => setQuantity(q => Math.min(product.stock || 10, q + 1))}>+</button>
                </div>
              </div>
            </div>

            <button 
              className="btn btn-warning w-100 py-3 rounded-pill fw-bold text-uppercase shadow-sm mt-4 d-flex align-items-center justify-content-center gap-2"
              onClick={() => addToCart(product, selectedColor || 'default', selectedSize || 'Standard', quantity)}
            >
              <i className="bi bi-cart-plus-fill fs-5"></i> Add to Shopping Cart
            </button>
          </div>
        </div>
      </div>

      {/* MIDDLE COMPONENT STAGE: NAVIGATION SPECIFICATION TABS */}
      <div className="bg-white p-4 rounded shadow-sm border mb-5">
        <ul className="nav nav-tabs border-bottom mb-4">
          <li className="nav-item">
            <button 
              className={`nav-link fw-bold border-0 px-4 py-2 ${activeTab === 'description' ? 'active border-bottom border-warning border-3 text-dark' : 'text-secondary'}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link fw-bold border-0 px-4 py-2 ${activeTab === 'specifications' ? 'active border-bottom border-warning border-3 text-dark' : 'text-secondary'}`}
              onClick={() => setActiveTab('specifications')}
            >
              Specifications
            </button>
          </li>
        </ul>

        {activeTab === 'description' ? (
          <div className="px-2">
            <h5 className="fw-bold mb-3">Product Overview</h5>
            <p className="text-secondary leading-relaxed">{product.description || 'No extended overview configurations designated for this layout stack.'}</p>
            <p className="text-secondary mb-0">Engineered with authentic premium composites configured for sustainable lifecycle operations and advanced wearing metrics.</p>
          </div>
        ) : (
          <div className="table-responsive px-2">
            <table className="table table-striped table-bordered align-middle mb-0">
              <tbody>
                <tr>
                  <td className="fw-bold text-muted w-25 small">Category</td>
                  <td className="text-capitalize">{product.category}</td>
                </tr>
                <tr>
                  <td className="fw-bold text-muted small">Available Colors</td>
                  <td className="text-capitalize">{product.colors?.join(', ') || 'Default'}</td>
                </tr>
                <tr>
                  <td className="fw-bold text-muted small">Available Sizes</td>
                  <td>{product.sizes?.join(', ') || 'Standard'}</td>
                </tr>
                <tr>
                  <td className="fw-bold text-muted small">Material Framework</td>
                  <td>Premium Sustainable Eco-Polymer base weave pattern assembly</td>
                </tr>
                <tr>
                  <td className="fw-bold text-muted small">Logistics Tracking</td>
                  <td>Free Global tracked shipping fulfillment metrics applied over $100 invoices</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* LOWER COMPONENT STAGE: USER LIVE COMMENTS FEEDBACK GRID */}
      <div className="bg-white p-4 rounded shadow-sm border mb-5">
        <h4 className="fw-bold mb-4">Customer Feedbacks ({comments.length})</h4>
        
        <div className="row g-4">
          <div className="col-12 col-lg-5 border-end pe-lg-4">
            <h6 className="fw-bold text-dark mb-3">Write a Customer Review</h6>
            <form onSubmit={handleCommentSubmit} className="bg-light p-3 rounded border">
              <div className="mb-3">
                <label className="form-label small fw-bold text-secondary">Full Name</label>
                <input type="text" className="form-control" value={newAuthor} onChange={(e) => setNewAuthor(e.target.value)} placeholder="Jane Doe" required />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold text-secondary">Rating Stars</label>
                <select className="form-select text-warning fw-bold" value={newRating} onChange={(e) => setNewRating(e.target.value)}>
                  <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
                  <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
                  <option value="3">⭐⭐⭐ (3 Stars)</option>
                  <option value="2">⭐⭐ (2 Stars)</option>
                  <option value="1">⭐ (1 Star)</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold text-secondary">Your Comment</label>
                <textarea className="form-control" rows="3" value={newText} onChange={(e) => setNewText(e.target.value)} placeholder="Share your experience with this item..." required></textarea>
              </div>
              <button type="submit" className="btn btn-warning rounded-pill btn-sm fw-bold px-4">Submit Review</button>
            </form>
          </div>

          <div className="col-12 col-lg-7">
            <div className="overflow-auto custom-scroll" style={{ maxHeight: '380px' }}>
              {comments.length === 0 ? (
                <p className="text-muted py-4 text-center">Be the first to review this product!</p>
              ) : (
                comments.map((c) => (
                  <div key={c.id} className="border-bottom pb-3 mb-3 last-no-border">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="fw-bold text-dark">{c.author}</span>
                      <small className="text-muted">{c.date}</small>
                    </div>
                    <div className="text-warning mb-2 small">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <i key={i} className={`bi ${i < c.rating ? 'bi-star-fill' : 'bi-star'}`}></i>
                      ))}
                    </div>
                    <p className="text-secondary small mb-0 leading-relaxed">{c.text}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER GRID AREA: CATEGORY RELATION SIMILAR RECOMMENDER TILES */}
      {similarProducts.length > 0 && (
        <div className="mt-5">
          <h4 className="fw-bold mb-4 text-dark">
            <i className="bi bi-tags-fill me-2 text-warning"></i>You May Also Like
          </h4>
          <div className="row g-3">
            {similarProducts.map((p) => {
              const defaultColor = p.colors?.[0] || 'default';
              const imgUrl = p.images?.[defaultColor]?.[0] || Object.values(p.images || {})[0]?.[0];
              return (
                <div key={p.id} className="col-6 col-md-4 col-lg-3">
                  <div className="card h-100 shadow-sm border bg-white rounded transition-transform hover-scale">
                    <Link to={`/product/${p.id}`} className="p-3 text-center d-block bg-white">
                      <img src={imgUrl} alt={p.title} className="img-fluid rounded" style={{ height: '140px', objectFit: 'contain' }} />
                    </Link>
                    <div className="card-body p-3 border-top d-flex flex-column justify-content-between">
                      <div>
                        <h6 className="fw-bold text-dark text-truncate mb-1">{p.title}</h6>
                        <span className="text-muted small text-capitalize d-block mb-2">{p.category}</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-2">
                        <span className="fw-bold text-danger">${p.price.toFixed(2)}</span>
                        <Link to={`/product/${p.id}`} className="btn btn-sm btn-outline-warning rounded-circle px-2">
                          <i className="bi bi-arrow-right"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};