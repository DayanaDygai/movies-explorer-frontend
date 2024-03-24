import React from 'react';
import Icon from '../../../images/icon__link.svg';
import styles from './Portfolio.module.css';

function Portfolio() {
  return (
    <section className={styles["portfolio"]}>
      <div className={styles["portfolio__container"]}>
        <h3 className={styles["portfolio__title"]}>Портфолио</h3>
        <ul className={styles["portfolio__list"]}>
          <li className={styles["portfolio__item"]}>
            <a className={styles["portfolio__link"]} href="https://" target="blank">
              Статичный сайт
              <img src={Icon} className={styles["portfolio__link-pic"]} alt="картинка-ссылка" />
            </a>
          </li>
          <li className={styles["portfolio__item"]}>
            <a className={styles["portfolio__link"]} href="https://" target="blank">
              Адаптивный сайт
              <img src={Icon} className={styles["portfolio__link-pic"]} alt="картинка-ссылка" />
            </a>
          </li>
          <li className={styles["portfolio__item"]}>
            <a className={styles["portfolio__link"]} href="https://" target="blank">
              Одностраничное приложение
              <img src={Icon} className={styles["portfolio__link-pic"]} alt="картинка-ссылка" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;
