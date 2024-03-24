import React from 'react';
import styles from './Profile.module.css'; 

function Profile({children, SubmitBtnText, ExitBtnText }) {

  return (
    <div className={styles["profile"]}>
      <h1 className={styles["profile__title"]}>
        Привет,&nbsp;Виталий!
      </h1>
        <form
          className={styles["profile__form"]}
          name="Виталий"
          noValidate
        >
          {children}
          <button
            className={`${styles["profile__button"]} ${styles["profile__button-submit"]}`}
            type="submit"
            aria-label="Редактировать данные"
          >
            {SubmitBtnText}
          </button>
          <button
            className={`${styles["profile__button"]} ${styles["profile__button-exit"]}`}
            type="button"
            aria-label="Выйти из аккаунта"
          >
            {ExitBtnText}
          </button>
        </form>
    </div>
  );
}

export default Profile;
