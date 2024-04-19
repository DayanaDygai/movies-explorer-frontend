import React from 'react';
import { useLocation } from 'react-router-dom';
import Preloader from '../../Preloader/Preloader.jsx';
import MoviesCard from '../MoviesCard/MoviesCard.jsx';
import { NOT_FOUND_TEXT } from './constants.js';
import styles from './MoviesCardList.module.css';

// Компонент для отображения списка фильмов
const MoviesCardsList = ({
  movies,
  isLoading,
  isShortMoviesFilterActive,
  shortMovies,
  isMoviesNotFound,
  isSavedMoviesNotFound,
  toggleFavoriteStatus,
  savedMovies,
  shortSavedFilms,
  removeMovieById,
  isShortSavedMoviesFilterActive,
  filteredSavedMovies,
  displayedMovieCount,
  loadMoreMovies,
}) => {
  const location = useLocation(); // получаем текущий путь страницы

  return (
    <>
      {location.pathname === '/movies' ? (
        (isLoading && <Preloader />) || ( // если идет загрузка, отображаем прелоадер
          <>
            {(isMoviesNotFound ||
              (isShortMoviesFilterActive && shortMovies.length === 0)) && ( // если нет результатов поиска или отфильтрованных коротких фильмов, отображаем сообщение
              <h2 className={styles['movies__not-found']}>{NOT_FOUND_TEXT}</h2>
            )}

            {
              <section className={styles['movies-list']}>
                {(isShortMoviesFilterActive ? shortMovies : movies)
                  .slice(0, displayedMovieCount)
                  .map((movie, i) => (
                    <MoviesCard
                      movie={movie}
                      key={movie.id}
                      toggleFavoriteStatus={toggleFavoriteStatus}
                      savedMovies={savedMovies}
                    />
                  ))}
              </section>
            }
            {/* кнопка "Ещё", если есть еще фильмы для отображения */}
            {isShortMoviesFilterActive
              ? shortMovies.length > displayedMovieCount && (
                  <button
                    className={styles['movies-list__more-button']}
                    type="button"
                    onClick={loadMoreMovies}
                    tabIndex={1}
                  >
                    Ещё
                  </button>
                )
              : movies.length > displayedMovieCount && (
                  <button
                    className={styles['movies-list__more-button']}
                    type="button"
                    onClick={loadMoreMovies}
                    tabIndex={1}
                  >
                    Ещё
                  </button>
                )}
          </>
        )
      ) : (
        <>
          {(isSavedMoviesNotFound ||
            (isShortSavedMoviesFilterActive &&
              shortSavedFilms.length === 0)) && (
            <h2 className={styles['movies_list-notfound']}>{NOT_FOUND_TEXT}</h2>
          )}
          <ul className={styles['movies-list']}>
            {(isShortSavedMoviesFilterActive
              ? shortSavedFilms
              : filteredSavedMovies.length || isSavedMoviesNotFound
                ? filteredSavedMovies
                : savedMovies
            ).map((movie, i) => (
              <MoviesCard
                movie={movie}
                key={movie._id}
                removeMovieById={removeMovieById}
                savedMovies={savedMovies}
              />
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default MoviesCardsList;
