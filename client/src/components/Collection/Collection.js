import React from 'react';
import styles from './Collection.module.css';
import Ring from '../../assets/images/collection/ring.jpg';
import Necklace from '../../assets/images/collection/necklace.jpg';
import Bracelet from '../../assets/images/collection/bracelet.jpg';
import KeyRing from '../../assets/images/collection/keyring.jpg';
import PhoneHanger from '../../assets/images/collection/setphone.jpg';

const Collection = () => {
  const items = [
    { name: 'Rings', image: Ring },
    { name: 'Necklaces', image: Necklace },
    { name: 'Bracelets', image: Bracelet },
    { name: 'Key-rings', image: KeyRing },
    { name: 'Phone Hangers', image: PhoneHanger },
  ];

  return (
    <section className={styles.collection}>
      <div className={styles.container}>
        {items.map((item, index) => (
          <div key={index} className={styles.item}>
            <div className={styles.imageWrapper}>
              <img src={item.image} alt={item.name} />
            </div>
            <h3>{item.name}</h3>
            <button className={styles.discoverButton}>Discover</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Collection;