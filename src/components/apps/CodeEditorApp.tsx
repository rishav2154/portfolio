import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Save, Download, Upload, Settings, FileText, Folder, Search, Copy, Scissors, Undo, Redo } from 'lucide-react';
import { soundManager } from '../../utils/soundManager';

const CodeEditorApp: React.FC = () => {
  const [activeFile, setActiveFile] = useState('app.js');
  const [code, setCode] = useState(`// Welcome to Mario Code Editor! 🍄
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MarioApp = () => {
  const [coins, setCoins] = useState(0);
  const [powerUp, setPowerUp] = useState('small');

  const collectCoin = () => {
    setCoins(prev => prev + 1);
    console.log('🪙 Coin collected!');
  };

  const usePowerUp = (type) => {
    setPowerUp(type);
    console.log(\`🍄 Power-up activated: \${type}\`);
  };

  useEffect(() => {
    console.log('🎮 Mario App initialized!');
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mario-app"
    >
      <h1>It's-a me, Mario! 🍄</h1>
      <div className="stats">
        <p>Coins: {coins} 🪙</p>
        <p>Power-up: {powerUp}</p>
      </div>
      <button onClick={collectCoin}>
        Collect Coin
      </button>
      <button onClick={() => usePowerUp('super')}>
        Use Super Mushroom
      </button>
    </motion.div>
  );
};

export default MarioApp;`);
  
  const [output, setOutput] = useState('');
  const [theme, setTheme] = useState('dark');
  const [fontSize, setFontSize] = useState(14);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const files = [
    { name: 'app.js', type: 'javascript', icon: '📄' },
    { name: 'styles.css', type: 'css', icon: '🎨' },
    { name: 'package.json', type: 'json', icon: '📦' },
    { name: 'README.md', type: 'markdown', icon: '📖' }
  ];

  const runCode = () => {
    soundManager.play('powerup');
    setOutput('🚀 Code executed successfully!\n✅ No errors found\n🍄 Mario says: "Wahoo!"');
  };

  const saveFile = () => {
    soundManager.play('coin');
    setOutput('💾 File saved successfully!');
  };

  const formatCode = () => {
    soundManager.play('jump');
    // Simple code formatting
    const formatted = code
      .replace(/;/g, ';\n')
      .replace(/{/g, '{\n  ')
      .replace(/}/g, '\n}');
    setCode(formatted);
    setOutput('✨ Code formatted!');
  };

  const getLanguageColor = (type: string) => {
    switch (type) {
      case 'javascript': return 'text-yellow-400';
      case 'css': return 'text-blue-400';
      case 'json': return 'text-green-400';
      case 'markdown': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="h-full bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="text-2xl"
            >
              💻
            </motion.div>
            <h1 className="text-lg font-bold">Mario Code Editor</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={runCode}
              className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm font-bold flex items-center gap-1"
            >
              <Play className="w-4 h-4" />
              Run
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={saveFile}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold flex items-center gap-1"
            >
              <Save className="w-4 h-4" />
              Save
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={formatCode}
              className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm font-bold"
            >
              Format
            </motion.button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 p-4">
          <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
            <Folder className="w-4 h-4" />
            Project Files
          </h3>
          
          <div className="space-y-1">
            {files.map((file) => (
              <motion.div
                key={file.name}
                whileHover={{ scale: 1.02, x: 5 }}
                onClick={() => setActiveFile(file.name)}
                className={`p-2 rounded cursor-pointer flex items-center gap-2 text-sm ${
                  activeFile === file.name 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-gray-700'
                }`}
              >
                <span>{file.icon}</span>
                <span className={getLanguageColor(file.type)}>{file.name}</span>
              </motion.div>
            ))}
          </div>

          {/* Settings */}
          <div className="mt-6">
            <h4 className="text-sm font-bold mb-2">Settings</h4>
            <div className="space-y-2">
              <div>
                <label className="text-xs text-gray-400">Theme</label>
                <select 
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs"
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                  <option value="mario">Mario</option>
                </select>
              </div>
              
              <div>
                <label className="text-xs text-gray-400">Font Size</label>
                <input
                  type="range"
                  min="10"
                  max="20"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-full"
                />
                <span className="text-xs text-gray-400">{fontSize}px</span>
              </div>
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 flex flex-col">
          {/* Tab Bar */}
          <div className="bg-gray-800 border-b border-gray-700 px-4 py-2">
            <div className="flex items-center gap-2">
              <div className="bg-gray-700 px-3 py-1 rounded-t text-sm flex items-center gap-2">
                <FileText className="w-4 h-4" />
                {activeFile}
                <button className="text-gray-400 hover:text-white">×</button>
              </div>
            </div>
          </div>

          {/* Code Area */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full bg-gray-900 text-white p-4 font-mono resize-none focus:outline-none"
              style={{ fontSize: `${fontSize}px` }}
              placeholder="// Start coding your Mario adventure! 🍄"
            />
            
            {/* Line Numbers */}
            <div className="absolute left-0 top-0 bg-gray-800 text-gray-500 p-4 font-mono text-right border-r border-gray-700" style={{ fontSize: `${fontSize}px` }}>
              {code.split('\n').map((_, index) => (
                <div key={index} className="leading-6">
                  {index + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Output Panel */}
          <div className="h-32 bg-black border-t border-gray-700 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-bold">Output</span>
            </div>
            <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
              {output || '// Output will appear here... 🎮'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditorApp;