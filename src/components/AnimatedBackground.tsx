import { motion } from 'framer-motion';

export const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-30"
        style={{
          background: 'radial-gradient(circle, #a08963 0%, transparent 70%)',
        }}
        animate={{
          x: ['-10%', '10%', '-10%'],
          y: ['-10%', '20%', '-10%'],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, #c9b194 0%, transparent 70%)',
          right: '-10%',
          top: '20%',
        }}
        animate={{
          x: ['10%', '-10%', '10%'],
          y: ['10%', '-20%', '10%'],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-25"
        style={{
          background: 'radial-gradient(circle, #706d54 0%, transparent 70%)',
          left: '50%',
          bottom: '-20%',
        }}
        animate={{
          x: ['-20%', '20%', '-20%'],
          y: ['-10%', '10%', '-10%'],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute w-[550px] h-[550px] rounded-full blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, #d4c5ab 0%, transparent 70%)',
          right: '30%',
          bottom: '10%',
        }}
        animate={{
          x: ['15%', '-15%', '15%'],
          y: ['15%', '-10%', '15%'],
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};
