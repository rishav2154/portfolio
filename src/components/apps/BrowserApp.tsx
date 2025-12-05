import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, RotateCcw, Home, Search, Star, Shield, Globe, Bookmark, Download, Settings, Menu, X, Plus } from 'lucide-react';
import { soundManager } from '../../utils/soundManager';

const BrowserApp: React.FC = () => {
  const [url, setUrl] = useState('https://google.com');
  const [currentUrl, setCurrentUrl] = useState('https://google.com');
  const [history, setHistory] = useState(['https://google.com']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [tabs, setTabs] = useState([
    { id: 1, title: 'Google', url: 'https://google.com', active: true }
  ]);
  const [activeTab, setActiveTab] = useState(1);
  const [bookmarks, setBookmarks] = useState([
    { title: 'Google', url: 'https://google.com' },
    { title: 'GitHub', url: 'https://github.com' },
    { title: 'Stack Overflow', url: 'https://stackoverflow.com' },
    { title: 'YouTube', url: 'https://youtube.com' },
    { title: 'Wikipedia', url: 'https://wikipedia.org' }
  ]);
  const [currentPage, setCurrentPage] = useState('google');
  const inputRef = useRef<HTMLInputElement>(null);

  // Simulated websites with realistic content
  const websites = {
    'google.com': {
      title: 'Google',
      content: (
        <div className="min-h-full bg-white">
          {/* Google Header */}
          <div className="flex justify-between items-center p-4 text-sm">
            <div className="flex gap-4">
              <span className="text-gray-700 hover:underline cursor-pointer">Gmail</span>
              <span className="text-gray-700 hover:underline cursor-pointer">Images</span>
            </div>
            <div className="flex items-center gap-2">
              <Menu className="w-6 h-6 text-gray-600 cursor-pointer" />
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                R
              </div>
            </div>
          </div>

          {/* Google Logo and Search */}
          <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
            <div className="mb-8">
              <h1 className="text-6xl font-normal">
                <span className="text-blue-500">G</span>
                <span className="text-red-500">o</span>
                <span className="text-yellow-500">o</span>
                <span className="text-blue-500">g</span>
                <span className="text-green-500">l</span>
                <span className="text-red-500">e</span>
              </h1>
            </div>

            <div className="w-full max-w-xl">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm hover:shadow-md focus:outline-none focus:shadow-md"
                  placeholder="Search Google or type a URL"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              
              <div className="flex justify-center gap-4 mt-8">
                <button 
                  onClick={handleSearch}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded text-sm"
                >
                  Google Search
                </button>
                <button 
                  onClick={() => navigate('https://google.com/lucky')}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded text-sm"
                >
                  I'm Feeling Lucky
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    },

    'github.com': {
      title: 'GitHub',
      content: (
        <div className="min-h-full bg-gray-900 text-white">
          <div className="bg-gray-800 border-b border-gray-700 p-4">
            <div className="flex items-center justify-between max-w-6xl mx-auto">
              <div className="flex items-center gap-4">
                <div className="text-2xl font-bold">GitHub</div>
                <nav className="flex gap-4 text-sm">
                  <span className="hover:text-gray-300 cursor-pointer">Product</span>
                  <span className="hover:text-gray-300 cursor-pointer">Solutions</span>
                  <span className="hover:text-gray-300 cursor-pointer">Open Source</span>
                  <span className="hover:text-gray-300 cursor-pointer">Pricing</span>
                </nav>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 border border-gray-600 rounded text-sm">Sign in</button>
                <button className="px-3 py-1 bg-green-600 rounded text-sm">Sign up</button>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto p-8">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-4">Let's build from here</h1>
              <p className="text-xl text-gray-300 mb-8">
                The world's leading AI-powered developer platform.
              </p>
              <div className="flex justify-center gap-4">
                <button className="px-6 py-3 bg-green-600 rounded-lg font-semibold">
                  Start a free enterprise trial
                </button>
                <button className="px-6 py-3 border border-gray-600 rounded-lg">
                  Sign up for GitHub
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">🚀 Collaborative coding</h3>
                <p className="text-gray-300">Work together from anywhere with Git and GitHub.</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">🤖 AI-powered development</h3>
                <p className="text-gray-300">GitHub Copilot suggests code as you type.</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">🔒 Enterprise security</h3>
                <p className="text-gray-300">Advanced security features for your code.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },

    'stackoverflow.com': {
      title: 'Stack Overflow',
      content: (
        <div className="min-h-full bg-white">
          <div className="bg-orange-500 text-white p-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-6">
                <h1 className="text-2xl font-bold">stack overflow</h1>
                <nav className="flex gap-4 text-sm">
                  <span className="hover:text-orange-200 cursor-pointer">Products</span>
                  <span className="hover:text-orange-200 cursor-pointer">OverflowAI</span>
                  <span className="hover:text-orange-200 cursor-pointer">Stack Overflow for Teams</span>
                </nav>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-orange-300 rounded text-sm">Log in</button>
                <button className="px-3 py-1 bg-blue-600 rounded text-sm">Sign up</button>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Every developer has a tab open to Stack Overflow</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h3 className="text-xl font-bold mb-4">🔥 Hot Questions</h3>
                <div className="space-y-4">
                  {[
                    { title: "How to optimize React performance?", votes: 42, answers: 7, views: "2.1k" },
                    { title: "Best practices for Node.js error handling", votes: 38, answers: 12, views: "1.8k" },
                    { title: "MySQL query optimization techniques", votes: 35, answers: 9, views: "1.5k" },
                    { title: "Python pandas data manipulation tips", votes: 29, answers: 6, views: "1.2k" }
                  ].map((q, i) => (
                    <div key={i} className="border border-gray-200 p-4 rounded hover:bg-gray-50 cursor-pointer">
                      <h4 className="font-semibold text-blue-600 hover:text-blue-800">{q.title}</h4>
                      <div className="flex gap-4 text-sm text-gray-600 mt-2">
                        <span>{q.votes} votes</span>
                        <span>{q.answers} answers</span>
                        <span>{q.views} views</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">📊 Stack Overflow Trends</h3>
                <div className="bg-gray-50 p-4 rounded">
                  <h4 className="font-semibold mb-3">Most Popular Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {['javascript', 'python', 'java', 'reactjs', 'node.js', 'html', 'css'].map(tag => (
                      <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    'youtube.com': {
      title: 'YouTube',
      content: (
        <div className="min-h-full bg-white">
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                    <span className="text-white font-bold">▶</span>
                  </div>
                  <span className="text-xl font-bold">YouTube</span>
                </div>
              </div>
              <div className="flex-1 max-w-2xl mx-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500"
                  />
                  <button className="px-6 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full">
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="px-4 py-2 border border-gray-300 rounded-full text-sm">Sign in</button>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "React Tutorial for Beginners", channel: "Code Academy", views: "1.2M views", time: "2 weeks ago" },
                { title: "Node.js Backend Development", channel: "Tech Guru", views: "850K views", time: "1 month ago" },
                { title: "Python Data Analysis", channel: "Data Science Pro", views: "2.1M views", time: "3 days ago" },
                { title: "MySQL Database Design", channel: "DB Master", views: "650K views", time: "1 week ago" },
                { title: "JavaScript ES6 Features", channel: "JS Expert", views: "1.8M views", time: "5 days ago" },
                { title: "CSS Grid Layout Guide", channel: "Web Designer", views: "920K views", time: "2 weeks ago" },
                { title: "Git and GitHub Tutorial", channel: "Version Control", views: "1.5M views", time: "1 month ago" },
                { title: "API Development Best Practices", channel: "Backend Dev", views: "780K views", time: "4 days ago" }
              ].map((video, i) => (
                <div key={i} className="cursor-pointer group">
                  <div className="bg-gray-200 aspect-video rounded-lg mb-3 flex items-center justify-center group-hover:bg-gray-300 transition-colors">
                    <span className="text-4xl text-gray-500">▶</span>
                  </div>
                  <h3 className="font-semibold text-sm mb-1 group-hover:text-blue-600">{video.title}</h3>
                  <p className="text-xs text-gray-600">{video.channel}</p>
                  <p className="text-xs text-gray-600">{video.views} • {video.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },

    'wikipedia.org': {
      title: 'Wikipedia',
      content: (
        <div className="min-h-full bg-white">
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <h1 className="text-2xl font-bold">Wikipedia</h1>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  placeholder="Search Wikipedia"
                  className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded">Search</button>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto p-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Wikipedia</h1>
              <p className="text-xl text-gray-600 mb-8">The Free Encyclopedia</p>
              <p className="text-lg">6,000,000+ articles in English</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">📚 Featured Article</h3>
                <div className="border border-gray-200 p-4 rounded">
                  <h4 className="font-semibold text-blue-600 mb-2">Artificial Intelligence</h4>
                  <p className="text-sm text-gray-700">
                    Artificial intelligence (AI) is intelligence demonstrated by machines, 
                    in contrast to the natural intelligence displayed by humans and animals...
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">🗞️ In the News</h3>
                <div className="space-y-3">
                  <div className="text-sm">
                    <span className="font-semibold">Technology:</span> Latest developments in quantum computing
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">Science:</span> New discoveries in space exploration
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">Environment:</span> Climate change research updates
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">🌍 Other Languages</h3>
                <div className="space-y-2 text-sm">
                  <div>Español (Spanish) - 1,800,000+ articles</div>
                  <div>Français (French) - 2,400,000+ articles</div>
                  <div>Deutsch (German) - 2,700,000+ articles</div>
                  <div>日本語 (Japanese) - 1,300,000+ articles</div>
                  <div>中文 (Chinese) - 1,200,000+ articles</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    'search': {
      title: 'Search Results',
      content: (
        <div className="min-h-full bg-white">
          <div className="border-b border-gray-200 p-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-2xl font-bold text-blue-600">Google</h1>
                <div className="flex-1 max-w-2xl">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <nav className="flex gap-6 text-sm">
                <span className="text-blue-600 border-b-2 border-blue-600 pb-2">All</span>
                <span className="text-gray-600 hover:text-gray-800 cursor-pointer">Images</span>
                <span className="text-gray-600 hover:text-gray-800 cursor-pointer">Videos</span>
                <span className="text-gray-600 hover:text-gray-800 cursor-pointer">News</span>
                <span className="text-gray-600 hover:text-gray-800 cursor-pointer">Shopping</span>
              </nav>
            </div>
          </div>

          <div className="max-w-6xl mx-auto p-6">
            <p className="text-sm text-gray-600 mb-6">About 1,240,000 results (0.45 seconds)</p>
            
            <div className="space-y-8">
              {getSearchResults(searchQuery).map((result, i) => (
                <div key={i} className="max-w-2xl">
                  <div className="flex items-center gap-2 mb-1">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{result.domain}</span>
                  </div>
                  <h3 className="text-xl text-blue-600 hover:underline cursor-pointer mb-1">
                    {result.title}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {result.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }
  };

  const getSearchResults = (query: string) => {
    const defaultResults = [
      {
        domain: 'en.wikipedia.org',
        title: `${query} - Wikipedia`,
        description: `Learn about ${query} from the world's largest encyclopedia. Comprehensive information, history, and detailed explanations.`
      },
      {
        domain: 'stackoverflow.com',
        title: `${query} - Stack Overflow`,
        description: `Programming questions and answers about ${query}. Get help from the developer community.`
      },
      {
        domain: 'github.com',
        title: `${query} repositories - GitHub`,
        description: `Open source projects and code repositories related to ${query}. Explore, contribute, and learn.`
      },
      {
        domain: 'youtube.com',
        title: `${query} tutorials - YouTube`,
        description: `Video tutorials and educational content about ${query}. Learn from experts and practitioners.`
      }
    ];

    // Specific search results for common queries
    const specificResults: { [key: string]: any[] } = {
      'react': [
        {
          domain: 'reactjs.org',
          title: 'React – A JavaScript library for building user interfaces',
          description: 'React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.'
        },
        {
          domain: 'create-react-app.dev',
          title: 'Create React App',
          description: 'Set up a modern web app by running one command. Create React App is an officially supported way to create single-page React applications.'
        }
      ],
      'javascript': [
        {
          domain: 'developer.mozilla.org',
          title: 'JavaScript | MDN',
          description: 'JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions.'
        },
        {
          domain: 'javascript.info',
          title: 'The Modern JavaScript Tutorial',
          description: 'Modern JavaScript Tutorial: simple, but detailed explanations with examples and tasks, including: closures, document and events, object oriented programming and more.'
        }
      ],
      'python': [
        {
          domain: 'python.org',
          title: 'Welcome to Python.org',
          description: 'The official home of the Python Programming Language. Python is a programming language that lets you work quickly and integrate systems more effectively.'
        },
        {
          domain: 'docs.python.org',
          title: 'Python Documentation',
          description: 'Official Python documentation including tutorials, library reference, language reference, and more.'
        }
      ]
    };

    return specificResults[query.toLowerCase()] || defaultResults;
  };

  const navigate = (newUrl: string) => {
    setLoading(true);
    soundManager.play('warp');
    
    setTimeout(() => {
      setCurrentUrl(newUrl);
      setUrl(newUrl);
      
      // Determine page based on URL
      const domain = newUrl.replace('https://', '').replace('http://', '').split('/')[0];
      
      if (domain.includes('github')) {
        setCurrentPage('github.com');
      } else if (domain.includes('stackoverflow')) {
        setCurrentPage('stackoverflow.com');
      } else if (domain.includes('youtube')) {
        setCurrentPage('youtube.com');
      } else if (domain.includes('wikipedia')) {
        setCurrentPage('wikipedia.org');
      } else if (newUrl.includes('search') || searchQuery) {
        setCurrentPage('search');
      } else {
        setCurrentPage('google.com');
      }
      
      // Update history
      const newHistory = [...history.slice(0, historyIndex + 1), newUrl];
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      
      // Update active tab
      setTabs(tabs.map(tab => 
        tab.active ? { ...tab, url: newUrl, title: websites[currentPage as keyof typeof websites]?.title || 'New Tab' } : tab
      ));
      
      setLoading(false);
    }, 300);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const searchUrl = `https://google.com/search?q=${encodeURIComponent(searchQuery)}`;
      navigate(searchUrl);
    }
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
    setTimeout(() => setLoading(false), 300);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.includes(' ') || !url.includes('.')) {
      // Treat as search query
      setSearchQuery(url);
      handleSearch();
    } else {
      // Treat as URL
      let formattedUrl = url;
      if (!url.startsWith('http')) {
        formattedUrl = 'https://' + url;
      }
      navigate(formattedUrl);
    }
  };

  const addBookmark = () => {
    const currentSite = websites[currentPage as keyof typeof websites];
    if (currentSite && !bookmarks.find(b => b.url === currentUrl)) {
      setBookmarks([...bookmarks, { title: currentSite.title, url: currentUrl }]);
      soundManager.play('coin');
    }
  };

  const createNewTab = () => {
    const newTab = {
      id: Date.now(),
      title: 'New Tab',
      url: 'https://google.com',
      active: false
    };
    setTabs([...tabs.map(t => ({ ...t, active: false })), { ...newTab, active: true }]);
    setActiveTab(newTab.id);
    navigate('https://google.com');
  };

  const closeTab = (tabId: number) => {
    if (tabs.length === 1) return; // Don't close last tab
    
    const newTabs = tabs.filter(t => t.id !== tabId);
    setTabs(newTabs);
    
    if (activeTab === tabId) {
      const newActiveTab = newTabs[0];
      setActiveTab(newActiveTab.id);
      navigate(newActiveTab.url);
    }
  };

  const switchTab = (tabId: number) => {
    const tab = tabs.find(t => t.id === tabId);
    if (tab) {
      setTabs(tabs.map(t => ({ ...t, active: t.id === tabId })));
      setActiveTab(tabId);
      navigate(tab.url);
    }
  };

  const currentSite = websites[currentPage as keyof typeof websites] || websites['google.com'];

  return (
    <div className="h-full bg-gray-100 flex flex-col">
      {/* Tab Bar */}
      <div className="bg-gray-200 border-b border-gray-300 flex items-center">
        <div className="flex-1 flex items-center overflow-x-auto">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`flex items-center gap-2 px-4 py-2 border-r border-gray-300 cursor-pointer min-w-32 max-w-48 ${
                tab.active ? 'bg-white' : 'bg-gray-200 hover:bg-gray-100'
              }`}
              onClick={() => switchTab(tab.id)}
            >
              <Globe className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <span className="text-sm truncate flex-1">{tab.title}</span>
              {tabs.length > 1 && (
                <X 
                  className="w-4 h-4 text-gray-500 hover:text-gray-700 flex-shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(tab.id);
                  }}
                />
              )}
            </div>
          ))}
        </div>
        <button
          onClick={createNewTab}
          className="p-2 hover:bg-gray-300 border-l border-gray-300"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

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
              onClick={() => navigate('https://google.com')}
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
                placeholder="Search Google or type a URL"
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
              <Star className={`w-4 h-4 ${bookmarks.find(b => b.url === currentUrl) ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
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
              onClick={() => navigate(bookmark.url)}
              className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded whitespace-nowrap"
            >
              {bookmark.title}
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
          transition={{ duration: 0.3 }}
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
            {currentSite.content}
          </motion.div>
        )}
      </div>

      {/* Status Bar */}
      <div className="bg-gray-200 px-3 py-1 text-xs text-gray-600 flex justify-between items-center">
        <span>{currentSite.title}</span>
        <span>🔒 Secure</span>
      </div>
    </div>
  );
};

export default BrowserApp;