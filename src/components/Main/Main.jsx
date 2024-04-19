//компонент страницы «О проекте». Он будет содержать только презентационные компоненты и в будущем,
// за исключением шапки навигации. Вот так выглядит список компонентов, которые будут использоваться только на этой странице:

import React from 'react';
import Promo from './Promo/Promo.jsx';
import AboutMe from './AboutMe/AboutMe.jsx';
import AboutProject from './AboutProject/AboutProject.jsx';
import Portfolio from './Portfolio/Portfolio.jsx';
import Techs from './Techs/Techs.jsx';
import styles from './Main.module.css';

const Main = () => {
  return (
    <main className={styles['main']}>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
  );
};

export default Main;
