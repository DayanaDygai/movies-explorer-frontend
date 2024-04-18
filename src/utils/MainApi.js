import { MAIN_MOVIES_API_BASE_URL } from './constants';

const getResponseData = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
};

export const register = (name, email, password) => {
  return fetch(`${MAIN_MOVIES_API_BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  }).then(getResponseData);
};

export const login = (email, password) => {
  return fetch(`${MAIN_MOVIES_API_BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then(getResponseData)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
      }
      return data;
    });
};

// Получить инфо о пользователе
export const getUserInfo = () => {
  return fetch(`${MAIN_MOVIES_API_BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  }).then(getResponseData);
};

export const updateUserInfo = (data) => {
  const token = localStorage.getItem('jwt');
  return fetch(`${MAIN_MOVIES_API_BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({
      name: data.name,
      email: data.email,
    }),
  }).then(getResponseData);
};

export const setSavedMovie = (dataMovie) => {
  const token = localStorage.getItem('jwt');
  return fetch(`${MAIN_MOVIES_API_BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({
      country: dataMovie.country,
      director: dataMovie.director,
      duration: dataMovie.duration,
      year: dataMovie.year,
      description: dataMovie.description,
      image: dataMovie.image,
      trailerLink: dataMovie.trailerLink,
      thumbnail: dataMovie.thumbnail,
      movieId: dataMovie.movieId,
      nameRU: dataMovie.nameRU,
      nameEN: dataMovie.nameEN,
    }),
  }).then(getResponseData);
};

export const getSavedMovies = () => {
  const token = localStorage.getItem('jwt');
  return fetch(`${MAIN_MOVIES_API_BASE_URL}/movies`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(getResponseData);
};

export const deleteSavedMovie = (movieId) => {
  const token = localStorage.getItem('jwt');
  return fetch(`${MAIN_MOVIES_API_BASE_URL}/movies/${movieId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(getResponseData);
};

const MainApi = {
  register,
  login,
  getUserInfo,
  updateUserInfo,
  setSavedMovie,
  getSavedMovies,
  deleteSavedMovie,
};

export default MainApi;
