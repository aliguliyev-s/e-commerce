// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const LoginPage = () => {
  const { loginUser } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      loginUser(email, password);
      navigate('/profile'); // After successful login redirect to profile
    }
  };

  return (
    <div className="container my-5 text-start">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="bg-white p-4 rounded shadow-sm border">
            <h3 className="fw-bold text-center mb-4">Sign In</h3>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small fw-semibold">Email Address</label>
                <input 
                  type="email" 
                  className="form-control" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="name@example.com" 
                  required 
                />
              </div>
              
              <div className="mb-4">
                <label className="form-label small fw-semibold">Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="••••••••" 
                  required 
                />
              </div>
              
              <button type="submit" className="btn btn-warning w-100 rounded-pill fw-bold py-2 mb-3">
                Sign In
              </button>
            </form>
            
            <p className="text-center small text-muted mb-0">
              Don't have an account? <Link to="/register" className="text-warning fw-bold text-decoration-none">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};