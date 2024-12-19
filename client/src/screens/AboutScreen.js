import React from 'react';
import styles from './AboutScreen.module.css';

const AboutScreen = () => {
  return (
    <div className={styles.about}>
      <section className={styles.welcome}>
        <h1>Welcome to Hands Charms</h1>
        <p>Where each piece of jewelry holds a story within its delicate craftsmanship.</p>
      </section>

      <section className={styles.story}>
        <div className={styles.content}>
          <h2>Our Story</h2>
          <p>Nature's beauty, cultural influences, and the whispers of imagination inspire our collections. 
             Every piece is meticulously crafted, embodying the essence of creativity and individuality.</p>
          <p>We believe in the power of handmade creations to bring joy and meaning to everyday moments. 
             Each item in our collection is thoughtfully designed and carefully crafted with love.</p>
        </div>
      </section>

      <section className={styles.values}>
        <div className={styles.valueItem}>
          <h3>Craftsmanship</h3>
          <p>Dedicated to excellence in every detail</p>
        </div>
        <div className={styles.valueItem}>
          <h3>Sustainability</h3>
          <p>Committed to ethical practices and materials</p>
        </div>
        <div className={styles.valueItem}>
          <h3>Uniqueness</h3>
          <p>Each piece tells its own special story</p>
        </div>
      </section>
    </div>
  );
};

export default AboutScreen;