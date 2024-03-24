import React from 'react';

import { Link } from 'react-router-dom';
import HeaderLogo from '../../images/logo__header.svg';
import styles from "./AuthForm.module.css"

function AuthForm({ title, formName, onSubmit, btnText, children }) {
  return (
    <div className={styles["auth-form"]}> 
      <Link className={styles["auth-form__link-header"]} to="/"> 
        <img src={HeaderLogo} alt="Лого" /> 
      </Link>
      <h1 className={styles["auth-form__title"]}>{title}</h1> 
      <form
        className={styles["auth-form__form"]} 
        name={formName}
        onSubmit={onSubmit}
        noValidate
      >
        {children}
        <button 
          className={styles["authForm__submit-button"]}  
          type="submit"
        >
          {btnText}
        </button>
      </form>
      {formName === 'registration' ? (
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
    </div>
  );
}

export default AuthForm;
