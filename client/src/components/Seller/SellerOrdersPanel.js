import React, { useState, useEffect } from 'react';
import { sellerAPI } from '../../services/api';
import styles from './SellerPanels.module.css';

const SellerOrdersPanel = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await sellerAPI.getOrders();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error('Fetch error:', error.response?.data || error.message);
        setError(error.response?.data?.message || 'Failed to fetch orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.panel}>
      <h2>Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Customer</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.product.name}</td>
              <td>{order.amount}</td>
              <td>{order.user.name}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellerOrdersPanel;