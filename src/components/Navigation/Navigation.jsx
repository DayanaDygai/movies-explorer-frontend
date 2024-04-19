import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import ProfileIcon from '../../images/profile.svg';
import ProfileIconLanding from '../../images/profile-icon-landing.svg';

import styles from './Navigation.module.css';

// Компонент навигационного меню
function Navigation({ isOpen }) {
  const location = useLocation();

  // Определение класса навигации в зависимости от состояния бургерного меню (открыто/закрыто)
  const navClass = isOpen ? `${styles.nav} ${styles.nav_open}` : styles.nav;

  // Определение цвета текста ссылок в зависимости от местоположения и состояния меню
  const isLandingPage = location.pathname === '/';

  const navItemClassNameColor =
    isLandingPage && !isOpen
      ? styles['nav__item-white']
      : styles['nav__item-black'];

  // Определение иконки профиля в зависимости от местоположения
  const profileIcon = isLandingPage ? ProfileIconLanding : ProfileIcon;

  // Обработчик клика по ссылкам в навигационном меню
  function handleClickLink(e) {
    if (e.currentTarget.className.includes('active')) {
      return;
    }
  }

  // Определение класса активной ссылки
  const activeClassName = ({ isActive }) =>
    ` ${styles['nav__link']} ${isActive ? styles['active'] : styles['inactive']}`;

  return (
    <nav className={navClass}>
      <ul className={styles['nav__list']}>
        <li
          className={`${styles['nav__item']} ${styles['nav__item_invisible']}`}
        >
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
        <li className={`${styles['nav__item']} ${navItemClassNameColor}`}>
          <NavLink
            className={activeClassName}
            to="movies"
            aria-label="Фильмы"
            onClick={handleClickLink}
          >
            Фильмы
          </NavLink>
        </li>
        <li className={`${styles['nav__item']} ${navItemClassNameColor}`}>
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
          `${styles['nav__link']} ${styles['nav__profile']} ${isActive ? styles['active'] : ''}`
        }
        aria-label="Аккаунт"
      >
        <img className={styles['nav_icon']} src={profileIcon} alt="профиль" />
      </NavLink>
    </nav>
  );
}

export default Navigation;
