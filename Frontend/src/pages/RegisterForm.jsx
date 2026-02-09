import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';

const RegisterForm = () => {
  const [form, setForm] = useState({
    user_name: '',
    name: '',
    mobile_no: '',
    email: '',
    password: '',
    role: '',
  });

  const dispatch = useDispatch();
  const { loading, user, error } = useSelector((state) => state.userRegister);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(form));
  };

  const roles = ['inventory_manager', 'warehouse_staff', 'admin'];

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden cyber-grid-bg">
      <ParticleBackground />
      <div className="scan-line-overlay" />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg mx-4"
      >
        <div className="cyber-card cyber-corner p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ rotateY: 90 }}
              animate={{ rotateY: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="w-14 h-14 mx-auto mb-4 hex-badge"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0a0a1a" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <line x1="20" y1="8" x2="20" y2="14" />
                <line x1="17" y1="11" x2="23" y2="11" />
              </svg>
            </motion.div>
            <h1 className="font-orbitron text-xl font-bold neon-text-magenta mb-1">NEW IDENTITY</h1>
            <p className="font-mono text-[10px] text-white/30 tracking-widest">CREATE NEXUS ACCOUNT</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="cyber-input-label">Username</label>
                <input
                  name="user_name"
                  placeholder="Choose username"
                  value={form.user_name}
                  onChange={handleChange}
                  className="cyber-input"
                  required
                />
              </div>
              <div>
                <label className="cyber-input-label">Full Name</label>
                <input
                  name="name"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  className="cyber-input"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="cyber-input-label">Mobile</label>
                <input
                  name="mobile_no"
                  placeholder="Mobile number"
                  value={form.mobile_no}
                  onChange={handleChange}
                  className="cyber-input"
                  required
                />
              </div>
              <div>
                <label className="cyber-input-label">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={handleChange}
                  className="cyber-input"
                  required
                />
              </div>
            </div>

            <div>
              <label className="cyber-input-label">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Create secure password"
                value={form.password}
                onChange={handleChange}
                className="cyber-input"
                required
              />
            </div>

            <div>
              <label className="cyber-input-label">Access Role</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="cyber-select"
                required
              >
                <option value="">Select role...</option>
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r.replace('_', ' ').toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="cyber-btn cyber-btn-magenta w-full mt-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="cyber-spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />
                  PROCESSING...
                </span>
              ) : (
                'CREATE IDENTITY'
              )}
            </motion.button>
          </form>

          {/* Feedback */}
          {user && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="cyber-alert cyber-alert-success mt-4"
            >
              IDENTITY CREATED: {user.msg}
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

          {/* Login link */}
          <div className="mt-6 text-center">
            <p className="font-mono text-[10px] text-white/30 tracking-wider">
              ALREADY REGISTERED?{' '}
              <Link to="/login" className="text-cyber-cyan hover:text-cyber-cyan/80 transition-colors">
                ACCESS LOGIN PORTAL
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterForm;
