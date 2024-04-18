import React from 'react';
import styles from './Profile.module.css';
import Preloader from '../Movies/Preloader/Preloader';

// Компонент профиля пользователя
function Profile({
  name,
  isLoading,
  formName,
  handleSubmit,
  SubmitBtnText,
  ExitBtnText,
  handleLogout,
  children,
}) {
  return (
    <div className={styles['profile']}>
      {/* Заголовок приветствия */}
      <h1 className={styles['profile__title']}>Привет,&nbsp;{name}</h1>
      {/* Показать прелоадер во время загрузки, иначе отобразить форму */}
      {isLoading ? (
        <Preloader />
      ) : (
        <form
          className={styles['profile__form']}
          name={formName}
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Дочерние элементы формы */}
          {children}

          {/* Кнопка для отправки формы */}
          <button
            className={`${styles['profile__button']} ${styles['profile__button-submit']}`}
            type="submit"
            aria-label="Редактировать данные"
          >
            {SubmitBtnText}
          </button>

          {/* Кнопка для выхода из аккаунта */}
          <button
            className={`${styles['profile__button']} ${styles['profile__button-exit']}`}
            type="button"
            aria-label="Выйти из аккаунта"
            onClick={handleLogout}
            disabled={isLoading}
          >
            {ExitBtnText}
          </button>
        </form>
      )}
    </div>
  );
}

export default Profile;
