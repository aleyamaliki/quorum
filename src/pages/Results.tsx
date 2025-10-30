import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Download, Share2, ChevronDown, ChevronUp } from 'lucide-react';

interface CampaignHistory {
  id: string;
  name: string;
  roi: number;
  quarter: string;
  status: 'win' | 'fail';
}

const campaignHistory: CampaignHistory[] = [
  { id: '1', name: 'Raid #1', roi: 18, quarter: 'Q1 2025', status: 'win' },
  { id: '2', name: 'Raid #2', roi: 3, quarter: 'Q4 2024', status: 'win' },
];

export const Results = () => {
  const [expandedCampaign, setExpandedCampaign] = useState<string | null>(null);

  // Mock P&L data
  const isWin = true;
  const totalRoi = 18;
  const entryAmount = 1000;
  const exitAmount = 1180;
  const govUplift = 150;
  const thetaDrip = 30;
  const totalProfit = 180;
  const govPercentage = 83;
  const thetaPercentage = 17;

  const toggleCampaign = (id: string) => {
    setExpandedCampaign(expandedCampaign === id ? null : id);
  };

  return (
    <div className="space-y-8 p-6">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className={`relative rounded-3xl p-12 text-white shadow-2xl overflow-hidden ${
          isWin
            ? 'bg-gradient-to-br from-accent-green/80 via-accent-green/60 to-accent-green/40'
            : 'bg-gradient-to-br from-accent-red/80 via-accent-red/60 to-accent-red/40'
        }`}
      >
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <TrendingUp className={`w-20 h-20 mx-auto ${!isWin && 'rotate-180'}`} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-6xl font-bold mb-3"
          >
            Raid Complete: {isWin ? 'WIN' : 'LOSS'} {totalRoi > 0 ? '+' : ''}{totalRoi}%
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-2xl opacity-90 font-tabular"
          >
            ${entryAmount.toLocaleString()} → ${exitAmount.toLocaleString()}
          </motion.p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-[600px_1fr] gap-6">
        {/* Left: Breakdown & Charts */}
        <div className="space-y-6">
          {/* Breakdown Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-3 gap-4"
          >
            <div className="bento-card rounded-2xl p-6 text-center hover-glow">
              <p className="text-sm text-text-muted mb-3">Gov Uplift</p>
              <p className="text-4xl font-bold text-accent-green font-tabular mb-2">${govUplift}</p>
              <TrendingUp className="w-6 h-6 mx-auto text-accent-green" />
            </div>
            <div className="bento-card rounded-2xl p-6 text-center hover-glow">
              <p className="text-sm text-text-muted mb-3">Theta Drip</p>
              <p className="text-4xl font-bold text-accent-orange font-tabular mb-2">${thetaDrip}</p>
              <div className="flex justify-center gap-1">
                <div className="w-2 h-2 rounded-full bg-accent-orange" />
                <div className="w-2 h-2 rounded-full bg-accent-orange" />
                <div className="w-2 h-2 rounded-full bg-accent-orange" />
              </div>
            </div>
            <div className="bento-card rounded-2xl p-6 text-center hover-glow">
              <p className="text-sm text-text-muted mb-3">Total</p>
              <p className="text-4xl font-bold text-accent-purple font-tabular mb-2">${totalProfit}</p>
              <p className="text-xs text-text-muted">Combined</p>
            </div>
          </motion.div>

          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bento-card rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Profit Breakdown</h3>
            <div className="flex items-center justify-center mb-6">
              <svg width="200" height="200" viewBox="0 0 200 200" className="transform -rotate-90">
                {/* Theta portion */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="40"
                  strokeDasharray={`${(thetaPercentage / 100) * 502.4} 502.4`}
                  strokeDashoffset="0"
                />
                {/* Gov portion */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="40"
                  strokeDasharray={`${(govPercentage / 100) * 502.4} 502.4`}
                  strokeDashoffset={`-${(thetaPercentage / 100) * 502.4}`}
                />
              </svg>
            </div>
            <div className="flex items-center justify-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded bg-accent-purple" />
                <span className="text-sm text-white font-semibold">Gov {govPercentage}%</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded bg-accent-orange" />
                <span className="text-sm text-white font-semibold">Theta {thetaPercentage}%</span>
              </div>
            </div>
          </motion.div>

          {/* Bottom CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-3 gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-4 glass-card bg-accent-purple/80 backdrop-blur-md text-white rounded-xl hover:bg-accent-purple/60 transition-all font-semibold text-sm flex flex-col items-center gap-2"
            >
              <TrendingUp className="w-5 h-5" />
              Reinvest
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-4 glass-card backdrop-blur-md rounded-xl hover:bg-dark-elevated transition-all font-semibold text-sm flex flex-col items-center gap-2 text-white"
            >
              <Download className="w-5 h-5" />
              Withdraw
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-4 glass-card backdrop-blur-md rounded-xl hover:bg-dark-elevated transition-all font-semibold text-sm flex flex-col items-center gap-2 text-white"
            >
              <Share2 className="w-5 h-5" />
              Share
            </motion.button>
          </motion.div>
        </div>

        {/* Right: Chart Panel */}
        <div className="space-y-6">
          {/* ROI Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bento-card rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Campaign Performance</h3>
            <div className="relative h-48 overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 800 150" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="campaignChartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Gradient fill area - closed path from bottom */}
                <path
                  d="M 0 150 L 0 100 Q 100 90, 200 95 T 400 85 T 600 50 T 800 30 L 800 150 Z"
                  fill="url(#campaignChartGradient)"
                  stroke="none"
                />
                {/* Purple line on top */}
                <path
                  d="M 0 100 Q 100 90, 200 95 T 400 85 T 600 50 T 800 30"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="2.5"
                />
              </svg>
              <div className="absolute bottom-4 left-6 text-xs text-text-muted">Week 1</div>
              <div className="absolute bottom-4 right-6 text-xs text-text-muted">Week 12</div>
            </div>
          </motion.div>

          {/* Campaign History */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bento-card rounded-2xl p-6"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Campaign History</h3>
            <div className="space-y-3">
              {campaignHistory.map((campaign, index) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  className="glass-card rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleCampaign(campaign.id)}
                    className="w-full px-5 py-4 hover:bg-dark-elevated flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-white">{campaign.name}</span>
                      <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                        campaign.status === 'win' ? 'bg-accent-green/20 text-accent-green' : 'bg-accent-red/20 text-accent-red'
                      }`}>
                        {campaign.roi > 0 ? '+' : ''}{campaign.roi}%
                      </span>
                      <span className="text-xs text-text-muted">({campaign.quarter})</span>
                    </div>
                    {expandedCampaign === campaign.id ? (
                      <ChevronUp className="w-5 h-5 text-text-muted" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-text-muted" />
                    )}
                  </button>
                  <AnimatePresence>
                    {expandedCampaign === campaign.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-5 py-4 bg-dark-bg/50 border-t border-dark-border"
                      >
                        <p className="text-sm text-text-muted">
                          Campaign details for {campaign.name} with {campaign.roi > 0 ? '+' : ''}{campaign.roi}% ROI in {campaign.quarter}.
                          {campaign.status === 'win' ? ' Successfully hit quorum and achieved targets.' : ' Did not reach minimum quorum threshold.'}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
