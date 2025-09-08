import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import Taskbar from './Taskbar';
import WindowManager from './WindowManager';
import DesktopIcons from './DesktopIcons';
import { workspaces } from '../data/portfolioData';

const Desktop: React.FC = () => {
  const { currentWorkspace, coins } = useGameStore();
  
  const workspace = workspaces.find(w => w.id === currentWorkspace) || workspaces[0];

  return (
    <div 
      className="h-screen w-screen relative overflow-hidden"
      style={{ background: workspace.background }}
    >
      {/* Floating Coins Animation */}
      <AnimatePresence>
        {[...Array(Math.min(coins, 10))].map((_, i) => (
          <motion.div
            key={`coin-${i}`}
            className="absolute text-2xl pointer-events-none z-10"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 50,
              rotate: 0,
              scale: 0
            }}
            animate={{ 
              y: -50,
              rotate: 360,
              scale: [0, 1, 1, 0],
              x: Math.random() * window.innerWidth
            }}
            transition={{ 
              duration: 4 + Math.random() * 2,
              delay: i * 0.5,
              repeat: Infinity,
              repeatDelay: 10
            }}
          >
            🪙
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Particle System */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              x: [-5, 5, -5],
              opacity: [0.1, 0.6, 0.1],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
      {/* Desktop Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {currentWorkspace === 'overworld' && (
          <>
            {/* Clouds */}
            <motion.div 
              className="absolute top-16 left-16 w-24 h-16 bg-white rounded-full opacity-80"
              animate={{ 
                x: [-5, 5, -5],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div 
              className="absolute top-24 right-24 w-32 h-20 bg-white rounded-full opacity-80"
              animate={{ 
                x: [5, -5, 5],
                y: [-2, 2, -2]
              }}
              transition={{ duration: 10, repeat: Infinity }}
            />
            <motion.div 
              className="absolute top-40 left-1/2 w-28 h-18 bg-white rounded-full opacity-80"
              animate={{ 
                x: [-3, 3, -3],
                opacity: [0.8, 0.6, 0.8]
              }}
              transition={{ duration: 12, repeat: Infinity }}
            />
            
            {/* Hills */}
            <motion.div 
              className="absolute bottom-16 left-8 w-48 h-32 bg-green-400 rounded-t-full shadow-lg"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            <motion.div 
              className="absolute bottom-16 right-16 w-64 h-40 bg-green-500 rounded-t-full shadow-lg"
              animate={{ scale: [1, 1.01, 1] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            
            {/* Sun */}
            <motion.div 
              className="absolute top-8 right-8 w-16 h-16 bg-yellow-400 rounded-full shadow-lg"
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity }
              }}
            />
            
            {/* Grass patches */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-green-600 to-transparent"></div>
            
            {/* Animated Flowers */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`flower-${i}`}
                className="absolute bottom-16 text-2xl"
                style={{ left: `${20 + i * 15}%` }}
                animate={{ 
                  rotate: [-5, 5, -5],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2 + i * 0.5, 
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              >
                🌸
              </motion.div>
            ))}
          </>
        )}
        
        {currentWorkspace === 'underground' && (
          <>
            {/* Stalactites */}
            <motion.div 
              className="absolute top-0 left-20 w-4 h-16 bg-gray-600 rounded-b-full shadow-lg"
              animate={{ scaleY: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div 
              className="absolute top-0 left-40 w-6 h-24 bg-gray-700 rounded-b-full shadow-lg"
              animate={{ scaleY: [1, 1.03, 1] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            />
            <motion.div 
              className="absolute top-0 right-32 w-5 h-20 bg-gray-600 rounded-b-full shadow-lg"
              animate={{ scaleY: [1, 1.04, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
            />
            
            {/* Cave walls */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-800 to-transparent"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-800 to-transparent"></div>
            
            {/* Glowing Crystals */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`crystal-${i}`}
                className="absolute text-2xl"
                style={{ 
                  left: `${30 + i * 25}%`,
                  top: `${60 + i * 10}%`
                }}
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  delay: i * 0.7
                }}
              >
                💎
              </motion.div>
            ))}
          </>
        )}
        
        {currentWorkspace === 'castle' && (
          <>
            {/* Lava bubbles */}
            <motion.div 
              className="absolute bottom-20 left-20 w-8 h-8 bg-red-500 rounded-full"
              animate={{ 
                y: [-10, 10, -10],
                scale: [1, 1.3, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div 
              className="absolute bottom-32 right-40 w-6 h-6 bg-orange-500 rounded-full"
              animate={{ 
                y: [10, -10, 10],
                scale: [1, 1.4, 1]
              }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            />
            
            {/* Castle towers */}
            <motion.div 
              className="absolute bottom-0 left-1/4 w-16 h-32 bg-gray-700 shadow-lg"
              animate={{ scaleY: [1, 1.02, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <motion.div 
              className="absolute bottom-0 right-1/4 w-20 h-40 bg-gray-800 shadow-lg"
              animate={{ scaleY: [1, 1.01, 1] }}
              transition={{ duration: 6, repeat: Infinity, delay: 1 }}
            />
            
            {/* Lava glow */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-red-600 to-transparent opacity-50"></div>
            
            {/* Fire Effects */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`fire-${i}`}
                className="absolute bottom-12 text-2xl"
                style={{ left: `${25 + i * 20}%` }}
                animate={{ 
                  y: [-5, -15, -5],
                  opacity: [0.7, 1, 0.7],
                  scale: [1, 1.3, 1]
                }}
                transition={{ 
                  duration: 1 + i * 0.2, 
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              >
                🔥
              </motion.div>
            ))}
          </>
        )}
        
        {currentWorkspace === 'sky' && (
          <>
            {/* Floating platforms */}
            <motion.div 
              className="absolute top-32 left-24 w-32 h-4 bg-green-400 rounded shadow-lg"
              animate={{ 
                y: [-2, 2, -2],
                x: [-1, 1, -1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div 
              className="absolute top-48 right-32 w-40 h-4 bg-green-500 rounded shadow-lg"
              animate={{ 
                y: [2, -2, 2],
                x: [1, -1, 1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div 
              className="absolute bottom-32 left-1/2 w-36 h-4 bg-green-400 rounded shadow-lg"
              animate={{ 
                y: [-1, 1, -1],
                rotate: [-1, 1, -1]
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            
            {/* Rainbow */}
            <motion.div 
              className="absolute top-16 left-1/4 w-64 h-32 bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400 rounded-full opacity-30 transform rotate-12"
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            
            {/* Flying Birds */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`bird-${i}`}
                className="absolute text-xl"
                style={{ 
                  top: `${20 + i * 15}%`,
                  left: '-50px'
                }}
                animate={{ 
                  x: ['-50px', 'calc(100vw + 50px)'],
                  y: [-5, 5, -5]
                }}
                transition={{ 
                  x: { duration: 15 + i * 5, repeat: Infinity, ease: "linear" },
                  y: { duration: 2, repeat: Infinity }
                }}
              >
                🦅
              </motion.div>
            ))}
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