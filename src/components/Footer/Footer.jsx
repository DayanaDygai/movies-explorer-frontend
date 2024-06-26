import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from "./Footer.module.css"; 

function Footer() {
  const { pathname } = useLocation();
  if (pathname === '/profile' || pathname === '/signin' || pathname === '/signup' || pathname === '/404') return null;

  return (
    <footer className={styles["footer"]}>
      <div className={styles["footer__container"]}>
        <p className={styles["footer__title"]}>
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className={styles["footer__bottom"]}>
          <p className={styles["footer__copy"]}>&copy; 2024</p>
          <ul className={styles["footer__list"]}>
            <li className={styles["footer__item"]}>
              <a
                className={styles["footer__link"]}
                href="https://practicum.yandex.ru"
                target="_blank"
                rel="noreferrer"
              >
                Яндекс.Практикум
              </a>
            </li>
            <li className={styles["footer__item"]}>
              <a
                className={styles["footer__link"]}
                href="https://github.com/DayanaDygai?tab=projects"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
