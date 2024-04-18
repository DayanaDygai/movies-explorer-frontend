import React from 'react';
import { useLocation } from 'react-router-dom';
import './Input.css';

// Компонент Input предоставляет универсальное текстовое поле для ввода с динамической валидацией и стилизацией
function Input({
  addClassName = '',
  className = '',
  value,
  name,
  title,
  placeholder,
  fieldsValidity,
  message,
  handleChangeValidation,
  minLength,
  maxLength,
  type,
}) {
  const { pathname } = useLocation();

  // Определение стиля заголовка в зависимости от маршрута
  const titleClass =
    pathname === '/profile'
      ? 'input__title input__title_profile'
      : 'input__title';

  // Определение класса ошибки
  const errorClass =
    pathname === '/profile'
      ? 'input-error input-error__profile'
      : 'input-error';

  return (
    <div className={`input__container ${addClassName}`}>
      <span className={titleClass}>{title}</span>
      <input
        type={type}
        className={`${className} ${!fieldsValidity ? 'input_error' : ''}`}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        required
        name={name}
        value={value}
        onChange={handleChangeValidation}
      />
      <p className={errorClass}>{message}</p>
    </div>
  );
}

export default Input;
