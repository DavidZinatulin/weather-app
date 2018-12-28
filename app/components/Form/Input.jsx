import React from 'react';

const Input = ({ className, name, placeholder, value, onChange, disabled }) => (
  <input
    type="text"
    className={className}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    disabled={disabled}
  />
);

export default Input;
