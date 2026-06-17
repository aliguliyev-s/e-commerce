// src/pages/AdminPage.jsx
import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { products as initialProducts } from '../data/products';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

// Chart.js modullarını qeydiyyatdan keçiririk
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export const AdminPage = () => {
  const { orders, updateOrderStatus } = useApp();
  
  // Aktiv tabı idarə etmək üçün state ('statistics', 'products', 'categories', 'orders')
  const [activeTab, setActiveTab] = useState('statistics');

  // LocalStorage-dən məhsulları oxuyuruq, yoxdursa data/products-dan götürürük
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('eshop_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  // Kateqoriyalar siyahısı
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('eshop_categories');
    return saved ? JSON.parse(saved) : [...new Set(initialProducts.map(p => p.category))];
  });

  // Sifarişlər (Simulyasiya üçün local state, context-dən də gəlir)
  const [adminOrders, setAdminOrders] = useState(() => {
    const saved = localStorage.getItem('eshop_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // --- CRUD və Digər Dəyişiklikləri Yadda Saxlamaq ---
  useEffect(() => {
    localStorage.setItem('eshop_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('eshop_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('eshop_orders', JSON.stringify(adminOrders));
  }, [adminOrders]);

  // --- PRODUCT CRUD STATES & FUNCTIONS ---
  const [productForm, setProductForm] = useState({ id: null, title: '', price: '', category: '', description: '', colors: '', sizes: '', images: [] });
  const [isEditing, setIsEditing] = useState(false);

  const handleProductSubmit = (e) => {
    e.preventDefault();
    const colorsArray = productForm.colors.split(',').map(c => c.trim().toLowerCase());
    const sizesArray = productForm.sizes.split(',').map(s => s.trim().toUpperCase());

    // Çoxlu şəkil yükləmə simulyasiyası (Obyekt formatında: { color1: [url1, url2], color2: [url3] })
    // Sadəlik üçün ilk rəngə yüklənən şəkilləri mənimsədirik
    const firstColor = colorsArray[0] || 'default';
    const imagesObject = { [firstColor]: productForm.images };

    if (isEditing) {
      setProducts(prev => prev.map(p => p.id === productForm.id ? { 
        ...p, 
        title: productForm.title, 
        price: Number(productForm.price), 
        category: productForm.category,
        description: productForm.description,
        colors: colorsArray,
        sizes: sizesArray,
        images: imagesObject
      } : p));
      setIsEditing(false);
    } else {
      const newProduct = {
        id: Date.now(),
        title: productForm.title,
        price: Number(productForm.price),
        category: productForm.category,
        description: productForm.description,
        colors: colorsArray,
        sizes: sizesArray,
        images: imagesObject,
        rating: 5,
        salesCount: 0
      };
      setProducts(prev => [newProduct, ...prev]);
    }
    resetProductForm();
  };

  const handleEditProduct = (product) => {
    setIsEditing(true);
    // Şəkilləri obyektdən array formasına çıxarırıq
    const allImages = Object.values(product.images || {}).flat();
    setProductForm({
      id: product.id,
      title: product.title,
      price: product.price,
      category: product.category,
      description: product.description || '',
      colors: product.colors?.join(', ') || '',
      sizes: product.sizes?.join(', ') || '',
      images: allImages
    });
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Bu məhsulu silmək istədiyinizdən əminsiniz?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const resetProductForm = () => {
    setProductForm({ id: null, title: '', price: '', category: '', description: '', colors: '', sizes: '', images: [] });
    setIsEditing(false);
  };

  // Çoxlu şəkil yükləmə (Base64 formatına çevrilmə)
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const promises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then(base64Images => {
      setProductForm(prev => ({ ...prev, images: [...prev.images, ...base64Images] }));
    });
  };

  // --- CATEGORY MANAGEMENT ---
  const [newCategory, setNewCategory] = useState('');
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory && !categories.includes(newCategory)) {
      setCategories(prev => [...prev, newCategory.trim()]);
      setNewCategory('');
    }
  };
  const handleDeleteCategory = (catName) => {
    if (window.confirm(`"${catName}" kateqoriyasını silmək istəyirsiniz?`)) {
      setCategories(prev => prev.filter(c => c !== catName));
    }
  };

  // --- ORDER MANAGEMENT ---
  const handleStatusChange = (orderId, newStatus) => {
    setAdminOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    updateOrderStatus(orderId, newStatus);
  };

  // --- STATISTICS CALCULATIONS & CHARTS ---
  const totalSales = adminOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  
  // Kateqoriyalar üzrə məhsul sayı statistikası
  const categoryCounts = categories.reduce((obj, cat) => {
    obj[cat] = products.filter(p => p.category === cat).length;
    return obj;
  }, {});

  const barChartData = {
    labels: Object.keys(categoryCounts),
    datasets: [{
      label: 'Məhsul Sayı',
      data: Object.values(categoryCounts),
      backgroundColor: 'rgba(255, 193, 7, 0.6)',
      borderColor: 'rgba(255, 193, 7, 1)',
      borderWidth: 1,
    }]
  };

  // Sifariş statusları üzrə statistika (Pie Chart)
  const statusCounts = adminOrders.reduce((obj, o) => {
    obj[o.status] = (obj[o.status] || 0) + 1;
    return obj;
  }, { 'Processing': 0, 'Shipped': 0, 'Delivered': 0, 'Cancelled': 0 });

  const pieChartData = {
    labels: Object.keys(statusCounts),
    datasets: [{
      data: Object.values(statusCounts),
      backgroundColor: ['#0d6efd', '#ffc107', '#198754', '#dc3545'],
    }]
  };

  return (
    <div className="container-fluid my-4 text-start">
      <div className="row">
        {/* SOL MENYU (Sidebar) */}
        <div className="col-12 col-md-3 mb-4">
          <div className="bg-white p-3 rounded shadow-sm border">
            <h5 className="fw-bold mb-4 text-dark text-center py-2 border-bottom">
              <i className="bi bi-speedometer2 me-2"></i>Admin Panel
            </h5>
            <div className="nav flex-column nav-pills gap-2">
              <button className={`nav-link text-start fw-semibold ${activeTab === 'statistics' ? 'active bg-warning text-dark' : 'text-secondary'}`} onClick={() => setActiveTab('statistics')}>
                <i className="bi bi-graph-up me-2"></i> Satış Statistikası
              </button>
              <button className={`nav-link text-start fw-semibold ${activeTab === 'products' ? 'active bg-warning text-dark' : 'text-secondary'}`} onClick={() => setActiveTab('products')}>
                <i className="bi bi-box-seam me-2"></i> Məhsul CRUD
              </button>
              <button className={`nav-link text-start fw-semibold ${activeTab === 'categories' ? 'active bg-warning text-dark' : 'text-secondary'}`} onClick={() => setActiveTab('categories')}>
                <i className="bi bi-tags me-2"></i> Kateqoriya İdarəetmə
              </button>
              <button className={`nav-link text-start fw-semibold ${activeTab === 'orders' ? 'active bg-warning text-dark' : 'text-secondary'}`} onClick={() => setActiveTab('orders')}>
                <i className="bi bi-receipt me-2"></i> Sifariş İdarəetmə 
                {adminOrders.filter(o => o.status === 'Processing').length > 0 && (
                  <span className="badge bg-danger ms-2">{adminOrders.filter(o => o.status === 'Processing').length}</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* SAĞ TƏRƏF: KONTENT APARIŞI */}
        <div className="col-12 col-md-9">
          <div className="bg-white p-4 rounded shadow-sm border" style={{ minHeight: '60vh' }}>
            
            {/* TAB 1: SATIŞ STATİSTİKASI */}
            {activeTab === 'statistics' && (
              <div>
                <h4 className="fw-bold mb-4">Dashboard & Statistika</h4>
                <div className="row g-3 mb-4">
                  <div className="col-12 col-sm-4">
                    <div className="p-3 bg-light rounded border border-start border-warning border-4 shadow-sm">
                      <small className="text-muted fw-bold uppercase">Ümumi Qazanc</small>
                      <h3 className="fw-bold m-0 text-dark">${totalSales.toFixed(2)}</h3>
                    </div>
                  </div>
                  <div className="col-12 col-sm-4">
                    <div className="p-3 bg-light rounded border border-start border-primary border-4 shadow-sm">
                      <small className="text-muted fw-bold">Toplam Sifariş</small>
                      <h3 className="fw-bold m-0 text-dark">{adminOrders.length} ədəd</h3>
                    </div>
                  </div>
                  <div className="col-12 col-sm-4">
                    <div className="p-3 bg-light rounded border border-start border-success border-4 shadow-sm">
                      <small className="text-muted fw-bold">Aktiv Məhsul Sayı</small>
                      <h3 className="fw-bold m-0 text-dark">{products.length} çeşid</h3>
                    </div>
                  </div>
                </div>

                <div className="row g-4 mt-2">
                  <div className="col-12 col-lg-7">
                    <div className="p-3 border rounded bg-light">
                      <h6 className="fw-bold mb-3 text-muted">Kateqoriyalar üzrə məhsul paylanması</h6>
                      <Bar data={barChartData} />
                    </div>
                  </div>
                  <div className="col-12 col-lg-5">
                    <div className="p-3 border rounded bg-light">
                      <h6 className="fw-bold mb-3 text-muted">Sifarişlərin Status nisbəti</h6>
                      <div style={{ maxHeight: '280px', display: 'flex', justifyContent: 'center' }}>
                        <Pie data={pieChartData} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: MƏHSUL CRUD */}
            {activeTab === 'products' && (
              <div>
                <h4 className="fw-bold mb-4">{isEditing ? 'Məhsulu Redaktə Et' : 'Yeni Məhsul Əlavə Et'}</h4>
                <form onSubmit={handleProductSubmit} className="bg-light p-3 rounded border mb-5">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Məhsulun Adı</label>
                      <input type="text" className="form-control" value={productForm.title} onChange={e => setProductForm({...productForm, title: e.target.value})} placeholder="Məs: Premium T-Shirt" required />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label small fw-bold">Qiymət ($)</label>
                      <input type="number" className="form-control" value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})} placeholder="45.00" required />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label small fw-bold">Kateqoriya</label>
                      <select className="form-select" value={productForm.category} onChange={e => setProductForm({...productForm, category: e.target.value})} required>
                        <option value="">Seçin...</option>
                        {categories.map((c, idx) => <option key={idx} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Rənglər (Vergüllə ayır)</label>
                      <input type="text" className="form-control" value={productForm.colors} onChange={e => setProductForm({...productForm, colors: e.target.value})} placeholder="black, white, red" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Ölçülər (Vergüllə ayır)</label>
                      <input type="text" className="form-control" value={productForm.sizes} onChange={e => setProductForm({...productForm, sizes: e.target.value})} placeholder="S, M, L, XL" required />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-bold">Məhsul Şəkilləri (Çoxlu seçim etmək olar)</label>
                      <input type="file" className="form-control" multiple accept="image/*" onChange={handleImageChange} />
                      {productForm.images.length > 0 && (
                        <div className="d-flex gap-2 flex-wrap mt-2 bg-white p-2 rounded border">
                          {productForm.images.map((img, i) => (
                            <img key={i} src={img} alt="preview" className="rounded border" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
                          ))}
                          <button type="button" className="btn btn-sm btn-danger rounded-circle align-self-center ms-auto" onClick={() => setProductForm({...productForm, images: []})}>Clear All</button>
                        </div>
                      )}
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-bold">Açıqlama (Description)</label>
                      <textarea className="form-control" rows="2" value={productForm.description} onChange={e => setProductForm({...productForm, description: e.target.value})} placeholder="Məhsul haqqında geniş məlumat..."></textarea>
                    </div>
                  </div>
                  <div className="mt-3 d-flex gap-2">
                    <button type="submit" className="btn btn-warning fw-bold px-4 rounded-pill">{isEditing ? 'Yenilə' : 'Əlavə Et'}</button>
                    {isEditing && <button type="button" className="btn btn-outline-secondary rounded-pill" onClick={resetProductForm}>Ləğv Et</button>}
                  </div>
                </form>

                <h5 className="fw-bold mb-3 text-dark">Məhsul Siyahısı ({products.length})</h5>
                <div className="table-responsive">
                  <table className="table table-hover align-middle border">
                    <thead className="table-light">
                      <tr>
                        <th>Şəkil</th>
                        <th>Adı</th>
                        <th>Kateqoriya</th>
                        <th>Qiymət</th>
                        <th>Əməliyyatlar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p) => {
                        const firstColor = p.colors?.[0];
                        const productImg = p.images?.[firstColor]?.[0] || Object.values(p.images || {})[0]?.[0];
                        return (
                          <tr key={p.id}>
                            <td><img src={productImg} alt="" className="rounded bg-light border" style={{ width: '45px', height: '45px', objectFit: 'contain' }} /></td>
                            <td className="fw-semibold text-truncate" style={{ maxWidth: '180px' }}>{p.title}</td>
                            <td><span className="badge bg-secondary-subtle text-dark">{p.category}</span></td>
                            <td className="fw-bold">${p.price.toFixed(2)}</td>
                            <td>
                              <div className="d-flex gap-2">
                                <button className="btn btn-sm btn-outline-primary" onClick={() => handleEditProduct(p)}><i className="bi bi-pencil"></i></button>
                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteProduct(p.id)}><i className="bi bi-trash"></i></button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: KATEQORİYA İDARƏETMƏ */}
            {activeTab === 'categories' && (
              <div>
                <h4 className="fw-bold mb-4">Kateqoriyalar</h4>
                <form onSubmit={handleAddCategory} className="d-flex gap-2 mb-4" style={{ maxWidth: '450px' }}>
                  <input type="text" className="form-control" value={newCategory} onChange={e => setNewCategory(e.target.value)} placeholder="Yeni kateqoriya adı..." required />
                  <button type="submit" className="btn btn-warning fw-bold text-nowrap rounded-pill px-4">Əlavə Et</button>
                </form>

                <div className="list-group" style={{ maxWidth: '450px' }}>
                  {categories.map((cat, idx) => (
                    <div key={idx} className="list-group-item d-flex justify-content-between align-items-center bg-light-subtle">
                      <span className="fw-semibold text-dark">{cat}</span>
                      <button className="btn btn-sm btn-link text-danger p-0 text-decoration-none" onClick={() => handleDeleteCategory(cat)}>
                        <i className="bi bi-trash fs-5"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: SİFARİŞ İDARƏETMƏ */}
            {activeTab === 'orders' && (
              <div>
                <h4 className="fw-bold mb-4">Sifarişlərin Siyahısı</h4>
                {adminOrders.length === 0 ? (
                  <p className="text-muted text-center py-4">Hələ heç bir sifariş yoxdur.</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle border">
                      <thead className="table-light">
                        <tr>
                          <th>ID</th>
                          <th>Tarix</th>
                          <th>Ünvan</th>
                          <th>Məbləğ</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {adminOrders.map((order) => (
                          <tr key={order.id}>
                            <td className="small fw-bold text-secondary">{order.id}</td>
                            <td className="small">{order.date}</td>
                            <td className="small text-truncate" style={{ maxWidth: '200px' }} title={order.deliveryAddress}>
                              {order.deliveryAddress}
                            </td>
                            <td className="fw-bold">${(order.total || 0).toFixed(2)}</td>
                            <td>
                              <select 
                                className={`form-select form-select-sm fw-bold border-0 text-white ${
                                  order.status === 'Processing' ? 'bg-primary' :
                                  order.status === 'Shipped' ? 'bg-warning text-dark' :
                                  order.status === 'Delivered' ? 'bg-success' : 'bg-danger'
                                }`}
                                value={order.status}
                                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                style={{ width: '130px', cursor: 'pointer' }}
                              >
                                <option value="Processing" className="bg-white text-dark">Processing</option>
                                <option value="Shipped" className="bg-white text-dark">Shipped</option>
                                <option value="Delivered" className="bg-white text-dark">Delivered</option>
                                <option value="Cancelled" className="bg-white text-dark">Cancelled</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};