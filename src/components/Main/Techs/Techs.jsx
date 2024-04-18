//компонент с использованными технологиями.
import React from 'react';
import styles from './Techs.module.css';

function Techs() {
  return (
    <section className={styles['techs']}>
      <div className={styles['techs__container']}>
        <h2 className={styles['techs__section-title']}>Технологии</h2>
        <p className={styles['techs__title']}>7 технологий</p>
        <p className={styles['techs__subtitle']}>
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className={styles['techs__list']}>
          <li className={styles['techs__item']}>HTML</li>
          <li className={styles['techs__item']}>CSS</li>
          <li className={styles['techs__item']}>JS</li>
          <li className={styles['techs__item']}>React</li>
          <li className={styles['techs__item']}>Git</li>
          <li className={styles['techs__item']}>Express.js</li>
          <li className={styles['techs__item']}>mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
