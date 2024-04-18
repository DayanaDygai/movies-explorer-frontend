import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard.jsx';
import { useLocation } from 'react-router-dom';
import styles from './MoviesCardList.module.css';
import Preloader from '../Preloader/Preloader.jsx';
import useResponsiveMovieCount from '../../../hooks/useResponsiveMovieCount.js';

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
  setIsShortSavedMoviesFilterActive,
  filteredSavedMovies,
}) => {
  const location = useLocation(); // получаем текущий путь страницы

  const { loadMoreMovies, displayedMovieCount } = useResponsiveMovieCount(); // хук для управления отображением количества фильмов на странице

  return (
    <>
      {location.pathname === '/movies' ? (
        (isLoading && <Preloader />) || ( // если идет загрузка, отображаем прелоадер
          <>
            {(isMoviesNotFound ||
              (isShortMoviesFilterActive && shortMovies.length === 0)) && ( // если нет результатов поиска или отфильтрованных коротких фильмов, отображаем сообщение
              <h2 className={styles['movies__not-found']}>Ничего не найдено</h2>
            )}

            {
              <section className={styles['movies-list']}>
                {(isShortMoviesFilterActive ? shortMovies : movies)
                  .slice(0, displayedMovieCount)
                  .map((movie, i) => (
                    <MoviesCard // компонент для отображения карточки фильма
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
        // если путь не "/movies"
        <>
          {(isSavedMoviesNotFound ||
            (setIsShortSavedMoviesFilterActive &&
              shortSavedFilms.length === 0)) && (
            <h2 className={styles['movies_list-notfound']}>
              Ничего не найдено
            </h2>
          )}
          <ul className={styles['movies-list']}>
            {(setIsShortSavedMoviesFilterActive
              ? shortSavedFilms
              : filteredSavedMovies
            )
              .slice(0, displayedMovieCount)
              .map((movie, i) => (
                <MoviesCard // компонент для отображения карточки фильма
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
