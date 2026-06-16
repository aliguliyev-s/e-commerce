// src/components/FiltersSidebar.jsx
import React from 'react';

export const FiltersSidebar = ({ 
  filters, 
  setFilters, 
  categories, 
  allColors, 
  allSizes,
  resetFilters 
}) => {
  
  const handleCategoryChange = (category) => {
    setFilters(prev => ({ ...prev, category }));
  };

  const handlePriceChange = (e) => {
    setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }));
  };

  const handleColorChange = (color) => {
    setFilters(prev => ({ ...prev, color: prev.color === color ? '' : color }));
  };

  const handleSizeChange = (size) => {
    setFilters(prev => ({ ...prev, size: prev.size === size ? '' : size }));
  };

  const handleRatingChange = (rating) => {
    // If the same rating is clicked again, toggle it off (reset to 0)
    setFilters(prev => ({ ...prev, rating: prev.rating === rating ? 0 : rating }));
  };

  return (
    // Apply the sticky filters class which enables scrolling
    <div className="card p-4 shadow-sm border-0 bg-white filters-sticky-container">
      <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
        <h5 className="fw-bold mb-0">Filters</h5>
        {(filters.category || filters.color || filters.size || filters.rating !== 0 || filters.maxPrice < 200) && (
          <button className="btn btn-sm btn-link text-danger p-0 text-decoration-none fw-semibold" onClick={resetFilters}>
            Clear All
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="mb-4">
        <h6 className="fw-bold mb-2">Category</h6>
        <div className="list-group list-group-flush filter-scroll-section">
          <button 
            className={`list-group-item list-group-item-action border-0 ps-0 py-1 d-flex justify-content-between align-items-center small ${filters.category === '' ? 'text-warning fw-bold' : ''}`}
            onClick={() => handleCategoryChange('')}
          >
            All Categories
          </button>
          {categories.map(cat => (
            <button 
              key={cat}
              className={`list-group-item list-group-item-action border-0 ps-0 py-1 small ${filters.category === cat ? 'text-warning fw-bold' : ''}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="fw-bold mb-0">Max Price</h6>
          <span className="badge bg-dark">${filters.maxPrice}</span>
        </div>
        <input 
          type="range" 
          className="form-range" 
          min="20" 
          max="200" 
          step="5"
          value={filters.maxPrice} 
          onChange={handlePriceChange}
        />
        <div className="d-flex justify-content-between text-muted" style={{ fontSize: '11px' }}>
          <span>Min: $20</span>
          <span>Max: $200</span>
        </div>
      </div>

      {/* Colors */}
      <div className="mb-4">
        <h6 className="fw-bold mb-1">Color</h6>
        {filters.color && <p className="text-muted small mb-2">Selected: <strong className="text-dark text-capitalize">{filters.color}</strong></p>}
        <div className="d-flex flex-wrap gap-2">
          {allColors.map(color => {
            const isSelected = filters.color === color;
            return (
              <button
                key={color}
                onClick={() => handleColorChange(color)}
                className="btn p-0 rounded-circle position-relative d-flex align-items-center justify-content-center"
                style={{ 
                  width: '30px', 
                  height: '30px', 
                  backgroundColor: color === 'khaki' ? '#f0e68c' : color,
                  border: color === 'white' ? '1px solid #ddd' : '1px solid transparent',
                  boxShadow: isSelected ? '0 0 0 3px #ffc107' : 'none',
                  transition: 'all 0.2s'
                }}
                title={color}
              >
                {/* If a color is selected, draw a check inside the color circle */}
                {isSelected && (
                  <i className={`bi bi-check-lg ${color === 'white' || color === 'beige' || color === 'khaki' ? 'text-dark' : 'text-white'} fw-bold`} style={{ fontSize: '14px' }}></i>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-4">
        <h6 className="fw-bold mb-2">Size</h6>
        <div className="d-flex flex-wrap gap-2">
          {allSizes.map(size => (
            <button
              key={size}
              onClick={() => handleSizeChange(size)}
              className={`btn btn-sm px-2 py-1 ${filters.size === size ? 'btn-warning fw-bold' : 'btn-outline-secondary'}`}
              style={{ minWidth: '38px', fontSize: '12px' }}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="mb-2">
        <h6 className="fw-bold mb-2">Minimum Rating</h6>
        {[5, 4, 3].map(stars => (
          <div key={stars} className="form-check mb-2">
            <input 
              className="form-check-input" 
              type="checkbox" 
              id={`rating-${stars}`}
              style={{ cursor: 'pointer' }}
              checked={filters.rating === stars}
              onChange={() => handleRatingChange(stars)}
            />
            <label className="form-check-label text-warning small user-select-none" htmlFor={`rating-${stars}`} style={{ cursor: 'pointer' }}>
              {Array(5).fill().map((_, i) => (
                <i key={i} className={`bi ${i < stars ? 'bi-star-fill' : 'bi-star text-muted'} me-1`}></i>
              ))}
              <span className={`ms-1 ${filters.rating === stars ? 'text-dark fw-bold' : 'text-muted'}`}>
                {stars === 5 ? '5.0 Stars' : `& up (${stars}.0+)`}
              </span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};