import React, { useState, useEffect } from 'react';
import styles from './ProfileScreen.module.css';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load user information');
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/orders/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        // Handle error
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className={styles.loader}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.profileScreen}>
      <h1>User Profile</h1>
      <div className={styles.profileContainer}>
        <div className={styles.profileItem}>
          <strong>Name:</strong> {user.name}
        </div>
        <div className={styles.profileItem}>
          <strong>Email:</strong> {user.email}
        </div>
        {/* Add more user information as needed */}
      </div>
      <div className={styles.ordersSection}>
        <h2>My Orders</h2>
        <div className={styles.ordersList}>
          {orders.map(order => (
            <div key={order.id} className={styles.orderItem}>
              <p>Order ID: {order.id}</p>
              <p>Status: {order.status}</p>
              <p>Amount: {order.amount}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;