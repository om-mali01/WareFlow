import React from 'react';
import { motion } from 'framer-motion';

const RoboticArm = ({ side = 'left', holding = null, size = 180 }) => {
  const isLeft = side === 'left';

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <svg
        viewBox="0 0 180 300"
        width={size}
        height={size * 1.67}
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: isLeft ? 'scaleX(1)' : 'scaleX(-1)' }}
      >
        {/* Base / Mount */}
        <rect x="10" y="0" width="40" height="20" rx="4" fill="#0d1127" stroke="#1a1a3e" strokeWidth="2" />
        <rect x="15" y="5" width="30" height="10" rx="2" fill="#0a0a1a" stroke="#00f0ff" strokeWidth="0.5" opacity="0.5" />

        {/* Upper Arm Segment */}
        <g>
          <motion.g
            animate={{ rotate: [0, -8, 5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: '30px 20px' }}
          >
            {/* Shoulder joint */}
            <circle cx="30" cy="25" r="10" fill="#0d1127" stroke="#1a1a3e" strokeWidth="2" />
            <circle cx="30" cy="25" r="5" fill="#0a0a1a" stroke="#00f0ff" strokeWidth="1" opacity="0.6" />
            <circle cx="30" cy="25" r="2" fill="#00f0ff" opacity="0.8">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
            </circle>

            {/* Upper arm */}
            <rect x="18" y="35" width="24" height="80" rx="6" fill="#0d1127" stroke="#1a1a3e" strokeWidth="1.5" />
            <line x1="30" y1="45" x2="30" y2="105" stroke="#00f0ff" strokeWidth="0.5" opacity="0.2" />

            {/* Hydraulic detail */}
            <rect x="22" y="50" width="4" height="30" rx="2" fill="#0a0a1a" stroke="#1a1a3e" strokeWidth="0.5" />
            <rect x="34" y="55" width="4" height="25" rx="2" fill="#0a0a1a" stroke="#1a1a3e" strokeWidth="0.5" />

            {/* Elbow joint */}
            <motion.g
              animate={{ rotate: [0, 12, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              style={{ transformOrigin: '30px 120px' }}
            >
              <circle cx="30" cy="120" r="8" fill="#0d1127" stroke="#1a1a3e" strokeWidth="2" />
              <circle cx="30" cy="120" r="4" fill="#0a0a1a" stroke="#ff00ff" strokeWidth="0.8" opacity="0.5" />

              {/* Forearm */}
              <rect x="20" y="130" width="20" height="70" rx="5" fill="#0d1127" stroke="#1a1a3e" strokeWidth="1.5" />
              <line x1="30" y1="140" x2="30" y2="190" stroke="#ff00ff" strokeWidth="0.5" opacity="0.15" />

              {/* Cables */}
              <path d="M24 135 Q20 155 24 175" fill="none" stroke="#00f0ff" strokeWidth="0.5" opacity="0.3" />
              <path d="M36 135 Q40 155 36 175" fill="none" stroke="#ff00ff" strokeWidth="0.5" opacity="0.3" />

              {/* Wrist joint */}
              <motion.g
                animate={{ rotate: [0, -15, 15, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                style={{ transformOrigin: '30px 205px' }}
              >
                <circle cx="30" cy="205" r="6" fill="#0d1127" stroke="#1a1a3e" strokeWidth="1.5" />
                <circle cx="30" cy="205" r="3" fill="#0a0a1a" stroke="#00f0ff" strokeWidth="0.8" opacity="0.4" />

                {/* Hand / Gripper */}
                <rect x="16" y="215" width="28" height="16" rx="4" fill="#0d1127" stroke="#1a1a3e" strokeWidth="1.5" />

                {/* Fingers */}
                <motion.g
                  animate={{ scaleX: [1, 0.85, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                  style={{ transformOrigin: '30px 231px' }}
                >
                  {/* Left finger */}
                  <rect x="14" y="231" width="10" height="25" rx="3" fill="#0d1127" stroke="#1a1a3e" strokeWidth="1" />
                  <rect x="16" y="250" width="6" height="8" rx="2" fill="#0a0a1a" stroke="#00f0ff" strokeWidth="0.5" opacity="0.5" />

                  {/* Right finger */}
                  <rect x="36" y="231" width="10" height="25" rx="3" fill="#0d1127" stroke="#1a1a3e" strokeWidth="1" />
                  <rect x="38" y="250" width="6" height="8" rx="2" fill="#0a0a1a" stroke="#00f0ff" strokeWidth="0.5" opacity="0.5" />

                  {/* Item being held */}
                  {holding && (
                    <g>
                      <rect x="20" y="240" width="20" height="20" rx="3" fill="#0a0a1a" stroke="#00ff88" strokeWidth="1" opacity="0.8" />
                      <text x="30" y="254" textAnchor="middle" fill="#00ff88" fontSize="8" fontFamily="monospace">{holding}</text>
                    </g>
                  )}
                </motion.g>

                {/* Grip energy */}
                <line x1="24" y1="231" x2="36" y2="231" stroke="#00f0ff" strokeWidth="0.5" opacity="0.3">
                  <animate attributeName="opacity" values="0.1;0.5;0.1" dur="1s" repeatCount="indefinite" />
                </line>
              </motion.g>
            </motion.g>
          </motion.g>
        </g>

        {/* Status LEDs on base */}
        <circle cx="18" cy="10" r="2" fill="#00ff88" opacity="0.8">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="1s" repeatCount="indefinite" />
        </circle>
        <circle cx="42" cy="10" r="2" fill="#00f0ff" opacity="0.8">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" />
        </circle>
      </svg>
    </motion.div>
  );
};

export default RoboticArm;
