import React from 'react';
import styles from './Banner.module.css';

const Banner = () => {
  return (
    <section className={styles.banner}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Handcrafted <br /> & Ethically Sourced
        </h1>
        <p className={styles.subtitle}>
          It implies a sense of crafted elegance and unique pieces.
        </p>
        <button className={styles.exploreButton}>
          Explore
        </button>
      </div>
    </section>
  );
};

export default Banner;