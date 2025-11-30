import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import Taskbar from './Taskbar';
import WindowManager from './WindowManager';
import DesktopIcons from './DesktopIcons';
import FloatingParticles from './FloatingParticles';
import { workspaces } from '../data/portfolioData';

const Desktop: React.FC = () => {
  const { currentWorkspace, coins } = useGameStore();
  
  const workspace = workspaces.find(w => w.id === currentWorkspace) || workspaces[0];

  return (
    <div 
      className="h-screen w-screen relative overflow-hidden transition-all duration-1000"
      style={{ background: workspace.background }}
    >
      {/* Floating Particles */}
      <FloatingParticles />
      
      {/* Floating Coins */}
      {coins > 0 && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(Math.min(coins, 10))].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              style={{
                left: `${10 + (i * 8)}%`,
                top: `${20 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [-5, 5, -5],
                rotate: [0, 360],
              }}
              transition={{
                duration: 3 + (i * 0.5),
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              🪙
            </motion.div>
          ))}
        </div>
      )}

      {/* Desktop Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {currentWorkspace === 'overworld' && (
          <>
            {/* Clouds */}
            <motion.div 
              className="absolute top-16 left-16 w-24 h-16 bg-white rounded-full opacity-80 shadow-lg"
              animate={{ x: [-5, 5, -5] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div 
              className="absolute top-24 right-24 w-32 h-20 bg-white rounded-full opacity-80 shadow-lg"
              animate={{ x: [5, -5, 5] }}
              transition={{ duration: 10, repeat: Infinity }}
            />
            <motion.div 
              className="absolute top-40 left-1/2 w-28 h-18 bg-white rounded-full opacity-80 shadow-lg"
              animate={{ x: [-3, 3, -3] }}
              transition={{ duration: 12, repeat: Infinity }}
            />
            
            {/* Animated Flowers */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${20 + i * 15}%`,
                  bottom: '60px',
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [-5, 5, -5],
                }}
                transition={{
                  duration: 2 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                🌸
              </motion.div>
            ))}
            
            {/* Hills */}
            <motion.div 
              className="absolute bottom-16 left-8 w-48 h-32 bg-gradient-to-t from-green-600 to-green-400 rounded-t-full shadow-xl"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div 
              className="absolute bottom-16 right-16 w-64 h-40 bg-gradient-to-t from-green-700 to-green-500 rounded-t-full shadow-xl"
              animate={{ scale: [1, 1.01, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            
            {/* Sun */}
            <motion.div 
              className="absolute top-8 right-8 w-16 h-16 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full shadow-2xl"
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity }
              }}
            >
              <div className="absolute inset-2 bg-yellow-200 rounded-full opacity-50" />
            </motion.div>
            
            {/* Grass patches */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-green-600 to-transparent"></div>
          </>
        )}
        
        {currentWorkspace === 'underground' && (
          <>
            {/* Glowing Crystals */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-3xl"
                style={{
                  left: `${30 + i * 25}%`,
                  top: `${40 + i * 15}%`,
                }}
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              >
                💎
              </motion.div>
            ))}
            
            {/* Stalactites */}
            <motion.div 
              className="absolute top-0 left-20 w-4 h-16 bg-gradient-to-b from-gray-500 to-gray-700 rounded-b-full shadow-lg"
              animate={{ scaleY: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div 
              className="absolute top-0 left-40 w-6 h-24 bg-gradient-to-b from-gray-600 to-gray-800 rounded-b-full shadow-lg"
              animate={{ scaleY: [1, 1.03, 1] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            />
            <motion.div 
              className="absolute top-0 right-32 w-5 h-20 bg-gradient-to-b from-gray-500 to-gray-700 rounded-b-full shadow-lg"
              animate={{ scaleY: [1, 1.04, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
            />
            
            {/* Cave walls */}
            <motion.div 
              className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-900 to-transparent"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div 
              className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-900 to-transparent"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 4, repeat: Infinity, delay: 2 }}
            />
          </>
        )}
        
        {currentWorkspace === 'castle' && (
          <>
            {/* Fire Effects */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${15 + i * 20}%`,
                  bottom: `${20 + i * 10}px`,
                }}
                animate={{
                  y: [-10, -20, -10],
                  opacity: [0.7, 1, 0.7],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 1 + i * 0.2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                🔥
              </motion.div>
            ))}
            
            {/* Lava bubbles */}
            <motion.div 
              className="absolute bottom-20 left-20 w-8 h-8 bg-gradient-to-br from-red-400 to-red-600 rounded-full shadow-lg"
              animate={{ 
                y: [-10, 10, -10],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div 
              className="absolute bottom-32 right-40 w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-full shadow-lg"
              animate={{ 
                y: [10, -10, 10],
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            />
            
            {/* Castle towers */}
            <motion.div 
              className="absolute bottom-0 left-1/4 w-16 h-32 bg-gradient-to-t from-gray-800 to-gray-600 shadow-2xl"
              animate={{ scaleY: [1, 1.02, 1] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            <motion.div 
              className="absolute bottom-0 right-1/4 w-20 h-40 bg-gradient-to-t from-gray-900 to-gray-700 shadow-2xl"
              animate={{ scaleY: [1, 1.01, 1] }}
              transition={{ duration: 7, repeat: Infinity, delay: 1 }}
            />
            
            {/* Lava glow */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-red-600 to-transparent"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </>
        )}
        
        {currentWorkspace === 'sky' && (
          <>
            {/* Flying Birds */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-xl"
                style={{
                  left: '-50px',
                  top: `${30 + i * 20}%`,
                }}
                animate={{
                  x: [0, window.innerWidth + 100],
                  y: [-10, 10, -10],
                }}
                transition={{
                  x: { duration: 15 + i * 5, repeat: Infinity, ease: "linear" },
                  y: { duration: 2, repeat: Infinity },
                }}
              >
                🦅
              </motion.div>
            ))}
            
            {/* Floating platforms */}
            <motion.div 
              className="absolute top-32 left-24 w-32 h-4 bg-gradient-to-r from-green-400 to-green-500 rounded shadow-xl"
              animate={{ 
                y: [-2, 2, -2],
                rotateX: [-2, 2, -2],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div 
              className="absolute top-48 right-32 w-40 h-4 bg-gradient-to-r from-green-500 to-green-600 rounded shadow-xl"
              animate={{ 
                y: [2, -2, 2],
                rotateX: [2, -2, 2],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div 
              className="absolute bottom-32 left-1/2 w-36 h-4 bg-gradient-to-r from-green-400 to-green-500 rounded shadow-xl"
              animate={{ 
                y: [-1, 1, -1],
                rotateX: [-1, 1, -1],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            
            {/* Rainbow */}
            <motion.div 
              className="absolute top-16 left-1/4 w-64 h-32 bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400 rounded-full transform rotate-12 shadow-lg"
              animate={{ 
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
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