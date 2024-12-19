import React, { useState } from 'react';
import styles from './AuthForms.module.css';

const AuthForms = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    address: ''  // Add address field
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin && !formData.address) {
      alert('Address is required for registration');
      return;
    }
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        onClose();
      }
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  return (
    <div className={styles.authForms}>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <textarea
              placeholder="Address"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              required
            />
          </>
        )}
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <button 
        className={styles.switchButton}
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? 'Need an account?' : 'Already have an account?'}
      </button>
    </div>
  );
};

export default AuthForms;