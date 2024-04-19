import React from 'react';
import styles from './BurgerMenu.module.css';

// Компонент для отображения и управления бургер-меню в мобильной версии сайта.

function BurgerMenu({ onClick, isOpen }) {
  // Вычисление класса для бургер-меню в зависимости от его состояния (открыто/закрыто).
  const burgerClass = isOpen
    ? `${styles.burger} ${styles.burger_active}`
    : styles.burger;

  return (
    <div className={burgerClass} onClick={onClick}>
      {/*  span изменяет свой стиль в зависимости от состояния меню. */}
      <span
        className={
          !isOpen ? styles['burger__item-open'] : styles['burger__item-close']
        }
      />
    </div>
  );
}

export default BurgerMenu;
