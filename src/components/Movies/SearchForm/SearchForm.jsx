import React, { useEffect } from 'react';
import FilterCheckBox from './FilterCheckbox/FilterCheckbox.jsx';
import styles from './SearchForm.module.css';
import { useLocation } from 'react-router-dom';

// Компонент формы поиска
function SearchForm({
  setMovieSearchQuery,
  handleSubmit,
  toggleMoviesFilter,
  movieSearchQuery,
  isShortMoviesFilterActive,
  toggleSavedMoviesFilter,
  setIsShortSavedMoviesFilterActive,
  setValueInputSavedMovie,
  valueInputSavedMovie,
  handleSubmitSearchSavedMovies,
  setsetIsShortSavedMoviesFilterActive,
  formValidation
}) {

  const location = useLocation();// получаем текущий путь страницы

  // Сброс значений полей при изменении маршрута на страницу сохранённых фильмов
  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      setValueInputSavedMovie('');
      setsetIsShortSavedMoviesFilterActive(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles["search__container"]}>
      {/* Если текущий путь "/movies", отображаем форму для поиска фильмов */}
      {location.pathname === '/movies' ? (
      <form
        className={styles["search__form"]}
        name="search"
        onSubmit={(e) => handleSubmit(e, isShortMoviesFilterActive)}
        noValidate
      >
        <div className={styles["search__wrapper"]}>
          <input
            className={styles["search__input"]}

            value={movieSearchQuery}
            onChange={(e) => setMovieSearchQuery(e.target.value)}
            type='text'
            placeholder='Фильм'
     
          />
          <button
            className={styles["search__button"]}
            type="submit"
            aria-label="search-button"
    
          />
        </div>
        {/* Вставляем компонент чекбокса фильтрации */}
        <FilterCheckBox    
          toggleMoviesFilter={toggleMoviesFilter}
          isShortMoviesFilterActive={isShortMoviesFilterActive}
          toggleSavedMoviesFilter={toggleSavedMoviesFilter}
          setIsShortSavedMoviesFilterActive={setIsShortSavedMoviesFilterActive}
    />
       
      </form>): ( // Если текущий путь не "/movies", отображаем форму для поиска сохранённых фильмов
       <form
       className={styles["search__form"]}
       name="search"
       autoComplete="off"
       onSubmit={(e) => handleSubmitSearchSavedMovies(e)}
       noValidate
     >
       <div className={styles["search__wrapper"]}>
         <input
           className={styles["search__input"]}
           name="search"
           type="search"
           required
           placeholder={formValidation ? 'Фильм' : 'Нужно ввести ключевое слово'}
           tabIndex={1}
           value={valueInputSavedMovie}
            onChange={(e) => setValueInputSavedMovie(e.target.value)}
         />
         <button
           className={styles["search__button"]}
           type="submit"
           aria-label="search-button"
           tabIndex={1}
         />
       </div>

      {/* Вставляем компонент чекбокса фильтрации */}
       <FilterCheckBox    
      toggleMoviesFilter={toggleMoviesFilter}
      isShortMoviesFilterActive={isShortMoviesFilterActive}
      toggleSavedMoviesFilter={toggleSavedMoviesFilter}
      setIsShortSavedMoviesFilterActive={setIsShortSavedMoviesFilterActive}
    />
      
     </form>
      )}

    </div>
  );
}

export default SearchForm;
