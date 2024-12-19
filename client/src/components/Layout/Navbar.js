import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import styles from './Navbar.module.css';
import Logo from '../../assets/images/Logo.png';
import Modal from '../Modal/Modal';
import AuthForms from '../Auth/AuthForms';
import { useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.logoContainer}>
          <img src={Logo} alt="Handmade Store" className={styles.logo} />
        </Link>

        <button className={styles.menuButton} onClick={toggleMenu}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        <div className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
          <Link to="/about" onClick={toggleMenu}>About</Link>
          <Link to="/shop" onClick={toggleMenu}>Shop</Link>
          <Link to="/contact" onClick={toggleMenu}>Contact</Link>
          {isLoggedIn ? (
            <Link to="/profile" className={styles.profileIcon} onClick={toggleMenu}>
              <FaUserCircle size={24} />
            </Link>
          ) : (
            <button onClick={() => setIsAuthOpen(true)} className={styles.loginBtn}>
              Login / Register
            </button>
          )}
        </div>
      </div>
      <Modal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)}>
        <AuthForms onClose={() => setIsAuthOpen(false)} />
      </Modal>
    </nav>
  );
};

export default Navbar;