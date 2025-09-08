import React from 'react';
import { motion, useDragControls, AnimatePresence } from 'framer-motion';
import { X, Minimize2, Maximize2, Square } from 'lucide-react';

// Import all app components
import AboutApp from './apps/AboutApp';
import EducationApp from './apps/EducationApp';
import ExperienceApp from './apps/ExperienceApp';
import SkillsApp from './apps/SkillsApp';
import ProjectsApp from './apps/ProjectsApp';
import ResumeApp from './apps/ResumeApp';
import CertificatesApp from './apps/CertificatesApp';
import ContactApp from './apps/ContactApp';
import TerminalApp from './apps/TerminalApp';
import MusicApp from './apps/MusicApp';
import GalleryApp from './apps/GalleryApp';
import CalculatorApp from './apps/CalculatorApp';
import CalendarApp from './apps/CalendarApp';
import WeatherApp from './apps/WeatherApp';
import AchievementsApp from './apps/AchievementsApp';

interface WindowComponentProps {
  window: any;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  updateWindow: (id: string, updates: any) => void;
  focusWindow: (id: string) => void;
}

const WindowComponent: React.FC<WindowComponentProps> = ({
  window,
  closeWindow,
  minimizeWindow,
  maximizeWindow,
  updateWindow,
  focusWindow
}) => {
  const dragControls = useDragControls();

  const getAppComponent = (componentName: string) => {
    const components: { [key: string]: React.ComponentType } = {
      about: AboutApp,
      education: EducationApp,
      experience: ExperienceApp,
      skills: SkillsApp,
      projects: ProjectsApp,
      resume: ResumeApp,
      certificates: CertificatesApp,
      contact: ContactApp,
      terminal: TerminalApp,
      music: MusicApp,
      gallery: GalleryApp,
      calculator: CalculatorApp,
      calendar: CalendarApp,
      weather: WeatherApp,
      achievements: AchievementsApp
    };

    return components[componentName] || AboutApp;
  };

  const AppComponent = getAppComponent(window.component);

  return (
    <AnimatePresence>
    <motion.div
      key={window.id}
      className="mario-window absolute pointer-events-auto backdrop-blur-sm"
      style={{
        zIndex: window.zIndex,
        width: window.maximized ? '100vw' : window.width,
        height: window.maximized ? 'calc(100vh - 48px)' : window.height,
      }}
      initial={{ 
        x: window.x, 
        y: window.y,
        scale: 0.7,
        opacity: 0,
        rotate: -5
      }}
      animate={{ 
        x: window.maximized ? 0 : window.x, 
        y: window.maximized ? 0 : window.y,
        scale: 1,
        opacity: 1,
        rotate: 0
      }}
      exit={{ 
        scale: 0.7, 
        opacity: 0,
        rotate: 5,
        transition: { duration: 0.2 }
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20
      }}
      drag={!window.maximized}
      dragControls={dragControls}
      dragListener={false}
      dragElastic={0}
      dragConstraints={{
        left: 0,
        right: window.innerWidth - window.width,
        top: 0,
        bottom: window.innerHeight - window.height - 48
      }}
      onDragEnd={(_, info) => {
        updateWindow(window.id, {
          x: Math.max(0, window.x + info.offset.x),
          y: Math.max(0, window.y + info.offset.y)
        });
      }}
      onClick={() => focusWindow(window.id)}
      whileHover={{
        boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
      }}
    >
      {/* Window Header */}
      <div 
        className="mario-window-header cursor-move relative overflow-hidden"
        onPointerDown={(e) => !window.maximized && dragControls.start(e)}
      >
        {/* Header Shine Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
          animate={{ 
            x: [-100, 300],
            opacity: [0, 0.1, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatDelay: 5
          }}
        />
        <span className="font-bold">{window.title}</span>
        <div className="flex items-center gap-1">
          <motion.button
            whileHover={{ 
              scale: 1.1,
              backgroundColor: "#FCD34D"
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => minimizeWindow(window.id)}
            className="w-6 h-6 bg-yellow-400 border border-black rounded flex items-center justify-center transition-colors duration-200"
          >
            <Minimize2 className="w-3 h-3 text-black" />
          </motion.button>
          <motion.button
            whileHover={{ 
              scale: 1.1,
              backgroundColor: "#4ADE80"
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => maximizeWindow(window.id)}
            className="w-6 h-6 bg-green-400 border border-black rounded flex items-center justify-center transition-colors duration-200"
          >
            {window.maximized ? <Square className="w-3 h-3 text-black" /> : <Maximize2 className="w-3 h-3 text-black" />}
          </motion.button>
          <motion.button
            whileHover={{ 
              scale: 1.1,
              backgroundColor: "#F87171",
              rotate: 90
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => closeWindow(window.id)}
            className="w-6 h-6 bg-red-400 border border-black rounded flex items-center justify-center transition-colors duration-200"
          >
            <X className="w-3 h-3 text-black" />
          </motion.button>
        </div>
      </div>

      {/* Window Content */}
      <motion.div 
        className="flex-1 overflow-auto"
        style={{ 
          height: window.maximized 
            ? 'calc(100vh - 88px)' 
            : `${window.height - 40}px` 
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <AppComponent />
      </motion.div>

      {/* Resize Handle */}
      {window.resizable && !window.maximized && (
        <motion.div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nw-resize opacity-50 hover:opacity-100"
          style={{ background: 'linear-gradient(135deg, transparent 0%, #666 100%)' }}
          whileHover={{ scale: 1.2 }}
          onPointerDown={(e) => {
            e.preventDefault();
            const startX = e.clientX;
            const startY = e.clientY;
            const startWidth = window.width;
            const startHeight = window.height;

            const handleResize = (e: PointerEvent) => {
              const newWidth = Math.max(300, startWidth + (e.clientX - startX));
              const newHeight = Math.max(200, startHeight + (e.clientY - startY));
              updateWindow(window.id, { width: newWidth, height: newHeight });
            };

            const handleStop = () => {
              document.removeEventListener('pointermove', handleResize);
              document.removeEventListener('pointerup', handleStop);
            };

            document.addEventListener('pointermove', handleResize);
            document.addEventListener('pointerup', handleStop);
          }}
        />
      )}
    </motion.div>
    </AnimatePresence>
  );
};

export default WindowComponent;