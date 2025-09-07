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
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-gradient-to-r from-blue-600 to-blue-800 border-t-2 border-black flex items-center justify-between px-4 z-50">
      {/* Start Menu Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mario-block h-8 px-3 flex items-center gap-2"
        onClick={() => soundManager.play('coin')}
      >
        <Menu className="w-4 h-4" />
        <span className="text-xs font-bold">Start</span>
      </motion.button>

      {/* Open Windows */}
      <div className="flex-1 flex items-center gap-2 mx-4 overflow-x-auto">
        {windows.filter(w => !w.minimized).map(window => (
          <motion.button
            key={window.id}
            whileHover={{ scale: 1.05 }}
            className="h-8 px-3 bg-white bg-opacity-20 rounded text-white text-xs font-bold truncate min-w-24 max-w-32"
            onClick={() => focusWindow(window.id)}
          >
            {window.title}
          </motion.button>
        ))}
        
        {windows.filter(w => w.minimized).map(window => (
          <motion.button
            key={window.id}
            whileHover={{ scale: 1.05 }}
            className="h-8 px-3 bg-gray-600 rounded text-gray-300 text-xs font-bold truncate min-w-24 max-w-32"
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
        <div className="flex items-center gap-1 text-yellow-400">
          <Coins className="w-4 h-4 coin-spin" />
          <span className="text-xs font-bold">{coins}</span>
        </div>

        {/* Power Up Indicator */}
        {powerUp && (
          <div className="text-xs font-bold powerup-glow">
            {powerUp === 'super' && '🍄'}
            {powerUp === 'fire' && '🔥'}
            {powerUp === 'star' && '⭐'}
          </div>
        )}

        {/* Workspace Switcher */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleWorkspaceChange}
          className="text-white text-xs font-bold flex items-center gap-1"
          title="Switch Workspace (Warp)"
        >
          <Monitor className="w-4 h-4" />
          {workspaceNames[currentWorkspace]}
        </motion.button>

        {/* Sound Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            toggleSound();
            soundManager.setEnabled(!soundEnabled);
          }}
          className="text-white"
          title="Toggle Sound"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </motion.button>

        {/* System Time */}
        <div className="text-white text-xs font-bold">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default Taskbar;