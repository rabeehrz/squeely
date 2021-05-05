import React from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';

const Layout = ({ children }) => {
  return (
    <div className="w-screen h-screen flex">
      <Sidebar />
      <main className="p-4 flex flex-col flex-1 bg-gray-fb">
        <Header />
        {children}
      </main>
    </div>
  );
};

export default Layout;
