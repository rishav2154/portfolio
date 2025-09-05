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
      className="h-screen w-screen relative overflow-hidden"
      style={{ background: workspace.background }}
    >
      {/* Desktop Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {currentWorkspace === 'overworld' && (
          <>
            {/* Clouds */}
            <div className="absolute top-16 left-16 w-24 h-16 bg-white rounded-full opacity-80"></div>
            <div className="absolute top-24 right-24 w-32 h-20 bg-white rounded-full opacity-80"></div>
            <div className="absolute top-40 left-1/2 w-28 h-18 bg-white rounded-full opacity-80"></div>
            
            {/* Hills */}
            <div className="absolute bottom-16 left-8 w-48 h-32 bg-green-400 rounded-t-full"></div>
            <div className="absolute bottom-16 right-16 w-64 h-40 bg-green-500 rounded-t-full"></div>
          </>
        )}
        
        {currentWorkspace === 'underground' && (
          <>
            {/* Stalactites */}
            <div className="absolute top-0 left-20 w-4 h-16 bg-gray-600 rounded-b-full"></div>
            <div className="absolute top-0 left-40 w-6 h-24 bg-gray-700 rounded-b-full"></div>
            <div className="absolute top-0 right-32 w-5 h-20 bg-gray-600 rounded-b-full"></div>
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
          </>
        )}
        
        {currentWorkspace === 'sky' && (
          <>
            {/* Floating platforms */}
            <div className="absolute top-32 left-24 w-32 h-4 bg-green-400 rounded"></div>
            <div className="absolute top-48 right-32 w-40 h-4 bg-green-500 rounded"></div>
            <div className="absolute bottom-32 left-1/2 w-36 h-4 bg-green-400 rounded"></div>
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