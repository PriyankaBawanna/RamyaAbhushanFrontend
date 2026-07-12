import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
  // items: [{ label, to }]
  return (
    <nav className="breadcrumb">
      {items.map((item, index) => (
        <span key={index}>
          {item.to ? <Link to={item.to}>{item.label}</Link> : <span>{item.label}</span>}
          {index < items.length - 1 && <span className="breadcrumb-sep"> / </span>}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
