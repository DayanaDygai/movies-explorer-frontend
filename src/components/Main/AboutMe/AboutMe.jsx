//компонент с информацией о студенте.

import React from 'react';
import PhotoAboutMe from '../../../images/photo_about-me.svg';
import styles from './AboutMe.module.css';

function AboutMe() {
  return (
    <section className={styles["about-me"]}>
      <div className={styles["about-me__container"]}>
        <h2 className={styles["about-me__section-title"]}>Студент</h2>
        <article className={styles["about-me__card"]}>
          <div className={styles["about-me__data"]}>
            <div className={styles["about-me__text"]}>
              <p className={styles["about-me__title"]}>Виталий</p>
              <p className={styles["about-me__subtitle"]}>
                Фронтенд-разработчик, 30 лет
              </p>
              <p className={styles["about-me__description"]}>
                Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
                и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. 
                С 2015 года работал в компании «СКБ Контур». После того, 
                как прошёл курс по веб&#8209;разработке, начал заниматься фриланс&#8209;заказами и 
                ушёл с постоянной работы.
              </p>
            </div>
            <address className={styles["about-me__contacts"]}>
              <a
                className={styles["about-me__link"]}
                href="https://github.com/DayanaDygai"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </address>
          </div>
          <picture>
            <img
              className={styles["about-me__photo"]}
              src={PhotoAboutMe}
              alt="фото"
            />
          </picture>
        </article>
      </div>
    </section>
  );
}

export default AboutMe;
