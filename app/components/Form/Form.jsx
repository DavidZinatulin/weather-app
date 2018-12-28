import React from 'react';
import './Form.scss';
import Input from './Input';
import Dropdown from './Dropdown';

const Form = ({
  structure,
  values,
  onUpdate,
  onSubmit,
  disabled = false,
  error = false,
  inputClass = '',
}) => {
  const handleInput = (e) => {
    onUpdate(structure.name, e.target.name, e.target.value);
  };

  const handleDropdown = (name, option) => {
    onUpdate(structure.name, name, option);
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSubmit(structure.name);
    }
  };

  const renderFormField = (field) => {
    const { name, type, placeholder, options } = field;

    const invalidClass = error ? 'is-invalid' : '';

    switch (type) {
      case 'textfield':
        return <Input
          className={`form-control ${inputClass} ${invalidClass}`}
          name={name}
          placeholder={placeholder}
          value={values[name]}
          onChange={handleInput}
          disabled={disabled}
        />
      case 'dropdown':
        return <Dropdown
          name={name}
          value={values[name]}
          options={options}
          onChange={handleDropdown}
          disabled={disabled}
        />
    }
  };

  return (
    <div className="form" onKeyPress={handleKeyPress}>
      {structure.fields.map((item, key) => (
        <div key={key} className="input-group my-3">
          {renderFormField(item)}
        </div>
      ))}
    </div>
  );
};

export default Form;
