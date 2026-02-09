import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from "../../actions/loginAction";
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import RobotAssistant from '../components/RobotAssistant';
import ParticleBackground from '../components/ParticleBackground';

function Login() {
  const [form, setForm] = useState({ user_name: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, user, error } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (user?.access_token) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden cyber-grid-bg">
      <ParticleBackground />
      <div className="scan-line-overlay" />

      {/* Left robotic arm decoration */}
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2"
      >
        <svg viewBox="0 0 120 400" width="120" height="400">
          {/* Wall mount */}
          <rect x="0" y="140" width="20" height="120" rx="4" fill="#0d1127" stroke="#1a1a3e" strokeWidth="2" />

          {/* Arm segment 1 */}
          <motion.g
            animate={{ rotate: [0, 5, -3, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: '20px 200px' }}
          >
            <circle cx="20" cy="200" r="8" fill="#0d1127" stroke="#00f0ff" strokeWidth="1" />
            <rect x="20" y="185" width="60" height="30" rx="8" fill="#0d1127" stroke="#1a1a3e" strokeWidth="1.5" />
            <line x1="30" y1="195" x2="70" y2="195" stroke="#00f0ff" strokeWidth="0.5" opacity="0.3" />
            <line x1="30" y1="205" x2="70" y2="205" stroke="#ff00ff" strokeWidth="0.5" opacity="0.2" />

            {/* Arm segment 2 */}
            <motion.g
              animate={{ rotate: [0, -8, 4, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              style={{ transformOrigin: '80px 200px' }}
            >
              <circle cx="80" cy="200" r="6" fill="#0d1127" stroke="#ff00ff" strokeWidth="0.8" />
              <rect x="80" y="190" width="30" height="20" rx="5" fill="#0d1127" stroke="#1a1a3e" strokeWidth="1" />

              {/* Scanning beam */}
              <line x1="110" y1="195" x2="110" y2="205" stroke="#00f0ff" strokeWidth="2" opacity="0.6">
                <animate attributeName="opacity" values="0.2;0.8;0.2" dur="1.5s" repeatCount="indefinite" />
              </line>
            </motion.g>
          </motion.g>

          {/* Status lights */}
          <circle cx="10" cy="150" r="2" fill="#00ff88">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="10" cy="250" r="2" fill="#00f0ff">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
          </circle>
        </svg>
      </motion.div>

      {/* Main Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="cyber-card cyber-corner p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-16 h-16 mx-auto mb-4"
            >
              <svg viewBox="0 0 64 64" width="64" height="64">
                <rect x="12" y="16" width="40" height="28" rx="6" fill="#0d1127" stroke="#00f0ff" strokeWidth="2" />
                <circle cx="26" cy="30" r="4" fill="#00f0ff" opacity="0.9">
                  <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="38" cy="30" r="4" fill="#00f0ff" opacity="0.9">
                  <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
                </circle>
                <line x1="32" y1="6" x2="32" y2="16" stroke="#00f0ff" strokeWidth="2" />
                <circle cx="32" cy="4" r="3" fill="#00f0ff">
                  <animate attributeName="r" values="2;3.5;2" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <rect x="20" y="38" width="24" height="4" rx="2" fill="#1a1a3e" />
                <rect x="22" y="48" width="8" height="10" rx="3" fill="#0d1127" stroke="#1a1a3e" strokeWidth="1" />
                <rect x="34" y="48" width="8" height="10" rx="3" fill="#0d1127" stroke="#1a1a3e" strokeWidth="1" />
              </svg>
            </motion.div>

            <h1 className="font-orbitron text-xl font-bold neon-text mb-1">NEXUS LOGIN</h1>
            <p className="font-mono text-[10px] text-white/30 tracking-widest">AUTHENTICATION REQUIRED</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="cyber-input-label">Username</label>
              <input
                type="text"
                name="user_name"
                placeholder="Enter your username"
                value={form.user_name}
                onChange={handleChange}
                required
                className="cyber-input"
              />
            </div>

            <div>
              <label className="cyber-input-label">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
                className="cyber-input"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="cyber-btn cyber-btn-filled w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="cyber-spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />
                  AUTHENTICATING...
                </span>
              ) : (
                'INITIALIZE SESSION'
              )}
            </motion.button>
          </form>

          {/* Feedback */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="cyber-alert cyber-alert-error mt-4"
            >
              ACCESS DENIED: {error}
            </motion.div>
          )}
          {user && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="cyber-alert cyber-alert-success mt-4"
            >
              ACCESS GRANTED // Welcome, {user.msg}
            </motion.div>
          )}

          {/* Register link */}
          <div className="mt-6 text-center">
            <p className="font-mono text-[10px] text-white/30 tracking-wider">
              NO ACCOUNT DETECTED?{' '}
              <Link to="/register" className="text-cyber-magenta hover:text-cyber-magenta/80 transition-colors">
                REGISTER NEW IDENTITY
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="flex justify-center mt-4 gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{
                background: '#00f0ff',
                opacity: 0.2 + i * 0.15,
                animation: `statusPulse ${1 + i * 0.3}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Right side robot */}
      <motion.div
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 0.6 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="hidden xl:block absolute right-8 bottom-8"
      >
        <RobotAssistant size={120} message="Identity verification" />
      </motion.div>
    </div>
  );
}

export default Login;
