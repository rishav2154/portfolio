import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Search, Download, Trash2, RefreshCw, Star, ExternalLink, Shield, Zap } from 'lucide-react';
import { soundManager } from '../../utils/soundManager';

const PackageManagerApp: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('installed');
  const [installing, setInstalling] = useState<string[]>([]);

  const installedPackages = [
    {
      name: 'react',
      version: '18.3.1',
      description: 'A JavaScript library for building user interfaces',
      size: '2.3 MB',
      lastUpdated: '2 days ago',
      dependencies: 15,
      security: 'high'
    },
    {
      name: 'framer-motion',
      version: '12.23.12',
      description: 'A production-ready motion library for React',
      size: '1.8 MB',
      lastUpdated: '1 week ago',
      dependencies: 8,
      security: 'high'
    },
    {
      name: 'lucide-react',
      version: '0.542.0',
      description: 'Beautiful & consistent icon toolkit made by the community',
      size: '856 KB',
      lastUpdated: '3 days ago',
      dependencies: 2,
      security: 'high'
    },
    {
      name: 'zustand',
      version: '5.0.8',
      description: 'A small, fast and scalable bearbones state-management solution',
      size: '245 KB',
      lastUpdated: '1 week ago',
      dependencies: 0,
      security: 'high'
    },
    {
      name: 'three',
      version: '0.181.2',
      description: 'JavaScript 3D library',
      size: '4.2 MB',
      lastUpdated: '5 days ago',
      dependencies: 0,
      security: 'medium'
    }
  ];

  const availablePackages = [
    {
      name: 'axios',
      version: '1.7.2',
      description: 'Promise based HTTP client for the browser and node.js',
      downloads: '45M/week',
      stars: 105000,
      security: 'high'
    },
    {
      name: 'lodash',
      version: '4.17.21',
      description: 'A modern JavaScript utility library delivering modularity',
      downloads: '38M/week',
      stars: 59000,
      security: 'high'
    },
    {
      name: 'moment',
      version: '2.30.1',
      description: 'Parse, validate, manipulate, and display dates',
      downloads: '12M/week',
      stars: 47000,
      security: 'medium'
    },
    {
      name: 'socket.io',
      version: '4.7.5',
      description: 'Realtime application framework (Node.JS server)',
      downloads: '8M/week',
      stars: 61000,
      security: 'high'
    }
  ];

  const filteredInstalled = installedPackages.filter(pkg =>
    pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pkg.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAvailable = availablePackages.filter(pkg =>
    pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pkg.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSecurityColor = (security: string) => {
    switch (security) {
      case 'high': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getSecurityIcon = (security: string) => {
    switch (security) {
      case 'high': return '🛡️';
      case 'medium': return '⚠️';
      case 'low': return '🚨';
      default: return '❓';
    }
  };

  const installPackage = async (packageName: string) => {
    setInstalling(prev => [...prev, packageName]);
    soundManager.play('powerup');
    
    // Simulate installation
    setTimeout(() => {
      setInstalling(prev => prev.filter(name => name !== packageName));
      soundManager.play('coin');
    }, 2000);
  };

  const uninstallPackage = (packageName: string) => {
    soundManager.play('jump');
    console.log('Uninstalling:', packageName);
  };

  return (
    <div className="h-full bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Package className="w-8 h-8" />
            Package Manager
          </h1>
          
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-blue-600 hover:bg-blue-700 rounded"
            >
              <RefreshCw className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search packages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-1">
          {[
            { id: 'installed', label: 'Installed', count: installedPackages.length },
            { id: 'available', label: 'Browse', count: availablePackages.length }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded text-sm font-bold flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {tab.label}
              <span className="bg-gray-800 px-2 py-1 rounded text-xs">
                {tab.count}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'installed' ? (
          <div className="space-y-4">
            {filteredInstalled.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold">{pkg.name}</h3>
                      <span className="px-2 py-1 bg-blue-600 rounded text-xs font-bold">
                        v{pkg.version}
                      </span>
                      <span className={`text-xs ${getSecurityColor(pkg.security)}`}>
                        {getSecurityIcon(pkg.security)} {pkg.security}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-400 mb-3">{pkg.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                      <div>
                        <span className="text-gray-500">Size:</span>
                        <span className="ml-1 text-white">{pkg.size}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Dependencies:</span>
                        <span className="ml-1 text-white">{pkg.dependencies}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Updated:</span>
                        <span className="ml-1 text-white">{pkg.lastUpdated}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Status:</span>
                        <span className="ml-1 text-green-400">Installed</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-gray-700 hover:bg-gray-600 rounded"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => uninstallPackage(pkg.name)}
                      className="p-2 bg-red-600 hover:bg-red-700 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAvailable.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold">{pkg.name}</h3>
                      <span className="px-2 py-1 bg-green-600 rounded text-xs font-bold">
                        v{pkg.version}
                      </span>
                      <span className={`text-xs ${getSecurityColor(pkg.security)}`}>
                        {getSecurityIcon(pkg.security)} {pkg.security}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-400 mb-3">{pkg.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                      <div className="flex items-center gap-1">
                        <Download className="w-3 h-3 text-blue-400" />
                        <span className="text-gray-500">Downloads:</span>
                        <span className="text-white">{pkg.downloads}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400" />
                        <span className="text-gray-500">Stars:</span>
                        <span className="text-white">{pkg.stars.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Shield className="w-3 h-3 text-green-400" />
                        <span className="text-gray-500">Security:</span>
                        <span className={getSecurityColor(pkg.security)}>{pkg.security}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-gray-700 hover:bg-gray-600 rounded"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => installPackage(pkg.name)}
                      disabled={installing.includes(pkg.name)}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded font-bold flex items-center gap-2"
                    >
                      {installing.includes(pkg.name) ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          />
                          Installing...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          Install
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="p-4 border-t border-gray-700 bg-gray-800">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-blue-400" />
              <span>{installedPackages.length} packages installed</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>
                {installedPackages.reduce((sum, pkg) => sum + parseFloat(pkg.size), 0).toFixed(1)} MB total
              </span>
            </div>
          </div>
          
          <div className="text-gray-400">
            Package Manager v2.1.0
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageManagerApp;