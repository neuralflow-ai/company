
import React, { memo } from 'react';
import Header from './Header';
import Footer from './Footer';

const MainLayout = memo(({ children }: { children: React.ReactNode }) => {
  
  return (
    <div className="min-h-screen flex flex-col bg-dark-purple">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
});

MainLayout.displayName = 'MainLayout';

export default MainLayout;
