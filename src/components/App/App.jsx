// Импорты необходимых библиотек и компонентов

import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { UserAuthContext } from '../../context/UserAuthContext.js';
import { CurrentUserContext } from '../../context/CurrentUserContext';

// Компоненты страниц и элементы интерфейса
import Main from '../Main/Main.jsx';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import Movies from '../Movies/Movies.jsx';
import SavedMovies from '../SavedMovies/SavedMovies.jsx';
import Login from '../Login/Login.jsx';
import Register from '../Register/Register.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import UserEdit from '../UserEdit/UserEdit.jsx';
import Overlay from '../Overlay/Overlay.jsx';

// API-функции и утилиты
import { moviesApi } from '../../utils/MoviesApi';
import {
  getUserInfo,
  setSavedMovie,
  getSavedMovies,
  login,
  register,
  deleteSavedMovie,
  updateUserInfo,
} from '../../utils/MainApi';
import ProtectedRoute from '../../hooks/ProtectedRoute.jsx';
import {
  excludeMovieById,
  filterShortFilms,
  filterMoviesByQuery,
  messageKeys,
} from '../../utils/constants';

function App() {
  // Получение токена из localStorage
  const jwt = localStorage.getItem('jwt');

  //Хранит объект данных текущего пользователя, загруженного после аутентификации.
  const [currentUser, setCurrentUser] = useState({});

  // Указывает, идет ли в данный момент загрузка данных (например, выполнение запроса к API).
  const [isLoading, setIsLoading] = useState(false);

  // Состояние, показывающее, авторизован ли пользователь в системе.
  const [isLoggedIn, setLoggedIn] = useState(false);

  // Состояния компонента
  const [isMenuOpen, setStateMenu] = useState(false); //состояние открытого бургерного меню
  const [initialMovies, setInitialMovies] = useState([]); //все доступные фильмы
  const [searchResults, setSearchResults] = useState([]); //результаты поиска
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]); //фильтрация сохраненных фильмов
  const [savedMovies, setSavedMovies] = useState([]); //массиов сохраненных фильмов
  const [shortMovies, setShortMovies] = useState([]); //массив короткометражек
  const [shortSavedMovies, setShortSavedMovies] = useState([]); //массив сохраненных короткометражек
  const [movieSearchQuery, setMovieSearchQuery] = useState(''); //поиск фильмов
  const [savedMovieSearchQuery, setSavedMovieSearchQuery] = useState(''); //поиск сохраненных фильмов
  const [isShortMoviesFilterActive, setIsShortMoviesFilterActive] =
    useState(false); //фильтр короткометражек
  const [isShortSavedMoviesFilterActive, setIsShortSavedMoviesFilterActive] =
    useState(false); //фильтр сохраненных короткометражек
  const [isMoviesNotFound, setIsMoviesNotFound] = useState(false); //состояние отсутсвия фильмв
  const [isSavedMoviesNotFound, setIsSavedMoviesNotFound] = useState(false); //отсутсвие сохраненного фильма

  // Хуки для навигации и доступа к текущему местоположению
  const navigate = useNavigate();
  const location = useLocation();

  // Инициализация приложения с загрузкой данных из localStorage
  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem('savedData'));

    if (localStorageData) {
      const { movies, initialMovies, text, checkbox } = localStorageData;
      setSearchResults(movies);
      setInitialMovies(initialMovies);
      setMovieSearchQuery(text);
      setIsShortMoviesFilterActive(checkbox);
      setShortMovies(filterShortFilms(movies));
    }
  }, []);

  //  Проверка токена и автоматическая авторизация при наличии токена
  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  // Функция для проверки токена и получения данных пользователя
  async function checkToken() {
    const path = location.pathname;
    try {
      if (jwt) {
        const profileData = await getUserInfo(); // Получение данных профиля
        // авторизация пользователя
        setCurrentUser(profileData);
        setLoggedIn(true);
        if (path !== '/signin') {
          // Если не на странице входа, перенаправляем
          navigate(path);
        }
        // Получение сохранённых фильмов
        const savedMovies = await getSavedMovies();
        updateSavedMovies(savedMovies);
      }
    } catch (err) {
      console.error(err);
    }
  }

  // Обновление списка сохранённых фильмов
  function updateSavedMovies(savedMovies) {
    try {
      setSavedMovies(savedMovies);
      setShortSavedMovies(filterShortFilms(savedMovies));
    } catch (err) {
      console.error(err);
    }
  }

  // Функция регистрации пользователя
  async function handleSubmitRegistration(e, name, email, password) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await register(name, email, password); // Регистрация пользователя
      await handleSubmitLogin(e, email, password); // Автоматический вход после регистрации
      console.log(messageKeys.REGISTRATION_SUCCESS);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  // Обработчик входа пользователя
  async function handleSubmitLogin(e, email, password) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password); // Вход пользователя
      setLoggedIn(true);
      navigate('/movies', { replace: true }); // Перенаправление на страницу с фильмами
      console.log(messageKeys.LOGIN_SUCCESS);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  //функция выхода пользователя
  async function handleLogout() {
    try {
      setLoggedIn(false);
      localStorage.clear();
      setSearchResults([]);
      setMovieSearchQuery('');
      setIsShortMoviesFilterActive(false);
      navigate('/', { replace: true });
      console.log(messageKeys.LOGOUT_SUCCESS);
    } catch (err) {
      console.error(err);
      console.log(messageKeys.SERVER_ERROR);
    }
  }

  //функция постановки лайка на фильм
  async function toggleFavoriteStatus(e, dataMovie) {
    try {
      if (e.target.checked) {
        saveMovieAndRefreshList(dataMovie);
      } else {
        deletedMovie(dataMovie.movieId);
      }
    } catch (err) {
      console.error(err);
    }
  }

  //функция сохранения фильма
  async function saveMovieAndRefreshList(dataMovie) {
    try {
      await setSavedMovie(dataMovie); // API запрос на сохранение фильма
      const savedMovies = await getSavedMovies(); // Получение обновлённого списка сохранённых фильмов
      updateSavedMovies(savedMovies); // Обновление состояния с новым списком
      console.log(messageKeys.FAVORITE_MOVIE_ADDED);
    } catch (err) {
      console.error(err);
      console.log(messageKeys.SERVER_ERROR);
    }
  }

  // Функция для удаления фильма из списка сохранённых
  async function deletedMovie(movieId) {
    try {
      const film = savedMovies.find((movie) => movie.movieId === movieId);
      await deleteSavedMovie(film._id); // API запрос на удаление фильма
      const newCards = excludeMovieById(savedMovies, film._id); // Фильтрация списка фильмов после удаления
      updateSavedMovies(newCards); // Обновление состояния с новым списком
      console.log(messageKeys.FAVORITE_MOVIE_REMOVED);
    } catch (err) {
      console.error(err);
      console.log(messageKeys.SERVER_ERROR);
    }
  }

  // Обработчик нажатия на кнопку удаления фильма
  async function removeMovieById(cardID) {
    try {
      await deleteSavedMovie(cardID); // API запрос на удаление фильма по ID
      const newCards = excludeMovieById(savedMovies, cardID); // Фильтрация списка фильмов после удаления
      updateSavedMovies(newCards); // Обновление состояния с новым списком
      console.log(messageKeys.FAVORITE_MOVIE_REMOVED);
    } catch (err) {
      console.error(err);
      console.log(messageKeys.SERVER_ERROR);
    }
  }

  // Проверка на отсутствие фильмов после фильтрации
  function updateMoviesNotFoundStatus(filteredMovies) {
    setIsMoviesNotFound(filteredMovies.length === 0);
  }

  function updateSavedMoviesNotFoundStatus(filteredSavedMovies) {
    setIsSavedMoviesNotFound(filteredSavedMovies.length === 0);
  }

  // Проверка на отсутствие сохранённых фильмов после фильтрации
  function toggleMoviesFilter(e) {
    try {
      if (initialMovies.length !== 0) {
        setIsShortMoviesFilterActive(e.target.checked);
        const filteredMovies = filterMoviesByQuery(
          initialMovies,
          movieSearchQuery,
        );
        updateAndSaveMovies(e.target.checked, filteredMovies);
      }
    } catch (err) {
      console.error(err);
      console.log(messageKeys.SERVER_ERROR);
    }
  }

  // Обработчик изменения состояния чекбокса фильтра короткометражных фильмов
  function toggleSavedMoviesFilter(e) {
    try {
      setIsShortSavedMoviesFilterActive(e.target.checked);
      refreshFilteredSavedMovies();
    } catch (err) {
      console.error(err);
      console.log(messageKeys.SERVER_ERROR);
    }
  }

  // Обработчик поиска фильмов
  async function processMovieSearch(e, valueCheckbox) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (movieSearchQuery.trim() === '') {
        // Используем trim() для проверки на пустые строки
        throw new Error(messageKeys.SEARCH_KEYWORD_REQUIRED);
      }
      // Загрузка фильмов, если они ещё не были загружены
      let moviesToFilter =
        initialMovies.length > 0 ? initialMovies : await moviesApi();
      if (initialMovies.length === 0) {
        setInitialMovies(moviesToFilter);
      }
      const filteredMovies = filterMoviesByQuery(
        moviesToFilter,
        movieSearchQuery,
      );
      updateAndSaveMovies(valueCheckbox, filteredMovies);
    } catch (err) {
      console.error('Error during movie search:', err); // Улучшенная обработка ошибок
      if (err.message === messageKeys.SEARCH_KEYWORD_REQUIRED) {
        console.log(messageKeys.SEARCH_KEYWORD_REQUIRED); // Специфическая обработка ошибки по ключевому слову
      } else {
        console.log(messageKeys.SERVER_ERROR); // Обработка прочих ошибок
      }
    } finally {
      setIsLoading(false);
    }
  }

  // Функция для обновления и сохранения текущего поиска в localStorage
  function updateAndSaveMovies(checkbox, movies) {
    setShortMovies(filterShortFilms(movies));
    updateMoviesNotFoundStatus(movies);
    setSearchResults(movies);

    localStorage.setItem(
      'savedData',
      JSON.stringify({
        checkbox: checkbox,
        text: movieSearchQuery,
        movies: movies,
        initialMovies: initialMovies,
      }),
    );
  }

  // Обработчик поиска сохранённых фильмов
  function handleSubmitSearchSavedMovies(e) {
    e.preventDefault();

    try {
      refreshFilteredSavedMovies();
    } catch (err) {
      console.error(err);
    }
  }

  // Обновление отфильтрованных сохранённых фильмов
  function refreshFilteredSavedMovies() {
    try {
      const filteredSavedMovies = filterMoviesByQuery(
        savedMovies,
        savedMovieSearchQuery,
      );
      setFilteredSavedMovies(filteredSavedMovies);
      setShortSavedMovies(filterShortFilms(filteredSavedMovies));
      updateSavedMoviesNotFoundStatus(filteredSavedMovies);
    } catch (err) {
      console.error(err);
    }
  }

  // Обновление данных пользователя
  async function handleUpdateUser(name, email) {
    setIsLoading(true);
    try {
      const updated = await updateUserInfo(name, email);
      setCurrentUser(updated);
      console.log(messageKeys.PROFILE_UPDATED);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  // Открыть бургер-меню
  function handleClickBurger() {
    setStateMenu(!isMenuOpen);
  }
  // Закрыть бургер-меню
  function handleBurgerClose() {
    setStateMenu(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <UserAuthContext.Provider value={isLoggedIn}>
        <div className="app">
          <Overlay />
          <Header
            isLoggedIn={isLoggedIn}
            onBurgerClose={handleBurgerClose}
            onClickBurger={handleClickBurger}
          />
          <Routes>
            <Route
              path="/signup"
              element={
                <Register
                  handleSubmitRegistration={handleSubmitRegistration}
                  isLoading={isLoading}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <Login
                  handleSubmitLogin={handleSubmitLogin}
                  isLoading={isLoading}
                />
              }
            />
            <Route path="/" element={<Main />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  element={UserEdit}
                  isLoggedIn={isLoggedIn}
                  handleUpdateUser={handleUpdateUser}
                  handleLogout={handleLogout}
                  isLoading={isLoading}
                />
              }
            />
            <Route
              path="/movies"
              element={
                <ProtectedRoute
                  element={Movies}
                  isLoggedIn={isLoggedIn}
                  movies={searchResults}
                  setMovieSearchQuery={setMovieSearchQuery}
                  movieSearchQuery={movieSearchQuery}
                  handleSubmit={processMovieSearch}
                  isLoading={isLoading}
                  toggleMoviesFilter={toggleMoviesFilter}
                  isShortMoviesFilterActive={isShortMoviesFilterActive}
                  shortMovies={shortMovies}
                  isMoviesNotFound={isMoviesNotFound}
                  toggleFavoriteStatus={toggleFavoriteStatus}
                  savedMovies={savedMovies}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  element={SavedMovies}
                  isLoggedIn={isLoggedIn}
                  savedMovies={savedMovies}
                  filteredSavedMovies={filteredSavedMovies}
                  removeMovieById={removeMovieById}
                  toggleSavedMoviesFilter={toggleSavedMoviesFilter}
                  setIsShortSavedMoviesFilterActive={
                    isShortSavedMoviesFilterActive
                  }
                  shortSavedFilms={shortSavedMovies}
                  setValueInputSavedMovie={setSavedMovieSearchQuery}
                  valueInputSavedMovie={savedMovieSearchQuery}
                  handleSubmitSearchSavedMovies={handleSubmitSearchSavedMovies}
                  setsetIsShortSavedMoviesFilterActive={
                    setIsShortSavedMoviesFilterActive
                  }
                  setFilteredSavedMovies={setFilteredSavedMovies}
                  isSavedMoviesNotFound={isSavedMoviesNotFound}
                  setIsSavedMoviesNotFound={setIsSavedMoviesNotFound}
                />
              }
            />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </UserAuthContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
