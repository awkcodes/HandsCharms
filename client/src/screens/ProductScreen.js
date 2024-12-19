import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ProductScreen.module.css';
import OrderModal from '../components/Order/OrderModal';

const ProductScreen = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load product');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleOrder = async (orderData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: product.id,
          ...orderData
        })
      });
      if (response.ok) {
        setShowOrderModal(false);
        // Show success message
      }
    } catch (error) {
      // Handle error
    }
  };

  if (loading) return <div className={styles.loader}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!product) return <div className={styles.error}>Product not found</div>;

  return (
    <div className={styles.productScreen}>
      <div className={styles.productContainer}>
        <div className={styles.imageSection}>
          <img src={product.image} alt={product.name} />
        </div>
        
        <div className={styles.detailsSection}>
          <h1>{product.name}</h1>
          <p className={styles.category}>{product.category}</p>
          <div className={styles.price}>
            ${product.price}
            {product.discount && (
              <span className={styles.discount}>
                ${(product.price * (1 - product.discount)).toFixed(2)}
              </span>
            )}
          </div>
          <p className={styles.description}>{product.description}</p>
          <button className={styles.addToCartBtn}>Add to Cart</button>
          <button onClick={() => setShowOrderModal(true)}>Order Now</button>
        </div>
      </div>
      {showOrderModal && (
        <OrderModal
          product={product}
          onClose={() => setShowOrderModal(false)}
          onSubmit={handleOrder}
        />
      )}
    </div>
  );
};

export default ProductScreen;