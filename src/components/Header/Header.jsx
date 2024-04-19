import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation.jsx';
import NavTab from '../Main/NavTab/NavTab.jsx';
import BurgerMenu from './BurgerMenu/BurgerMenu.jsx';
import headerLogo from '../../images/logo__header.svg';
import styles from './Header.module.css';
import Overlay from '../Overlay/Overlay.jsx';

function Header({ isLoggedIn }) {
  const { pathname } = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 848); // Состояние для отслеживания мобильного режима.
  const [burgerOpen, setBurgerOpen] = useState(false); // Состояние для управления видимостью мобильного меню.

  // Эффект для обработки изменения размеров окна и установки мобильного режима
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 848);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Функция для переключения состояния бургерного меню
  const handleBurgerClick = () => {
    setBurgerOpen(!burgerOpen);
  };

  // Не отображать Header на страницах входа, регистрации или ошибки.
  if (pathname === '/signin' || pathname === '/signup' || pathname === '/404')
    return null;

  // Определение класса для изменения цвета шапки на главной странице.
  const headerOnLanding =
    !isLoggedIn || pathname === '/' ? 'header_landing-color' : null;

  return (
    <header className={`${styles.header} ${styles[headerOnLanding]}`}>
      {isLoggedIn ? (
        <Overlay isOpen={burgerOpen} /> // Оверлей при открытом бургер-меню для затемнения контента.
      ) : null}
      <div className={styles['header__container']}>
        <Link to="/" className={styles['header__logo']}>
          <img src={headerLogo} alt="Лого" />
        </Link>
        {!isLoggedIn ? (
          <NavTab /> // Вкладки навигации для неавторизованных пользователей.
        ) : (
          <>
            {/* Навигация для авторизованных пользователей */}
            <Navigation isOpen={burgerOpen} />
            {/* Кнопка бургер-меню для мобильных устройств */}
            {isMobile && (
              <BurgerMenu onClick={handleBurgerClick} isOpen={burgerOpen} />
            )}
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
