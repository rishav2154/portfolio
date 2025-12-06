import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Cpu, HardDrive, Wifi, Zap, Monitor, MemoryStick, Thermometer } from 'lucide-react';

const SystemMonitorApp: React.FC = () => {
  const [cpuUsage, setCpuUsage] = useState(45);
  const [memoryUsage, setMemoryUsage] = useState(68);
  const [diskUsage, setDiskUsage] = useState(32);
  const [networkSpeed, setNetworkSpeed] = useState(125);
  const [temperature, setTemperature] = useState(42);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(prev => Math.max(10, Math.min(90, prev + (Math.random() - 0.5) * 10)));
      setMemoryUsage(prev => Math.max(20, Math.min(85, prev + (Math.random() - 0.5) * 8)));
      setDiskUsage(prev => Math.max(15, Math.min(75, prev + (Math.random() - 0.5) * 3)));
      setNetworkSpeed(prev => Math.max(50, Math.min(200, prev + (Math.random() - 0.5) * 20)));
      setTemperature(prev => Math.max(35, Math.min(65, prev + (Math.random() - 0.5) * 5)));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const processes = [
    { name: 'Mario Portfolio OS', cpu: 15.2, memory: 245, pid: 1001 },
    { name: 'Code Editor', cpu: 8.7, memory: 156, pid: 1002 },
    { name: 'Terminal', cpu: 3.1, memory: 89, pid: 1003 },
    { name: 'Browser Engine', cpu: 12.4, memory: 312, pid: 1004 },
    { name: 'System Monitor', cpu: 2.8, memory: 67, pid: 1005 },
    { name: 'Audio Service', cpu: 1.2, memory: 34, pid: 1006 },
    { name: 'Network Manager', cpu: 0.8, memory: 23, pid: 1007 }
  ];

  const getUsageColor = (usage: number) => {
    if (usage < 30) return 'text-green-400';
    if (usage < 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getUsageBarColor = (usage: number) => {
    if (usage < 30) return 'bg-green-500';
    if (usage < 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="h-full bg-gray-900 text-white p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold mb-6 flex items-center gap-3"
        >
          <Activity className="w-8 h-8" />
          System Monitor
        </motion.h1>

        {/* System Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* CPU Usage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-blue-400" />
                <span className="font-bold">CPU</span>
              </div>
              <span className={`text-2xl font-bold ${getUsageColor(cpuUsage)}`}>
                {cpuUsage.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <motion.div
                className={`h-3 rounded-full ${getUsageBarColor(cpuUsage)}`}
                initial={{ width: 0 }}
                animate={{ width: `${cpuUsage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">Intel Core i7-12700K</p>
          </motion.div>

          {/* Memory Usage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MemoryStick className="w-5 h-5 text-green-400" />
                <span className="font-bold">Memory</span>
              </div>
              <span className={`text-2xl font-bold ${getUsageColor(memoryUsage)}`}>
                {memoryUsage.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <motion.div
                className={`h-3 rounded-full ${getUsageBarColor(memoryUsage)}`}
                initial={{ width: 0 }}
                animate={{ width: `${memoryUsage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">16 GB DDR4</p>
          </motion.div>

          {/* Disk Usage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-purple-400" />
                <span className="font-bold">Disk</span>
              </div>
              <span className={`text-2xl font-bold ${getUsageColor(diskUsage)}`}>
                {diskUsage.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <motion.div
                className={`h-3 rounded-full ${getUsageBarColor(diskUsage)}`}
                initial={{ width: 0 }}
                animate={{ width: `${diskUsage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">512 GB NVMe SSD</p>
          </motion.div>

          {/* Network */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Wifi className="w-5 h-5 text-cyan-400" />
                <span className="font-bold">Network</span>
              </div>
              <span className="text-2xl font-bold text-cyan-400">
                {networkSpeed.toFixed(0)} Mbps
              </span>
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>↓ {(networkSpeed * 0.8).toFixed(0)} Mbps</span>
              <span>↑ {(networkSpeed * 0.2).toFixed(0)} Mbps</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">Ethernet Connection</p>
          </motion.div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Temperature */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-orange-400" />
              Temperature
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>CPU Temperature</span>
                <span className={`font-bold ${temperature > 60 ? 'text-red-400' : temperature > 45 ? 'text-yellow-400' : 'text-green-400'}`}>
                  {temperature.toFixed(1)}°C
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>GPU Temperature</span>
                <span className="font-bold text-green-400">38.2°C</span>
              </div>
              <div className="flex justify-between items-center">
                <span>System Temperature</span>
                <span className="font-bold text-green-400">35.8°C</span>
              </div>
            </div>
          </motion.div>

          {/* Power */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Power Usage
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>CPU Power</span>
                <span className="font-bold text-yellow-400">65W</span>
              </div>
              <div className="flex justify-between items-center">
                <span>GPU Power</span>
                <span className="font-bold text-yellow-400">45W</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Total System</span>
                <span className="font-bold text-yellow-400">125W</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Process List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-800 rounded-lg border border-gray-700"
        >
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Monitor className="w-5 h-5 text-blue-400" />
              Running Processes
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="p-3 text-left text-sm font-bold">Process Name</th>
                  <th className="p-3 text-left text-sm font-bold">PID</th>
                  <th className="p-3 text-left text-sm font-bold">CPU %</th>
                  <th className="p-3 text-left text-sm font-bold">Memory (MB)</th>
                </tr>
              </thead>
              <tbody>
                {processes.map((process, index) => (
                  <motion.tr
                    key={process.pid}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                    className="border-b border-gray-700 hover:bg-gray-750"
                  >
                    <td className="p-3 text-sm">{process.name}</td>
                    <td className="p-3 text-sm text-gray-400">{process.pid}</td>
                    <td className="p-3 text-sm">
                      <span className={getUsageColor(process.cpu)}>
                        {process.cpu.toFixed(1)}%
                      </span>
                    </td>
                    <td className="p-3 text-sm">{process.memory} MB</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SystemMonitorApp;