import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { UpdateProductAction } from "../../actions/InventoryAction";
import { motion } from 'framer-motion';

function UpdateProduct() {
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    sub_category: '',
    description: '',
    sku: '',
    image: null,
  });

  const dispatch = useDispatch();
  const { loading, product, error } = useSelector((state) => state.updateProductStore);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key !== "sku") formData.append(key, value);
    });
    dispatch(UpdateProductAction(formData, form.sku));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-orbitron text-2xl font-bold neon-text mb-1">UPDATE PRODUCT</h1>
        <p className="font-mono text-xs text-white/30 tracking-wider">
          MODIFY EXISTING PRODUCT DATA // REQUIRES SKU
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-2xl"
      >
        <div className="cyber-card cyber-corner p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-cyber-orange/10 border border-cyber-orange/20 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#ff8800" strokeWidth="1.5">
                <path d="M14.5 2.5l3 3L7 16H4v-3L14.5 2.5z" />
                <line x1="12" y1="5" x2="15" y2="8" />
              </svg>
            </div>
            <div>
              <h2 className="font-orbitron text-xs font-semibold text-cyber-orange/70 tracking-wider">
                PRODUCT MODIFICATION
              </h2>
              <p className="font-mono text-[10px] text-white/20">Enter SKU and updated fields</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* SKU - Primary identifier */}
            <div className="p-4 rounded-lg bg-cyber-deeper border border-cyber-border">
              <label className="cyber-input-label" style={{ color: '#ff8800' }}>Target SKU</label>
              <input
                type="text"
                name="sku"
                placeholder="Enter product SKU to update"
                value={form.sku}
                onChange={handleChange}
                className="cyber-input"
                required
                style={{ borderColor: form.sku ? '#ff8800' : undefined }}
              />
              <p className="font-mono text-[9px] text-white/15 mt-2">This identifies which product to update</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="cyber-input-label">Product Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Updated name"
                  value={form.name}
                  onChange={handleChange}
                  className="cyber-input"
                  required
                />
              </div>
              <div>
                <label className="cyber-input-label">Price ($)</label>
                <input
                  type="number"
                  name="price"
                  placeholder="0.00"
                  value={form.price}
                  onChange={handleChange}
                  className="cyber-input"
                  required
                  step="0.01"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="cyber-input-label">Category</label>
                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  value={form.category}
                  onChange={handleChange}
                  className="cyber-input"
                  required
                />
              </div>
              <div>
                <label className="cyber-input-label">Sub Category</label>
                <input
                  type="text"
                  name="sub_category"
                  placeholder="Sub category"
                  value={form.sub_category}
                  onChange={handleChange}
                  className="cyber-input"
                  required
                />
              </div>
            </div>

            <div>
              <label className="cyber-input-label">Description</label>
              <textarea
                name="description"
                placeholder="Updated description..."
                value={form.description}
                onChange={handleChange}
                className="cyber-input min-h-[80px] resize-y"
                required
              />
            </div>

            <div>
              <label className="cyber-input-label">New Image (Optional)</label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="hidden"
                id="update-image-upload"
                accept="image/*"
              />
              <label
                htmlFor="update-image-upload"
                className="cyber-input flex items-center gap-3 cursor-pointer hover:border-cyber-orange/50 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#ff8800" strokeWidth="1.5" opacity="0.5">
                  <rect x="2" y="4" width="16" height="12" rx="2" />
                  <circle cx="7" cy="9" r="2" />
                  <path d="M18 14l-4-4-6 6" />
                </svg>
                <span className="text-white/30 font-mono text-sm">
                  {form.image ? form.image.name : 'Choose new image (optional)...'}
                </span>
              </label>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="cyber-btn w-full"
              style={{ borderColor: '#ff8800', color: '#ff8800' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="cyber-spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />
                  UPDATING RECORDS...
                </span>
              ) : (
                'EXECUTE UPDATE'
              )}
            </motion.button>
          </form>

          {product && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="cyber-alert cyber-alert-success mt-4"
            >
              PRODUCT UPDATED SUCCESSFULLY
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="cyber-alert cyber-alert-error mt-4"
            >
              UPDATE FAILED: {error}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default UpdateProduct;
