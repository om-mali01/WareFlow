import React from 'react';
import { motion } from 'framer-motion';

const RobotAssistant = ({ size = 200, message = "System Online" }) => {
  return (
    <motion.div
      className="robot-float"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ width: size, height: size * 1.2 }}
    >
      <svg
        viewBox="0 0 200 240"
        width={size}
        height={size * 1.2}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Antenna */}
        <g className="robot-antenna">
          <line x1="100" y1="30" x2="100" y2="8" stroke="#00f0ff" strokeWidth="2" />
          <circle cx="100" cy="5" r="4" fill="#00f0ff" opacity="0.9">
            <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="100" cy="5" r="8" fill="none" stroke="#00f0ff" strokeWidth="0.5" opacity="0.3">
            <animate attributeName="r" values="8;14;8" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0;0.3" dur="1.5s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Head */}
        <g>
          <rect x="60" y="30" width="80" height="60" rx="12" fill="#0d1127" stroke="#1a1a3e" strokeWidth="2" />
          <rect x="60" y="30" width="80" height="60" rx="12" fill="url(#headGradient)" stroke="#00f0ff" strokeWidth="1" opacity="0.5" />

          {/* Eyes */}
          <g className="robot-eye-glow">
            <ellipse cx="82" cy="58" rx="10" ry="8" fill="#0a0a1a" stroke="#00f0ff" strokeWidth="1.5" />
            <ellipse cx="82" cy="58" rx="5" ry="4" fill="#00f0ff" opacity="0.9">
              <animate attributeName="rx" values="5;3;5" dur="3s" repeatCount="indefinite" />
            </ellipse>

            <ellipse cx="118" cy="58" rx="10" ry="8" fill="#0a0a1a" stroke="#00f0ff" strokeWidth="1.5" />
            <ellipse cx="118" cy="58" rx="5" ry="4" fill="#00f0ff" opacity="0.9">
              <animate attributeName="rx" values="5;3;5" dur="3s" repeatCount="indefinite" />
            </ellipse>
          </g>

          {/* Mouth / Speaker grille */}
          <rect x="85" y="72" width="30" height="6" rx="3" fill="#0a0a1a" stroke="#1a1a3e" strokeWidth="1" />
          <line x1="90" y1="72" x2="90" y2="78" stroke="#1a1a3e" strokeWidth="0.5" />
          <line x1="95" y1="72" x2="95" y2="78" stroke="#1a1a3e" strokeWidth="0.5" />
          <line x1="100" y1="72" x2="100" y2="78" stroke="#00f0ff" strokeWidth="0.5" opacity="0.5" />
          <line x1="105" y1="72" x2="105" y2="78" stroke="#1a1a3e" strokeWidth="0.5" />
          <line x1="110" y1="72" x2="110" y2="78" stroke="#1a1a3e" strokeWidth="0.5" />
        </g>

        {/* Neck */}
        <rect x="90" y="90" width="20" height="12" rx="2" fill="#0d1127" stroke="#1a1a3e" strokeWidth="1" />

        {/* Body */}
        <g>
          <rect x="50" y="102" width="100" height="80" rx="10" fill="#0d1127" stroke="#1a1a3e" strokeWidth="2" />
          <rect x="50" y="102" width="100" height="80" rx="10" fill="url(#bodyGradient)" stroke="#00f0ff" strokeWidth="0.5" opacity="0.3" />

          {/* Chest plate / Core */}
          <circle cx="100" cy="135" r="15" fill="#0a0a1a" stroke="#00f0ff" strokeWidth="1.5" />
          <circle cx="100" cy="135" r="8" fill="#00f0ff" opacity="0.15">
            <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.1;0.3;0.1" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="100" cy="135" r="4" fill="#00f0ff" opacity="0.8">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="1s" repeatCount="indefinite" />
          </circle>

          {/* Data lines on body */}
          <line x1="65" y1="155" x2="90" y2="155" stroke="#1a1a3e" strokeWidth="1" />
          <line x1="110" y1="155" x2="135" y2="155" stroke="#1a1a3e" strokeWidth="1" />
          <line x1="65" y1="165" x2="80" y2="165" stroke="#00f0ff" strokeWidth="0.5" opacity="0.3" />
          <line x1="120" y1="165" x2="135" y2="165" stroke="#00f0ff" strokeWidth="0.5" opacity="0.3" />
        </g>

        {/* Left Arm */}
        <g className="robot-arm-left">
          <rect x="20" y="105" width="28" height="55" rx="8" fill="#0d1127" stroke="#1a1a3e" strokeWidth="1.5" />
          <rect x="20" y="105" width="28" height="55" rx="8" stroke="#00f0ff" strokeWidth="0.5" opacity="0.3" fill="none" />
          {/* Hand / gripper */}
          <rect x="24" y="160" width="20" height="12" rx="4" fill="#0d1127" stroke="#1a1a3e" strokeWidth="1" />
          <line x1="30" y1="160" x2="30" y2="172" stroke="#00f0ff" strokeWidth="0.5" opacity="0.5" />
          <line x1="38" y1="160" x2="38" y2="172" stroke="#00f0ff" strokeWidth="0.5" opacity="0.5" />
        </g>

        {/* Right Arm */}
        <g className="robot-arm-right">
          <rect x="152" y="105" width="28" height="55" rx="8" fill="#0d1127" stroke="#1a1a3e" strokeWidth="1.5" />
          <rect x="152" y="105" width="28" height="55" rx="8" stroke="#00f0ff" strokeWidth="0.5" opacity="0.3" fill="none" />
          {/* Hand / gripper */}
          <rect x="156" y="160" width="20" height="12" rx="4" fill="#0d1127" stroke="#1a1a3e" strokeWidth="1" />
          <line x1="162" y1="160" x2="162" y2="172" stroke="#00f0ff" strokeWidth="0.5" opacity="0.5" />
          <line x1="170" y1="160" x2="170" y2="172" stroke="#00f0ff" strokeWidth="0.5" opacity="0.5" />
        </g>

        {/* Legs */}
        <rect x="65" y="182" width="25" height="40" rx="6" fill="#0d1127" stroke="#1a1a3e" strokeWidth="1.5" />
        <rect x="110" y="182" width="25" height="40" rx="6" fill="#0d1127" stroke="#1a1a3e" strokeWidth="1.5" />

        {/* Feet */}
        <rect x="58" y="218" width="38" height="10" rx="5" fill="#0d1127" stroke="#1a1a3e" strokeWidth="1.5" />
        <rect x="104" y="218" width="38" height="10" rx="5" fill="#0d1127" stroke="#1a1a3e" strokeWidth="1.5" />

        {/* Ground glow */}
        <ellipse cx="100" cy="232" rx="50" ry="5" fill="#00f0ff" opacity="0.08">
          <animate attributeName="rx" values="45;55;45" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.05;0.12;0.05" dur="3s" repeatCount="indefinite" />
        </ellipse>

        {/* Gradients */}
        <defs>
          <linearGradient id="headGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#ff00ff" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#4466ff" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>

      {/* Speech bubble */}
      {message && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute -top-2 -right-8 bg-cyber-panel border border-cyber-border rounded-lg px-3 py-1.5"
          style={{ minWidth: '120px' }}
        >
          <p className="font-mono text-xs text-cyber-cyan whitespace-nowrap">{message}</p>
          <div
            className="absolute -bottom-1.5 left-4 w-3 h-3 bg-cyber-panel border-r border-b border-cyber-border"
            style={{ transform: 'rotate(45deg)' }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default RobotAssistant;
