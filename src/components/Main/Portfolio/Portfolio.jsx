import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../images/icon__link.svg';
import styles from './Portfolio.module.css';

function Portfolio() {
  return (
    <section className={styles['portfolio']}>
      <div className={styles['portfolio__container']}>
        <h3 className={styles['portfolio__title']}>Портфолио</h3>
        <ul className={styles['portfolio__list']}>
          <li className={styles['portfolio__item']}>
            <Link
              className={styles['portfolio__link']}
              to="https://dayanadygai.github.io/mesto/"
              target="blank"
            >
              Статичный сайт
              <img
                src={Icon}
                className={styles['portfolio__link-pic']}
                alt="картинка-ссылка"
              />
            </Link>
          </li>
          <li className={styles['portfolio__item']}>
            <Link
              className={styles['portfolio__link']}
              to="https://dayanadygai.github.io/mesto/"
              target="blank"
            >
              Адаптивный сайт
              <img
                src={Icon}
                className={styles['portfolio__link-pic']}
                alt="картинка-ссылка"
              />
            </Link>
          </li>
          <li className={styles['portfolio__item']}>
            <Link
              className={styles['portfolio__link']}
              to="https://github.com/DayanaDygai/react-mesto-api-full-gha.git"
              target="blank"
            >
              Одностраничное приложение
              <img
                src={Icon}
                className={styles['portfolio__link-pic']}
                alt="картинка-ссылка"
              />
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;
