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
    fetchProduct();
  }, [id]);

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

  const handleOrder = async (e, orderData) => {
    e.preventDefault();
    try {
      // Check if user is logged in
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to place an order');
        return;
      }

      // Check product availability
      if (product.quantity < orderData.amount) {
        alert('Product quantity not available');
        return;
      }

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

      const data = await response.json();

      if (response.ok) {
        setShowOrderModal(false);
        alert('Order placed successfully!');
        // Optional: Refresh product data to show updated quantity
        fetchProduct();
      } else {
        throw new Error(data.message || 'Failed to place order');
      }
    } catch (error) {
      console.error('Order error:', error);
      alert(error.message || 'Failed to place order');
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
          <button 
            className={styles.orderButton}
            onClick={() => setShowOrderModal(true)}
          >
            Order Now
          </button>
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