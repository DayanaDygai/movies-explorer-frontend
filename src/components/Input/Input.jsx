import React from 'react';
import { useLocation } from 'react-router-dom';

import './Input.css';

function Input(props) {
  const { pathname } = useLocation();

  const {
    addClassName,
    title,
    className,
    errorMessage,
    name,
    type,
    minLength,
    maxLenght,
    value,
    onChange,
    pattern,
    onBlur,
  } = props;

  return (
    <div className={`input__container ${addClassName}`}>
      <span className={pathname === '/profile' 
       ? 'input__title input__title_profile'
       : 'input__title'}>{title}</span>
      <input
        className={`${className} ${errorMessage ? 'input_error' : ''}`}
        name={name}
        type={type}
        required
        minLength={minLength}
        maxLength={maxLenght}
        value={value || ''}
        onChange={onChange}
        pattern={pattern}
        onBlur={onBlur}
      />
      <p
       className={pathname === '/profile' 
       ? `'input-error' 'input-error__profile'` 
       : 'input-error'}
      >
        {errorMessage}
      </p>
    </div>
  );
}

export default Input;
