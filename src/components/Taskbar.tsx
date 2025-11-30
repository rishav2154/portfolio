import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import { soundManager } from '../utils/soundManager';
import { 
  Menu, 
  Minimize2, 
  Volume2, 
  VolumeX, 
  Monitor,
  Coins
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
      className="fixed bottom-0 left-0 right-0 h-12 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 border-t-2 border-black flex items-center justify-between px-4 z-50 backdrop-blur-md"
      initial={{ y: 50 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Start Menu Button */}
      <motion.button
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 0 25px rgba(255, 215, 0, 0.6), 0 0 50px rgba(255, 215, 0, 0.3)",
          rotateY: 5,
        }}
        whileTap={{ scale: 0.95 }}
        className="mario-block h-10 px-4 flex items-center gap-3 relative overflow-hidden bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white border-2 border-yellow-400"
        onClick={() => soundManager.play('coin')}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <Menu className="w-5 h-5" />
        </motion.div>
        <span className="text-sm font-bold">Start</span>
        
        {/* Enhanced pulse effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0"
          whileHover={{
            opacity: [0, 0.2, 0],
          }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
        
        {/* Sparkle effects */}
        <motion.div
          className="absolute top-1 right-1 w-1 h-1 bg-yellow-300 rounded-full"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
        />
        <motion.div
          className="absolute bottom-1 left-1 w-1 h-1 bg-yellow-300 rounded-full"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
        />
      </motion.button>

      {/* Open Windows */}
      <div className="flex-1 flex items-center gap-2 mx-4 overflow-x-auto">
        {windows.filter(w => !w.minimized).map(window => (
          <motion.button
            key={window.id}
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "rgba(255, 255, 255, 0.3)",
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="h-8 px-3 bg-white bg-opacity-20 rounded text-white text-xs font-bold truncate min-w-24 max-w-32 transition-all duration-200"
            onClick={() => focusWindow(window.id)}
          >
            {window.title}
          </motion.button>
        ))}
        
        {windows.filter(w => w.minimized).map(window => (
          <motion.button
            key={window.id}
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "rgba(156, 163, 175, 0.8)",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="h-8 px-3 bg-gray-600 rounded text-gray-300 text-xs font-bold truncate min-w-24 max-w-32 transition-all duration-200"
            onClick={() => minimizeWindow(window.id)}
          >
            <Minimize2 className="w-3 h-3 inline mr-1" />
            {window.title}
          </motion.button>
        ))}
      </div>

      {/* System Tray */}
      <div className="flex items-center gap-3">
        {/* Coin Counter */}
        <motion.div 
          className="flex items-center gap-1 text-yellow-400"
          whileHover={{ scale: 1.1 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Coins className="w-4 h-4" />
          </motion.div>
          <motion.span 
            className="text-xs font-bold"
            key={coins}
            initial={{ scale: 1.5, color: "#fbbf24" }}
            animate={{ scale: 1, color: "#facc15" }}
            transition={{ duration: 0.3 }}
          >
            {coins}
          </motion.span>
        </motion.div>

        {/* Power Up Indicator */}
        {powerUp && (
          <motion.div 
            className="text-xs font-bold"
            animate={{
              scale: [1, 1.2, 1],
              textShadow: [
                "0 0 5px currentColor",
                "0 0 20px currentColor, 0 0 30px currentColor",
                "0 0 5px currentColor"
              ],
            }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {powerUp === 'super' && '🍄'}
            {powerUp === 'fire' && '🔥'}
            {powerUp === 'star' && '⭐'}
          </motion.div>
        )}

        {/* Workspace Switcher */}
        <motion.button
          whileHover={{ 
            scale: 1.05,
            rotateY: 10,
          }}
          whileTap={{ scale: 0.95 }}
          onClick={handleWorkspaceChange}
          className="text-white text-xs font-bold flex items-center gap-1 p-2 rounded hover:bg-white hover:bg-opacity-10 transition-all duration-200"
          title="Switch Workspace (Warp)"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Monitor className="w-4 h-4" />
          </motion.div>
          {workspaceNames[currentWorkspace]}
        </motion.button>

        {/* Sound Toggle */}
        <motion.button
          whileHover={{ 
            scale: 1.1,
            rotate: 10,
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            toggleSound();
            soundManager.setEnabled(!soundEnabled);
          }}
          className="text-white p-2 rounded hover:bg-white hover:bg-opacity-10 transition-all duration-200"
          title="Toggle Sound"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </motion.button>

        {/* System Time */}
        <motion.div 
          className="text-white text-xs font-bold p-2 rounded bg-white bg-opacity-10"
          whileHover={{ scale: 1.05 }}
        >
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Taskbar;