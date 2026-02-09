import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="7" height="7" rx="1" />
        <rect x="11" y="2" width="7" height="7" rx="1" />
        <rect x="2" y="11" width="7" height="7" rx="1" />
        <rect x="11" y="11" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    path: '/products',
    label: 'Products',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 6l7-4 7 4v8l-7 4-7-4V6z" />
        <path d="M3 6l7 4 7-4" />
        <path d="M10 10v8" />
      </svg>
    ),
  },
  {
    path: '/add-product',
    label: 'Add Product',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="10" cy="10" r="8" />
        <line x1="10" y1="6" x2="10" y2="14" />
        <line x1="6" y1="10" x2="14" y2="10" />
      </svg>
    ),
  },
  {
    path: '/update-product',
    label: 'Update Product',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14.5 2.5l3 3L7 16H4v-3L14.5 2.5z" />
        <line x1="12" y1="5" x2="15" y2="8" />
      </svg>
    ),
  },
  {
    path: '/update-inventory',
    label: 'Update Inventory',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 15V8l6-5 6 5v7a1 1 0 01-1 1H5a1 1 0 01-1-1z" />
        <path d="M8 16v-4h4v4" />
        <path d="M2 9l8-7 8 7" />
      </svg>
    ),
  },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`cyber-sidebar fixed top-0 left-0 h-screen z-50 flex flex-col transition-all duration-300 ${
        collapsed ? 'w-[70px]' : 'w-[260px]'
      }`}
    >
      {/* Logo Area */}
      <div className="p-5 border-b border-cyber-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
            <svg viewBox="0 0 40 40" width="40" height="40">
              <rect x="8" y="10" width="24" height="18" rx="4" fill="#0d1127" stroke="#00f0ff" strokeWidth="1.5" />
              <circle cx="16" cy="19" r="3" fill="#00f0ff" opacity="0.9">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="24" cy="19" r="3" fill="#00f0ff" opacity="0.9">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
              </circle>
              <line x1="20" y1="4" x2="20" y2="10" stroke="#00f0ff" strokeWidth="1.5" />
              <circle cx="20" cy="3" r="2" fill="#00f0ff">
                <animate attributeName="r" values="1.5;2.5;1.5" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <rect x="13" y="24" width="14" height="3" rx="1" fill="#1a1a3e" />
            </svg>
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <h1 className="font-orbitron text-sm font-bold neon-text whitespace-nowrap">NEXUS</h1>
                <p className="font-mono text-[10px] text-cyber-cyan/50 whitespace-nowrap tracking-wider">SMART INVENTORY</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Collapse button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-5 -right-3 w-6 h-6 bg-cyber-panel border border-cyber-border rounded-full flex items-center justify-center hover:border-cyber-cyan transition-colors z-10"
      >
        <svg
          width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#00f0ff" strokeWidth="1.5"
          className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
        >
          <path d="M8 2L4 6L8 10" />
        </svg>
      </button>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <div className={`${collapsed ? 'px-2' : 'px-3'} space-y-1`}>
          {!collapsed && (
            <p className="font-mono text-[10px] text-cyber-cyan/40 uppercase tracking-widest px-3 mb-3">
              Navigation
            </p>
          )}
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `cyber-sidebar-link rounded-lg ${collapsed ? 'justify-center px-3' : ''} ${
                  isActive ? 'active' : ''
                }`
              }
            >
              <span className="flex-shrink-0">{item.icon}</span>
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="whitespace-nowrap overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* System status */}
      <div className="border-t border-cyber-border p-4">
        {!collapsed && (
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="status-dot status-dot-green" />
              <span className="font-mono text-[10px] text-cyber-green/70 tracking-wider">SYSTEM ONLINE</span>
            </div>
            <p className="font-mono text-[10px] text-white/20 tracking-wider">
              {localStorage.getItem('role')?.toUpperCase() || 'GUEST'}
            </p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-2 py-2 px-3 rounded-lg text-cyber-red/70 hover:text-cyber-red hover:bg-cyber-red/5 transition-all font-rajdhani text-sm ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 15H3a1 1 0 01-1-1V4a1 1 0 011-1h3" />
            <path d="M11 12l3-3-3-3" />
            <line x1="14" y1="9" x2="7" y2="9" />
          </svg>
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
