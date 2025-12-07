import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
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
  Trophy,
  Globe,
  Settings,
  Power,
  LogOut,
  Search
} from 'lucide-react';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ isOpen, onClose }) => {
  const { openWindow, addCoins, visitApp, coins, powerUp } = useGameStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cubesRef = useRef<THREE.Mesh[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems = [
    { id: 'about', title: 'About Me', icon: User, category: 'Personal' },
    { id: 'education', title: 'Education', icon: GraduationCap, category: 'Personal' },
    { id: 'experience', title: 'Experience', icon: Briefcase, category: 'Personal' },
    { id: 'skills', title: 'Skills', icon: Code, category: 'Technical' },
    { id: 'projects', title: 'Projects', icon: FolderOpen, category: 'Technical' },
    { id: 'resume', title: 'Resume', icon: FileText, category: 'Personal' },
    { id: 'certificates', title: 'Certificates', icon: Award, category: 'Personal' },
    { id: 'contact', title: 'Contact', icon: Mail, category: 'Personal' },
    { id: 'terminal', title: 'Terminal', icon: Terminal, category: 'Tools' },
    { id: 'music', title: 'Music Player', icon: Music, category: 'Entertainment' },
    { id: 'gallery', title: 'Photo Gallery', icon: Image, category: 'Entertainment' },
    { id: 'calculator', title: 'Calculator', icon: Calculator, category: 'Tools' },
    { id: 'calendar', title: 'Calendar', icon: Calendar, category: 'Tools' },
    { id: 'weather', title: 'Weather', icon: Cloud, category: 'Tools' },
    { id: 'achievements', title: 'Achievements', icon: Trophy, category: 'Gaming' },
    { id: 'browser', title: 'Browser', icon: Globe, category: 'Tools' }
  ];

  const categories = ['All', 'Personal', 'Technical', 'Tools', 'Entertainment', 'Gaming'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const searchFilteredItems = filteredItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current || !isOpen) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);
    
    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Create floating cubes
    const cubes: THREE.Mesh[] = [];
    const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    
    for (let i = 0; i < 15; i++) {
      const materials = [
        new THREE.MeshBasicMaterial({ color: 0xff6b6b, transparent: true, opacity: 0.8 }),
        new THREE.MeshBasicMaterial({ color: 0x4ecdc4, transparent: true, opacity: 0.8 }),
        new THREE.MeshBasicMaterial({ color: 0x45b7d1, transparent: true, opacity: 0.8 }),
        new THREE.MeshBasicMaterial({ color: 0x96ceb4, transparent: true, opacity: 0.8 }),
        new THREE.MeshBasicMaterial({ color: 0xfeca57, transparent: true, opacity: 0.8 }),
        new THREE.MeshBasicMaterial({ color: 0xff9ff3, transparent: true, opacity: 0.8 })
      ];
      
      const cube = new THREE.Mesh(cubeGeometry, materials);
      cube.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5
      );
      cube.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      scene.add(cube);
      cubes.push(cube);
    }
    
    cubesRef.current = cubes;
    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      cubes.forEach((cube, index) => {
        cube.rotation.x += 0.01 + index * 0.001;
        cube.rotation.y += 0.01 + index * 0.001;
        cube.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
        cube.position.x += Math.cos(Date.now() * 0.001 + index) * 0.001;
      });
      
      renderer.render(scene, camera);
    };
    
    animate();

    // Handle resize
    const handleResize = () => {
      if (canvas && renderer && camera) {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (renderer) {
        renderer.dispose();
      }
    };
  }, [isOpen]);

  const handleItemClick = (item: typeof menuItems[0]) => {
    soundManager.play('coin');
    addCoins(1);
    visitApp(item.id);

    openWindow({
      id: `${item.id}-${Date.now()}`,
      title: item.title,
      component: item.id,
      x: Math.random() * 200 + 100,
      y: Math.random() * 200 + 100,
      width: 600,
      height: 400,
      minimized: false,
      maximized: false,
      resizable: true
    });

    onClose();
  };

  const handlePowerOff = () => {
    soundManager.play('warp');
    // Simulate power off
    document.body.style.transition = 'opacity 1s ease-out';
    document.body.style.opacity = '0';
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Start Menu */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-14 left-4 w-96 h-[600px] mario-window z-50 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 3D Background Canvas */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 1 }}
            />

            {/* Menu Content */}
            <div className="relative z-10 h-full flex flex-col bg-gradient-to-br from-blue-900/90 via-purple-900/90 to-indigo-900/90 backdrop-blur-md">
              {/* Header */}
              <div className="p-4 border-b border-white/20">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-white font-bold text-xl border-2 border-white shadow-lg"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    R
                  </motion.div>
                  <div>
                    <h2 className="text-white font-bold text-lg">Rishav Jaiswal</h2>
                    <p className="text-white/70 text-sm">Portfolio OS</p>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                  <input
                    type="text"
                    placeholder="Search apps..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="px-4 py-2 border-b border-white/20">
                <div className="flex gap-1 overflow-x-auto">
                  {categories.map((category) => (
                    <motion.button
                      key={category}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1 text-xs font-bold rounded whitespace-nowrap transition-colors ${
                        selectedCategory === category
                          ? 'bg-mario-blue text-white'
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Apps Grid */}
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="grid grid-cols-3 gap-3">
                  {searchFilteredItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05, z: 10 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleItemClick(item)}
                      className="flex flex-col items-center p-3 rounded-lg hover:bg-white/10 cursor-pointer transition-all duration-200 group"
                    >
                      <div className="w-12 h-12 mario-block flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <item.icon className="w-6 h-6 text-black" />
                      </div>
                      <span className="text-white text-xs text-center font-medium leading-tight">
                        {item.title}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-white/20">
                {/* User Stats */}
                <div className="flex justify-between items-center mb-3 text-xs text-white/70">
                  <div className="flex items-center gap-2">
                    <span>🪙 {coins}</span>
                    {powerUp && <span>{powerUp === 'super' ? '🍄' : powerUp === 'fire' ? '🔥' : '⭐'}</span>}
                  </div>
                  <div>Portfolio OS v1.0</div>
                </div>

                {/* System Buttons */}
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/10 hover:bg-white/20 rounded text-white text-xs font-bold transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePowerOff}
                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-500/80 hover:bg-red-500 rounded text-white text-xs font-bold transition-colors"
                  >
                    <Power className="w-4 h-4" />
                    Shutdown
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default StartMenu;