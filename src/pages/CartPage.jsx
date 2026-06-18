// src/pages/CartPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const CartPage = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    couponCode,
    setCouponCode,
    discount,
    couponError,
    couponSuccess,
    applyCoupon,
    removeCoupon,
    subtotal,
    discountAmount,
    shippingCost,
    total
  } = useApp();

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    if (couponCode) applyCoupon(couponCode);
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="container my-5 text-center py-5 bg-white rounded shadow-sm">
        <i className="bi bi-cart-x text-muted display-1 d-block mb-3"></i>
        <h2 className="fw-bold">Your cart is empty</h2>
        <p className="text-muted">Return to the catalog to browse the latest in-stock products.</p>
        <Link to="/" className="btn btn-warning rounded-pill px-4 fw-bold mt-3">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h2 className="fw-bold mb-4">
        Shopping Cart <span className="text-muted fs-5">({cart.length} items)</span>
      </h2>

      <div className="row g-4">
        {/* LEFT SIDE: product list (CRUD) */}
        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-sm p-3 bg-white mb-4">
            <div className="table-responsive">
              <table className="table table-align-middle m-0 align-middle">
                <thead>
                  <tr className="text-muted small uppercase">
                    <th>Product</th>
                    <th>Price</th>
                    <th className="text-center">Quantity</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => {
                    // FIXED: safe retrieval of price and quantity
                    const itemPrice = Number(item?.price) || 0;
                    const itemQuantity = Number(item?.quantity) || 1;

                    return (
                      <tr key={`${item.id}-${item.color}-${item.size}`}>
                        {/* Image + info */}
                        <td>
                          <div className="d-flex align-items-center gap-3">
                            <img 
                              src={item.images?.[item.color]?.[0] || item.images?.[Object.keys(item.images)[0]]?.[0]} 
                              alt={item.title} 
                              style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                              className="bg-light rounded p-1"
                            />
                            <div>
                              <h6 className="fw-bold mb-1 text-truncate" style={{ maxWidth: '200px' }}>
                                <Link to={`/product/${item.id}`} className="text-dark text-decoration-none">
                                  {item.title}
                                </Link>
                              </h6>
                              <div className="d-flex gap-2 small text-muted">
                                <span>Color: <strong className="text-dark text-capitalize">{item.color}</strong></span>
                                <span>Size: <strong className="text-dark text-uppercase">{item.size}</strong></span>
                              </div>
                            </div>
                          </div>
                        </td>
                        
                        {/* Price */}
                        <td className="fw-semibold">${itemPrice.toFixed(2)}</td>
                        
                        {/* Quantity controls */}
                        <td className="text-center">
                          <div className="input-group input-group-sm mx-auto" style={{ width: '100px' }}>
                            <button 
                              className="btn btn-outline-secondary" 
                              type="button"
                              onClick={() => updateCartQuantity(item.id, item.color, item.size, -1)}
                            >
                              -
                            </button>
                            <input 
                              type="text" 
                              className="form-control text-center bg-white" 
                              value={itemQuantity} 
                              readOnly 
                            />
                            <button 
                              className="btn btn-outline-secondary" 
                              type="button"
                              onClick={() => updateCartQuantity(item.id, item.color, item.size, 1)}
                              disabled={itemQuantity >= (item.stock || 10)}
                            >
                              +
                            </button>
                          </div>
                          {itemQuantity >= (item.stock || 10) && (
                            <span style={{ fontSize: '10px' }} className="text-warning d-block mt-1">Max limit</span>
                          )}
                        </td>
                        
                        {/* FIXED: safe line total calculation */}
                        <td className="fw-bold text-dark">${(itemPrice * itemQuantity).toFixed(2)}</td>
                        
                        {/* Delete button */}
                        <td className="text-end">
                          <button 
                            className="btn btn-sm btn-link text-danger p-0"
                            onClick={() => removeFromCart(item.id, item.color, item.size)}
                            title="Remove product"
                          >
                            <i className="bi bi-trash3 fs-5"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: checkout + coupon */}
        <div className="col-12 col-lg-4">
          {/* Coupon block */}
          <div className="card border-0 shadow-sm p-4 bg-white mb-4">
            <h5 className="fw-bold mb-3">Coupon Code</h5>
            <form onSubmit={handleCouponSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g.: SUMMER26"
                  value={couponCode || ''}
                  onChange={(e) => setCouponCode(e.target.value)}
                  disabled={discount > 0}
                />
                <button 
                  className={`btn ${discount > 0 ? 'btn-secondary' : 'btn-dark'} fw-bold`} 
                  type="submit"
                  disabled={discount > 0}
                >
                  Apply
                </button>
              </div>
            </form>
            
            {couponError && <div className="text-danger small mt-2 fw-semibold"><i className="bi bi-x-circle me-1"></i>{couponError}</div>}
            {couponSuccess && (
              <div className="text-success small mt-2 fw-semibold d-flex justify-content-between align-items-center">
                <span><i className="bi bi-check-circle-fill me-1"></i>{couponSuccess}</span>
                <button className="btn btn-sm text-danger p-0 border-0 bg-transparent fw-bold" onClick={removeCoupon}>Remove</button>
              </div>
            )}
          </div>

          {/* Summary / Order block */}
          <div className="card border-0 shadow-sm p-4 bg-white">
            <h5 className="fw-bold mb-4">Order Summary</h5>
            
            <div className="d-flex justify-content-between mb-3 text-muted">
              <span>Products subtotal:</span>
              {/* FIXED: safe subtotal calculation */}
              <span className="fw-semibold text-dark">${(Number(subtotal) || 0).toFixed(2)}</span>
            </div>

            {discount > 0 && (
              <div className="d-flex justify-content-between mb-3 text-success">
                <span>Discount ({discount}%):</span>
                {/* FIXED: safe discount amount calculation */}
                <span className="fw-semibold">-${(Number(discountAmount) || 0).toFixed(2)}</span>
              </div>
            )}

            <div className="d-flex justify-content-between mb-3 text-muted align-items-center">
              <span>
                Shipping cost:
                <i className="bi bi-info-circle text-muted ms-1 small" title="Free shipping over $100"></i>
              </span>
              <span className="fw-semibold text-dark">
                {/* FIXED: safe shipping cost calculation */}
                {Number(shippingCost) === 0 ? <span className="badge bg-success-subtle text-success">Free</span> : `$${(Number(shippingCost) || 0).toFixed(2)}`}
              </span>
            </div>

            <hr className="my-3" />

            <div className="d-flex justify-content-between mb-4 align-items-center">
              <span className="fw-bold fs-5">Grand Total:</span>
              {/* FIXED: safe total calculation */}
              <span className="fw-extrabold fs-4 text-warning">${(Number(total) || 0).toFixed(2)}</span>
            </div>

            <Link to="/checkout" className="btn btn-warning w-100 rounded-pill fw-bold py-2.5 mt-3 shadow-sm">
              Proceed to Checkout →
            </Link>
            
            <Link to="/" className="btn btn-link w-100 btn-sm text-muted text-decoration-none mt-2">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};