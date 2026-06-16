// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const RegisterPage = () => {
  const { registerUser } = useApp();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData);
    navigate('/profile');
  };

  return (
    <div className="container my-5 text-start">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-5">
          <div className="bg-white p-4 rounded shadow-sm border">
            <h3 className="fw-bold text-center mb-4">Create Account</h3>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small fw-semibold">Full Name</label>
                <input type="text" className="form-control" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" required />
              </div>
              
              <div className="mb-3">
                <label className="form-label small fw-semibold">Email Address</label>
                <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required />
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold">Phone Number</label>
                <input type="tel" className="form-control" name="phone" value={formData.phone} onChange={handleChange} placeholder="+994 (55) 000-00-00" />
              </div>
              
              <div className="mb-4">
                <label className="form-label small fw-semibold">Password</label>
                <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" required />
              </div>
              
              <button type="submit" className="btn btn-warning w-100 rounded-pill fw-bold py-2 mb-3">
                Sign Up
              </button>
            </form>
            
            <p className="text-center small text-muted mb-0">
              Already have an account? <Link to="/login" className="text-warning fw-bold text-decoration-none">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};