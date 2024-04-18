import React from 'react';
import SearchForm from './SearchForm/SearchForm.jsx';
import MoviesCardsList from './MoviesCardList/MoviesCardList.jsx';
import styles from './Movies.module.css';

// Компонент страницы "Фильмы"
function Movies({
  movies: searchResults,
  setMovieSearchQuery,
  handleSubmit,
  isLoading,
  isMoviesNotFound,
  toggleMoviesFilter,
  shortMovies,
  isShortMoviesFilterActive,
  movieSearchQuery,
  toggleFavoriteStatus,
  savedMovies,
}) {
  return (
    <main className={styles['movies']}>
      {/* Вставляем компонент формы поиска */}
      <SearchForm
        setMovieSearchQuery={setMovieSearchQuery}
        handleSubmit={handleSubmit}
        toggleMoviesFilter={toggleMoviesFilter}
        movieSearchQuery={movieSearchQuery}
        isShortMoviesFilterActive={isShortMoviesFilterActive}
      />
      {/* Вставляем компонент списка карточек фильмов */}
      <MoviesCardsList
        movies={searchResults}
        shortMovies={shortMovies}
        isLoading={isLoading}
        isMoviesNotFound={isMoviesNotFound}
        isShortMoviesFilterActive={isShortMoviesFilterActive}
        toggleFavoriteStatus={toggleFavoriteStatus}
        savedMovies={savedMovies}
      />
    </main>
  );
}

export default Movies;
