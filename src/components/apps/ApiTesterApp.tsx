import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Plus, Trash2, Copy, Download, Upload, Globe, Lock, Clock as Unlock } from 'lucide-react';
import { soundManager } from '../../utils/soundManager';

const ApiTesterApp: React.FC = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: 'Get User Profile',
      method: 'GET',
      url: 'https://api.mario-portfolio.dev/user/profile',
      headers: { 'Authorization': 'Bearer token123', 'Content-Type': 'application/json' },
      body: '',
      response: null,
      status: null
    }
  ]);
  
  const [activeRequest, setActiveRequest] = useState(0);
  const [loading, setLoading] = useState(false);

  const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
  
  const mockResponses = {
    'GET': {
      status: 200,
      data: {
        id: 1,
        name: 'Rishav Jaiswal',
        email: 'rishavjaiswal76781@gmail.com',
        role: 'Backend Developer',
        coins: 150,
        powerUp: 'super',
        achievements: ['first_visit', 'coin_collector', 'power_user'],
        projects: 3,
        skills: ['Node.js', 'Python', 'MySQL', 'Express']
      }
    },
    'POST': {
      status: 201,
      data: {
        message: 'Resource created successfully! 🍄',
        id: 42,
        timestamp: new Date().toISOString()
      }
    },
    'PUT': {
      status: 200,
      data: {
        message: 'Resource updated successfully! ⭐',
        modified: true
      }
    },
    'DELETE': {
      status: 204,
      data: {
        message: 'Resource deleted successfully! 🔥'
      }
    }
  };

  const sendRequest = async () => {
    setLoading(true);
    soundManager.play('warp');
    
    const currentRequest = requests[activeRequest];
    
    // Simulate API call
    setTimeout(() => {
      const mockResponse = mockResponses[currentRequest.method as keyof typeof mockResponses] || mockResponses.GET;
      
      setRequests(prev => prev.map((req, index) => 
        index === activeRequest 
          ? { ...req, response: mockResponse.data, status: mockResponse.status }
          : req
      ));
      
      setLoading(false);
      soundManager.play('coin');
    }, 1500);
  };

  const addRequest = () => {
    const newRequest = {
      id: Date.now(),
      name: `New Request ${requests.length + 1}`,
      method: 'GET',
      url: 'https://api.mario-portfolio.dev/',
      headers: { 'Content-Type': 'application/json' },
      body: '',
      response: null,
      status: null
    };
    
    setRequests([...requests, newRequest]);
    setActiveRequest(requests.length);
    soundManager.play('powerup');
  };

  const deleteRequest = (index: number) => {
    if (requests.length > 1) {
      setRequests(requests.filter((_, i) => i !== index));
      setActiveRequest(Math.max(0, activeRequest - 1));
      soundManager.play('jump');
    }
  };

  const updateRequest = (field: string, value: any) => {
    setRequests(prev => prev.map((req, index) => 
      index === activeRequest ? { ...req, [field]: value } : req
    ));
  };

  const currentRequest = requests[activeRequest];

  return (
    <div className="h-full bg-gray-900 text-white flex">
      {/* Sidebar */}
      <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Globe className="w-5 h-5" />
              API Tester
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addRequest}
              className="p-2 bg-blue-600 hover:bg-blue-700 rounded"
            >
              <Plus className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {requests.map((request, index) => (
              <motion.div
                key={request.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveRequest(index)}
                className={`p-3 rounded cursor-pointer border ${
                  activeRequest === index 
                    ? 'bg-blue-600 border-blue-500' 
                    : 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        request.method === 'GET' ? 'bg-green-600' :
                        request.method === 'POST' ? 'bg-blue-600' :
                        request.method === 'PUT' ? 'bg-yellow-600' :
                        'bg-red-600'
                      }`}>
                        {request.method}
                      </span>
                      {request.status && (
                        <span className={`text-xs ${
                          request.status < 300 ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {request.status}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium mt-1">{request.name}</p>
                    <p className="text-xs text-gray-400 truncate">{request.url}</p>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteRequest(index);
                    }}
                    className="text-gray-400 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Request Builder */}
        <div className="p-6 border-b border-gray-700">
          <div className="space-y-4">
            {/* Request Name */}
            <input
              type="text"
              value={currentRequest.name}
              onChange={(e) => updateRequest('name', e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-lg font-bold"
              placeholder="Request Name"
            />

            {/* Method and URL */}
            <div className="flex gap-3">
              <select
                value={currentRequest.method}
                onChange={(e) => updateRequest('method', e.target.value)}
                className="bg-gray-800 border border-gray-600 rounded px-3 py-2 font-bold"
              >
                {methods.map(method => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
              
              <input
                type="text"
                value={currentRequest.url}
                onChange={(e) => updateRequest('url', e.target.value)}
                className="flex-1 bg-gray-800 border border-gray-600 rounded px-3 py-2 font-mono"
                placeholder="https://api.example.com/endpoint"
              />
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={sendRequest}
                disabled={loading}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded font-bold flex items-center gap-2"
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                Send
              </motion.button>
            </div>

            {/* Headers */}
            <div>
              <h3 className="text-sm font-bold mb-2">Headers</h3>
              <textarea
                value={JSON.stringify(currentRequest.headers, null, 2)}
                onChange={(e) => {
                  try {
                    updateRequest('headers', JSON.parse(e.target.value));
                  } catch {}
                }}
                className="w-full h-24 bg-gray-800 border border-gray-600 rounded px-3 py-2 font-mono text-sm"
                placeholder='{"Content-Type": "application/json"}'
              />
            </div>

            {/* Body */}
            {['POST', 'PUT', 'PATCH'].includes(currentRequest.method) && (
              <div>
                <h3 className="text-sm font-bold mb-2">Request Body</h3>
                <textarea
                  value={currentRequest.body}
                  onChange={(e) => updateRequest('body', e.target.value)}
                  className="w-full h-32 bg-gray-800 border border-gray-600 rounded px-3 py-2 font-mono text-sm"
                  placeholder='{"key": "value"}'
                />
              </div>
            )}
          </div>
        </div>

        {/* Response */}
        <div className="flex-1 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Response</h3>
            {currentRequest.response && (
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded font-bold ${
                  currentRequest.status && currentRequest.status < 300 ? 'bg-green-600' : 'bg-red-600'
                }`}>
                  {currentRequest.status}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigator.clipboard.writeText(JSON.stringify(currentRequest.response, null, 2))}
                  className="p-2 bg-gray-700 hover:bg-gray-600 rounded"
                >
                  <Copy className="w-4 h-4" />
                </motion.button>
              </div>
            )}
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded p-4 h-full overflow-auto">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
                  />
                  <p className="text-gray-400">Sending request... 🚀</p>
                </div>
              </div>
            ) : currentRequest.response ? (
              <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
                {JSON.stringify(currentRequest.response, null, 2)}
              </pre>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Globe className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Send a request to see the response here 🍄</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiTesterApp;