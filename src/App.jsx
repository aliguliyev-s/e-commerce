// src/App.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { BackToTop } from './components/BackToTop';
import { ProductCard } from './components/ProductCard';
import { FiltersSidebar } from './components/FiltersSidebar';
import { ProductPage } from './components/ProductPage';
import { CartPage } from './components/CartPage';
import { WishlistPage } from './components/WishlistPage';
import { CheckoutPage } from './components/CheckoutPage';
import { AdminPage } from './components/AdminPage';

// User account and authentication pages
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { ProfilePage } from './components/ProfilePage';

// Layout helper to scroll window to top on route change
import { ScrollToTop } from './components/ScrollToTop';

// Local default mock data fallback
import { products as initialProducts } from './data/products';

const INITIAL_FILTERS = {
  category: '',
  maxPrice: 200,
  color: '',
  size: '',
  rating: 0,
};

function App() {
  // 1. STATE INITIALIZATION: Read products from localStorage to sync with Admin Panel modifications
  const [productsList, setProductsList] = useState(() => {
    const savedProducts = localStorage.getItem('eshop_products');
    return savedProducts ? JSON.parse(savedProducts) : initialProducts;
  });

  // 2. LIVE SYNCHRONIZATION: Listen to active tab focus updates to catch adjustments from the admin dash
  useEffect(() => {
    const syncLocalProducts = () => {
      const savedProducts = localStorage.getItem('eshop_products');
      if (savedProducts) {
        setProductsList(JSON.parse(savedProducts));
      }
    };

    // Keep productsList in sync when the window gains focus or when
    // another part of the app dispatches an explicit update event.
    window.addEventListener('focus', syncLocalProducts);
    window.addEventListener('eshop_products_updated', syncLocalProducts);
    return () => {
      window.removeEventListener('focus', syncLocalProducts);
      window.removeEventListener('eshop_products_updated', syncLocalProducts);
    };
  }, []);

  // 3. DYNAMIC METRICS: Derive available filtering badges automatically based on active product inventory
  const UNIQUE_CATEGORIES = useMemo(() => {
    return [...new Set(productsList.map((p) => p.category))];
  }, [productsList]);

  const UNIQUE_COLORS = useMemo(() => {
    return [...new Set(productsList.flatMap((p) => p.colors || []))];
  }, [productsList]);

  const UNIQUE_SIZES = useMemo(() => {
    return [...new Set(productsList.flatMap((p) => p.sizes || []))].filter(
      (s) => s !== 'One Size' && s !== 'Standard' && s !== 'Oversize'
    );
  }, [productsList]);

  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [sortBy, setSortBy] = useState('popular');

  const resetFilters = () => setFilters(INITIAL_FILTERS);

  // 4. FILTER & SORT ENGINE: Process dynamic inventory array down through user criteria matching
  const filteredProducts = useMemo(() => {
    let result = [...productsList];

    // Filter by Category
    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }
    // Filter by Price Limit
    result = result.filter((p) => p.price <= filters.maxPrice);
    // Filter by Color variant
    if (filters.color) {
      result = result.filter((p) => p.colors?.includes(filters.color));
    }
    // Filter by Size matrix
    if (filters.size) {
      result = result.filter((p) => p.sizes?.includes(filters.size));
    }
    // Filter by Rating Threshold
    if (filters.rating > 0) {
      result = result.filter((p) => p.rating >= filters.rating);
    }

    // Sort processing
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'new') {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else if (sortBy === 'popular') {
      result.sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0));
    }

    return result;
  }, [filters, sortBy, productsList]);

  return (
    <AppProvider>
      {/* Scroll manager component triggers instantly on route transformations */}
      <ScrollToTop />

      <div className="bg-light" style={{ minHeight: '100vh' }}>
        <Header />

        <main className="container my-5">
          <Routes>
            {/* MAIN CATALOG ROUTE */}
            <Route
              path="/"
              element={
                <>
                  {/* Hero Banner Area */}
                  <div
                    className="bg-dark text-white p-5 rounded shadow-sm text-center mb-5"
                    style={{ background: 'linear-gradient(45deg, #212529, #343a40)' }}
                  >
                    <h1 className="display-4 fw-bold text-warning">Summer Collection 2026</h1>
                    <p className="lead text-secondary">
                      Discover premium products with advanced filtering and instant checkout.
                    </p>
                  </div>

                  <div className="row">
                    {/* Left Sidebar Layout Grid Block */}
                    <div className="col-12 col-md-4 col-lg-3 mb-4">
                      <FiltersSidebar
                        filters={filters}
                        setFilters={setFilters}
                        categories={UNIQUE_CATEGORIES}
                        allColors={UNIQUE_COLORS}
                        allSizes={UNIQUE_SIZES}
                        resetFilters={resetFilters}
                      />
                    </div>

                    {/* Main Feed Content Layout Grid Block */}
                    <div className="col-12 col-md-8 col-lg-9">
                      {/* Interactive Header Utility Bar */}
                      <div className="d-flex justify-content-between align-items-center mb-4 bg-white p-3 rounded shadow-sm">
                        <span className="text-muted fw-semibold">
                          Found <span className="text-dark">{filteredProducts.length}</span> products
                        </span>

                        <div className="d-flex align-items-center gap-2">
                          <span className="text-muted small text-nowrap">Sort by:</span>
                          <select
                            className="form-select form-select-sm border-0 bg-light fw-semibold"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            style={{ width: '160px', cursor: 'pointer' }}
                          >
                            <option value="popular">Most Popular</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="new">Newest Arrivals</option>
                          </select>
                        </div>
                      </div>

                      {/* Flexbox / CSS Grid Product Display Mapping */}
                      <div className="row">
                        {filteredProducts.length > 0 ? (
                          filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                          ))
                        ) : (
                          <div className="col-12 text-center py-5 bg-white rounded shadow-sm">
                            <i className="bi bi-search fs-1 text-muted d-block mb-3"></i>
                            <h5 className="fw-bold">No products found</h5>
                            <p className="text-muted">
                              Try changing your active filters or clear them all.
                            </p>
                            <button
                              className="btn btn-warning btn-sm mt-2 rounded-pill px-4 fw-semibold"
                              onClick={resetFilters}
                            >
                              Reset Filters
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              }
            />

            {/* DYNAMIC AND AUXILIARY APPLICATION ROUTING BLOCKS */}
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />

            {/* IDENTITY SECURITY MANAGEMENT ROUTES */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>

        <BackToTop />
      </div>
    </AppProvider>
  );
}

export default App;