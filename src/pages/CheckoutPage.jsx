// src/pages/CheckoutPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const CheckoutPage = () => {
  const { 
    cart, 
    subtotal, 
    shippingCost, 
    total, 
    shippingMethod, 
    setShippingMethod,
    currentUser, // Get current user data
    placeOrder   // Function that saves order to history and clears the cart
  } = useApp();
  
  const [currentStep, setCurrentStep] = useState(1);

  // State variables for storing entered form data
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    phone: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });

  // Autofill form fields if the user is authenticated
  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        fullName: currentUser.fullName || '',
        phone: currentUser.phone || '',
        address: currentUser.address || '',
        city: currentUser.city || ''
      }));
    }
  }, [currentUser]);

  // If the cart is empty and we are not on the final confirmation step
  if ((!cart || cart.length === 0) && currentStep !== 4) {
    return (
      <div className="container my-5 text-center py-5 bg-white rounded shadow-sm border">
        <i className="bi bi-cart-x text-muted display-1 d-block mb-3"></i>
        <h2 className="fw-bold">Your cart is empty</h2>
        <p className="text-muted">You cannot proceed to checkout without items in your cart.</p>
        <Link to="/" className="btn btn-warning rounded-pill px-4 fw-bold mt-3">Go Shopping</Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const nextStep = () => {
    if (currentStep === 3) {
      // Instead of simply clearing the cart, call placeOrder,
      // which saves the order to history and clears the cart
      placeOrder(formData);
    }
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => setCurrentStep(prev => prev - 1);

  // Names and icons for the 4 checkout steps
  const stepsLayout = [
    { id: 1, name: 'Address', icon: 'bi-geo-alt-fill' },
    { id: 2, name: 'Shipping', icon: 'bi-truck' },
    { id: 3, name: 'Payment', icon: 'bi-credit-card-2-front-fill' },
    { id: 4, name: 'Confirm', icon: 'bi-check-circle-fill' }
  ];

  return (
    <div className="container my-5">
      {/* Progress bar for checkout steps */}
      <div className="row justify-content-center mb-5">
        <div className="col-12 col-md-10">
          <div className="position-relative d-flex justify-content-between">
            <div className="position-absolute top-50 start-0 translate-middle-y bg-secondary-subtle w-100" style={{ height: '3px', zIndex: 1 }}>
              <div className="bg-warning h-100" style={{ width: `${((currentStep - 1) / 3) * 100}%`, transition: 'all 0.3s' }}></div>
            </div>
            {stepsLayout.map((step) => (
              <div key={step.id} className="text-center position-relative" style={{ zIndex: 2 }}>
                <div className={`rounded-circle d-flex align-items-center justify-content-center mx-auto shadow-sm mb-2`}
                     style={{ 
                       width: '45px', 
                       height: '45px', 
                       backgroundColor: currentStep >= step.id ? '#ffc107' : '#fff',
                       border: currentStep >= step.id ? '2px solid #ffc107' : '2px solid #dee2e6',
                       color: currentStep >= step.id ? '#000' : '#6c757d',
                       transition: 'all 0.3s'
                     }}>
                  <i className={`bi ${step.icon}`}></i>
                </div>
                <span className={`small fw-bold d-none d-md-block ${currentStep >= step.id ? 'text-dark' : 'text-muted'}`}>{step.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* LEFT: current step interface */}
        <div className={currentStep === 4 ? "col-12 text-center" : "col-12 col-lg-8"}>
          <div className="bg-white p-4 rounded shadow-sm border-0">
            
            {/* STEP 1: ADDRESS */}
            {currentStep === 1 && (
              <div>
                <h4 className="fw-bold mb-4">Step 1: Shipping Address</h4>
                
                {!currentUser && (
                  <div className="alert alert-secondary small d-flex align-items-center justify-content-between mb-4 py-2">
                    <span><i className="bi bi-info-circle-fill me-2"></i>Checkout as guest or sign in for faster checkout.</span>
                    <Link to="/login" className="btn btn-sm btn-outline-dark rounded-pill px-3 fw-bold">Sign In</Link>
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label small fw-semibold">Full Name</label>
                  <input type="text" className="form-control" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="John Doe" required />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-semibold">Phone Number</label>
                  <input type="tel" className="form-control" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+994 (55) 000-00-00" required />
                </div>
                <div className="row">
                  <div className="col-md-8 mb-3">
                    <label className="form-label small fw-semibold">Street Address</label>
                    <input type="text" className="form-control" name="address" value={formData.address} onChange={handleInputChange} placeholder="Nizami str. 42" required />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label small fw-semibold">City</label>
                    <input type="text" className="form-control" name="city" value={formData.city} onChange={handleInputChange} placeholder="Baku" required />
                  </div>
                </div>
                <button className="btn btn-warning rounded-pill px-4 fw-bold mt-3" onClick={nextStep} disabled={!formData.fullName || !formData.phone || !formData.address || !formData.city}>
                  Continue to Delivery Method
                </button>
              </div>
            )}

            {/* STEP 2: SHIPPING METHOD */}
            {currentStep === 2 && (
              <div>
                <h4 className="fw-bold mb-4">Step 2: Delivery Method</h4>
                
                {/* Standard option card */}
                <div 
                  className={`card border mb-3 p-3 ${shippingMethod === 'standard' ? 'border-warning bg-light-subtle' : ''}`} 
                  style={{ cursor: 'pointer' }} 
                  onClick={() => setShippingMethod('standard')}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-3">
                      <input 
                        type="radio" 
                        className="form-check-input m-0" 
                        checked={shippingMethod === 'standard'} 
                        onChange={() => setShippingMethod('standard')} 
                      />
                      <div className="text-start">
                        <h6 className="fw-bold m-0">
                          Standard Delivery {subtotal > 100 ? '(Free)' : '($5.00)'}
                        </h6>
                        <small className="text-muted">Delivery in 3-5 business days</small>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Express option card */}
                <div 
                  className={`card border mb-4 p-3 ${shippingMethod === 'express' ? 'border-warning bg-light-subtle' : ''}`} 
                  style={{ cursor: 'pointer' }} 
                  onClick={() => setShippingMethod('express')}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-3">
                      <input 
                        type="radio" 
                        className="form-check-input m-0" 
                        checked={shippingMethod === 'express'} 
                        onChange={() => setShippingMethod('express')} 
                      />
                      <div className="text-start">
                        <h6 className="fw-bold m-0">Express Delivery ($15.00)</h6>
                        <small className="text-muted">Delivery in 24-48 hours</small>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="d-flex gap-2">
                  <button className="btn btn-outline-secondary rounded-pill px-4" onClick={prevStep}>Back</button>
                  <button className="btn btn-warning rounded-pill px-4 fw-bold" onClick={nextStep}>Continue to Payment</button>
                </div>
              </div>
            )}

            {/* STEP 3: PAYMENT */}
            {currentStep === 3 && (
              <div>
                <h4 className="fw-bold mb-4">Step 3: Payment Details</h4>
                <div className="bg-light p-3 rounded mb-4 d-flex align-items-center gap-2 text-start">
                  <i className="bi bi-shield-lock-fill text-success fs-4"></i>
                  <span className="small text-muted">Secure fake checkout system. Do not enter real credit card credentials.</span>
                </div>
                <div className="mb-3 text-start">
                  <label className="form-label small fw-semibold">Card Holder Name</label>
                  <input type="text" className="form-control text-uppercase" placeholder="JOHN DOE" defaultValue={formData.fullName} />
                </div>
                <div className="mb-3 text-start">
                  <label className="form-label small fw-semibold">Card Number</label>
                  <input type="text" className="form-control" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder="1234 5678 9101 1121" maxLength="19" required />
                </div>
                <div className="row mb-4 text-start">
                  <div className="col-6">
                    <label className="form-label small fw-semibold">Expiration Date</label>
                    <input type="text" className="form-control" name="cardExpiry" value={formData.cardExpiry} onChange={handleInputChange} placeholder="MM/YY" maxLength="5" required />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-semibold">CVC / CVV</label>
                    <input type="password" className="form-control" name="cardCvc" value={formData.cardCvc} onChange={handleInputChange} placeholder="123" maxLength="3" required />
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <button className="btn btn-outline-secondary rounded-pill px-4" onClick={prevStep}>Back</button>
                  <button className="btn btn-success rounded-pill px-4 fw-bold text-white" onClick={nextStep} disabled={!formData.cardNumber || !formData.cardExpiry || !formData.cardCvc}>
                    Place Order (${(Number(total) || 0).toFixed(2)})
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: CONFIRMATION */}
            {currentStep === 4 && (
              <div className="py-5">
                <i className="bi bi-check-circle-fill text-success display-1 d-block mb-3"></i>
                <h2 className="fw-bold text-success">Thank You For Your Order!</h2>
                <p className="text-muted mb-4 fs-5">Your order has been successfully placed.</p>
                <div className="card bg-light border-0 p-4 max-width-md mx-auto rounded mb-4 text-start" style={{ maxWidth: '500px' }}>
                  <h6 className="fw-bold mb-3 border-bottom pb-2">Order Summary Information:</h6>
                  <p className="mb-1 small"><strong>Customer:</strong> {formData.fullName}</p>
                  <p className="mb-1 small"><strong>Delivery Address:</strong> {formData.address}, {formData.city}</p>
                  <p className="mb-1 small"><strong>Contact Phone:</strong> {formData.phone}</p>
                  <p className="mb-0 small"><strong>Shipping Method:</strong> {shippingMethod === 'express' ? 'Express (1-2 days)' : 'Standard (3-5 days)'}</p>
                </div>
                <div className="d-flex justify-content-center gap-3">
                  <Link to="/" className="btn btn-outline-dark rounded-pill px-4 fw-bold py-2 shadow-sm">
                    Continue Shopping
                  </Link>
                  {currentUser && (
                    <Link to="/profile" className="btn btn-warning rounded-pill px-4 fw-bold py-2 shadow-sm">
                      View Order History
                    </Link>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* RIGHT: order summary */}
        {currentStep !== 4 && (
          <div className="col-12 col-lg-4 text-start">
            <div className="bg-white p-4 rounded shadow-sm border-0 position-sticky" style={{ top: '20px' }}>
              <h5 className="fw-bold mb-4">Order Summary</h5>
              
              <div className="overflow-y-auto mb-3" style={{ maxHeight: '240px' }}>
                {cart.map((item) => (
                  <div key={`${item.id}-${item.color}-${item.size}`} className="d-flex gap-3 mb-3 border-bottom pb-2">
                    <img 
                      src={item.images?.[item.color]?.[0] || item.images?.[Object.keys(item.images)[0]]?.[0]} 
                      alt={item.title} 
                      className="rounded bg-light border" 
                      style={{ width: '60px', height: '60px', objectFit: 'contain' }} 
                    />
                    <div className="flex-grow-1 text-truncate">
                      <h6 className="small fw-bold mb-0 text-truncate">{item.title}</h6>
                      <small className="text-muted d-block text-capitalize">{item.color} / {item.size}</small>
                      <small className="text-dark fw-semibold">{item.quantity} x ${(Number(item.price) || 0).toFixed(2)}</small>
                    </div>
                  </div>
                ))}
              </div>

              <div className="d-flex justify-content-between mb-2 small text-muted">
                <span>Subtotal:</span>
                <span className="fw-semibold">${(Number(subtotal) || 0).toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3 small text-muted">
                <span>Shipping:</span>
                <span className="fw-semibold">${(Number(shippingCost) || 0).toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-0 fs-5 fw-bold text-dark">
                <span>Total:</span>
                <span>${(Number(total) || 0).toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};