import React from 'react';

interface SvcIconProps {
  name: string;
  className?: string;
}

export const SvcIcon: React.FC<SvcIconProps> = ({ name, className = 'svc-icon' }) => {
  switch (name) {
    case 'gear':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <path d="M7 36a17 17 0 0 1 34 0" />
          <path d="M24 36L34 25" />
          <circle cx="24" cy="36" r="2.5" />
          <path d="M9 29l2.5 1.2M14 22l2 2M24 19v3M34 22l-2 2M39 29l-2.5 1.2" />
          <path d="M6 42h36" />
        </svg>
      );
    case 'network':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <path d="M24 5l17 8-17 8L7 13z" />
          <path d="M7 23l17 8 17-8" />
          <path d="M7 33l17 8 17-8" />
        </svg>
      );
    case 'bolt':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <path d="M19 44L24 6l5 38" />
          <path d="M15 15h18M11 26h26M8 44h32" />
          <path d="M15 15l16 11M33 15L17 26" />
          <path d="M11 26v5M37 26v5" />
        </svg>
      );
    case 'terrain':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <path d="M5 18h38" />
          <path d="M5 27h38" strokeDasharray="6 4" />
          <path d="M5 36h38" strokeDasharray="2 4" />
          <path d="M31 5c0 0-5.5 6.5-5.5 10a5.5 5.5 0 0 0 11 0C36.5 11.5 31 5 31 5z" />
          <path d="M14 36v8M22 40v4" />
        </svg>
      );
    /* Blueprint detail icons for Services catalogue */
    case 'wave':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <path d="M4 24h6l4-12 6 24 5-18 4 10 4-6h11" />
          <circle cx="24" cy="24" r="21" strokeDasharray="3 5" />
        </svg>
      );
    case 'register':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <rect x="8" y="6" width="32" height="36" />
          <path d="M14 14h20M14 21h20M14 28h12" />
          <path d="M30 30l4 4 7-8" strokeWidth="2.4" />
        </svg>
      );
    case 'plug':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <path d="M18 6v10M30 6v10M14 16h20v8a10 10 0 0 1-20 0v-8z" />
          <path d="M24 34v8" />
          <path d="M18 42h12" />
        </svg>
      );
    case 'pylon':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <path d="M18 44L24 8l6 36M14 20h20M11 30h26M8 44h32" />
          <path d="M14 20l16 10M34 20L18 30" />
        </svg>
      );
    case 'drop':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <path d="M24 4C24 4 10 20 10 30a14 14 0 0 0 28 0C38 20 24 4 24 4z" />
          <path d="M18 30a6 6 0 0 0 6 6" />
        </svg>
      );
    case 'waste':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <path d="M12 14h24l-3 28H15l-3-28z" />
          <path d="M8 14h32M19 14V8h10v6" />
          <path d="M20 21v14M28 21v14" />
        </svg>
      );
    case 'air':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <path d="M6 18h22a5 5 0 1 0-5-5" />
          <path d="M6 26h30a5 5 0 1 1-5 5" />
          <path d="M6 34h14" />
        </svg>
      );
    case 'leaf':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <path d="M38 8C18 8 8 20 8 34c0 3 1 6 1 6s14 2 24-8S38 8 38 8z" />
          <path d="M12 38C20 28 28 22 36 12" />
        </svg>
      );
    case 'borehole':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <path d="M6 16h36M6 24h36M6 32h36" strokeDasharray="5 4" />
          <path d="M22 6h4v36h-4z" />
          <circle cx="24" cy="42" r="4" />
        </svg>
      );
    case 'permit':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <rect x="10" y="4" width="28" height="40" />
          <path d="M16 12h16M16 19h16M16 26h10" />
          <circle cx="30" cy="34" r="6" />
          <path d="M27 34l2.5 2.5L34 31" strokeWidth="2" />
        </svg>
      );
    case 'audit':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <circle cx="20" cy="20" r="12" />
          <path d="M29 29l13 13" />
          <path d="M15 20l4 4 7-8" strokeWidth="2.4" />
        </svg>
      );
    case 'rehab':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <path d="M4 40h40" />
          <path d="M8 40c4-8 8-10 12-10s6 4 10 4 8-6 14-14" />
          <path d="M30 14v8M26 18h8" strokeWidth="2.4" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <path d="M7 36a17 17 0 0 1 34 0" />
          <path d="M24 36L34 25" />
          <circle cx="24" cy="36" r="2.5" />
          <path d="M6 42h36" />
        </svg>
      );
  }
};
