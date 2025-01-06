import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main style={{ marginTop: '80px' }}>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;