export const { MOVIES_API_BASE_URL = 'https://api.nomoreparties.co' } =
  process.env;
export const {
  MAIN_MOVIES_API_BASE_URL = 'https://api.movies.daiana.nomoredomainswork.ru',
} = process.env;

// Регулярное выражение для проверки формата электронной почты
export const EMAIL_VALIDATION_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i;

// Регулярное выражение для проверки формата имени (латиница, кириллица, пробелы, дефисы)
export const NAME_VALIDATION_REGEX = /^[А-ЯA-Zё\s-]+$/imu;

export const messageKeys = {
  REGISTRATION_SUCCESS: 'Регистрация успешно завершена',
  LOGIN_SUCCESS: 'Авторизация успешна',
  LOGOUT_SUCCESS: 'Выход из аккаунта выполнен',
  SERVER_ERROR: 'Ошибка сервера',
  FAVORITE_MOVIE_ADDED: 'Фильм сохранен',
  FAVORITE_MOVIE_REMOVED: 'Фильм удален из сохраненных',
  SEARCH_KEYWORD_REQUIRED: 'Введите ключевое слово',
  PROFILE_UPDATED: 'Данные профиля успешно обновлены',
  EMAIL_FORMAT_ERROR: 'Введите корректный email адрес',
  NAME_FORMAT_ERROR: 'Имя должно содержать только буквы, пробелы или дефисы',
};

/**
 * Фильтрует список фильмов, оставляя только короткометражные (до 40 минут).
 * @param {Array} movies - массив фильмов для фильтрации
 * @return {Array} - массив короткометражных фильмов
 * * @param {number} maxDuration - максимальная длительность фильма в минутах (по умолчанию 40)
 */

export const filterShortFilms = (movies, maxDuration = 40) =>
  movies.filter((film) => film.duration <= maxDuration);

/**
 * Фильтрует список фильмов по заданному поисковому запросу в названии на русском или английском языке.
 * @param {Array} movies - массив фильмов для фильтрации
 * @param {string} query - поисковый запрос
 * @return {Array} - массив фильмов, соответствующих запросу
 */

export function filterMoviesByQuery(movies, query) {
  const normalizedQuery = query.toLowerCase().trim();
  return movies.filter(
    (item) =>
      item.nameRU.toLowerCase().trim().includes(normalizedQuery) ||
      item.nameEN.toLowerCase().trim().includes(normalizedQuery),
  );
}

/**
 * Исключает из списка фильмов тот, который соответствует указанному ID.
 * @param {Array} movies - массив фильмов для фильтрации
 * @param {string} movieID - идентификатор фильма для исключения
 * @return {Array} - массив фильмов без исключённого фильма
 */

export function excludeMovieById(movies, movieID) {
  return movies.filter((movie) => movie._id !== movieID);
}

export function createMovieObject(movie) {
  return {
    country: movie.country,
    director: movie.director,
    duration: movie.duration,
    year: movie.year,
    description: movie.description,
    image: `${MOVIES_API_BASE_URL}${movie.image.url}`,
    trailerLink: movie.trailerLink,
    thumbnail: `${MOVIES_API_BASE_URL}${movie.image.formats.thumbnail.url}`,
    movieId: movie.id,
    nameRU: movie.nameRU,
    nameEN: movie.nameEN,
  };
}
