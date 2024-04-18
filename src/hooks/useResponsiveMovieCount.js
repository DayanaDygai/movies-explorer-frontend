import { useEffect, useState } from 'react';

// кастомный хук для управления количеством отображаемых фильмов.
const useResponsiveMovieCount = () => {
  // Инициализируем состояния для количества отрендеренных фильмов и количества фильмов для добавления.
  const [displayedMovieCount, setDisplayedMovieCount] = useState(0);
  const [additionalMovieCount, setAdditionalMovieCount] = useState(0);

  // Получаем ширину экрана пользователя.
  const screenWidth = window.screen.width;

  // Используем эффект для автоматической установки количества фильмов в зависимости от ширины экрана.
  useEffect(() => {
    if (screenWidth >= 1280) {
      setDisplayedMovieCount(16);
      setAdditionalMovieCount(4); // Добавляем по 4 фильма при запросе.
    } else if (screenWidth >= 768 && screenWidth < 1280) {
      setDisplayedMovieCount(8);
      setAdditionalMovieCount(2); // Добавляем по 2 фильма при запросе.
    } else if (screenWidth < 768) {
      setDisplayedMovieCount(5);
      setAdditionalMovieCount(2); // Добавляем по 2 фильма при запросе.
    }
  }, [screenWidth]);

  // Функция для добавления дополнительных фильмов в список отображаемых.
  const loadMoreMovies = () => {
    setDisplayedMovieCount(displayedMovieCount + additionalMovieCount);
  };

  return { loadMoreMovies, displayedMovieCount };
};

export default useResponsiveMovieCount;
