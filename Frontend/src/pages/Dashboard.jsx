import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RobotAssistant from '../components/RobotAssistant';
import RoboticArm from '../components/RoboticArm';

const StatCard = ({ title, value, icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="cyber-card cyber-card-hover p-6 cyber-corner"
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">{title}</p>
        <p className={`font-orbitron text-3xl font-bold`} style={{ color }}>{value}</p>
      </div>
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center"
        style={{ background: `${color}10`, border: `1px solid ${color}30` }}
      >
        {icon}
      </div>
    </div>
    <div className="mt-4 h-1 rounded-full bg-cyber-border overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 1.5, delay: delay + 0.3 }}
        className="h-full rounded-full"
        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
      />
    </div>
  </motion.div>
);

const QuickAction = ({ to, label, icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, delay }}
  >
    <Link
      to={to}
      className="cyber-card cyber-card-hover block p-5 text-center group"
    >
      <div
        className="w-14 h-14 mx-auto mb-3 rounded-xl flex items-center justify-center transition-all group-hover:scale-110"
        style={{ background: `${color}10`, border: `1px solid ${color}30` }}
      >
        {icon}
      </div>
      <p className="font-rajdhani text-sm font-medium text-white/70 group-hover:text-white transition-colors">
        {label}
      </p>
    </Link>
  </motion.div>
);

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({ total: 0, lowStock: 0, categories: 0, totalValue: 0 });
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('http://localhost:8000/getAllProducts', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = response.data;
        setProducts(data);
        const categories = new Set(data.map((p) => p.category_name));
        const lowStock = data.filter((p) => p.current_stock <= (p.reorder_level || 10)).length;
        const totalValue = data.reduce((sum, p) => sum + (p.stock_value || 0), 0);
        setStats({
          total: data.length,
          lowStock,
          categories: categories.size,
          totalValue,
        });
      } catch {
        // API not available - show demo stats
        setStats({ total: 0, lowStock: 0, categories: 0, totalValue: 0 });
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8"
      >
        <div>
          <h1 className="font-orbitron text-2xl lg:text-3xl font-bold neon-text mb-1">
            COMMAND CENTER
          </h1>
          <p className="font-mono text-xs text-white/30 tracking-wider">
            INVENTORY MANAGEMENT SYSTEM v2.0 // NEXUS PROTOCOL
          </p>
        </div>
        <div className="mt-4 lg:mt-0 text-right">
          <p className="font-mono text-lg text-cyber-cyan">
            {currentTime.toLocaleTimeString('en-US', { hour12: false })}
          </p>
          <p className="font-mono text-[10px] text-white/30 tracking-wider">
            {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }).toUpperCase()}
          </p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Products"
          value={stats.total}
          color="#00f0ff"
          delay={0.1}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="1.5">
              <path d="M4 7l8-4 8 4v10l-8 4-8-4V7z" />
              <path d="M4 7l8 4 8-4" />
              <path d="M12 11v10" />
            </svg>
          }
        />
        <StatCard
          title="Low Stock Alerts"
          value={stats.lowStock}
          color="#ff3366"
          delay={0.2}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff3366" strokeWidth="1.5">
              <path d="M12 2L2 22h20L12 2z" />
              <line x1="12" y1="9" x2="12" y2="15" />
              <circle cx="12" cy="18" r="0.5" fill="#ff3366" />
            </svg>
          }
        />
        <StatCard
          title="Categories"
          value={stats.categories}
          color="#8844ff"
          delay={0.3}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8844ff" strokeWidth="1.5">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          }
        />
        <StatCard
          title="Total Value"
          value={`$${stats.totalValue.toLocaleString()}`}
          color="#00ff88"
          delay={0.4}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="1.5">
              <line x1="12" y1="2" x2="12" y2="22" />
              <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
            </svg>
          }
        />
      </div>

      {/* Main Content - Robot + Quick Actions */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        {/* Robot Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="cyber-card p-8 flex flex-col items-center justify-center relative overflow-hidden"
        >
          <div className="absolute inset-0 cyber-grid-bg opacity-30" />
          <div className="relative z-10 flex items-end gap-4">
            <RoboticArm side="left" holding="PKG" size={100} />
            <RobotAssistant size={140} message="All systems nominal" />
            <RoboticArm side="right" size={100} />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="font-mono text-xs text-cyber-cyan/50 mt-6 relative z-10 tracking-wider"
          >
            NEXUS INVENTORY GUARDIAN // ACTIVE
          </motion.p>
        </motion.div>

        {/* Quick Actions */}
        <div className="xl:col-span-2">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="font-orbitron text-sm font-semibold text-cyber-cyan/70 mb-4 tracking-wider"
          >
            QUICK ACTIONS
          </motion.h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <QuickAction
              to="/add-product"
              label="Add Product"
              color="#00f0ff"
              delay={0.6}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="9" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
              }
            />
            <QuickAction
              to="/products"
              label="View Products"
              color="#8844ff"
              delay={0.7}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8844ff" strokeWidth="1.5">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              }
            />
            <QuickAction
              to="/update-product"
              label="Update Product"
              color="#ff8800"
              delay={0.8}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff8800" strokeWidth="1.5">
                  <path d="M17 3l4 4L7 21H3v-4L17 3z" />
                </svg>
              }
            />
            <QuickAction
              to="/update-inventory"
              label="Update Stock"
              color="#00ff88"
              delay={0.9}
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="1.5">
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" />
                </svg>
              }
            />
          </div>

          {/* Recent Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="cyber-card mt-4 p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-orbitron text-xs font-semibold text-cyber-cyan/60 tracking-wider">
                RECENT INVENTORY
              </h3>
              <Link to="/products" className="font-mono text-[10px] text-cyber-magenta/60 hover:text-cyber-magenta transition-colors tracking-wider">
                VIEW ALL →
              </Link>
            </div>
            {products.length > 0 ? (
              <div className="space-y-2">
                {products.slice(0, 5).map((product, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-cyber-border flex items-center justify-center">
                        <span className="font-mono text-[10px] text-cyber-cyan">{product.sku?.slice(0, 2)}</span>
                      </div>
                      <div>
                        <p className="font-rajdhani text-sm text-white/80">{product.item_name}</p>
                        <p className="font-mono text-[10px] text-white/30">{product.sku}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-sm text-cyber-green">${product.item_price}</p>
                      <p className={`font-mono text-[10px] ${product.current_stock <= (product.reorder_level || 10) ? 'text-cyber-red' : 'text-white/30'}`}>
                        STOCK: {product.current_stock}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="font-mono text-xs text-white/30 tracking-wider">NO DATA AVAILABLE</p>
                <p className="font-mono text-[10px] text-white/15 mt-1">Connect to backend to load inventory</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* System Status Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="cyber-card p-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="status-dot status-dot-green" />
              <span className="font-mono text-[10px] text-white/40 tracking-wider">API STATUS</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="status-dot status-dot-green" />
              <span className="font-mono text-[10px] text-white/40 tracking-wider">DATABASE</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="status-dot status-dot-green" />
              <span className="font-mono text-[10px] text-white/40 tracking-wider">NEXUS CORE</span>
            </div>
          </div>
          <div className="font-mono text-[10px] text-white/20 tracking-wider">
            NEXUS SMART INVENTORY SYSTEM v2.0 // POWERED BY AI
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
