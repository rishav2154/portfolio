import React, { useState, useEffect } from 'react';
import { useGameStore } from './store/useGameStore';
import BootScreen from './components/BootScreen';
import LoginScreen from './components/LoginScreen';
import Desktop from './components/Desktop';

function App() {
  const { isBooted, isLoggedIn, boot, login } = useGameStore();
  const [showBoot, setShowBoot] = useState(true);

  useEffect(() => {
    // Auto-boot after a short delay if not manually triggered
    const timer = setTimeout(() => {
      if (!isBooted) {
        boot();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isBooted, boot]);

  const handleBootComplete = () => {
    setShowBoot(false);
  };

  const handleLogin = () => {
    login();
  };

  if (showBoot || !isBooted) {
    return <BootScreen onBootComplete={handleBootComplete} />;
  }

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return <Desktop />;
}

export default App;