import React from 'react';

function SVGIcon({ name, size = 24, color = 'currentColor' }) {
  const icons = {
    preview: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill={color}>
        <path d="M12 4.5c-7 0-11 7.5-11 7.5s4 7.5 11 7.5 11-7.5 11-7.5-4-7.5-11-7.5zm0 13c-4.2 0-7.7-3.5-7.7-5.5 0-2 3.5-5.5 7.7-5.5s7.7 3.5 7.7 5.5c0 2-3.5 5.5-7.7 5.5z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    export: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill={color}>
        <path d="M5 20h14v2H5zm7-18l-7 7h4v7h6v-7h4z"/>
      </svg>
    ),
    save: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} fill={color}>
        <path d="M17 3h-10c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2zm-1 16h-8v-5h8v5zm1-12h-10v-2h10v2z"/>
      </svg>
    )
  };

  return icons[name] || null;
}

export default SVGIcon;
