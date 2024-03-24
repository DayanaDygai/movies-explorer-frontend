import React, { useState } from 'react';
import styles from './MoviesCard.module.css'; 

function MoviesCard({ movieName, movieImage, movieLink, isLiked, onLike, isSavedMoviesPage, onRemove  }) {
  const [liked, setLiked] = useState(isLiked);

  const handleLikeClick = () => {
    setLiked(!liked);
    onLike();
  };
  const handleRemoveClick = () => {
    onRemove();
  };
  const likeButtonClass = liked ? styles['button-card-like_active'] : styles['movies-card__like-button'];



  return (
    <article className={styles["movies-card"]}>
      <div className={styles["movies-card__cover"]}>
        <a href={movieLink} target="_blank" rel="noreferrer">
          <img
            className={styles["movies-card__image"]}
            src={movieImage}
            alt={movieName}
          />
        </a>
      </div>
      <div className={styles["movies-card__footer"]}>
        <div className={styles["movies-card__data"]}>
          <h2 className={styles["movies-card__name"]}>{movieName}</h2>
          {!isSavedMoviesPage && (
            <button
              className={likeButtonClass}
              type="button"
              aria-label="Лайкнуть фильм"
              onClick={handleLikeClick}
            />
          )}
          {isSavedMoviesPage && (
            <button
              className={styles["button-card-delete"]}
              type="button"
              aria-label="Удалить фильм"
              onClick={handleRemoveClick}
            /> )}
          </div>
        <div className={styles["movies-card__meta"]}>
          <span className={styles["movie__duration"]}>1ч 42м</span>
        </div>
      </div>
    </article>
  );
}

export default MoviesCard;
