import React from 'react';
import styles from './MoviesCard.module.css'; 
import { Link, useLocation } from 'react-router-dom';
import { MOVIES_API_BASE_URL, createMovieObject } from '../../../utils/constants';

// Компонент для отображения карточки фильма.
const MoviesCard = ({ movie, toggleFavoriteStatus, removeMovieById, savedMovies }) => {

  const location = useLocation();

   // Функция для определения, сохранен ли фильм в избранном.
  function isSaved(card) {
    console.log("card", card);
    return savedMovies.some((f) => f.movieId === card.id);
  }

  //функция для создания объекта карточки фильма
  const handleToggleFavorite = (e) => {
    const movieData = createMovieObject(movie);
    toggleFavoriteStatus(e, movieData);
};

    // Расчет продолжительности фильма в часах и минутах.
  const durationHours = Math.floor(movie.duration / 60);
  const durationMinutes = movie.duration % 60;
  const durationString = `${durationHours}ч ${durationMinutes}м`;

  return (
    <article className={styles["movies-card"]}>
      <div className={styles["movies-card__cover"]}>
        <Link
        to={movie.trailerLink} target="_blank" rel="noreferrer">
          <img
            className={styles["movies-card__image"]}
            src={location.pathname === '/movies' ? `${MOVIES_API_BASE_URL}${movie.image.url}` : `${movie.image}`}
             alt={movie.nameRU}
          />
        </Link>
      </div>
      <div className={styles["movies-card__footer"]}>
       <div className={styles["movies-card__data"]}>
       <h2 className={styles["movies-card__name"]}>{movie.nameRU}</h2>
       {location.pathname === '/movies' ? (
          <input
            className={styles['card__like_button']}
            type='checkbox'
            checked={isSaved(movie)}
            onChange={(e) =>
              handleToggleFavorite(e)
            }
          />
        ) : (
          <button
            className={styles['button-card-delete']}
            type='button'
            onClick={() => removeMovieById(movie._id)}></button>
        )}          
          </div>
          </div>
      <div className={styles["movies-card__meta"]}>
        <h2 className={styles["movie__duration"]}>{durationString}</h2>
      </div>
    </article>
  );
}

export default MoviesCard;
