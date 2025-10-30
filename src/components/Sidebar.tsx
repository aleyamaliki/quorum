import { useState, useCallback, type ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Box, ClipboardCheck, User, X, Search, TrendingUp } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';

interface NavItem {
  name: string;
  path: string;
  icon: ReactElement;
}

const navItems: NavItem[] = [
  {
    name: 'Home',
    path: '/',
    icon: <Home className="w-4 h-4" />,
  },
  {
    name: 'Pools',
    path: '/pools',
    icon: <Box className="w-4 h-4" />,
  },
  {
    name: 'Votes',
    path: '/votes',
    icon: <ClipboardCheck className="w-4 h-4" />,
  },
  {
    name: 'Results',
    path: '/results',
    icon: <TrendingUp className="w-4 h-4" />,
  },
  {
    name: 'Profile',
    path: '/profile',
    icon: <User className="w-4 h-4" />,
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const { isConnected, balance } = useWallet();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<NavItem[]>([]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);

    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    const results = navItems.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
  }, []);

  const itemsToDisplay = searchQuery.trim() !== '' ? searchResults : navItems;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-4 left-4 lg:ml-4 lg:mr-0 lg:relative lg:left-0 lg:h-[calc(100vh-2rem)] z-50 w-56 glass-float rounded-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo and close button */}
          <div className="flex items-center justify-between p-4 border-b border-dark-border">
            <img src="/src/assets/img/logo.png" width={120} className="mx-auto" />
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-dark-elevated transition-colors"
            >
              <X className="w-5 h-5 text-text-muted" />
            </button>
          </div>

          {/* Search bar */}
          <div className="p-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-3 py-2 pl-9 pr-9 text-sm rounded-lg border border-dark-border bg-dark-elevated backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-transparent transition-all text-text"
              />
              <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-2.5 top-1/2 transform -translate-y-1/2 p-1 hover:bg-dark-border rounded-full transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-text-muted" />
                </button>
              )}
            </div>
            {searchQuery.trim() !== '' && searchResults.length === 0 && (
              <p className="mt-2 text-sm text-text-muted">No results found</p>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 pb-3 overflow-y-auto">
            <ul className="space-y-1">
              {itemsToDisplay.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className={`flex items-center gap-2.5 px-3 py-2.5 text-sm rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-accent-purple/20 text-accent-purple font-semibold'
                          : 'text-text-muted hover:bg-dark-elevated hover:text-white'
                      }`}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer - Wallet Stats */}
          <div className="p-3 border-t border-dark-border">
            {isConnected ? (
              <div className="space-y-2">
                <div className="glass-card rounded-lg p-3">
                  <p className="text-xs text-text-muted mb-1">Wallet</p>
                  <p className="text-sm font-bold text-white font-tabular">${(parseFloat(balance || '0') * 2500).toLocaleString()}</p>
                </div>
                <div className="glass-card rounded-lg p-3">
                  <p className="text-xs text-text-muted mb-1">JUP</p>
                  <p className="text-sm font-bold text-accent-cyan font-tabular">1,234</p>
                </div>
                <div className="glass-card rounded-lg p-3">
                  <p className="text-xs text-text-muted mb-1">Theta Drip</p>
                  <p className="text-sm font-bold text-accent-green font-tabular">$15/wk</p>
                </div>
              </div>
            ) : (
              <div className="text-xs text-text-muted text-center">
                <p className="font-medium text-white">Quorum</p>
                <p className="text-[10px] mt-0.5 opacity-75">v1.0.0</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
