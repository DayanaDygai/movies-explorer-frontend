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

import React , { useEffect } from 'react';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';
import styles from './SavedMovies.module.css';

// Компонент для отображения сохраненных фильмов
const SavedMovies = ({  
  savedMovies,
  filteredSavedMovies,
  removeMovieById,
  toggleSavedMoviesFilter,
  setIsShortSavedMoviesFilterActive,
  shortSavedFilms,
  valueInputSavedMovie,
  setValueInputSavedMovie,
  handleSubmitSearchSavedMovies,
  setsetIsShortSavedMoviesFilterActive,
  setFilteredSavedMovies,
  isSavedMoviesNotFound,
  setIsSavedMoviesNotFound, }) => {

    // Эффект для обновления отфильтрованных сохраненных фильмов при изменении списка сохраненных фильмов
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => setFilteredSavedMovies(savedMovies), [savedMovies]);

    // Эффект для сброса флага об отсутствии сохраненных фильмов при монтировании компонента
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => setIsSavedMoviesNotFound(false), []);


  return (
    <main className={styles["saved-movies"]}>
      {/* Форма поиска сохраненных фильмов */}
        <SearchForm
          toggleSavedMoviesFilter={toggleSavedMoviesFilter}
          setIsShortSavedMoviesFilterActive={setIsShortSavedMoviesFilterActive}
          setValueInputSavedMovie={setValueInputSavedMovie}
          valueInputSavedMovie={valueInputSavedMovie}
          handleSubmitSearchSavedMovies={handleSubmitSearchSavedMovies}
          setsetIsShortSavedMoviesFilterActive={setsetIsShortSavedMoviesFilterActive}
        />

       {/* Список сохраненных фильмов */}
        <MoviesCardList
          savedMovies={savedMovies}
          filteredSavedMovies={filteredSavedMovies}
          shortSavedFilms={shortSavedFilms}
          setIsShortSavedMoviesFilterActive={setIsShortSavedMoviesFilterActive}
          removeMovieById={removeMovieById}
          isSavedMoviesNotFound={isSavedMoviesNotFound}
          setIsSavedMoviesNotFound={setIsSavedMoviesNotFound}
        />
    </main>
  );
}

export default SavedMovies;
