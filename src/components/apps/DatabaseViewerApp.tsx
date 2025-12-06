import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Table, Search, Plus, Edit, Trash2, Download, Upload, RefreshCw } from 'lucide-react';
import { soundManager } from '../../utils/soundManager';

const DatabaseViewerApp: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const tables = [
    { name: 'users', icon: '👥', records: 150 },
    { name: 'projects', icon: '📁', records: 25 },
    { name: 'skills', icon: '⚡', records: 12 },
    { name: 'achievements', icon: '🏆', records: 8 },
    { name: 'sessions', icon: '🔐', records: 342 }
  ];

  const mockData = {
    users: [
      { id: 1, name: 'Rishav Jaiswal', email: 'rishavjaiswal76781@gmail.com', role: 'admin', coins: 150, created_at: '2024-01-15' },
      { id: 2, name: 'Mario Bros', email: 'mario@mushroom.kingdom', role: 'user', coins: 999, created_at: '2024-01-16' },
      { id: 3, name: 'Luigi Bros', email: 'luigi@mushroom.kingdom', role: 'user', coins: 750, created_at: '2024-01-17' },
      { id: 4, name: 'Princess Peach', email: 'peach@castle.kingdom', role: 'admin', coins: 500, created_at: '2024-01-18' },
      { id: 5, name: 'Bowser King', email: 'bowser@dark.castle', role: 'user', coins: 100, created_at: '2024-01-19' }
    ],
    projects: [
      { id: 1, name: 'CTF Platform', status: 'completed', tech_stack: 'Node.js, MySQL', created_at: '2024-01-10' },
      { id: 2, name: 'Data Analysis Tool', status: 'ongoing', tech_stack: 'Python, Pandas', created_at: '2024-01-12' },
      { id: 3, name: 'Portfolio Website', status: 'completed', tech_stack: 'React, TypeScript', created_at: '2024-01-14' }
    ],
    skills: [
      { id: 1, name: 'Node.js', category: 'Backend', level: 'Advanced', years: 2 },
      { id: 2, name: 'Python', category: 'Data Analysis', level: 'Intermediate', years: 1.5 },
      { id: 3, name: 'MySQL', category: 'Database', level: 'Advanced', years: 2 },
      { id: 4, name: 'React', category: 'Frontend', level: 'Intermediate', years: 1 }
    ]
  };

  const currentData = mockData[selectedTable as keyof typeof mockData] || [];
  const columns = currentData.length > 0 ? Object.keys(currentData[0]) : [];

  const filteredData = currentData.filter(row =>
    Object.values(row).some(value =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const executeQuery = (query: string) => {
    soundManager.play('powerup');
    console.log('Executing query:', query);
  };

  const refreshTable = () => {
    soundManager.play('coin');
    setSelectedRows([]);
  };

  const toggleRowSelection = (index: number) => {
    setSelectedRows(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="h-full bg-gray-900 text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Database className="w-5 h-5" />
            Database Explorer
          </h2>
        </div>

        <div className="flex-1 p-4">
          <h3 className="text-sm font-bold mb-3 text-gray-400">TABLES</h3>
          <div className="space-y-1">
            {tables.map((table) => (
              <motion.div
                key={table.name}
                whileHover={{ scale: 1.02, x: 5 }}
                onClick={() => setSelectedTable(table.name)}
                className={`p-3 rounded cursor-pointer flex items-center justify-between ${
                  selectedTable === table.name 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{table.icon}</span>
                  <span className="text-sm font-medium">{table.name}</span>
                </div>
                <span className="text-xs text-gray-400">{table.records}</span>
              </motion.div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="mt-6 p-3 bg-gray-700 rounded">
            <h4 className="text-sm font-bold mb-2">Database Stats</h4>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>Total Tables:</span>
                <span className="text-blue-400">{tables.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Records:</span>
                <span className="text-green-400">{tables.reduce((sum, t) => sum + t.records, 0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Database Size:</span>
                <span className="text-yellow-400">2.4 MB</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Table className="w-6 h-6" />
              <h1 className="text-xl font-bold capitalize">{selectedTable}</h1>
              <span className="px-2 py-1 bg-gray-700 rounded text-xs">
                {filteredData.length} rows
              </span>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={refreshTable}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded"
              >
                <RefreshCw className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-green-600 hover:bg-green-700 rounded"
              >
                <Plus className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-blue-600 hover:bg-blue-700 rounded"
              >
                <Download className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search records..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full">
            <thead className="bg-gray-800 sticky top-0">
              <tr>
                <th className="p-3 text-left">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRows(filteredData.map((_, i) => i));
                      } else {
                        setSelectedRows([]);
                      }
                    }}
                    checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                  />
                </th>
                {columns.map((column) => (
                  <th key={column} className="p-3 text-left text-sm font-bold text-gray-300 uppercase tracking-wider">
                    {column.replace('_', ' ')}
                  </th>
                ))}
                <th className="p-3 text-left text-sm font-bold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`border-b border-gray-700 hover:bg-gray-800 ${
                    selectedRows.includes(index) ? 'bg-blue-900' : ''
                  }`}
                >
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(index)}
                      onChange={() => toggleRowSelection(index)}
                    />
                  </td>
                  {columns.map((column) => (
                    <td key={column} className="p-3 text-sm">
                      <span className={`${
                        column === 'email' ? 'text-blue-400' :
                        column === 'status' ? (row[column as keyof typeof row] === 'completed' ? 'text-green-400' : 'text-yellow-400') :
                        column === 'role' ? (row[column as keyof typeof row] === 'admin' ? 'text-red-400' : 'text-gray-400') :
                        ''
                      }`}>
                        {row[column as keyof typeof row]}
                      </span>
                    </td>
                  ))}
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 text-blue-400 hover:text-blue-300"
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1 text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* SQL Query Panel */}
        <div className="h-32 border-t border-gray-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold">SQL Query</h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => executeQuery(`SELECT * FROM ${selectedTable}`)}
              className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm font-bold"
            >
              Execute
            </motion.button>
          </div>
          <textarea
            className="w-full h-16 bg-gray-800 border border-gray-600 rounded px-3 py-2 font-mono text-sm resize-none"
            placeholder={`SELECT * FROM ${selectedTable} WHERE ...`}
            defaultValue={`SELECT * FROM ${selectedTable};`}
          />
        </div>
      </div>
    </div>
  );
};

export default DatabaseViewerApp;