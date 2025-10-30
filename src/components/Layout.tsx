import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { ConnectWallet } from './ConnectWallet';
import { Menu } from 'lucide-react';

export const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-dark-bg">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header>
          <div className="flex items-center justify-between px-4 lg:px-8 py-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-dark-elevated transition-colors"
            >
              <Menu className="w-6 h-6 text-text" />
            </button>

            <div className="flex-1 lg:flex-none" />

            <ConnectWallet />
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-dark-bg">
          <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
