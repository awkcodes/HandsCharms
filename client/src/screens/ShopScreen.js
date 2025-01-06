import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import { Link } from 'react-router-dom';
import styles from './ShopScreen.module.css';
import { FaSearch } from 'react-icons/fa';

const ShopScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await getProducts();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter(product => category === 'all' || product.category === category)
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  if (loading) return <div className={styles.loader}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.shopScreen}>
      <div className={styles.shopHeader}>
        <h1>Our Collection</h1>
        <div className={styles.filters}>
          <div className={styles.searchBar}>
            <FaSearch />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className={styles.categories}>
            <button 
              className={category === 'all' ? styles.active : ''}
              onClick={() => setCategory('all')}
            >
              All
            </button>
            <button 
              className={category === 'ring' ? styles.active : ''}
              onClick={() => setCategory('ring')}
            >
              Rings
            </button>
            <button 
              className={category === 'necklace' ? styles.active : ''}
              onClick={() => setCategory('necklace')}
            >
              Necklaces
            </button>
            <button 
              className={category === 'bracelet' ? styles.active : ''}
              onClick={() => setCategory('bracelet')}
            >
              Bracelets
            </button>
            <button 
              className={category === 'key-ring' ? styles.active : ''}
              onClick={() => setCategory('key-ring')}
            >
              Key Rings
            </button>
            <button 
              className={category === 'phone-hanger' ? styles.active : ''}
              onClick={() => setCategory('phone-hanger')}
            >
              Phone Hangers
            </button>
          </div>
        </div>
      </div>

      <div className={styles.productsGrid}>
        {filteredProducts.map(product => (
          <Link to={`/product/${product.id}`} key={product.id} className={styles.productCard}>
            <div className={styles.imageContainer}>
              <img src={product.image} alt={product.name} />
            </div>
            <div className={styles.productInfo}>
              <h3>{product.name}</h3>
              <p className={styles.price}>${product.price}</p>
              <button className={styles.viewButton}>View Details</button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShopScreen;