import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import { soundManager } from '../utils/soundManager';
import { 
  Menu, 
  Minimize2, 
  Volume2, 
  VolumeX, 
  Monitor,
  Coins,
  Zap
} from 'lucide-react';

const Taskbar: React.FC = () => {
  const { 
    coins, 
    powerUp, 
    windows, 
    soundEnabled, 
    toggleSound, 
    currentWorkspace,
    setWorkspace,
    minimizeWindow,
    focusWindow
  } = useGameStore();

  const workspaceNames = {
    overworld: '🌍 Overworld',
    underground: '🕳️ Underground', 
    castle: '🏰 Castle',
    sky: '☁️ Sky'
  };

  const handleWorkspaceChange = () => {
    const workspaces = ['overworld', 'underground', 'castle', 'sky'] as const;
    const currentIndex = workspaces.indexOf(currentWorkspace);
    const nextIndex = (currentIndex + 1) % workspaces.length;
    setWorkspace(workspaces[nextIndex]);
    soundManager.play('warp');
  };

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 h-14 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 border-t-2 border-black flex items-center justify-between px-4 z-50 backdrop-blur-sm"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {/* Start Menu Button */}
      <motion.button
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 5px 15px rgba(0,0,0,0.3)"
        }}
        whileTap={{ scale: 0.95 }}
        className="mario-block h-10 px-4 flex items-center gap-2 relative overflow-hidden"
        onClick={() => soundManager.play('coin')}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0"
          whileHover={{ opacity: 0.2 }}
        />
        <Menu className="w-4 h-4" />
        <span className="text-sm font-bold relative z-10">Start</span>
      </motion.button>

      {/* Open Windows */}
      <div className="flex-1 flex items-center gap-2 mx-4 overflow-x-auto">
        <AnimatePresence>
        {windows.filter(w => !w.minimized).map(window => (
          <motion.button
            key={window.id}
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "rgba(255,255,255,0.3)"
            }}
            className="h-9 px-3 bg-white bg-opacity-20 rounded-lg text-white text-xs font-bold truncate min-w-24 max-w-32 transition-all duration-200"
            onClick={() => focusWindow(window.id)}
          >
            {window.title}
          </motion.button>
        ))}
        </AnimatePresence>
        
        <AnimatePresence>
        {windows.filter(w => w.minimized).map(window => (
          <motion.button
            key={window.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "rgba(156,163,175,0.8)"
            }}
            className="h-9 px-3 bg-gray-600 rounded-lg text-gray-300 text-xs font-bold truncate min-w-24 max-w-32 transition-all duration-200"
            onClick={() => minimizeWindow(window.id)}
          >
            <Minimize2 className="w-3 h-3 inline mr-1" />
            {window.title}
          </motion.button>
        ))}
        </AnimatePresence>
      </div>

      {/* System Tray */}
      <div className="flex items-center gap-3">
        {/* Coin Counter */}
        <motion.div 
          className="flex items-center gap-1 text-yellow-400 bg-black bg-opacity-20 px-2 py-1 rounded-lg"
          whileHover={{ scale: 1.05 }}
          animate={{ 
            boxShadow: coins > 0 ? "0 0 10px rgba(255,215,0,0.5)" : "none"
          }}
        >
          <motion.div
            animate={{ rotate: coins > 0 ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <Coins className="w-5 h-5" />
          </motion.div>
          <motion.span 
            className="text-sm font-bold"
            key={coins}
            initial={{ scale: 1.5, color: "#FFD700" }}
            animate={{ scale: 1, color: "#FCD34D" }}
            transition={{ duration: 0.3 }}
          >
            {coins}
          </motion.span>
        </motion.div>

        {/* Power Up Indicator */}
        <AnimatePresence>
        {powerUp && (
          <motion.div 
            className="text-lg font-bold powerup-glow bg-black bg-opacity-20 px-2 py-1 rounded-lg"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1 }}
          >
            {powerUp === 'super' && '🍄'}
            {powerUp === 'fire' && '🔥'}
            {powerUp === 'star' && '⭐'}
          </motion.div>
        )}
        </AnimatePresence>

        {/* Workspace Switcher */}
        <motion.button
          whileHover={{ 
            scale: 1.05,
            backgroundColor: "rgba(255,255,255,0.1)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={handleWorkspaceChange}
          className="text-white text-xs font-bold flex items-center gap-1 px-2 py-1 rounded-lg transition-all duration-200"
          title="Switch Workspace (Warp)"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Monitor className="w-4 h-4" />
          </motion.div>
          {workspaceNames[currentWorkspace]}
        </motion.button>

        {/* Sound Toggle */}
        <motion.button
          whileHover={{ 
            scale: 1.05,
            backgroundColor: "rgba(255,255,255,0.1)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            toggleSound();
            soundManager.setEnabled(!soundEnabled);
          }}
          className="text-white p-2 rounded-lg transition-all duration-200"
          title="Toggle Sound"
        >
          <motion.div
            animate={{ 
              scale: soundEnabled ? [1, 1.2, 1] : 1,
              color: soundEnabled ? "#10B981" : "#EF4444"
            }}
            transition={{ duration: 0.5, repeat: soundEnabled ? Infinity : 0, repeatDelay: 2 }}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </motion.div>
        </motion.button>

        {/* System Time */}
        <motion.div 
          className="text-white text-xs font-bold bg-black bg-opacity-20 px-2 py-1 rounded-lg"
          whileHover={{ scale: 1.05 }}
        >
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Taskbar;