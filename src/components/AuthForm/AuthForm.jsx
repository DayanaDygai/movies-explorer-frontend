// Импорт необходимых зависимостей
import React from 'react';
import { Link } from 'react-router-dom';
import HeaderLogo from '../../images/logo__header.svg';
import styles from "./AuthForm.module.css";

// Компонент формы аутентификации для регистрации и авторизации.
function AuthForm({ title, formName, onSubmit, children, isFormValid, btnText, isLoading}) {

   // Определение, является ли форма регистрационной
  const isRegistration = formName === 'registration';

  return (
    <div className={styles["auth-form"]}>
       {/* Ссылка на домашнюю страницу с логотипом */}
      <Link className={styles["auth-form__link-header"]} to="/">
        <img src={HeaderLogo} alt="Лого" />
      </Link>
      {/* Заголовок формы */}
      <h1 className={styles["auth-form__title"]}>{title}</h1>
      {/* Определение формы с обработчиком на отправку и отключением стандартной валидации */}
      <form
        className={styles["auth-form__form"]}
        name={formName}
        onSubmit={onSubmit}
        noValidate
      >
        {/* Вложенные элементы формы */}
        {children}
        {/* Кнопка отправки формы, становится неактивной при невалидной форме или во время загрузки */}
        <button 
            className={!isFormValid || isLoading ?  styles["auth-form__submit-button_invalid"] : styles["authForm__submit-button"]} 
            disabled={!isFormValid || isLoading}
            type="submit"
          >
            {btnText}
          </button>
        {/* Ссылка на страницу входа или регистрации в зависимости от типа формы */}
        {isRegistration ? (
          <p className={styles["auth-form__footer"]}>
            Уже зарегистрированы?
            <Link className={styles["auth-form__link"]} to="/signin">Войти</Link>
          </p>
        ) : (
          <p className={styles["auth-form__footer"]}>
            Еще не зарегистрированы?
            <Link className={styles["auth-form__link"]} to="/signup">Регистрация</Link>
          </p>
        )}
      </form>
    </div>
  );
}

export default AuthForm;
