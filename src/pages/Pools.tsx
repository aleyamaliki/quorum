import { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

type Step = 1 | 2 | 3;

interface WizardState {
  amount: string;
  token: string;
  share: number;
  proposal: string;
  thetaEnabled: boolean;
}

const templates = [
  { id: 'burn', label: 'Burn', text: 'Burn 20% of treasury to increase token value' },
  { id: 'acquire', label: 'Acquire', text: 'Acquire protocol X to expand ecosystem' },
];

export const Pools = () => {
  const { isConnected, balance } = useWallet();
  const [step, setStep] = useState<Step>(1);
  const [wizardState, setWizardState] = useState<WizardState>({
    amount: '',
    token: 'JUP',
    share: 0,
    proposal: '',
    thetaEnabled: true,
  });

  // Calculated values for live preview
  const stakeAmount = parseFloat(wizardState.amount) || 0;
  const baseOdds = 72;
  const oddsBoost = Math.min(stakeAmount / 100, 10);
  const odds = Math.min(baseOdds + oddsBoost, 95);
  const expectedUplift = (stakeAmount * 0.12).toFixed(0);
  const thetaEstimate = (stakeAmount * 0.0095).toFixed(2);
  const thetaBoost = wizardState.thetaEnabled ? 3 : 0;
  const failChance = 100 - odds;
  const riskLevel = failChance > 30 ? 'High' : failChance > 20 ? 'Medium' : 'Low';

  const handleAmountChange = (value: string) => {
    const numValue = parseFloat(value) || 0;
    const share = (numValue / 100000) * 100;
    setWizardState({ ...wizardState, amount: value, share: parseFloat(share.toFixed(3)) });
  };

  const handleMaxClick = () => {
    const maxAmount = (parseFloat(balance || '0') * 0.9).toFixed(2);
    handleAmountChange(maxAmount);
  };

  const handleTemplateSelect = (template: typeof templates[0]) => {
    setWizardState({ ...wizardState, proposal: template.text });
  };

  const canProceed = (currentStep: Step): boolean => {
    if (currentStep === 1) return stakeAmount > 0;
    if (currentStep === 2) return wizardState.proposal.trim().length > 0;
    return true;
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-white">Pool Creation</h1>
        <p className="text-text-muted mt-2">Create your raid and craft proposals</p>
      </motion.div>

      {!isConnected ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bento-card rounded-2xl p-12 text-center"
        >
          <h3 className="text-xl font-semibold text-white mb-2">Wallet Not Connected</h3>
          <p className="text-text-muted">Please connect your wallet to create a pool</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Left: Wizard */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bento-card rounded-2xl p-6"
          >
            {/* Step Tabs */}
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <button
                    onClick={() => canProceed((s - 1) as Step) && setStep(s as Step)}
                    disabled={s > 1 && !canProceed((s - 1) as Step)}
                    className={`w-12 h-12 rounded-full font-bold text-sm transition-all ${
                      step === s
                        ? 'bg-accent-purple text-white scale-110 shadow-lg shadow-accent-purple/30'
                        : step > s
                        ? 'bg-accent-green text-white'
                        : 'bg-dark-elevated text-text-muted'
                    } ${s > 1 && !canProceed((s - 1) as Step) ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                  >
                    {s}
                  </button>
                  {s < 3 && <ChevronRight className="w-5 h-5 text-text-muted mx-3" />}
                </div>
              ))}
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Stake Your Raid</h2>

                  <div>
                    <label className="block text-text-muted text-sm mb-2">Amount</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={wizardState.amount}
                        onChange={(e) => handleAmountChange(e.target.value)}
                        placeholder="0.0"
                        className="w-full px-4 py-3 pr-20 rounded-xl border border-dark-border bg-dark-elevated focus:outline-none focus:ring-2 focus:ring-accent-purple text-lg text-white font-tabular"
                      />
                      <button
                        onClick={handleMaxClick}
                        className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-accent-purple/20 text-accent-purple rounded-lg text-sm font-medium hover:bg-accent-purple/30 transition-colors"
                      >
                        Max
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-text-muted text-sm mb-2">Token</label>
                    <select
                      value={wizardState.token}
                      onChange={(e) => setWizardState({ ...wizardState, token: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-dark-border bg-dark-elevated focus:outline-none focus:ring-2 focus:ring-accent-purple text-white"
                    >
                      <option value="JUP">JUP - Jupiter</option>
                      <option value="SOL">SOL - Solana</option>
                      <option value="USDC">USDC - USD Coin</option>
                    </select>
                  </div>

                  <div className="glass-card rounded-xl p-5">
                    <p className="text-text-muted text-sm mb-2">Your Share</p>
                    <p className="text-3xl font-bold text-accent-purple font-tabular">{wizardState.share}%</p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep(2)}
                    disabled={!canProceed(1)}
                    className="w-full px-6 py-4 glass-card bg-accent-purple/80 backdrop-blur-md text-white rounded-xl hover:bg-accent-purple/60 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold text-lg"
                  >
                    Next: Craft Proposal
                  </motion.button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Craft Proposal</h2>

                  <div>
                    <label className="block text-text-muted text-sm mb-2">Proposal Text</label>
                    <textarea
                      value={wizardState.proposal}
                      onChange={(e) => setWizardState({ ...wizardState, proposal: e.target.value })}
                      placeholder="Describe your proposal..."
                      rows={8}
                      className="w-full px-4 py-3 rounded-xl border border-dark-border bg-dark-elevated focus:outline-none focus:ring-2 focus:ring-accent-purple resize-none text-white"
                    />
                  </div>

                  <div>
                    <p className="text-text-muted text-sm mb-3">Templates</p>
                    <div className="grid grid-cols-2 gap-3">
                      {templates.map((template) => (
                        <motion.button
                          key={template.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleTemplateSelect(template)}
                          className="px-4 py-3 glass-card rounded-xl hover:bg-dark-elevated transition-colors font-medium text-white"
                        >
                          {template.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setStep(1)}
                      className="flex-1 px-6 py-4 glass-card backdrop-blur-md rounded-xl hover:bg-dark-elevated transition-all font-semibold text-white"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setStep(3)}
                      disabled={!canProceed(2)}
                      className="flex-1 px-6 py-4 glass-card bg-accent-purple/80 backdrop-blur-md text-white rounded-xl hover:bg-accent-purple/60 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
                    >
                      Next: Activate
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Activate</h2>

                  <div className="glass-card rounded-xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-text-muted">Stake Amount</span>
                      <span className="font-semibold text-white font-tabular">${stakeAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-muted">Token</span>
                      <span className="font-semibold text-white">{wizardState.token}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-muted">Your Share</span>
                      <span className="font-semibold text-accent-purple font-tabular">{wizardState.share}%</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-dark-border">
                      <span className="text-text-muted">Theta Overlay</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={wizardState.thetaEnabled}
                          onChange={(e) => setWizardState({ ...wizardState, thetaEnabled: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-dark-border rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-green"></div>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setStep(2)}
                      className="flex-1 px-6 py-4 glass-card backdrop-blur-md rounded-xl hover:bg-dark-elevated transition-all font-semibold text-white"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 px-6 py-4 glass-card bg-accent-orange/80 backdrop-blur-md text-white rounded-xl hover:bg-accent-orange/60 transition-all font-semibold shadow-lg shadow-accent-orange/30"
                    >
                      Confirm & Reserve Slot
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right: Preview Simulation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bento-card rounded-2xl p-6 space-y-5"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Live Preview</h2>

            {/* Odds Bar */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-text-muted">Success Odds</span>
                <span className="text-2xl font-bold text-accent-green font-tabular">{odds.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-dark-border rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${odds}%` }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-r from-accent-green to-accent-green/80 h-3 rounded-full"
                />
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card rounded-xl p-4">
                <p className="text-xs text-text-muted mb-2">Exp Uplift</p>
                <p className="text-2xl font-bold text-accent-green font-tabular">+{expectedUplift}%</p>
              </div>
              <div className="glass-card rounded-xl p-4">
                <p className="text-xs text-text-muted mb-2">Theta Est</p>
                <p className="text-2xl font-bold text-accent-purple font-tabular">${thetaEstimate}/wk</p>
              </div>
            </div>

            {/* Risk Alert */}
            {failChance > 20 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`rounded-xl p-4 ${
                  riskLevel === 'High'
                    ? 'bg-accent-red/10 border border-accent-red/20'
                    : 'bg-accent-orange/10 border border-accent-orange/20'
                }`}
              >
                <p className={`text-sm font-semibold ${riskLevel === 'High' ? 'text-accent-red' : 'text-accent-orange'}`}>
                  ⚠️ Risk Alert: {failChance.toFixed(0)}% Fail Chance ({riskLevel})
                </p>
              </motion.div>
            )}

            {/* ROI Line Chart */}
            <div className="glass-card rounded-xl p-5">
              <p className="text-sm text-text-muted mb-4">ROI Projection</p>
              <div className="relative h-40 overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 400 120" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="roiChartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Gradient fill area - closed path from bottom */}
                  <path
                    d={`M 0 120 L 0 90 Q 100 ${90 - odds/4}, 200 ${90 - odds/2} T 400 ${90 - odds} L 400 120 Z`}
                    fill="url(#roiChartGradient)"
                    stroke="none"
                  />
                  {/* Purple line on top */}
                  <path
                    d={`M 0 90 Q 100 ${90 - odds/4}, 200 ${90 - odds/2} T 400 ${90 - odds}`}
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="2.5"
                  />
                </svg>
                <div className="absolute bottom-2 left-0 text-xs text-text-muted">Week 1</div>
                <div className="absolute bottom-2 right-0 text-xs text-text-muted">Week 4</div>
              </div>
            </div>

            {/* Theta Toggle Info */}
            <div className="flex items-center justify-between glass-card rounded-xl p-5">
              <div>
                <p className="text-sm font-semibold text-white">Theta Overlay</p>
                <p className="text-xs text-text-muted mt-1">
                  {wizardState.thetaEnabled ? `+${thetaBoost}% Floor Boost` : 'Disabled'}
                </p>
              </div>
              <span className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                wizardState.thetaEnabled ? 'bg-accent-green/20 text-accent-green' : 'bg-dark-border text-text-muted'
              }`}>
                {wizardState.thetaEnabled ? '✓ On' : 'Off'}
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
