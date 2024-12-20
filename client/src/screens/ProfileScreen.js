import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileScreen.module.css';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

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
        const userId = localStorage.getItem('userId');
        
        if (!userId) {
          throw new Error('User ID not found');
        }

        const response = await fetch(`/api/orders/user`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(err.message);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/');
    window.location.reload();
  };

  if (loading) return <div className={styles.loader}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.profileScreen}>
      <div className={styles.profileContainer}>
        <h2>Profile Information</h2>
        {user && (
          <div className={styles.profileInfo}>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </div>
        )}
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