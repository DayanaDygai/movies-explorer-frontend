// import React from 'react';
// import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
// import SearchForm from '../Movies/SearchForm/SearchForm';
// import styles from './SavedMovies.module.css';

// function SavedMovies({ ...props }) {
//   return (
//     <main className={styles["saved-movies"]}>
//       <SearchForm
//         searchValue={props.searchValue}
//         searchChangeValueHandler={props.searchChangeValueHandler}
//         searchHandler={props.searchHandler}
//         formValidation={props.formValidation}
//       />
//            {props.searchedMovies.length === 0 ? (
//         <p className="movies_list-notfound">Ничего не найдено</p>
//       ) : (
//         <MoviesCardList
//           searchedMovies={props.searchedMovies}
//           searchValue={props.searchValue}
//           removeMovie={props.removeMovie}
//           isLoading={props.isLoading}
//         />
//       )}
//     </main>
//   );
// }

// export default SavedMovies;

import React, { useEffect } from 'react';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';
import styles from './SavedMovies.module.css';

// Компонент для отображения сохраненных фильмов
const SavedMovies = ({
  savedMovies,
  filteredSavedMovies,
  removeMovieById,
  toggleSavedMoviesFilter,
  isShortSavedMoviesFilterActive,
  shortSavedFilms,
  valueInputSavedMovie,
  setValueInputSavedMovie,
  handleSubmitSearchSavedMovies,
  setIsShortSavedMoviesFilterActive,
  setFilteredSavedMovies,
  isSavedMoviesNotFound,
  setIsSavedMoviesNotFound,
}) => {
  // При первом рендере сбрасываем фильтрованные фильмы
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setFilteredSavedMovies([]), []);

  // Эффект для сброса флага об отсутствии сохраненных фильмов при монтировании компонента
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setIsSavedMoviesNotFound(false), []);

  return (
    <main className={styles['saved-movies']}>
      {/* Форма поиска сохраненных фильмов */}
      <SearchForm
        valueInputSavedMovie={valueInputSavedMovie}
        setValueInputSavedMovie={setValueInputSavedMovie}
        isShortSavedMoviesFilterActive={isShortSavedMoviesFilterActive}
        setIsShortSavedMoviesFilterActive={setIsShortSavedMoviesFilterActive}
        handleSubmitSearchSavedMovies={handleSubmitSearchSavedMovies}
        toggleSavedMoviesFilter={toggleSavedMoviesFilter}
      />

      {/* Список сохраненных фильмов */}
      <MoviesCardList
        savedMovies={savedMovies}
        filteredSavedMovies={filteredSavedMovies}
        shortSavedFilms={shortSavedFilms}
        isShortSavedMoviesFilterActive={isShortSavedMoviesFilterActive}
        removeMovieById={removeMovieById}
        isSavedMoviesNotFound={isSavedMoviesNotFound}
        setIsSavedMoviesNotFound={setIsSavedMoviesNotFound}
        hasSearchedSavedMovieValue={Boolean(valueInputSavedMovie)}
      />
    </main>
  );
};

export default SavedMovies;
