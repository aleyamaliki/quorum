import { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Edit2, Copy, LogOut, CheckCircle, TrendingUp, TrendingDown, DollarSign, FileText } from 'lucide-react';

interface Activity {
  id: string;
  type: 'vote' | 'stake' | 'withdraw' | 'claim' | 'proposal';
  description: string;
  timestamp: string;
  status: 'success' | 'pending' | 'failed';
}

interface NFTBadge {
  id: string;
  name: string;
  description: string;
  earned: boolean;
  progress?: number;
  total?: number;
}

export const Profile = () => {
  const { isConnected, address, balance, disconnect } = useWallet();
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'badges'>('overview');
  const [username, setUsername] = useState('');
  const [isEditingUsername, setIsEditingUsername] = useState(false);

  const activities: Activity[] = [
    {
      id: '1',
      type: 'vote',
      description: 'Voted FOR on "Increase Pool Rewards by 10%"',
      timestamp: '2025-10-29T14:30:00',
      status: 'success',
    },
    {
      id: '2',
      type: 'stake',
      description: 'Staked 2.5 tokens in SOL-USDC Pool',
      timestamp: '2025-10-28T10:15:00',
      status: 'success',
    },
    {
      id: '3',
      type: 'claim',
      description: 'Claimed 0.0234 rewards from WBTC-SOL Pool',
      timestamp: '2025-10-27T16:45:00',
      status: 'success',
    },
    {
      id: '4',
      type: 'proposal',
      description: 'Created proposal "Add New SOL-MATIC Pool"',
      timestamp: '2025-10-26T09:20:00',
      status: 'success',
    },
    {
      id: '5',
      type: 'withdraw',
      description: 'Withdrew 1.5 tokens from DAI-USDC Pool',
      timestamp: '2025-10-25T13:00:00',
      status: 'success',
    },
  ];

  const badges: NFTBadge[] = [
    {
      id: '1',
      name: 'Early Adopter',
      description: 'One of the first 1000 users',
      earned: true,
    },
    {
      id: '2',
      name: 'Governance Expert',
      description: 'Voted on 10 proposals',
      earned: true,
      progress: 10,
      total: 10,
    },
    {
      id: '3',
      name: 'Liquidity Provider',
      description: 'Stake in 5 different pools',
      earned: false,
      progress: 3,
      total: 5,
    },
    {
      id: '4',
      name: 'Whale',
      description: 'Maintain $10k+ in pools',
      earned: false,
      progress: 4200,
      total: 10000,
    },
    {
      id: '5',
      name: 'Proposal Creator',
      description: 'Create 3 proposals',
      earned: false,
      progress: 1,
      total: 3,
    },
    {
      id: '6',
      name: 'Diamond Hands',
      description: 'Hold stake for 90 days',
      earned: false,
      progress: 23,
      total: 90,
    },
  ];

  const stats = [
    { label: 'Total Votes Cast', value: '15' },
    { label: 'Proposals Created', value: '2' },
    { label: 'Pools Participated', value: '4' },
    { label: 'Total Rewards Earned', value: '0.428 SOL' },
  ];

  const handleSaveUsername = () => {
    if (username.trim()) {
      localStorage.setItem('quorum_username', username);
      setIsEditingUsername(false);
    }
  };

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      alert('Address copied to clipboard!');
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    }
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  const getActivityIcon = (type: Activity['type']) => {
    const icons = {
      vote: <CheckCircle className="w-5 h-5" />,
      stake: <TrendingUp className="w-5 h-5" />,
      withdraw: <TrendingDown className="w-5 h-5" />,
      claim: <DollarSign className="w-5 h-5" />,
      proposal: <FileText className="w-5 h-5" />,
    };
    return icons[type];
  };

  const getActivityColor = (type: Activity['type']) => {
    const colors = {
      vote: 'bg-accent-cyan/20 text-accent-cyan',
      stake: 'bg-accent-green/20 text-accent-green',
      withdraw: 'bg-accent-red/20 text-accent-red',
      claim: 'bg-accent-purple/20 text-accent-purple',
      proposal: 'bg-accent-orange/20 text-accent-orange',
    };
    return colors[type];
  };

  if (!isConnected) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bento-card rounded-2xl p-12 text-center mt-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <User className="w-16 h-16 mx-auto text-text-muted mb-4" />
        </motion.div>
        <h3 className="text-xl font-semibold text-white mb-2">Wallet Not Connected</h3>
        <p className="text-text-muted">Connect your wallet to view your profile</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-accent-purple/80 via-accent-purple/60 to-accent-purple/40 rounded-3xl p-8 text-white shadow-2xl"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-4xl font-bold border border-white/30"
          >
            {username ? username.charAt(0).toUpperCase() : address?.charAt(2).toUpperCase()}
          </motion.div>
          <div className="flex-1">
            {isEditingUsername ? (
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="px-4 py-2 rounded-xl text-text bg-dark-elevated border border-dark-border focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  onClick={handleSaveUsername}
                  className="px-5 py-2 glass-card rounded-xl hover:bg-white/30 transition-colors font-medium"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditingUsername(false)}
                  className="px-5 py-2 glass-card rounded-xl hover:bg-white/20 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-3xl font-bold">{username || 'Anonymous User'}</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsEditingUsername(true)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <Edit2 className="w-5 h-5" />
                </motion.button>
              </div>
            )}
            <div className="flex items-center gap-2 mb-4">
              <code className="text-sm font-mono bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">{address}</code>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCopyAddress}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Copy className="w-5 h-5" />
              </motion.button>
            </div>
            <div className="flex items-center gap-6">
              <div>
                <p className="text-white/80 text-sm">Balance</p>
                <p className="text-2xl font-bold font-tabular">{balance} SOL</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={disconnect}
                className="px-5 py-2 glass-card bg-accent-red/80 backdrop-blur-md hover:bg-accent-red/60 rounded-xl transition-all font-medium text-sm flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Disconnect
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bento-card rounded-2xl p-6 hover-glow"
          >
            <p className="text-text-muted text-sm mb-2">{stat.label}</p>
            <p className="text-3xl font-bold text-white font-tabular">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="bento-card rounded-2xl overflow-hidden"
      >
        <div className="border-b border-dark-border">
          <div className="flex relative">
            <button
              onClick={() => setActiveTab('overview')}
              className={`relative flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'text-accent-purple'
                  : 'text-text-muted hover:text-white'
              }`}
            >
              Overview
              {activeTab === 'overview' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-purple"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`relative flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'activity'
                  ? 'text-accent-purple'
                  : 'text-text-muted hover:text-white'
              }`}
            >
              Activity History
              {activeTab === 'activity' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-purple"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('badges')}
              className={`relative flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'badges'
                  ? 'text-accent-purple'
                  : 'text-text-muted hover:text-white'
              }`}
            >
              Badges
              {activeTab === 'badges' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-purple"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          </div>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <h3 className="text-2xl font-semibold text-white mb-6">Account Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="glass-card rounded-xl p-6 hover-glow"
                  >
                    <p className="text-text-muted text-sm mb-2">Voting Power</p>
                    <p className="text-4xl font-bold text-accent-purple font-tabular">1,250</p>
                    <p className="text-text-muted text-xs mt-2">Based on your staked tokens</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="glass-card rounded-xl p-6 hover-glow"
                  >
                    <p className="text-text-muted text-sm mb-2">Member Since</p>
                    <p className="text-2xl font-bold text-accent-cyan">October 2025</p>
                    <p className="text-text-muted text-xs mt-2">30 days ago</p>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {activeTab === 'activity' && (
              <motion.div
                key="activity"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                <h3 className="text-2xl font-semibold text-white mb-6">Recent Activity</h3>
                {activities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ x: 5, scale: 1.02 }}
                    className="flex items-start gap-4 p-5 glass-card rounded-xl hover:bg-dark-elevated transition-colors"
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium mb-1">{activity.description}</p>
                      <p className="text-text-muted text-sm">{formatTimestamp(activity.timestamp)}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      activity.status === 'success' ? 'bg-accent-green/20 text-accent-green' :
                      activity.status === 'pending' ? 'bg-accent-orange/20 text-accent-orange' :
                      'bg-accent-red/20 text-accent-red'
                    }`}>
                      {activity.status}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'badges' && (
              <motion.div
                key="badges"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <h3 className="text-2xl font-semibold text-white mb-6">Achievement Badges</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {badges.map((badge, index) => (
                    <motion.div
                      key={badge.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ y: -5, scale: 1.05 }}
                      className={`rounded-2xl p-6 transition-all hover-glow ${
                        badge.earned
                          ? 'bg-gradient-to-br from-accent-purple/30 to-accent-cyan/20 border-2 border-accent-purple/50'
                          : 'glass-card opacity-60'
                      }`}
                    >
                      <div className="text-5xl mb-4">{badge.earned ? '🏆' : '🔒'}</div>
                      <h4 className="text-lg font-bold text-white mb-2">{badge.name}</h4>
                      <p className="text-text-muted text-sm mb-4">{badge.description}</p>
                      {!badge.earned && badge.progress !== undefined && badge.total !== undefined && (
                        <div>
                          <div className="flex items-center justify-between text-xs text-text-muted mb-2">
                            <span>Progress</span>
                            <span className="font-semibold font-tabular">{badge.progress}/{badge.total}</span>
                          </div>
                          <div className="w-full glass-card rounded-full h-2 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(badge.progress / badge.total) * 100}%` }}
                              transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                              className="bg-gradient-to-r from-accent-purple via-accent-purple/80 to-accent-purple backdrop-blur-sm h-2 rounded-full shadow-lg shadow-accent-purple/50"
                            />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
