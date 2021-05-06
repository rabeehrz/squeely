import React from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';

const Layout = ({ children }) => {
  return (
    <div className="w-screen h-screen flex overflow-auto">
      <Sidebar />
      <main className="p-4 flex flex-col flex-1 w-4/5 bg-gray-fb">
        <Header />
        {children}
      </main>
    </div>
  );
};

export default Layout;
