import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.name} />
      <div className={styles.content}>
        <h3>{product.name}</h3>
        <p className={styles.price}>${product.price}</p>
        <Link to={`/product/${product._id}`} className={styles.button}>
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;