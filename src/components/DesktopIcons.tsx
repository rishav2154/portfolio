import React from 'react';
import { motion } from 'framer-motion';
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
  const { openWindow, addCoins, visitApp } = useGameStore();

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
      {icons.map((icon) => (
        <motion.div
          key={icon.id}
          className="absolute pointer-events-auto cursor-pointer"
          style={{ left: icon.x, top: icon.y }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleIconClick(icon)}
        >
          <div className="flex flex-col items-center p-2 rounded hover:bg-white hover:bg-opacity-20 transition-colors">
            <div className="mario-block w-12 h-12 flex items-center justify-center mb-2">
              <icon.icon className="w-6 h-6 text-black" />
            </div>
            <span className="text-xs text-white text-center font-bold shadow-text max-w-16 break-words">
              {icon.title}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DesktopIcons;