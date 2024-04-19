import React from 'react';

import styles from './AboutProject.module.css';

function AboutProject() {
  return (
    <section id="about-project" className={styles['about-project']}>
      <div className={styles['about-project__container']}>
        <h2 className={styles['about-project__title']}>О проекте</h2>
        <ul className={styles['about-project__notes']}>
          <li className={styles['about-project__note']}>
            <p className={styles['about-project__note-title']}>
              Дипломный проект включал 5 этапов
            </p>
            <p className={styles['about-project__note-text']}>
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </li>
          <li className={styles['about-project__note']}>
            <p className={styles['about-project__note-title']}>
              На выполнение диплома ушло 5 недель
            </p>
            <p className={styles['about-project__note-text']}>
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <ul className={styles['about-project__deadline']}>
          <li className={styles['about-project__deadline-item']}>1 неделя</li>
          <li className={styles['about-project__deadline-item']}>4 недели</li>
        </ul>
      </div>
    </section>
  );
}

export default AboutProject;
