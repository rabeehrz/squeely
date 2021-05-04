import React from 'react';
import Sidebar from '../Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="w-screen h-screen flex">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
