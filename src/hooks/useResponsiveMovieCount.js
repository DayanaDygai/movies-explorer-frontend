import { useEffect, useState } from 'react';
import { isDesktop, isTablet, isMobile } from './utils';
import { DISPALYED_MOVIES_COUNT, ADDITIONAL_MOVIES_COUNT } from './constants';

// Управление количеством отображаемых фильмов
const useResponsiveMovieCount = () => {
  // Инициализируем состояния для количества отрендеренных фильмов и количества фильмов для добавления.
  const [displayedMovieCount, setDisplayedMovieCount] = useState(0);
  const [additionalMovieCount, setAdditionalMovieCount] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Функция для обновления ширины экрана с задержкой (debounce)
    let resizeTimeout;

    const handleResize = () => {
      clearTimeout(resizeTimeout); // Очищаем предыдущий таймаут
      resizeTimeout = setTimeout(() => {
        setScreenWidth(window.innerWidth);
      }, 300);
    };

    // Устанавливаем слушатель на изменение размера окна
    window.addEventListener('resize', handleResize);

    // Удаление слушателя события и очистка таймаута при размонтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout); // Очищаем таймаут при размонтировании
    };
  }, []);

  // При первом рендере устанавливаем дефолтные значения для отображаемых (displayed) и добавляемых (additional) фильмов
  useEffect(() => {
    setDefaultDisplayedMovieCount();
    setDefaultAdditionalMovieCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Наблюдаем за изменением ширины экрана и меняет только количество добавляемых (additional) фильмов
  useEffect(() => {
    setDefaultAdditionalMovieCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenWidth]);

  const setDefaultDisplayedMovieCount = () => {
    if (isDesktop(screenWidth)) {
      setDisplayedMovieCount(DISPALYED_MOVIES_COUNT.DESKTOP);
    } else if (isTablet(screenWidth)) {
      setDisplayedMovieCount(DISPALYED_MOVIES_COUNT.TABLET);
    } else if (isMobile(screenWidth)) {
      setDisplayedMovieCount(DISPALYED_MOVIES_COUNT.MOBILE);
    }
  };

  const setDefaultAdditionalMovieCount = () => {
    if (isDesktop(screenWidth)) {
      setAdditionalMovieCount(ADDITIONAL_MOVIES_COUNT.DESKTOP); // Добавляем по 4 фильма при запросе.
    } else if (isTablet(screenWidth)) {
      setAdditionalMovieCount(ADDITIONAL_MOVIES_COUNT.TABLET); // Добавляем по 2 фильма при запросе.
    } else if (isMobile(screenWidth)) {
      setAdditionalMovieCount(ADDITIONAL_MOVIES_COUNT.MOBILE); // Добавляем по 2 фильма при запросе.
    }
  };

  // Функция для добавления дополнительных (additional) фильмов в список отображаемых
  const loadMoreMovies = () => {
    setDisplayedMovieCount(displayedMovieCount + additionalMovieCount);
  };

  // Сброс отображаемых (displayed) и добавляемых (additional) фильмов в дефолтное значение
  // Используется только в сценарии клика по кнопке поиска в поле ввода в SearchForm.jsx
  const resetDisplayedMovieCount = () => {
    setDefaultDisplayedMovieCount();
    setDefaultAdditionalMovieCount();
  };

  return { loadMoreMovies, displayedMovieCount, resetDisplayedMovieCount };
};

export default useResponsiveMovieCount;
