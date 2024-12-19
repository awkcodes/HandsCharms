import React, { useState } from 'react';
import styles from './OrderModal.module.css';

const OrderModal = ({ product, onClose, onSubmit }) => {
  const [orderData, setOrderData] = useState({
    amount: 1,
    address: '',
    phoneNumber: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(orderData);
  };

  return (
    <div className={styles.modal}>
      <h2>Place Order</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Quantity:</label>
          <input
            type="number"
            min="1"
            max={product.quantity}
            value={orderData.amount}
            onChange={(e) => setOrderData({...orderData, amount: parseInt(e.target.value)})}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Delivery Address:</label>
          <textarea
            value={orderData.address}
            onChange={(e) => setOrderData({...orderData, address: e.target.value})}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Phone Number:</label>
          <input
            type="tel"
            value={orderData.phoneNumber}
            onChange={(e) => setOrderData({...orderData, phoneNumber: e.target.value})}
          />
        </div>
        <div className={styles.buttons}>
          <button type="submit">Confirm Order</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default OrderModal;