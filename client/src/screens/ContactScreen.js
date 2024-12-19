import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import styles from './ContactScreen.module.css';

const ContactScreen = () => {
  return (
    <div className={styles.contactPage}>
      <div className={styles.header}>
        <h1>Get in Touch</h1>
        <p>We'd love to hear from you!</p>
      </div>

      <div className={styles.contactGrid}>
        <div className={styles.infoSection}>
          <div className={styles.infoCard}>
            <FaPhone className={styles.icon} />
            <h3>Phone</h3>
            <p>+1 (555) 123-4567</p>
          </div>
          <div className={styles.infoCard}>
            <FaEnvelope className={styles.icon} />
            <h3>Email</h3>
            <p>info@handscharms.com</p>
          </div>
          <div className={styles.infoCard}>
            <FaMapMarkerAlt className={styles.icon} />
            <h3>Location</h3>
            <p>123 Craft Street</p>
            <p>Artisan District, NY 10001</p>
          </div>
        </div>

        <form className={styles.contactForm}>
          <h2>Send us a Message</h2>
          <div className={styles.formGroup}>
            <input type="text" placeholder="Your Name" />
          </div>
          <div className={styles.formGroup}>
            <input type="email" placeholder="Your Email" />
          </div>
          <div className={styles.formGroup}>
            <input type="text" placeholder="Subject" />
          </div>
          <div className={styles.formGroup}>
            <textarea placeholder="Your Message" rows="5"></textarea>
          </div>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactScreen;