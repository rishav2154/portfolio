import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, GitCommitVertical as GitCommit, GitMerge, GitPullRequest, Plus, Download, Upload, RefreshCw, Terminal, FileText } from 'lucide-react';
import { soundManager } from '../../utils/soundManager';

const GitManagerApp: React.FC = () => {
  const [currentBranch, setCurrentBranch] = useState('main');
  const [commitMessage, setCommitMessage] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const branches = [
    { name: 'main', commits: 45, lastCommit: '2 hours ago', active: true },
    { name: 'feature/portfolio-ui', commits: 12, lastCommit: '1 day ago', active: false },
    { name: 'fix/terminal-commands', commits: 8, lastCommit: '3 days ago', active: false },
    { name: 'develop', commits: 67, lastCommit: '5 hours ago', active: false }
  ];

  const commits = [
    {
      hash: 'a1b2c3d',
      message: 'Add Three.js 3D elements to start menu',
      author: 'Rishav Jaiswal',
      time: '2 hours ago',
      changes: '+156 -23'
    },
    {
      hash: 'e4f5g6h',
      message: 'Implement functional browser app with search',
      author: 'Rishav Jaiswal',
      time: '1 day ago',
      changes: '+289 -45'
    },
    {
      hash: 'i7j8k9l',
      message: 'Enhanced terminal commands and about page',
      author: 'Rishav Jaiswal',
      time: '2 days ago',
      changes: '+178 -67'
    },
    {
      hash: 'm0n1o2p',
      message: 'Quick boot optimization and UI improvements',
      author: 'Rishav Jaiswal',
      time: '3 days ago',
      changes: '+234 -89'
    }
  ];

  const changedFiles = [
    { name: 'src/components/StartMenu.tsx', status: 'modified', changes: '+45 -12' },
    { name: 'src/components/apps/BrowserApp.tsx', status: 'added', changes: '+289 -0' },
    { name: 'src/components/BootScreen.tsx', status: 'modified', changes: '+23 -8' },
    { name: 'package.json', status: 'modified', changes: '+2 -0' },
    { name: 'src/index.css', status: 'modified', changes: '+67 -15' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'added': return 'text-green-400';
      case 'modified': return 'text-yellow-400';
      case 'deleted': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'added': return '+';
      case 'modified': return 'M';
      case 'deleted': return 'D';
      default: return '?';
    }
  };

  const handleCommit = () => {
    if (commitMessage.trim() && selectedFiles.length > 0) {
      soundManager.play('powerup');
      setCommitMessage('');
      setSelectedFiles([]);
      console.log('Committed:', commitMessage);
    }
  };

  const switchBranch = (branchName: string) => {
    setCurrentBranch(branchName);
    soundManager.play('warp');
  };

  const toggleFileSelection = (fileName: string) => {
    setSelectedFiles(prev =>
      prev.includes(fileName)
        ? prev.filter(f => f !== fileName)
        : [...prev, fileName]
    );
  };

  return (
    <div className="h-full bg-gray-900 text-white flex">
      {/* Sidebar */}
      <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <GitBranch className="w-5 h-5" />
            Git Manager
          </h2>
        </div>

        {/* Branches */}
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-sm font-bold mb-3 text-gray-400">BRANCHES</h3>
          <div className="space-y-1">
            {branches.map((branch) => (
              <motion.div
                key={branch.name}
                whileHover={{ scale: 1.02, x: 5 }}
                onClick={() => switchBranch(branch.name)}
                className={`p-3 rounded cursor-pointer ${
                  currentBranch === branch.name 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GitBranch className="w-4 h-4" />
                    <span className="text-sm font-medium">{branch.name}</span>
                    {currentBranch === branch.name && (
                      <span className="text-xs bg-green-500 px-1 rounded">current</span>
                    )}
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>{branch.commits} commits</span>
                  <span>{branch.lastCommit}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full mt-3 p-2 bg-green-600 hover:bg-green-700 rounded text-sm font-bold flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Branch
          </motion.button>
        </div>

        {/* Quick Actions */}
        <div className="p-4">
          <h3 className="text-sm font-bold mb-3 text-gray-400">ACTIONS</h3>
          <div className="space-y-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Pull
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-2 bg-purple-600 hover:bg-purple-700 rounded text-sm font-bold flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Push
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-2 bg-gray-600 hover:bg-gray-500 rounded text-sm font-bold flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Fetch
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GitCommit className="w-6 h-6" />
              <h1 className="text-xl font-bold">mario-portfolio</h1>
              <span className="px-2 py-1 bg-blue-600 rounded text-xs font-bold">
                {currentBranch}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded"
              >
                <Terminal className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded"
              >
                <FileText className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex">
          {/* Changes Panel */}
          <div className="w-1/2 border-r border-gray-700 flex flex-col">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-bold">Changes</h3>
              <p className="text-sm text-gray-400">{changedFiles.length} files changed</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-2">
                {changedFiles.map((file, index) => (
                  <motion.div
                    key={file.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => toggleFileSelection(file.name)}
                    className={`p-3 rounded cursor-pointer border ${
                      selectedFiles.includes(file.name)
                        ? 'bg-blue-900 border-blue-500'
                        : 'bg-gray-800 border-gray-600 hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedFiles.includes(file.name)}
                          onChange={() => toggleFileSelection(file.name)}
                          className="rounded"
                        />
                        <span className={`text-xs font-bold ${getStatusColor(file.status)}`}>
                          {getStatusIcon(file.status)}
                        </span>
                        <span className="text-sm font-medium">{file.name}</span>
                      </div>
                      <span className="text-xs text-gray-400">{file.changes}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Commit Section */}
            <div className="p-4 border-t border-gray-700">
              <textarea
                value={commitMessage}
                onChange={(e) => setCommitMessage(e.target.value)}
                placeholder="Enter commit message..."
                className="w-full h-20 bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm resize-none"
              />
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCommit}
                disabled={!commitMessage.trim() || selectedFiles.length === 0}
                className="w-full mt-3 p-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded font-bold flex items-center justify-center gap-2"
              >
                <GitCommit className="w-4 h-4" />
                Commit ({selectedFiles.length} files)
              </motion.button>
            </div>
          </div>

          {/* Commit History */}
          <div className="w-1/2 flex flex-col">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-bold">Commit History</h3>
              <p className="text-sm text-gray-400">{commits.length} commits on {currentBranch}</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-3">
                {commits.map((commit, index) => (
                  <motion.div
                    key={commit.hash}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 bg-gray-800 rounded border border-gray-700 hover:bg-gray-750"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-1">{commit.message}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <span className="font-mono bg-gray-700 px-2 py-1 rounded">
                            {commit.hash}
                          </span>
                          <span>{commit.author}</span>
                          <span>{commit.time}</span>
                        </div>
                      </div>
                      <span className="text-xs text-green-400 font-mono">
                        {commit.changes}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitManagerApp;