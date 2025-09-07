import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BootScreenProps {
  onBootComplete: () => void;
}

const BootScreen: React.FC<BootScreenProps> = ({ onBootComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('');

  const bootMessages = [
    'Loading Super Mario Portfolio OS...',
    'Initializing Warp Pipes...',
    'Collecting Power-ups...',
    'Starting Castle Defense Systems...',
    'Loading Princess Peach Communication Module...',
    'Activating Coin Counter...',
    'Ready to Start Adventure!'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        const messageIndex = Math.floor((newProgress / 100) * bootMessages.length);
        
        if (messageIndex < bootMessages.length) {
          setCurrentMessage(bootMessages[messageIndex]);
        }
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(onBootComplete, 1000);
        }
        
        return newProgress;
      });
    }, 12);

    return () => clearInterval(interval);
  }, [onBootComplete]);

  return (
    <div className="fixed inset-0 bg-black text-green-400 font-mono flex flex-col items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="mb-8"
      >
        <div className="text-4xl mb-4 text-center flex items-center justify-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-white font-bold text-2xl border-4 border-white shadow-lg">
            R
          </div>
          RISHAV PORTFOLIO OS
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-2xl border-4 border-white shadow-lg">
            J
          </div>
        </div>
        <div className="text-xl text-center text-red-400">
          Version 1.0 - Rishav Jaiswal Edition
        </div>
      </motion.div>

      <div className="w-96 mb-4">
        <div className="bg-gray-800 rounded p-1">
          <motion.div
            className="h-6 bg-gradient-to-r from-green-400 to-yellow-400 rounded"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>

      <div className="text-center text-sm h-8">
        <motion.div
          key={currentMessage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-yellow-400"
        >
          {currentMessage}
        </motion.div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-8">
        {progress}% Complete
      </div>

      {progress === 100 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-green-300 mt-4"
        >
          Press any key to continue...
        </motion.div>
      )}
    </div>
  );
};

export default BootScreen;