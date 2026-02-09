import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { InventoryAction } from "../../actions/InventoryAction";
import { motion } from 'framer-motion';

function AddProduct() {
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    sub_category: '',
    description: '',
    sku: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  const dispatch = useDispatch();
  const { loading, product, error } = useSelector((state) => state.addInventory);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('price', form.price);
    formData.append('category', form.category);
    formData.append('sub_category', form.sub_category);
    formData.append('description', form.description);
    formData.append('sku', form.sku);
    formData.append('image', form.image);
    dispatch(InventoryAction(formData));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setForm({ ...form, image: file });
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
      }
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
        <h1 className="font-orbitron text-2xl font-bold neon-text mb-1">ADD PRODUCT</h1>
        <p className="font-mono text-xs text-white/30 tracking-wider">
          REGISTER NEW ITEM // INVENTORY DATABASE
        </p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="xl:col-span-2"
        >
          <div className="cyber-card cyber-corner p-6">
            <h2 className="font-orbitron text-xs font-semibold text-cyber-cyan/60 tracking-wider mb-6">
              PRODUCT DATA INPUT
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="cyber-input-label">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter product name"
                    value={form.name}
                    onChange={handleChange}
                    className="cyber-input"
                    required
                  />
                </div>
                <div>
                  <label className="cyber-input-label">SKU Code</label>
                  <input
                    type="text"
                    name="sku"
                    placeholder="Unique SKU identifier"
                    value={form.sku}
                    onChange={handleChange}
                    className="cyber-input"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="cyber-input-label">Category</label>
                  <input
                    type="text"
                    name="category"
                    placeholder="Product category"
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

              <div>
                <label className="cyber-input-label">Description</label>
                <textarea
                  name="description"
                  placeholder="Product description..."
                  value={form.description}
                  onChange={handleChange}
                  className="cyber-input min-h-[100px] resize-y"
                  required
                />
              </div>

              <div>
                <label className="cyber-input-label">Product Image</label>
                <div className="relative">
                  <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    className="hidden"
                    id="image-upload"
                    accept="image/*"
                    required
                  />
                  <label
                    htmlFor="image-upload"
                    className="cyber-input flex items-center gap-3 cursor-pointer hover:border-cyber-cyan/50 transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#00f0ff" strokeWidth="1.5" opacity="0.5">
                      <rect x="2" y="4" width="16" height="12" rx="2" />
                      <circle cx="7" cy="9" r="2" />
                      <path d="M18 14l-4-4-6 6" />
                    </svg>
                    <span className="text-white/30 font-mono text-sm">
                      {form.image ? form.image.name : 'Choose image file...'}
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="cyber-btn cyber-btn-green cyber-btn-filled"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="cyber-spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />
                      PROCESSING...
                    </span>
                  ) : (
                    'REGISTER PRODUCT'
                  )}
                </motion.button>
                <button
                  type="button"
                  onClick={() => {
                    setForm({ name: '', price: '', category: '', sub_category: '', description: '', sku: '', image: null });
                    setImagePreview(null);
                  }}
                  className="cyber-btn"
                >
                  CLEAR FORM
                </button>
              </div>
            </form>

            {/* Feedback */}
            {product && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="cyber-alert cyber-alert-success mt-4"
              >
                PRODUCT REGISTERED SUCCESSFULLY
              </motion.div>
            )}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="cyber-alert cyber-alert-error mt-4"
              >
                ERROR: {error}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Preview Panel */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="cyber-card p-6 sticky top-6">
            <h2 className="font-orbitron text-xs font-semibold text-cyber-cyan/60 tracking-wider mb-4">
              PREVIEW
            </h2>
            <div className="space-y-4">
              {/* Image preview */}
              <div className="aspect-square rounded-lg bg-cyber-deeper border border-cyber-border flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <svg className="mx-auto mb-2" width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#1a1a3e" strokeWidth="1.5">
                      <rect x="4" y="6" width="24" height="20" rx="3" />
                      <circle cx="12" cy="14" r="3" />
                      <path d="M28 22l-6-6-10 10" />
                    </svg>
                    <p className="font-mono text-[10px] text-white/15">NO IMAGE</p>
                  </div>
                )}
              </div>

              {/* Data preview */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-mono text-[10px] text-white/30">NAME</span>
                  <span className="font-rajdhani text-sm text-white/60">{form.name || '---'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-[10px] text-white/30">SKU</span>
                  <span className="font-mono text-xs text-cyber-cyan/60">{form.sku || '---'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-[10px] text-white/30">CATEGORY</span>
                  <span className="font-rajdhani text-sm text-white/60">{form.category || '---'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-[10px] text-white/30">PRICE</span>
                  <span className="font-mono text-sm text-cyber-green">{form.price ? `$${form.price}` : '---'}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AddProduct;
