import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    // Simulate login process
    setTimeout(() => {
      onLogin();
    }, 2000);
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-40"
      style={{
        background: 'linear-gradient(180deg, #87CEEB 0%, #98FB98 100%)'
      }}
    >
      <div className="absolute inset-0">
        {/* Mario clouds */}
        <div className="absolute top-20 left-20 w-16 h-12 bg-white rounded-full opacity-80"></div>
        <div className="absolute top-32 right-32 w-20 h-14 bg-white rounded-full opacity-80"></div>
        <div className="absolute top-48 left-1/2 w-18 h-13 bg-white rounded-full opacity-80"></div>
        
        {/* Mario hills */}
        <div className="absolute bottom-0 left-0 w-32 h-24 bg-green-400 rounded-t-full"></div>
        <div className="absolute bottom-0 right-0 w-40 h-32 bg-green-500 rounded-t-full"></div>
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mario-window w-96 p-0 relative z-10"
      >
        <div className="mario-window-header">
          <span>🍄 Mario Portfolio Login</span>
        </div>
        
        <div className="p-8">
          <div className="text-center mb-6">
            <div className="text-6xl mb-2">👨‍💻</div>
            <h2 className="text-xl text-mario-blue">Rishav Jaiswal</h2>
            <p className="text-sm text-gray-600 mt-1">BCA Student & Backend Developer</p>
          </div>

          {isLoggingIn ? (
            <div className="text-center">
              <div className="mario-loader mx-auto mb-4"></div>
              <div className="text-sm text-mario-blue">Entering Mario World...</div>
            </div>
          ) : (
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Username (hint: mario)"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border-2 border-black rounded font-mono"
                    autoComplete="username"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Password (hint: 1up)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border-2 border-black rounded font-mono"
                    autoComplete="current-password"
                  />
                </div>
              </div>
              
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full mario-block h-12 text-black font-bold rounded text-sm"
              >
                🚀 Start Adventure!
              </motion.button>
            </form>
          )}
          
          <div className="mt-6 text-center text-xs text-gray-500">
            <p>💡 Hint: Any username/password will work!</p>
            <p className="mt-1">Welcome to Rishav's Interactive Portfolio</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginScreen;