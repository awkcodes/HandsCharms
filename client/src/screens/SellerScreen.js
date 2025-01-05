import React, { useState } from 'react';
import SellerProductsPanel from '../components/Seller/SellerProductsPanel';
import SellerOrdersPanel from '../components/Seller/SellerOrdersPanel';
import styles from './SellerScreen.module.css';

const SellerScreen = () => {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <div className={styles.sellerScreen}>
      <nav className={styles.sellerNav}>
        <button 
          className={activeTab === 'products' ? styles.active : ''} 
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
        <button 
          className={activeTab === 'orders' ? styles.active : ''} 
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
      </nav>

      <div className={styles.sellerContent}>
        {activeTab === 'products' && <SellerProductsPanel />}
        {activeTab === 'orders' && <SellerOrdersPanel />}
      </div>
    </div>
  );
};

export default SellerScreen;