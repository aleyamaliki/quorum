import { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Scan {
  id: string;
  dao: string;
  odds: number;
  dripRate: string;
  stakeRequired: number;
  expectedRoi: number;
}

const scans: Scan[] = [
  { id: '1', dao: 'Jupiter', odds: 72, dripRate: '$9/wk', stakeRequired: 1000, expectedRoi: 13.5 },
  { id: '2', dao: 'Hyper', odds: 65, dripRate: '$7/wk', stakeRequired: 1000, expectedRoi: 11.2 },
  { id: '3', dao: 'Scroll', odds: 58, dripRate: '$6/wk', stakeRequired: 1000, expectedRoi: 9.8 },
];

export const Home = () => {
  const { isConnected } = useWallet();
  const [selectedScan, setSelectedScan] = useState<Scan | null>(null);

  const totalValue = 49825.82;
  const totalChange = 1.9;
  const totalChangeValue = 747.29;

  return (
    <div className="space-y-8 p-6">
      {/* Evaluation Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-muted mb-1">Total Treasury DAO</p>
            <div className="flex items-center gap-3">
              <h1 className="text-5xl font-bold text-white font-tabular">
                ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h1>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded text-sm font-semibold ${totalChange >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {totalChange >= 0 ? '↑' : '↓'} {Math.abs(totalChange)}%
                </span>
                <span className={`text-sm font-semibold ${totalChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  ${totalChangeValue}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-text-muted">Strong performance</span>
            </div>
          </div>
          <select className="px-4 py-2 bg-dark-elevated border border-dark-border rounded-lg text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-accent-purple">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 24 hours</option>
          </select>
        </div>

        {/* Chart - Simplified */}
        <div className="bento-card rounded-2xl p-6 h-48 relative overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 800 150" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Gradient fill area - closed path from bottom */}
            <path
              d="M 0 150 L 0 100 Q 50 90, 100 95 T 200 85 T 300 50 T 400 60 T 500 45 T 600 55 T 700 40 T 800 30 L 800 150 Z"
              fill="url(#chartGradient)"
              stroke="none"
            />
            {/* Line on top */}
            <path
              d="M 0 100 Q 50 90, 100 95 T 200 85 T 300 50 T 400 60 T 500 45 T 600 55 T 700 40 T 800 30"
              fill="none"
              stroke="#a855f7"
              strokeWidth="2"
            />
          </svg>
          <div className="absolute bottom-4 left-6 text-xs text-text-muted">10-25</div>
          <div className="absolute bottom-4 right-6 text-xs text-text-muted">11-20</div>
        </div>

        {/* Stats Grid */}
        {/* <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-text-muted mb-1">Total profit</p>
            <p className="text-2xl font-bold text-green-400">+$6,801.19</p>
            <p className="text-sm text-text-muted">+15.81%</p>
          </div>
          <div>
            <p className="text-sm text-text-muted mb-1">Avg. monthly growing</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-red-400">-1.34%</p>
              <TrendingDown className="w-5 h-5 text-red-400" />
            </div>
            <p className="text-sm text-text-muted">-$523</p>
          </div>
        </div> */}
      </motion.div>

      {/* DAO Scans Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold text-white">Available Scans</h2>
        <div className="grid grid-cols-3 gap-4">
          {scans.map((scan, index) => (
            <motion.div
              key={scan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedScan(scan)}
              className="bento-card rounded-2xl p-5 hover-glow cursor-pointer"
            >
              <h3 className="text-lg font-bold text-white mb-3">{scan.dao}</h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-muted">Odds</span>
                  <span className="text-xl font-bold text-green-400">{scan.odds}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-muted">Drip Rate</span>
                  <span className="text-lg font-semibold text-accent-purple">{scan.dripRate}</span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-4 py-2 glass-card bg-accent-purple/80 backdrop-blur-md text-white rounded-lg hover:bg-accent-purple/60 transition-all font-medium"
              >
                Join Raid
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scan Detail Modal */}
      <AnimatePresence>
        {selectedScan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedScan(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bento-card rounded-3xl p-8 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold text-white">{selectedScan.dao} Scan</h3>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedScan(null)}
                  className="p-2 hover:bg-dark-border rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-text-muted" />
                </motion.button>
              </div>

              {/* Odds Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-text-muted">Success Odds</span>
                  <span className="text-2xl font-bold text-green-400">{selectedScan.odds}%</span>
                </div>
                <div className="w-full bg-dark-border rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-green-500 to-green-400 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${selectedScan.odds}%` }}
                  />
                </div>
              </div>

              {/* ROI Details */}
              <div className="glass-card rounded-2xl p-6 mb-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-text-muted">Stake Required</span>
                  <span className="font-bold text-white">${selectedScan.stakeRequired.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Expected ROI</span>
                  <span className="font-bold text-green-400">+{selectedScan.expectedRoi}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Drip Rate</span>
                  <span className="font-bold text-accent-purple">{selectedScan.dripRate}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!isConnected}
                className="w-full px-6 py-4 glass-card bg-accent-purple/80 backdrop-blur-md text-white rounded-xl hover:bg-accent-purple/60 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold text-lg shadow-lg shadow-accent-purple/30"
              >
                {isConnected
                  ? `Join: $${selectedScan.stakeRequired.toLocaleString()} Stake → +${selectedScan.expectedRoi}% Exp ROI`
                  : 'Connect Wallet to Join'}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
