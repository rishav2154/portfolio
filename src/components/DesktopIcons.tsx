import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import { soundManager } from '../utils/soundManager';
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  Code, 
  FolderOpen, 
  FileText, 
  Award, 
  Mail, 
  Terminal,
  Music,
  Image,
  Calculator,
  Calendar,
  Cloud,
  Trophy
} from 'lucide-react';

const DesktopIcons: React.FC = () => {
  const { openWindow, addCoins, visitApp, coins } = useGameStore();

  const icons = [
    { id: 'about', title: 'About Me', icon: User, x: 50, y: 100 },
    { id: 'education', title: 'Education', icon: GraduationCap, x: 50, y: 200 },
    { id: 'experience', title: 'Experience', icon: Briefcase, x: 50, y: 300 },
    { id: 'skills', title: 'Skills', icon: Code, x: 50, y: 400 },
    { id: 'projects', title: 'Projects', icon: FolderOpen, x: 200, y: 100 },
    { id: 'resume', title: 'Resume', icon: FileText, x: 200, y: 200 },
    { id: 'certificates', title: 'Certificates', icon: Award, x: 200, y: 300 },
    { id: 'contact', title: 'Contact', icon: Mail, x: 200, y: 400 },
    { id: 'terminal', title: 'Terminal', icon: Terminal, x: 350, y: 100 },
    { id: 'music', title: 'Music Player', icon: Music, x: 350, y: 200 },
    { id: 'gallery', title: 'Photo Gallery', icon: Image, x: 350, y: 300 },
    { id: 'calculator', title: 'Calculator', icon: Calculator, x: 350, y: 400 },
    { id: 'calendar', title: 'Calendar', icon: Calendar, x: 500, y: 100 },
    { id: 'weather', title: 'Weather', icon: Cloud, x: 500, y: 200 },
    { id: 'achievements', title: 'Achievements', icon: Trophy, x: 500, y: 300 }
  ];

  const handleIconClick = (icon: typeof icons[0]) => {
    soundManager.play('coin');
    addCoins(1);
    visitApp(icon.id);

    openWindow({
      id: `${icon.id}-${Date.now()}`,
      title: icon.title,
      component: icon.id,
      x: Math.random() * 200 + 100,
      y: Math.random() * 200 + 100,
      width: 600,
      height: 400,
      minimized: false,
      maximized: false,
      resizable: true
    });
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Coin Collection Effect */}
      <AnimatePresence>
        {coins > 0 && (
          <motion.div
            className="absolute top-4 left-4 z-50 pointer-events-none"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
          >
            <div className="bg-yellow-400 text-black px-3 py-1 rounded-full font-bold text-sm shadow-lg">
              🪙 {coins} Coins
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {icons.map((icon) => (
        <motion.div
          key={icon.id}
          className="absolute pointer-events-auto cursor-pointer"
          style={{ left: icon.x, top: icon.y }}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ 
            delay: Math.random() * 0.5,
            type: "spring",
            stiffness: 200,
            damping: 15
          }}
          whileHover={{ 
            scale: 1.15,
            rotate: [0, -5, 5, 0],
            transition: { duration: 0.3 }
          }}
          whileTap={{ 
            scale: 0.85,
            rotate: 15
          }}
          onClick={() => handleIconClick(icon)}
        >
          <motion.div 
            className="flex flex-col items-center p-3 rounded-xl hover:bg-white hover:bg-opacity-20 transition-all duration-300"
            whileHover={{ 
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
              y: -5
            }}
          >
            <motion.div 
              className="mario-block w-14 h-14 flex items-center justify-center mb-2 relative overflow-hidden"
              whileHover={{ 
                boxShadow: "0 0 20px rgba(255,255,0,0.5)",
                borderColor: "#FFD700"
              }}
            >
              {/* Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                whileHover={{ 
                  opacity: [0, 0.3, 0],
                  x: [-100, 100]
                }}
                transition={{ duration: 0.6 }}
              />
              <icon.icon className="w-6 h-6 text-black" />
            </motion.div>
            <motion.span 
              className="text-xs text-white text-center font-bold shadow-text max-w-16 break-words"
              whileHover={{ scale: 1.1 }}
            >
              {icon.title}
            </motion.span>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default DesktopIcons;