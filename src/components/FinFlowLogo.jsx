import React from 'react';

export const FinFlowLogo = ({ size = 40, className = '', showText = false, textClass = '' }) => (
  <div className={`inline-flex items-center gap-3 select-none ${className}`}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      width={size}
      height={size}
      className="shrink-0 drop-shadow-sm transition-transform duration-300 hover:scale-105"
    >
      <defs>
        <linearGradient id="finflowGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#10B981" />
          <stop offset="1" stopColor="#059669" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#finflowGrad)" />
      <rect x="14" y="18" width="36" height="28" rx="6" fill="#F8FAFC" />
      <path d="M14 24C14 20.6863 16.6863 18 20 18H44C47.3137 18 50 20.6863 50 24V27H14V24Z" fill="#D1FAE5" />
      <rect x="36" y="28" width="14" height="11" rx="3.5" fill="#10B981" />
      <circle cx="43" cy="33.5" r="2" fill="#FFFFFF" />
      <path
        d="M19 37L26 30L31 35L39 26"
        stroke="#10B981"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    {showText && (
      <div className="flex flex-col">
        <span className={`font-extrabold tracking-tight text-xl leading-none ${textClass}`}>
          Fin<span className="text-emerald-500">Flow</span>
        </span>
        <span className="text-[10px] font-medium uppercase tracking-widest text-slate-400 mt-0.5">
          Smart Money
        </span>
      </div>
    )}
  </div>
);

export default FinFlowLogo;
