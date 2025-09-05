import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { Settings, Volume2, VolumeX, Monitor, Palette, Globe, RotateCcw } from 'lucide-react';
import { workspaces } from '../../data/portfolioData';
import { soundManager } from '../../utils/soundManager';

const SettingsApp: React.FC = () => {
  const { 
    currentWorkspace, 
    setWorkspace, 
    theme, 
    setTheme, 
    soundEnabled, 
    toggleSound,
    coins,
    powerUp,
    achievements
  } = useGameStore();

  const themes = [
    { id: 'classic', name: 'Classic Mario', colors: 'from-red-400 to-blue-400' },
    { id: 'dark', name: 'Dark Mode', colors: 'from-gray-800 to-gray-900' },
    { id: 'underwater', name: 'Underwater', colors: 'from-blue-500 to-teal-500' },
    { id: 'lava', name: 'Lava Castle', colors: 'from-red-600 to-orange-600' }
  ];

  const handleSoundToggle = () => {
    toggleSound();
    soundManager.setEnabled(!soundEnabled);
    soundManager.play(soundEnabled ? 'coin' : 'jump');
  };

  const handleWorkspaceChange = (workspace: typeof currentWorkspace) => {
    setWorkspace(workspace);
    soundManager.play('warp');
  };

  const handleThemeChange = (newTheme: typeof theme) => {
    setTheme(newTheme);
    soundManager.play('powerup');
  };

  const resetPortfolio = () => {
    if (confirm('🍄 Are you sure you want to reset your Mario Portfolio adventure? This will clear all progress!')) {
      localStorage.removeItem('mario-portfolio-storage');
      window.location.reload();
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-gray-50 to-blue-50 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-mario-blue mb-6 text-center flex items-center justify-center gap-3"
        >
          <Settings className="w-8 h-8" />
          System Settings
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Audio Settings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mario-window p-6"
          >
            <h2 className="text-lg font-bold text-mario-blue mb-4 flex items-center gap-2">
              🎵 Audio Settings
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                  <div>
                    <p className="text-sm font-bold">Sound Effects</p>
                    <p className="text-xs text-gray-600">Mario sound effects and notifications</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSoundToggle}
                  className={`mario-block px-4 py-2 font-bold text-sm ${
                    soundEnabled ? 'bg-mario-green text-white' : 'bg-mario-red text-white'
                  }`}
                >
                  {soundEnabled ? 'ON' : 'OFF'}
                </motion.button>
              </div>

              <div className="mario-block p-3 bg-yellow-100 text-center">
                <p className="text-xs font-bold text-mario-blue">
                  🔊 Sound Status: {soundEnabled ? 'Enabled' : 'Disabled'}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {soundEnabled 
                    ? 'Enjoy Mario sounds while exploring!' 
                    : 'Sounds are muted for quiet browsing.'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Display Settings */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="mario-window p-6"
          >
            <h2 className="text-lg font-bold text-mario-blue mb-4 flex items-center gap-2">
              <Monitor className="w-5 h-5" />
              Display Settings
            </h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-bold mb-2">Current Workspace</p>
                <div className="grid grid-cols-2 gap-2">
                  {workspaces.map((workspace) => (
                    <motion.button
                      key={workspace.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleWorkspaceChange(workspace.id as any)}
                      className={`mario-block p-3 text-xs font-bold text-center ${
                        currentWorkspace === workspace.id 
                          ? 'bg-mario-blue text-white' 
                          : 'bg-yellow-400 text-black'
                      }`}
                    >
                      {workspace.name}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="mario-block p-3 bg-blue-100">
                <p className="text-xs font-bold text-mario-blue mb-1">
                  🌍 Active Workspace
                </p>
                <p className="text-xs text-gray-600">
                  {workspaces.find(w => w.id === currentWorkspace)?.description}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Theme Settings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="mario-window p-6"
          >
            <h2 className="text-lg font-bold text-mario-blue mb-4 flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Theme Settings
            </h2>
            
            <div className="space-y-3">
              {themes.map((themeOption) => (
                <motion.button
                  key={themeOption.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleThemeChange(themeOption.id as any)}
                  className={`w-full mario-block p-3 flex items-center justify-between ${
                    theme === themeOption.id ? 'bg-mario-green text-white' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded bg-gradient-to-r ${themeOption.colors}`} />
                    <span className="text-sm font-bold">{themeOption.name}</span>
                  </div>
                  {theme === themeOption.id && (
                    <span className="text-xs">✓ Active</span>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* System Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="mario-window p-6"
          >
            <h2 className="text-lg font-bold text-mario-blue mb-4 flex items-center gap-2">
              📊 System Information
            </h2>
            
            <div className="space-y-3">
              <div className="mario-block p-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold">Total Coins</span>
                  <span className="text-xs text-mario-yellow">🪙 {coins}</span>
                </div>
              </div>

              <div className="mario-block p-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold">Current Power-Up</span>
                  <span className="text-xs">
                    {powerUp === 'super' && '🍄 Super Mario'}
                    {powerUp === 'fire' && '🔥 Fire Mario'}
                    {powerUp === 'star' && '⭐ Star Power'}
                    {!powerUp && '🤏 Small Mario'}
                  </span>
                </div>
              </div>

              <div className="mario-block p-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold">Achievements</span>
                  <span className="text-xs text-mario-green">🏆 {achievements.length}</span>
                </div>
              </div>

              <div className="mario-block p-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold">Portfolio Version</span>
                  <span className="text-xs">v1.0 - Rishav Edition</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Language Settings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="mario-window p-6"
          >
            <h2 className="text-lg font-bold text-mario-blue mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Language & Region
            </h2>
            
            <div className="space-y-3">
              <div className="mario-block p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs font-bold">Interface Language</p>
                    <p className="text-xs text-gray-600">Current: English</p>
                  </div>
                  <span className="text-lg">🇬🇧</span>
                </div>
              </div>

              <div className="mario-block p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs font-bold">Region</p>
                    <p className="text-xs text-gray-600">New Delhi, India</p>
                  </div>
                  <span className="text-lg">🇮🇳</span>
                </div>
              </div>

              <div className="mario-block p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs font-bold">Time Zone</p>
                    <p className="text-xs text-gray-600">IST (GMT+5:30)</p>
                  </div>
                  <span className="text-xs">⏰</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* System Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="mario-window p-6"
          >
            <h2 className="text-lg font-bold text-mario-blue mb-4 flex items-center gap-2">
              ⚙️ System Actions
            </h2>
            
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={resetPortfolio}
                className="w-full mario-block p-3 text-left flex items-center gap-3 bg-mario-red text-white font-bold"
              >
                <RotateCcw className="w-5 h-5" />
                <div>
                  <p className="text-sm">Reset Portfolio</p>
                  <p className="text-xs opacity-75">Clear all data and start fresh</p>
                </div>
              </motion.button>

              <div className="mario-block p-3 bg-yellow-100">
                <p className="text-xs font-bold text-mario-blue mb-1">⚠️ Warning</p>
                <p className="text-xs text-gray-600">
                  Resetting will remove all coins, achievements, and saved progress.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 mario-window p-4 bg-gradient-to-r from-purple-100 to-blue-100 text-center"
        >
          <h3 className="text-lg font-bold text-mario-blue mb-2">🍄 About Mario Portfolio OS</h3>
          <p className="text-sm text-gray-700 mb-2">
            Created by Rishav Jaiswal • Built with React, TypeScript, and Tailwind CSS
          </p>
          <div className="flex justify-center items-center gap-4 text-xs text-gray-600">
            <span>Version 1.0</span>
            <span>•</span>
            <span>2024 Edition</span>
            <span>•</span>
            <span>Made with ❤️ and 🍄</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsApp;