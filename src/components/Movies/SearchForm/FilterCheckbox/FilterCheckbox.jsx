import React from 'react';
import styles from './FilterCheckBox.module.css'

function CheckBox() {
  return (
    <label className={styles["checkbox__wrapper"]}>
      <input
        className={styles["checkbox__switch"]}
        type="checkbox"
      />
      <span className={styles["checkbox__switch-cover"]} />
      <span className={styles["checkbox__text"]}>Короткометражки</span>


    </label>
  );
}

export default CheckBox;
