import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Main from '../Main/Main.jsx';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import Movies from '../Movies/Movies.jsx';
import SavedMovies from '../SavedMovies/SavedMovies.jsx';
import Login from '../Login/Login.jsx';
import Register from '../Register/Register.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import UserEdit from '../UserEdit/UserEdit.jsx';

import { moviesData } from '../../utils/moviesData.js';
import { savedData } from '../../utils/moviesData.js';

function App() {
  const [savedMovies, setSavedMovies] = useState(savedData); // Список сохраненных фильмов
  const [stateMenu, setStateMenu] = useState(false); //состояние меню


  //сохранение фильма
  const handleLike = (likedMovie) => {
    const isMovieSaved = savedMovies.some(movie => movie.movieName === likedMovie.movieName);
    if (isMovieSaved) {
      setSavedMovies(savedMovies.filter(movie => movie.movieName !== likedMovie.movieName));
    } else {
      setSavedMovies([...savedMovies, likedMovie]);
    }
  };

  //удаление фильма
  const handleRemove = (removedMovie) => {
    setSavedMovies(savedMovies.filter(movie => movie.movieName !== removedMovie.movieName));
  };

  // Открыть бургер-меню
  function handleClickBurger() {
    setStateMenu(!stateMenu);
  }
  // Закрыть бургер-меню
  function handleBurgerClose() {
    setStateMenu(false);
  }

  return (
    <div className="app">
          <Header
            onBurgerClose={handleBurgerClose}
            onClickBurger={handleClickBurger}
          />
      <Routes>
        <Route path="signup" element={<Register />} />
        <Route path="signin" element={<Login />} />
        <Route path="/" element={<Main />} />
        <Route path="profile" element={<UserEdit />} />
        <Route 
          path="movies" 
          element={
            <Movies 
              movies={moviesData} 
              onLike={handleLike}
            />
          } 
        />
        <Route 
          path="saved-movies" 
          element={
            <SavedMovies 
              savedMovies={savedMovies} 
              onRemove={handleRemove}
            />
          } 
        />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
