import React from 'react';

const Input = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  name,
  className = '',
  ...rest
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`input ${className}`}
      {...rest}
    />
  );
};

export default Input;
