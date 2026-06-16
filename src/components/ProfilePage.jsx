// src/pages/ProfilePage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const ProfilePage = () => {
  const { currentUser, orders, logoutUser, updateProfile } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'settings'

  // State for profile editing
  const [profileForm, setProfileForm] = useState({
    fullName: currentUser?.fullName || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
    city: currentUser?.city || ''
  });

  if (!currentUser) {
    return (
      <div className="container my-5 text-center py-5 bg-white rounded shadow-sm border">
        <i className="bi bi-person-lock text-muted display-1 d-block mb-3"></i>
        <h2 className="fw-bold">Access Denied</h2>
        <p className="text-muted">Please log in to view your profile and order history.</p>
        <Link to="/login" className="btn btn-warning rounded-pill px-4 fw-bold mt-2">Go to Login</Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    setProfileForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
    alert('Profile updated successfully!');
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <div className="container my-5 text-start">
      <div className="row g-4">
        
        {/* LEFT PANEL: user info and menu */}
        <div className="col-12 col-lg-4">
          <div className="bg-white p-4 rounded shadow-sm border text-center">
            <div className="bg-warning text-dark rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
              <i className="bi bi-person-fill"></i>
            </div>
            <h5 className="fw-bold mb-1">{currentUser.fullName}</h5>
            <p className="text-muted small mb-3">{currentUser.email}</p>
            <span className="badge bg-secondary-subtle text-secondary mb-4">Member since {currentUser.createdAt}</span>
            
            <div className="list-group text-start border-0">
              <button 
                className={`list-group-item list-group-item-action d-flex align-items-center gap-2 border-0 rounded px-3 py-2.5 mb-1 ${activeTab === 'orders' ? 'bg-warning-subtle text-warning-emphasis fw-bold' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                <i className="bi bi-bag-check-fill"></i> Order History ({orders.length})
              </button>
              <button 
                className={`list-group-item list-group-item-action d-flex align-items-center gap-2 border-0 rounded px-3 py-2.5 mb-3 ${activeTab === 'settings' ? 'bg-warning-subtle text-warning-emphasis fw-bold' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                <i className="bi bi-gear-fill"></i> Account Settings
              </button>
              <hr className="my-2" />
              <button className="list-group-item list-group-item-action d-flex align-items-center gap-2 border-0 rounded px-3 py-2.5 text-danger fw-bold" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right"></i> Log Out
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: tab content */}
        <div className="col-12 col-lg-8">
          <div className="bg-white p-4 rounded shadow-sm border" style={{ minHeight: '400px' }}>
            
            {/* TAB 1: Order history */}
            {activeTab === 'orders' && (
              <div>
                <h4 className="fw-bold mb-4">Your Orders</h4>
                {orders.length === 0 ? (
                  <div className="text-center py-5 text-muted">
                    <i className="bi bi-basket3 display-4 d-block mb-2"></i>
                    <p>You haven't placed any orders yet.</p>
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    {orders.map((order) => (
                      <div key={order.id} className="card border rounded p-3">
                        <div className="d-flex flex-wrap align-items-center justify-content-between border-bottom pb-2 mb-3 gap-2">
                          <div>
                            <span className="fw-bold text-dark d-block">{order.id}</span>
                            <small className="text-muted">Placed on {order.date}</small>
                          </div>
                          <div>
                            <span className="badge bg-warning text-dark me-2 text-capitalize">{order.shippingMethod}</span>
                            <span className="badge bg-success-subtle text-success">{order.status}</span>
                          </div>
                        </div>
                        
                        {/* Items in the order */}
                        <div className="mb-2">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="d-flex align-items-center gap-2 mb-2 small">
                              <span className="text-muted fw-bold">{item.quantity}x</span>
                              <span className="text-dark">{item.title}</span>
                              <span className="text-muted text-capitalize">({item.color} / {item.size})</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="d-flex justify-content-between align-items-center pt-2 border-top mt-2 small">
                          <span className="text-muted">Delivery Address: <strong className="text-dark">{order.deliveryAddress}</strong></span>
                          <span className="fs-6 fw-bold text-dark">Total: ${order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Edit profile */}
            {activeTab === 'settings' && (
              <div>
                <h4 className="fw-bold mb-4">Account Details</h4>
                <form onSubmit={handleSaveSettings}>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Full Name</label>
                    <input type="text" className="form-control" name="fullName" value={profileForm.fullName} onChange={handleInputChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Phone Number</label>
                    <input type="tel" className="form-control" name="phone" value={profileForm.phone} onChange={handleInputChange} />
                  </div>
                  <div className="row">
                    <div className="col-md-8 mb-3">
                      <label className="form-label small fw-semibold">Street Address</label>
                      <input type="text" className="form-control" name="address" value={profileForm.address} onChange={handleInputChange} />
                    </div>
                    <div className="col-md-4 mb-4">
                      <label className="form-label small fw-semibold">City</label>
                      <input type="text" className="form-control" name="city" value={profileForm.city} onChange={handleInputChange} />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-warning rounded-pill px-4 fw-bold">Save Changes</button>
                </form>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};