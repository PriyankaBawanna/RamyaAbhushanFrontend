import React from 'react';

const IconButton = ({ children, onClick, active = false, ariaLabel = 'button', className = '' }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`icon-btn ${active ? 'icon-btn-active' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

export default IconButton;
