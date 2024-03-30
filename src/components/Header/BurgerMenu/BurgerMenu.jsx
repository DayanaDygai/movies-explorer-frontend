
import React from "react";
import styles from "./BurgerMenu.module.css";

function BurgerMenu({ onClick, isOpen }) {
  const burgerClass = isOpen ? `${styles.burger} ${styles.burger_active}` : styles.burger;

  return (
    <div className={burgerClass} onClick={onClick}>
      <span className={!isOpen ? styles["burger__item-open"] : styles["burger__item-close"]} />
    </div>
  );
}

export default BurgerMenu;
