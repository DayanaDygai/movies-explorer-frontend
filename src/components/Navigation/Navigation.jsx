
import React from 'react';
import { NavLink } from 'react-router-dom';
import ProfileIcon from '../../images/profile.svg';

import styles from './Navigation.module.css'; 

function Navigation({isOpen}) {
  const navClass = isOpen ? `${styles.nav} ${styles.nav_open}` : styles.nav;

  function handleClickLink(e) {
    if (e.currentTarget.className.includes('active')) {
      return;
    }
  }

  const activeClassName = ({ isActive }) => ` ${styles['nav__link']} ${isActive ? styles['active'] : ''}`;

  return (
    <nav className={navClass}>
      <ul className={styles['nav__list']}>

      <li className={`${styles['nav__item']} ${styles.nav__item_invisible}`}>
          <NavLink
            className={activeClassName}
            to="/"
            end
            aria-label="На главную"
            onClick={handleClickLink}
            
          >
            Главная
          </NavLink>
        </li> 
        <li className={styles['nav__item']}>
          <NavLink
            className={activeClassName}
            to="movies"
            aria-label="Фильмы"
            onClick={handleClickLink}
          >
            Фильмы
          </NavLink>
        </li>
        <li className={styles['nav__item']}>
          <NavLink
            className={activeClassName}
            to="saved-movies"
            aria-label="Сохранённые фильмы"
            onClick={handleClickLink}
          >
            Сохранённые фильмы
          </NavLink>
        </li>
      </ul>
      <NavLink
        to="profile"
        className={({ isActive }) => 
          `${styles['nav__link']} ${styles['nav__profile']} ${isActive ? styles['active'] : ''}`}
        aria-label="Аккаунт"
      >
        <img className={styles['nav_icon']} src={ProfileIcon} alt="профиль" />
      </NavLink>
    </nav>
  );
}

export default Navigation;