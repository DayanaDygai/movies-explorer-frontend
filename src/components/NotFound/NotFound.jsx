import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './NotFound.module.css'; // Импорт CSS-модуля

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles["not-found"]}>
      <p className={styles["not-found__code"]}>404</p>
      <p className={styles["not-found__text"]}>Страница не найдена</p>
      <button
        className={styles["not-found__button"]}
        onClick={() => navigate(-4)}
        type="button"
        aria-label="Вернуться на предыдущую страницу"
      >
        Назад
      </button>
    </div>
  );
}

export default NotFound;
