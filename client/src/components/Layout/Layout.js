import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main style={{ marginTop: '80px' }}>
        {children}
      </main>
    </>
  );
};

export default Layout;