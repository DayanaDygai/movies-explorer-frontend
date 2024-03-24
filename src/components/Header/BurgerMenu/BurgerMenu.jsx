

import React from "react";
import styles from "./BurgerMenu.module.css";

import openIcon from "../../../images/burger__icon.svg"; 
import closeIcon from "../../../images/burger__icon-close.svg"; 

function BurgerMenu({ onClick, isOpen }) {
  const burgerClass = isOpen ? `${styles.burger} ${styles.burger_active}` : styles.burger;

  return (
    <div className={burgerClass} onClick={onClick}>
      {!isOpen && (
        <img className={styles["burger__item"]} src={openIcon} alt="Открыть меню" />
      )}

      {isOpen && (
        <img className={styles["burger__item"]} src={closeIcon} alt="Закрыть меню" />
      )}
    </div>
  );
}

export default BurgerMenu;
