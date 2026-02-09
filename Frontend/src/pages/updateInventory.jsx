import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { UpdateInventory } from "../../actions/InventoryAction";
import { motion } from 'framer-motion';
import RoboticArm from '../components/RoboticArm';

function UpdateInventoryForm() {
  const [form, setForm] = useState({
    sku: '',
    stock: '',
    reorder_level: '',
    stock_type: '',
  });

  const { loading, product, error } = useSelector((state) => state.updateInventory);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(UpdateInventory({
      ...form,
      stock: Number(form.stock),
      reorder_level: Number(form.reorder_level),
    }));
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-orbitron text-2xl font-bold neon-text-green mb-1">UPDATE INVENTORY</h1>
        <p className="font-mono text-xs text-white/30 tracking-wider">
          STOCK MANAGEMENT // ADJUST LEVELS
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
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-cyber-green/10 border border-cyber-green/20 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#00ff88" strokeWidth="1.5">
                  <path d="M4 15V8l6-5 6 5v7a1 1 0 01-1 1H5a1 1 0 01-1-1z" />
                  <path d="M8 16v-4h4v4" />
                </svg>
              </div>
              <div>
                <h2 className="font-orbitron text-xs font-semibold text-cyber-green/70 tracking-wider">
                  STOCK LEVEL ADJUSTMENT
                </h2>
                <p className="font-mono text-[10px] text-white/20">Modify stock quantities and reorder thresholds</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="cyber-input-label" style={{ color: '#00ff88' }}>Product SKU</label>
                <input
                  type="text"
                  name="sku"
                  placeholder="Enter product SKU"
                  value={form.sku}
                  onChange={onChange}
                  className="cyber-input"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="cyber-input-label">Stock Quantity</label>
                  <input
                    type="number"
                    name="stock"
                    placeholder="Units to add/remove"
                    value={form.stock}
                    onChange={onChange}
                    className="cyber-input"
                    required
                  />
                </div>
                <div>
                  <label className="cyber-input-label">Reorder Level</label>
                  <input
                    type="number"
                    name="reorder_level"
                    placeholder="Minimum threshold"
                    value={form.reorder_level}
                    onChange={onChange}
                    className="cyber-input"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="cyber-input-label">Stock Operation</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, stock_type: 'stock_in' })}
                    className={`p-4 rounded-lg border transition-all text-center ${
                      form.stock_type === 'stock_in'
                        ? 'border-cyber-green bg-cyber-green/10 text-cyber-green'
                        : 'border-cyber-border text-white/30 hover:border-cyber-green/30'
                    }`}
                  >
                    <svg className="mx-auto mb-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 19V5M5 12l7-7 7 7" />
                    </svg>
                    <p className="font-orbitron text-[10px] tracking-wider">STOCK IN</p>
                    <p className="font-mono text-[9px] text-white/20 mt-1">Add to inventory</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, stock_type: 'stock_out' })}
                    className={`p-4 rounded-lg border transition-all text-center ${
                      form.stock_type === 'stock_out'
                        ? 'border-cyber-red bg-cyber-red/10 text-cyber-red'
                        : 'border-cyber-border text-white/30 hover:border-cyber-red/30'
                    }`}
                  >
                    <svg className="mx-auto mb-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                    <p className="font-orbitron text-[10px] tracking-wider">STOCK OUT</p>
                    <p className="font-mono text-[9px] text-white/20 mt-1">Remove from inventory</p>
                  </button>
                </div>
                {/* Hidden input for form validation */}
                <input
                  type="hidden"
                  name="stock_type"
                  value={form.stock_type}
                  required
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading || !form.stock_type}
                className="cyber-btn cyber-btn-green w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="cyber-spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />
                    PROCESSING...
                  </span>
                ) : (
                  'EXECUTE STOCK UPDATE'
                )}
              </motion.button>
            </form>

            {product && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="cyber-alert cyber-alert-success mt-4"
              >
                INVENTORY UPDATED SUCCESSFULLY
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

        {/* Side panel with robotic arm */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="cyber-card p-6 sticky top-6">
            <h2 className="font-orbitron text-xs font-semibold text-cyber-cyan/60 tracking-wider mb-4">
              WAREHOUSE BOT
            </h2>
            <div className="flex justify-center">
              <RoboticArm side="right" holding={form.stock_type === 'stock_in' ? '+' : form.stock_type === 'stock_out' ? '-' : null} size={120} />
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between p-2 rounded-lg bg-cyber-deeper">
                <span className="font-mono text-[10px] text-white/30">TARGET</span>
                <span className="font-mono text-xs text-cyber-cyan">{form.sku || '---'}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-cyber-deeper">
                <span className="font-mono text-[10px] text-white/30">QUANTITY</span>
                <span className="font-mono text-xs text-white/60">{form.stock || '---'}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-cyber-deeper">
                <span className="font-mono text-[10px] text-white/30">OPERATION</span>
                <span className={`font-mono text-xs ${
                  form.stock_type === 'stock_in' ? 'text-cyber-green' : form.stock_type === 'stock_out' ? 'text-cyber-red' : 'text-white/30'
                }`}>
                  {form.stock_type ? form.stock_type.replace('_', ' ').toUpperCase() : '---'}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-cyber-deeper">
                <span className="font-mono text-[10px] text-white/30">REORDER AT</span>
                <span className="font-mono text-xs text-cyber-orange">{form.reorder_level || '---'}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default UpdateInventoryForm;
