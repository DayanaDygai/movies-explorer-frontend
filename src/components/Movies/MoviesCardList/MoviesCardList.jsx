import React, { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard.jsx';
import styles from './MoviesCardList.module.css';

function MoviesCardsList({ movies, isSavedMoviesPage  }) {
  const [visibleCards, setVisibleCards] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);

  const handleLikeClick = (movie) => {
    // Проверяем, есть ли уже фильм в сохраненных
    const isSaved = savedMovies.includes(movie);
    
    // Обновляем список сохраненных фильмов
    setSavedMovies(isSaved 
      ? savedMovies.filter((m) => m !== movie) 
      : [...savedMovies, movie]);
  };

  useEffect(() => {
    const setInitialVisibleCards = () => {
      const width = window.innerWidth;
      let initialVisibleCards;

      if (width < 768) {
        initialVisibleCards = 5;
      } else if (width >= 768 && width < 1024) {
        initialVisibleCards = 8;
      } else {
        initialVisibleCards = 16;
      }

      setVisibleCards(movies.slice(0, initialVisibleCards));
    };

    setInitialVisibleCards();
    window.addEventListener('resize', setInitialVisibleCards);

    return () => {
      window.removeEventListener('resize', setInitialVisibleCards);
    };
  }, [movies]);

  const loadMore = () => {
    const width = window.innerWidth;
    let additionalCards;

    if (width < 768) {
      additionalCards = 5;
    } else if (width >= 768 && width < 1024) {
      additionalCards = 8;
    } else {
      additionalCards = 16;
    }

    setVisibleCards(current => [
      ...current,
      ...movies.slice(current.length, current.length + additionalCards)
    ]);
  };

  return (
    <div className={styles["movies-list"]}>
      {visibleCards.map((movie, index) => (
          <MoviesCard
          key={index}
          movieName={movie.movieName}
          movieImage={movie.movieImage}
          movieLink={movie.movieLink}
          onLike={() => handleLikeClick(movie)}
          isLiked={savedMovies.includes(movie)}
          movies={movies}
          isSavedMoviesPage={isSavedMoviesPage}
        />
      ))}
      
        <button className={styles["movies-list__more-button"]} onClick={loadMore}>
          Ещё
        </button>

    </div>
  );
}

export default MoviesCardsList;

