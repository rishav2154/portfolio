import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  Home, 
  Search, 
  Star, 
  Shield, 
  Globe,
  Bookmark,
  Download,
  Settings
} from 'lucide-react';
import { soundManager } from '../../utils/soundManager';

const BrowserApp: React.FC = () => {
  const [url, setUrl] = useState('https://mario-portfolio.dev');
  const [currentUrl, setCurrentUrl] = useState('https://mario-portfolio.dev');
  const [history, setHistory] = useState(['https://mario-portfolio.dev']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState([
    'https://mario-portfolio.dev',
    'https://github.com/rishav',
    'https://linkedin.com/in/rishav',
    'https://stackoverflow.com'
  ]);
  const [currentPage, setCurrentPage] = useState('home');
  const inputRef = useRef<HTMLInputElement>(null);

  const pages = {
    home: {
      title: 'Mario Portfolio - Home',
      content: (
        <div className="p-8 bg-gradient-to-br from-blue-50 to-green-50 min-h-full">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-bold text-6xl border-4 border-white shadow-2xl">
                R
              </div>
              <h1 className="text-4xl font-bold text-mario-blue mb-2">Welcome to Mario Portfolio</h1>
              <p className="text-lg text-gray-600">Rishav Jaiswal - Backend Developer & Data Analyst</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="mario-window p-6 text-center">
                <div className="text-4xl mb-4">💻</div>
                <h3 className="text-lg font-bold text-mario-blue mb-2">Projects</h3>
                <p className="text-sm text-gray-600">Explore my latest work and contributions</p>
              </div>
              
              <div className="mario-window p-6 text-center">
                <div className="text-4xl mb-4">🎓</div>
                <h3 className="text-lg font-bold text-mario-blue mb-2">Education</h3>
                <p className="text-sm text-gray-600">BCA Student with Rank 1 achievement</p>
              </div>
              
              <div className="mario-window p-6 text-center">
                <div className="text-4xl mb-4">📞</div>
                <h3 className="text-lg font-bold text-mario-blue mb-2">Contact</h3>
                <p className="text-sm text-gray-600">Let's connect and build something amazing</p>
              </div>
            </div>

            <div className="mario-window p-6">
              <h2 className="text-2xl font-bold text-mario-blue mb-4">Latest Updates</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-mario-blue pl-4">
                  <h3 className="font-bold">New CTF Platform Launched</h3>
                  <p className="text-sm text-gray-600">Successfully deployed end-to-end competition platform</p>
                </div>
                <div className="border-l-4 border-mario-green pl-4">
                  <h3 className="font-bold">Project Head at Cyber Knight</h3>
                  <p className="text-sm text-gray-600">Leading tech events and backend infrastructure</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    github: {
      title: 'GitHub - Rishav Jaiswal',
      content: (
        <div className="p-8 bg-gray-900 text-white min-h-full">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl font-bold">
                RJ
              </div>
              <div>
                <h1 className="text-3xl font-bold">Rishav Jaiswal</h1>
                <p className="text-gray-400">@rishav • Backend Developer</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">📊 CTF Competition Platform</h3>
                <p className="text-gray-300 mb-4">End-to-end Capture-the-Flag competition platform built with Node.js, Express, and MySQL</p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-yellow-600 rounded text-xs">JavaScript</span>
                  <span className="px-2 py-1 bg-green-600 rounded text-xs">Node.js</span>
                  <span className="px-2 py-1 bg-blue-600 rounded text-xs">MySQL</span>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">📈 Data Analysis Projects</h3>
                <p className="text-gray-300 mb-4">Various data analysis projects using Python for extracting business insights</p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-blue-600 rounded text-xs">Python</span>
                  <span className="px-2 py-1 bg-orange-600 rounded text-xs">Pandas</span>
                  <span className="px-2 py-1 bg-purple-600 rounded text-xs">NumPy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    linkedin: {
      title: 'LinkedIn - Rishav Jaiswal',
      content: (
        <div className="p-8 bg-blue-50 min-h-full">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-3xl">
                  RJ
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">Rishav Jaiswal</h1>
                  <p className="text-lg text-blue-600">Project Head at Cyber Knight</p>
                  <p className="text-gray-600">New Delhi, India • 500+ connections</p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">About</h2>
                <p className="text-gray-700 leading-relaxed">
                  Enthusiastic BCA student with Rank 1 achievement, specializing in backend development and data analysis. 
                  Currently serving as Project Head at Cyber Knight, where I lead tech events and build scalable backend infrastructure. 
                  Passionate about extracting insights using Python and SQL, with hands-on experience in Node.js, Express, and MySQL.
                </p>
              </div>

              <div className="border-t pt-6 mt-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Experience</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-lg">Project Head</h3>
                    <p className="text-blue-600">Cyber Knight</p>
                    <p className="text-gray-600 text-sm">04/2025 – Present</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    stackoverflow: {
      title: 'Stack Overflow - Developer Community',
      content: (
        <div className="p-8 bg-orange-50 min-h-full">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-orange-600 mb-4">Stack Overflow</h1>
              <p className="text-lg text-gray-600">Where developers learn, share, & build careers</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold mb-4">🔥 Hot Questions</h3>
                <div className="space-y-3">
                  <div className="border-l-4 border-orange-500 pl-3">
                    <p className="font-medium">How to optimize MySQL queries for large datasets?</p>
                    <p className="text-sm text-gray-600">mysql, performance, optimization</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-3">
                    <p className="font-medium">Best practices for Node.js error handling</p>
                    <p className="text-sm text-gray-600">node.js, express, error-handling</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-3">
                    <p className="font-medium">Python data analysis with Pandas tips</p>
                    <p className="text-sm text-gray-600">python, pandas, data-analysis</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold mb-4">📊 Developer Survey 2024</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">Most Popular Technologies:</p>
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between">
                        <span>JavaScript</span>
                        <span className="text-orange-600">65.36%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Python</span>
                        <span className="text-orange-600">48.07%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Node.js</span>
                        <span className="text-orange-600">42.65%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  };

  const navigate = (newUrl: string) => {
    setLoading(true);
    soundManager.play('warp');
    
    setTimeout(() => {
      setCurrentUrl(newUrl);
      setUrl(newUrl);
      
      // Determine page based on URL
      if (newUrl.includes('github')) {
        setCurrentPage('github');
      } else if (newUrl.includes('linkedin')) {
        setCurrentPage('linkedin');
      } else if (newUrl.includes('stackoverflow')) {
        setCurrentPage('stackoverflow');
      } else {
        setCurrentPage('home');
      }
      
      // Update history
      const newHistory = [...history.slice(0, historyIndex + 1), newUrl];
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      
      setLoading(false);
    }, 800);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      navigate(history[newIndex]);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      navigate(history[newIndex]);
    }
  };

  const refresh = () => {
    setLoading(true);
    soundManager.play('coin');
    setTimeout(() => setLoading(false), 500);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(url);
  };

  const addBookmark = () => {
    if (!bookmarks.includes(currentUrl)) {
      setBookmarks([...bookmarks, currentUrl]);
      soundManager.play('coin');
    }
  };

  const currentPageData = pages[currentPage as keyof typeof pages] || pages.home;

  return (
    <div className="h-full bg-gray-100 flex flex-col">
      {/* Browser Header */}
      <div className="bg-white border-b border-gray-300 p-3">
        {/* Navigation Bar */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={goBack}
              disabled={historyIndex === 0}
              className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={goForward}
              disabled={historyIndex === history.length - 1}
              className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={refresh}
              className="p-2 rounded hover:bg-gray-200"
            >
              <RotateCcw className="w-4 h-4" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('https://mario-portfolio.dev')}
              className="p-2 rounded hover:bg-gray-200"
            >
              <Home className="w-4 h-4" />
            </motion.button>
          </div>

          {/* URL Bar */}
          <form onSubmit={handleUrlSubmit} className="flex-1 flex items-center">
            <div className="flex-1 relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                {currentUrl.startsWith('https://') ? (
                  <Shield className="w-4 h-4 text-green-500" />
                ) : (
                  <Globe className="w-4 h-4 text-gray-400" />
                )}
              </div>
              <input
                ref={inputRef}
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search or enter web address"
              />
            </div>
          </form>

          <div className="flex items-center gap-1">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={addBookmark}
              className="p-2 rounded hover:bg-gray-200"
              title="Bookmark this page"
            >
              <Star className={`w-4 h-4 ${bookmarks.includes(currentUrl) ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded hover:bg-gray-200"
            >
              <Settings className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Bookmarks Bar */}
        <div className="flex items-center gap-2 overflow-x-auto">
          <Bookmark className="w-4 h-4 text-gray-400 flex-shrink-0" />
          {bookmarks.map((bookmark, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(bookmark)}
              className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded whitespace-nowrap"
            >
              {bookmark.replace('https://', '').split('/')[0]}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Loading Bar */}
      {loading && (
        <motion.div
          className="h-1 bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.8 }}
        />
      )}

      {/* Page Content */}
      <div className="flex-1 overflow-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
              />
              <p className="text-gray-600">Loading...</p>
            </div>
          </div>
        ) : (
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {currentPageData.content}
          </motion.div>
        )}
      </div>

      {/* Status Bar */}
      <div className="bg-gray-200 px-3 py-1 text-xs text-gray-600 flex justify-between items-center">
        <span>{currentPageData.title}</span>
        <span>🔒 Secure Connection</span>
      </div>
    </div>
  );
};

export default BrowserApp;