import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('http://localhost:8000/getAllProducts', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = ['all', ...new Set(products.map((p) => p.category_name).filter(Boolean))];

  const filtered = products.filter((p) => {
    const matchSearch =
      p.item_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === 'all' || p.category_name === selectedCategory;
    return matchSearch && matchCategory;
  });

  const handleDelete = async (sku) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const token = localStorage.getItem('access_token');
      await axios.delete(`http://localhost:8000/deleteItem?sku=${sku}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prev) => prev.filter((p) => p.sku !== sku));
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-orbitron text-2xl font-bold neon-text mb-1">PRODUCT DATABASE</h1>
        <p className="font-mono text-xs text-white/30 tracking-wider">
          INVENTORY RECORDS // {products.length} ITEMS REGISTERED
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="cyber-card p-4 mb-6"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2"
              width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#00f0ff" strokeWidth="1.5" opacity="0.5"
            >
              <circle cx="7" cy="7" r="5" />
              <path d="M11 11l3 3" />
            </svg>
            <input
              type="text"
              placeholder="Search products by name or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="cyber-input pl-10"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="cyber-select md:w-48"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Products Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="cyber-card overflow-hidden"
      >
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="cyber-spinner" />
            <span className="ml-4 font-mono text-xs text-cyber-cyan/50 tracking-wider">LOADING DATA...</span>
          </div>
        ) : filtered.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="cyber-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Value</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filtered.map((product, idx) => {
                    const isLow = product.current_stock <= (product.reorder_level || 10);
                    return (
                      <motion.tr
                        key={product.sku || idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-cyber-border flex items-center justify-center overflow-hidden">
                              {product.item_img_url ? (
                                <img
                                  src={`http://localhost:8000/${product.item_img_url}`}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#00f0ff" strokeWidth="1" opacity="0.5">
                                  <path d="M2 4l6-3 6 3v8l-6 3-6-3V4z" />
                                </svg>
                              )}
                            </div>
                            <span className="font-rajdhani font-medium text-white/80">{product.item_name}</span>
                          </div>
                        </td>
                        <td><span className="font-mono text-xs text-cyber-cyan/70">{product.sku}</span></td>
                        <td><span className="font-rajdhani text-white/50">{product.category_name}</span></td>
                        <td><span className="font-mono text-cyber-green">${product.item_price}</span></td>
                        <td><span className={`font-mono ${isLow ? 'text-cyber-red' : 'text-white/60'}`}>{product.current_stock}</span></td>
                        <td><span className="font-mono text-white/40">${product.stock_value?.toLocaleString()}</span></td>
                        <td>
                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wider ${
                            isLow
                              ? 'bg-cyber-red/10 text-cyber-red border border-cyber-red/20'
                              : 'bg-cyber-green/10 text-cyber-green border border-cyber-green/20'
                          }`}>
                            <span className={`status-dot ${isLow ? 'status-dot-red' : 'status-dot-green'}`} style={{ width: 5, height: 5 }} />
                            {isLow ? 'LOW' : 'OK'}
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={() => handleDelete(product.sku)}
                            className="p-1.5 rounded-md hover:bg-cyber-red/10 text-white/30 hover:text-cyber-red transition-all"
                            title="Delete"
                          >
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M2 4h10M5 4V2h4v2M5 6v5M9 6v5M3 4l1 8h6l1-8" />
                            </svg>
                          </button>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-20">
            <svg className="mx-auto mb-4" width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#1a1a3e" strokeWidth="1.5">
              <path d="M8 12l16-8 16 8v24l-16 8-16-8V12z" />
              <path d="M8 12l16 8 16-8" />
              <path d="M24 20v24" />
            </svg>
            <p className="font-mono text-sm text-white/30 tracking-wider">NO PRODUCTS FOUND</p>
            <p className="font-mono text-[10px] text-white/15 mt-1">
              {searchTerm ? 'Try adjusting your search parameters' : 'Add products to get started'}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Products;
