//компонент с вёрсткой баннера страницы «О проекте».
import React from 'react';
import logoPromo from "../../../images/logo__promo.svg"
import styles from "./Promo.module.css"
const Promo = () => {
    return (
        <section className={styles["promo"]}>
        <div className={styles["promo__container"]}>
            <div className={styles["promo__list"]}>
                <h1 className={styles["promo__title"]}>
                Учебный проект студента факультета Веб&#8209;разработки.               
                </h1>
                <span className={styles["promo__subtitle"]}>
                Листайте ниже, чтобы узнать больше про этот проект и его создателя.
                </span>
                
                <button className={styles["promo__button"]}>
                    <a href="#about-project" className={styles["promo__link"]}>Узнать больше </a>
                </button>           
            </div>
            <div className={styles["promo__img-block"]}>
                <img className={styles["promo__logo"]} src={logoPromo} alt="Лого" />
                
            </div>
        </div>
        </section>
    );
};

export default Promo;