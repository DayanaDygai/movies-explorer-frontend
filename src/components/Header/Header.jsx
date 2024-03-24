import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation.jsx";
import NavTab from "../Main/NavTab/NavTab.jsx";
import BurgerMenu from "./BurgerMenu/BurgerMenu.jsx";
import headerLogo from "../../images/logo__header.svg";
import styles from "./Header.module.css";
import Overlay from '../Overlay/Overlay.jsx';


function Header() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 848);
  const [burgerOpen, setBurgerOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 848);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleBurgerClick = () => {
    setBurgerOpen(!burgerOpen);
  };

  if (['/signin', '/signup', '/404'].includes(location.pathname)) return null;

  const loggedIn = ['/movies', '/profile', '/saved-movies'];

  const headerOnLanding = !loggedIn.includes(location.pathname) ? 'header_landing-color' : null;

  return (
 
    <header className={`${styles.header} ${styles[headerOnLanding]}`}>
      {loggedIn.includes(location.pathname) ? 
         <Overlay isOpen={burgerOpen} />
       : null }
      <div className={styles["header__container"]}>
        <Link to="/" className={styles["header__logo"]}>
          <img src={headerLogo} alt="Лого" />
        </Link>
        {!loggedIn.includes(location.pathname) ? 
        <NavTab /> :
          <>
            <Navigation isOpen={burgerOpen} />
            {isMobile && <BurgerMenu onClick={handleBurgerClick} isOpen={burgerOpen} />}
          </> 
        }
      </div>
    </header>
  );
}

export default Header;



