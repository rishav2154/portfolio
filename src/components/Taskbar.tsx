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
    <div className="fixed bottom-0 left-0 right-0 h-14 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 backdrop-blur-lg bg-opacity-95 border-t border-slate-600 flex items-center justify-between px-6 z-50 shadow-2xl">
      {/* Start Menu Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="h-10 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-lg flex items-center gap-2 text-white font-semibold shadow-lg transition-all duration-200"
        onClick={() => soundManager.play('coin')}
      >
        <Menu className="w-4 h-4" />
        <span className="text-sm">Start</span>
      </motion.button>

      {/* Open Windows */}
      <div className="flex-1 flex items-center gap-3 mx-6 overflow-x-auto">
        {windows.filter(w => !w.minimized).map(window => (
          <motion.button
            key={window.id}
            whileHover={{ scale: 1.05 }}
            className="h-9 px-4 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 rounded-lg text-white text-sm font-medium truncate min-w-28 max-w-36 shadow-md transition-all duration-200"
            onClick={() => focusWindow(window.id)}
          >
            {window.title}
          </motion.button>
        ))}
        
        {windows.filter(w => w.minimized).map(window => (
          <motion.button
            key={window.id}
            whileHover={{ scale: 1.05 }}
            className="h-9 px-4 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg text-gray-400 text-sm font-medium truncate min-w-28 max-w-36 shadow-md transition-all duration-200"
            onClick={() => minimizeWindow(window.id)}
          >
            <Minimize2 className="w-3 h-3 inline mr-1" />
            {window.title}
          </motion.button>
        ))}
      </div>

      {/* System Tray */}
      <div className="flex items-center gap-4">
        {/* Coin Counter */}
        <div className="flex items-center gap-2 text-yellow-400 bg-slate-600 px-3 py-1 rounded-lg">
          <Coins className="w-4 h-4 coin-spin" />
          <span className="text-sm font-semibold">{coins}</span>
        </div>

        {/* Power Up Indicator */}
        {powerUp && (
          <div className="text-lg powerup-glow bg-slate-600 px-2 py-1 rounded-lg">
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
          className="text-white text-sm font-medium flex items-center gap-2 bg-slate-600 hover:bg-slate-500 px-3 py-2 rounded-lg transition-all duration-200"
          title="Switch Workspace (Warp)"
        >
          <Monitor className="w-4 h-4" />
          <span className="hidden md:inline">{workspaceNames[currentWorkspace]}</span>
        </motion.button>

        {/* Sound Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            toggleSound();
            soundManager.setEnabled(!soundEnabled);
          }}
          className="text-white bg-slate-600 hover:bg-slate-500 p-2 rounded-lg transition-all duration-200"
          title="Toggle Sound"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </motion.button>

        {/* System Time */}
        <div className="text-white text-sm font-medium bg-slate-600 px-3 py-2 rounded-lg">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default Taskbar;