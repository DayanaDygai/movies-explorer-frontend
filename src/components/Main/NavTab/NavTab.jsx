import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./NavTab.module.css"

function NavTab() {
  return (
    <div className={styles["nav-tab__login"]}>
      <Link to="/signup" className={styles["nav-tab__login-link"]}>
        Регистрация
      </Link>
      <Link to="/signin" className={styles["nav-tab__login-link"]}>
        Войти
      </Link>
    </div>
  );
}

export default NavTab;
