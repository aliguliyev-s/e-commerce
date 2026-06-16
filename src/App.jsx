// src/App.jsx
import React, { useState, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom'; // Import router elements
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { BackToTop } from './components/BackToTop';
import { ProductCard } from './components/ProductCard';
import { FiltersSidebar } from './components/FiltersSidebar';
import { ProductPage } from './components/ProductPage';
import { products } from './data/products';
import { CartPage } from './components/CartPage';
import { WishlistPage } from './components/WishlistPage';
import { CheckoutPage } from './components/CheckoutPage';

// Import pages related to user account and authentication
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { ProfilePage } from './components/ProfilePage';

// Helper component that scrolls to top on route change
import { ScrollToTop } from './components/ScrollToTop';

const UNIQUE_CATEGORIES = [...new Set(products.map(p => p.category))];
const UNIQUE_COLORS = [...new Set(products.flatMap(p => p.colors || []))];
const UNIQUE_SIZES = [...new Set(products.flatMap(p => p.sizes || []))].filter(s => s !== "One Size" && s !== "Standard" && s !== "Oversize");

const INITIAL_FILTERS = {
  category: '',
  maxPrice: 200,
  color: '',
  size: '',
  rating: 0,
};

function App() {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [sortBy, setSortBy] = useState('popular');

  const resetFilters = () => setFilters(INITIAL_FILTERS);

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (filters.category) result = result.filter(p => p.category === filters.category);
    result = result.filter(p => p.price <= filters.maxPrice);
    if (filters.color) result = result.filter(p => p.colors?.includes(filters.color));
    if (filters.size) result = result.filter(p => p.sizes?.includes(filters.size) || p.sizes?.includes("One Size") || p.sizes?.includes("Standard"));
    if (filters.rating > 0) result = result.filter(p => p.rating >= filters.rating);

    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'new') result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    else if (sortBy === 'popular') result.sort((a, b) => b.salesCount - a.salesCount);

    return result;
  }, [filters, sortBy]);

  return (
    <AppProvider>
      {/* Automatically scroll to top on route changes */}
      <ScrollToTop />
      
      <div className="bg-light" style={{ minHeight: '100vh' }}>
        <Header />
        
        <main className="container my-5">
          <Routes>
            {/* Main route: product catalog */}
            <Route path="/" element={
              <>
                {/* Hero Banner */}
                <div className="bg-dark text-white p-5 rounded shadow-sm text-center mb-5" style={{ background: 'linear-gradient(45deg, #212529, #343a40)' }}>
                  <h1 className="display-4 fw-bold text-warning">Summer Collection 2026</h1>
                  <p className="lead text-secondary">Discover premium products with advanced filtering and instant checkout.</p>
                </div>

                <div className="row">
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

                  <div className="col-12 col-md-8 col-lg-9">
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

                    <div className="row">
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))
                      ) : (
                        <div className="col-12 text-center py-5 bg-white rounded shadow-sm">
                          <i className="bi bi-search fs-1 text-muted d-block mb-3"></i>
                          <h5 className="fw-bold">No products found</h5>
                          <p className="text-muted">Try changing your active filters or clear them all.</p>
                          <button className="btn btn-warning btn-sm mt-2 rounded-pill px-4 fw-semibold" onClick={resetFilters}>
                            Reset Filters
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            } />

            {/* Dynamic route: single product page */}
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />

            {/* User account and auth routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>

        <BackToTop />
      </div>
    </AppProvider>
  );
}

export default App;