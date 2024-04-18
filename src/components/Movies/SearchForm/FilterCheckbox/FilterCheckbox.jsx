import React from 'react';
import styles from './FilterCheckBox.module.css'
import { useLocation } from 'react-router-dom';

// Компонент для отображения чекбокса фильтрации короткометражных фильмов
function FilterCheckBox({ toggleMoviesFilter, isShortMoviesFilterActive, toggleSavedMoviesFilter, setIsShortSavedMoviesFilterActive }) {
  
  const location = useLocation(); // получаем текущий путь страницы

  return (
    <label className={styles["checkbox__wrapper"]}>
        {location.pathname === '/movies' ? ( // если путь "/movies"
          <input
            type='checkbox'
            className={styles["checkbox__switch"]}
            checked={isShortMoviesFilterActive} // устанавливаем состояние чекбокса
            onChange={toggleMoviesFilter} // обработчик изменения состояния чекбокса
          />
        ) : ( // если путь не "/movies"
          <input
            type='checkbox'
            className={styles["checkbox__switch"]}
            checked={setIsShortSavedMoviesFilterActive} // устанавливаем состояние чекбокса
            onChange={toggleSavedMoviesFilter} // обработчик изменения состояния чекбокса
          />
        )}
      <span className={styles["checkbox__switch-cover"]} />
      <span className={styles["checkbox__text"]}>Короткометражки</span>


    </label>
  );
}



export default FilterCheckBox;
