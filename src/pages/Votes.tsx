import { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

interface Proposal {
  id: string;
  dao: string;
  title: string;
  description: string;
  quorum: number;
  stakeWeight: number;
  timestamp: string;
}

type Tab = 'feed' | 'theta' | 'alerts';

const initialProposals: Proposal[] = [
  {
    id: '1',
    dao: 'Jupiter',
    title: 'Burn 20% Treasury',
    description: 'Burn 20% of treasury for buyback',
    quorum: 45,
    stakeWeight: 0.1,
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    dao: 'Hyper',
    title: 'Expand Liquidity',
    description: 'Add $1M liquidity to main pool',
    quorum: 67,
    stakeWeight: 0.2,
    timestamp: '5 hours ago',
  },
  {
    id: '3',
    dao: 'Scroll',
    title: 'Protocol Upgrade',
    description: 'Upgrade to V2 with gas optimizations',
    quorum: 23,
    stakeWeight: 0.05,
    timestamp: '1 day ago',
  },
];

const alerts = [
  { id: '1', type: 'success', message: 'Quorum Hit! +2% Odds', timestamp: '5m ago' },
  { id: '2', type: 'info', message: 'Drip Vested: +$4.75', timestamp: '1h ago' },
  { id: '3', type: 'warning', message: 'Jupiter vote ending soon', timestamp: '3h ago' },
];

export const Votes = () => {
  const { isConnected } = useWallet();
  const [activeTab, setActiveTab] = useState<Tab>('feed');
  const [proposals] = useState<Proposal[]>(initialProposals);
  const [selectedProposals, setSelectedProposals] = useState<Set<string>>(new Set());

  // Theta metrics
  const dripRate = 9.5;
  const deltaValue = 0.4;
  const ivValue = 35;
  const rollStatus = 'Profitable';

  const handleVote = (proposalId: string, vote: 'yes' | 'no') => {
    console.log(`Voted ${vote} on proposal ${proposalId}`);
  };

  const handleBatchVote = () => {
    console.log('Batch voting on:', Array.from(selectedProposals));
  };

  const toggleProposalSelect = (id: string) => {
    const newSelected = new Set(selectedProposals);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedProposals(newSelected);
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-white">Vote & Monitor</h1>
        <p className="text-text-muted mt-2">Track proposals and manage theta positions</p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bento-card rounded-2xl overflow-hidden"
      >
        <div className="flex border-b border-dark-border">
          {[
            { key: 'feed' as Tab, label: 'Vote Feed' },
            { key: 'theta' as Tab, label: 'Theta Dash' },
            { key: 'alerts' as Tab, label: 'Alerts' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === tab.key ? 'text-accent-purple' : 'text-text-muted hover:text-white'
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-purple"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {!isConnected ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bento-card rounded-2xl p-12 text-center"
        >
          <CheckCircle className="w-16 h-16 mx-auto text-text-muted mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Wallet Not Connected</h3>
          <p className="text-text-muted">Connect your wallet to view and vote on proposals</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-[600px_1fr] gap-6">
          {/* Left: Content Area */}
          <div>
            <AnimatePresence mode="wait">
              {activeTab === 'feed' && (
                <motion.div
                  key="feed"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {selectedProposals.size > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-accent-purple/10 border border-accent-purple/20 rounded-xl p-4 flex items-center justify-between"
                    >
                      <span className="text-sm text-accent-purple font-semibold">
                        {selectedProposals.size} proposal(s) selected
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleBatchVote}
                        className="px-4 py-2 glass-card bg-accent-purple/80 backdrop-blur-md text-white rounded-lg hover:bg-accent-purple/60 transition-all font-medium text-sm shadow-lg shadow-accent-purple/30"
                      >
                        Batch All
                      </motion.button>
                    </motion.div>
                  )}

                  {proposals.map((proposal, index) => (
                    <motion.div
                      key={proposal.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="bento-card rounded-2xl p-5 hover-glow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <input
                              type="checkbox"
                              checked={selectedProposals.has(proposal.id)}
                              onChange={() => toggleProposalSelect(proposal.id)}
                              className="w-4 h-4 text-accent-purple rounded focus:ring-2 focus:ring-accent-purple bg-dark-elevated border-dark-border"
                            />
                            <h3 className="text-lg font-bold text-white">{proposal.dao} - {proposal.title}</h3>
                          </div>
                          <p className="text-sm text-text-muted mb-2 ml-7">"{proposal.description}"</p>
                          <p className="text-xs text-text-muted ml-7">{proposal.timestamp}</p>
                        </div>
                      </div>

                      {/* Quorum Progress */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-text-muted">Quorum</span>
                          <span className="font-semibold text-white font-tabular">{proposal.quorum}%</span>
                        </div>
                        <div className="w-full glass-card rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${proposal.quorum}%` }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`h-2 rounded-full transition-all duration-500 backdrop-blur-sm shadow-lg ${
                              proposal.quorum >= 50
                                ? 'bg-gradient-to-r from-accent-green via-accent-green/80 to-accent-green shadow-accent-green/50'
                                : 'bg-gradient-to-r from-accent-orange via-accent-orange/80 to-accent-orange shadow-accent-orange/50'
                            }`}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-text-muted">
                          Stake Weight: <span className="font-semibold text-white font-tabular">{proposal.stakeWeight}%</span>
                        </span>
                      </div>

                      {/* Vote Buttons */}
                      <div className="flex gap-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleVote(proposal.id, 'yes')}
                          className="flex-1 px-4 py-3 glass-card bg-accent-green/80 backdrop-blur-md text-white rounded-xl hover:bg-accent-green/60 transition-all font-medium"
                        >
                          Yes
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleVote(proposal.id, 'no')}
                          className="flex-1 px-4 py-3 glass-card bg-accent-red/80 backdrop-blur-md text-white rounded-xl hover:bg-accent-red/60 transition-all font-medium"
                        >
                          No
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'theta' && (
                <motion.div
                  key="theta"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="bento-card rounded-2xl p-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Theta Dashboard</h2>
                  <p className="text-text-muted">Detailed theta metrics and position management coming soon...</p>
                </motion.div>
              )}

              {activeTab === 'alerts' && (
                <motion.div
                  key="alerts"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  {alerts.map((alert, index) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`bento-card rounded-2xl p-4 flex items-center gap-4 ${
                        alert.type === 'success'
                          ? 'border-accent-green/20'
                          : alert.type === 'warning'
                          ? 'border-accent-orange/20'
                          : 'border-accent-cyan/20'
                      }`}
                    >
                      <AlertCircle
                        className={`w-6 h-6 ${
                          alert.type === 'success'
                            ? 'text-accent-green'
                            : alert.type === 'warning'
                            ? 'text-accent-orange'
                            : 'text-accent-cyan'
                        }`}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white">{alert.message}</p>
                        <p className="text-xs text-text-muted">{alert.timestamp}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Theta Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bento-card rounded-2xl p-6 space-y-5"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Theta Panel</h2>

            {/* Drip Counter */}
            <div className="bg-accent-green/10 border border-accent-green/20 rounded-xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-muted mb-1">Drip Counter</p>
                  <p className="text-3xl font-bold text-accent-green font-tabular">${dripRate}/wk</p>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-5 h-5 rounded-full bg-accent-green"
                />
              </div>
            </div>

            {/* Delta Gauge */}
            <div className="glass-card rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-text-muted">Delta Gauge</span>
                <span className="text-2xl font-bold text-accent-purple font-tabular">{deltaValue}</span>
              </div>
              <div className="w-full glass-card rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-accent-purple via-accent-purple/80 to-accent-purple backdrop-blur-sm h-3 rounded-full shadow-lg shadow-accent-purple/50"
                  style={{ width: `${(deltaValue / 1) * 100}%` }}
                />
              </div>
              <p className="text-xs text-text-muted mt-2">Mild Bullish Exposure</p>
            </div>

            {/* IV Bar */}
            <div className="glass-card rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-text-muted">Implied Volatility</span>
                <span className="text-2xl font-bold text-white font-tabular">{ivValue}%</span>
              </div>
              <div className="w-full glass-card rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-purple backdrop-blur-sm h-3 rounded-full shadow-lg shadow-accent-purple/50"
                  style={{ width: `${ivValue}%` }}
                />
              </div>
            </div>

            {/* Roll Status */}
            <div className="bg-gradient-to-br from-accent-purple/10 to-accent-cyan/10 border border-accent-purple/20 rounded-xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-muted mb-1">Roll Status</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xl font-bold text-accent-green">{rollStatus}</p>
                    <CheckCircle className="w-5 h-5 text-accent-green" />
                  </div>
                </div>
              </div>
            </div>

            {/* Auto-Roll Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-4 glass-card bg-accent-green/80 backdrop-blur-md text-white rounded-xl hover:bg-accent-green/60 transition-all font-semibold flex items-center justify-center gap-2"
            >
              <TrendingUp className="w-5 h-5" />
              Auto-Roll Now
            </motion.button>

            {/* Alerts Section */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-semibold text-white">Recent Alerts</h3>
              {alerts.slice(0, 2).map((alert) => (
                <div
                  key={alert.id}
                  className="glass-card rounded-xl p-3"
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      alert.type === 'success' ? 'bg-accent-green' :
                      alert.type === 'warning' ? 'bg-accent-orange' :
                      'bg-accent-cyan'
                    }`} />
                    <p className="text-xs font-semibold text-white">{alert.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
