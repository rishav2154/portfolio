import React from 'react';
import { useGameStore } from '../store/useGameStore';
import WindowComponent from './WindowComponent';

const WindowManager: React.FC = () => {
  const { windows, closeWindow, minimizeWindow, maximizeWindow, updateWindow, focusWindow } = useGameStore();

  return (
    <div className="absolute inset-0 pointer-events-none">
      {windows.map(window => {
        if (window.minimized) return null;

        return (
          <WindowComponent
            key={window.id}
            window={window}
            closeWindow={closeWindow}
            minimizeWindow={minimizeWindow}
            maximizeWindow={maximizeWindow}
            updateWindow={updateWindow}
            focusWindow={focusWindow}
          />
        );
      })}
    </div>
  );
};

export default WindowManager;