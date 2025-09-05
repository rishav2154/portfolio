import React from 'react';
import { motion, useDragControls } from 'framer-motion';
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
import SettingsApp from './apps/SettingsApp';
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
      settings: SettingsApp,
      achievements: AchievementsApp
    };

    return components[componentName] || AboutApp;
  };

  const AppComponent = getAppComponent(window.component);

  return (
    <motion.div
      key={window.id}
      className="mario-window absolute pointer-events-auto"
      style={{
        zIndex: window.zIndex,
        width: window.maximized ? '100vw' : window.width,
        height: window.maximized ? 'calc(100vh - 48px)' : window.height,
      }}
      initial={{ 
        x: window.x, 
        y: window.y,
        scale: 0.8,
        opacity: 0
      }}
      animate={{ 
        x: window.maximized ? 0 : window.x, 
        y: window.maximized ? 0 : window.y,
        scale: 1,
        opacity: 1
      }}
      exit={{ scale: 0.8, opacity: 0 }}
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
    >
      {/* Window Header */}
      <div 
        className="mario-window-header cursor-move"
        onPointerDown={(e) => !window.maximized && dragControls.start(e)}
      >
        <span className="font-bold">{window.title}</span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => minimizeWindow(window.id)}
            className="w-6 h-6 bg-yellow-400 hover:bg-yellow-300 border border-black rounded flex items-center justify-center"
          >
            <Minimize2 className="w-3 h-3 text-black" />
          </button>
          <button
            onClick={() => maximizeWindow(window.id)}
            className="w-6 h-6 bg-green-400 hover:bg-green-300 border border-black rounded flex items-center justify-center"
          >
            {window.maximized ? <Square className="w-3 h-3 text-black" /> : <Maximize2 className="w-3 h-3 text-black" />}
          </button>
          <button
            onClick={() => closeWindow(window.id)}
            className="w-6 h-6 bg-red-400 hover:bg-red-300 border border-black rounded flex items-center justify-center"
          >
            <X className="w-3 h-3 text-black" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div 
        className="flex-1 overflow-auto"
        style={{ 
          height: window.maximized 
            ? 'calc(100vh - 88px)' 
            : `${window.height - 40}px` 
        }}
      >
        <AppComponent />
      </div>

      {/* Resize Handle */}
      {window.resizable && !window.maximized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nw-resize"
          style={{ background: 'linear-gradient(135deg, transparent 0%, #666 100%)' }}
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
  );
};

export default WindowComponent;