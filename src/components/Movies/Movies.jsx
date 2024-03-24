import React from 'react';
import SearchForm from './SearchForm/SearchForm.jsx';
import MoviesCardsList from './MoviesCardList/MoviesCardList.jsx';
import styles from './Movies.module.css'; 

function Movies({movies, onLike, onRemove}) {
  return (
    <main className={styles["movies"]}>
      <SearchForm />
      <MoviesCardsList movies={movies} onLike={onLike} onRemove={onRemove} isSavedMoviesPage={false}/>
    </main>
  );
}

export default Movies;
