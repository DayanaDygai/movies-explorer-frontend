import React from 'react';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';
import styles from './SavedMovies.module.css';

function SavedMovies({ savedMovies, onRemove }) {
  return (
    <main className={styles["saved-movies"]}>
      <SearchForm />
      <MoviesCardList
        movies={savedMovies}
        onRemove={onRemove}
        isSavedMoviesPage={true}
      />
    </main>
  );
}

export default SavedMovies;
