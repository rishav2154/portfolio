import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import Taskbar from './Taskbar';
import WindowManager from './WindowManager';
import DesktopIcons from './DesktopIcons';
import { workspaces } from '../data/portfolioData';

const Desktop: React.FC = () => {
  const { currentWorkspace } = useGameStore();
  
  const workspace = workspaces.find(w => w.id === currentWorkspace) || workspaces[0];

  return (
    <div 
      className="h-screen w-screen relative overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100"
      style={{ background: workspace.background }}
    >
      {/* Desktop Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {currentWorkspace === 'overworld' && (
          <>
            {/* Clouds */}
            <motion.div 
              className="absolute top-16 left-16 w-24 h-16 bg-white rounded-full opacity-60 shadow-lg"
              animate={{ x: [-5, 5, -5] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div 
              className="absolute top-24 right-24 w-32 h-20 bg-white rounded-full opacity-60 shadow-lg"
              animate={{ x: [5, -5, 5] }}
              transition={{ duration: 10, repeat: Infinity }}
            />
            <motion.div 
              className="absolute top-40 left-1/2 w-28 h-18 bg-white rounded-full opacity-60 shadow-lg"
              animate={{ x: [-3, 3, -3] }}
              transition={{ duration: 12, repeat: Infinity }}
            />
            
            {/* Hills */}
            <div className="absolute bottom-16 left-8 w-48 h-32 bg-gradient-to-t from-green-500 to-green-400 rounded-t-full shadow-xl"></div>
            <div className="absolute bottom-16 right-16 w-64 h-40 bg-gradient-to-t from-green-600 to-green-500 rounded-t-full shadow-xl"></div>
            
            {/* Sun */}
            <motion.div 
              className="absolute top-8 right-8 w-16 h-16 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full shadow-xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Grass patches */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-green-600 via-green-500 to-transparent opacity-80"></div>
          </>
        )}
        
        {currentWorkspace === 'underground' && (
          <>
            {/* Stalactites */}
            <div className="absolute top-0 left-20 w-4 h-16 bg-gray-600 rounded-b-full shadow-lg"></div>
            <div className="absolute top-0 left-40 w-6 h-24 bg-gray-700 rounded-b-full shadow-lg"></div>
            <div className="absolute top-0 right-32 w-5 h-20 bg-gray-600 rounded-b-full shadow-lg"></div>
            
            {/* Cave walls */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-800 to-transparent"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-800 to-transparent"></div>
          </>
        )}
        
        {currentWorkspace === 'castle' && (
          <>
            {/* Lava bubbles */}
            <motion.div 
              className="absolute bottom-20 left-20 w-8 h-8 bg-red-500 rounded-full"
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div 
              className="absolute bottom-32 right-40 w-6 h-6 bg-orange-500 rounded-full"
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            />
            
            {/* Castle towers */}
            <div className="absolute bottom-0 left-1/4 w-16 h-32 bg-gray-700 shadow-lg"></div>
            <div className="absolute bottom-0 right-1/4 w-20 h-40 bg-gray-800 shadow-lg"></div>
            
            {/* Lava glow */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-red-600 to-transparent opacity-50"></div>
          </>
        )}
        
        {currentWorkspace === 'sky' && (
          <>
            {/* Floating platforms */}
            <motion.div 
              className="absolute top-32 left-24 w-32 h-4 bg-green-400 rounded shadow-lg"
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div 
              className="absolute top-48 right-32 w-40 h-4 bg-green-500 rounded shadow-lg"
              animate={{ y: [2, -2, 2] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div 
              className="absolute bottom-32 left-1/2 w-36 h-4 bg-green-400 rounded shadow-lg"
              animate={{ y: [-1, 1, -1] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            
            {/* Rainbow */}
            <div className="absolute top-16 left-1/4 w-64 h-32 bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400 rounded-full opacity-30 transform rotate-12"></div>
          </>
        )}
      </div>

      {/* Desktop Icons */}
      <DesktopIcons />
      
      {/* Window Manager */}
      <WindowManager />
      
      {/* Taskbar */}
      <Taskbar />
    </div>
  );
};

export default Desktop;