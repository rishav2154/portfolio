import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Window {
  id: string;
  title: string;
  component: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
  resizable: boolean;
}

export interface GameState {
  // System State
  isBooted: boolean;
  currentWorkspace: 'overworld' | 'underground' | 'castle' | 'sky' | 'spline3d';
  theme: 'classic' | 'dark' | 'underwater' | 'lava';
  soundEnabled: boolean;
  
  // Game Stats
  coins: number;
  powerUp: 'small' | 'super' | 'fire' | 'star' | null;
  achievements: string[];
  visitedApps: string[];
  
  // Windows Management
  windows: Window[];
  nextZIndex: number;
  
  // Terminal
  terminalHistory: string[];
  terminalHistoryIndex: number;
  
  // User Data
  userData: {
    name: string;
    email: string;
    phone: string;
    location: string;
    dob: string;
    notes: string[];
  };
  
  // Actions
  boot: () => void;
  setWorkspace: (workspace: GameState['currentWorkspace']) => void;
  setTheme: (theme: GameState['theme']) => void;
  toggleSound: () => void;
  addCoins: (amount: number) => void;
  setPowerUp: (powerUp: GameState['powerUp']) => void;
  addAchievement: (achievement: string) => void;
  visitApp: (appName: string) => void;
  
  // Window Management
  openWindow: (window: Omit<Window, 'zIndex'>) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  updateWindow: (id: string, updates: Partial<Window>) => void;
  focusWindow: (id: string) => void;
  
  // Terminal
  addToTerminalHistory: (command: string) => void;
  setTerminalHistoryIndex: (index: number) => void;
  
  // User Data
  addNote: (note: string) => void;
  removeNote: (index: number) => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // Initial State
      isBooted: false,
      currentWorkspace: 'overworld',
      theme: 'classic',
      soundEnabled: true,
      
      coins: 0,
      powerUp: null,
      achievements: [],
      visitedApps: [],
      
      windows: [],
      nextZIndex: 100,
      
      terminalHistory: [],
      terminalHistoryIndex: 0,
      
      userData: {
        name: 'Rishav Jaiswal',
        email: 'rishavjaiswal76781@gmail.com',
        phone: '+91 76781 31456',
        location: 'New Delhi, India',
        dob: '21 Nov 2005',
        notes: []
      },
      
      // Actions
      boot: () => set({ isBooted: true }),
      
      setWorkspace: (workspace) => set({ currentWorkspace: workspace }),
      setTheme: (theme) => set({ theme }),
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
      
      addCoins: (amount) => set((state) => ({ coins: state.coins + amount })),
      setPowerUp: (powerUp) => set({ powerUp }),
      
      addAchievement: (achievement) => set((state) => ({
        achievements: state.achievements.includes(achievement) 
          ? state.achievements 
          : [...state.achievements, achievement]
      })),
      
      visitApp: (appName) => set((state) => ({
        visitedApps: state.visitedApps.includes(appName) 
          ? state.visitedApps 
          : [...state.visitedApps, appName]
      })),
      
      // Window Management
      openWindow: (window) => set((state) => ({
        windows: [...state.windows, { ...window, zIndex: state.nextZIndex }],
        nextZIndex: state.nextZIndex + 1
      })),
      
      closeWindow: (id) => set((state) => ({
        windows: state.windows.filter(w => w.id !== id)
      })),
      
      minimizeWindow: (id) => set((state) => ({
        windows: state.windows.map(w => 
          w.id === id ? { ...w, minimized: !w.minimized } : w
        )
      })),
      
      maximizeWindow: (id) => set((state) => ({
        windows: state.windows.map(w => 
          w.id === id ? { 
            ...w, 
            maximized: !w.maximized,
            x: w.maximized ? w.x : 0,
            y: w.maximized ? w.y : 40,
            width: w.maximized ? w.width : window.innerWidth,
            height: w.maximized ? w.height : window.innerHeight - 40
          } : w
        )
      })),
      
      updateWindow: (id, updates) => set((state) => ({
        windows: state.windows.map(w => 
          w.id === id ? { ...w, ...updates } : w
        )
      })),
      
      focusWindow: (id) => set((state) => ({
        windows: state.windows.map(w => 
          w.id === id ? { ...w, zIndex: state.nextZIndex } : w
        ),
        nextZIndex: state.nextZIndex + 1
      })),
      
      // Terminal
      addToTerminalHistory: (command) => set((state) => ({
        terminalHistory: [...state.terminalHistory, command],
        terminalHistoryIndex: state.terminalHistory.length + 1
      })),
      
      setTerminalHistoryIndex: (index) => set({ terminalHistoryIndex: index }),
      
      // User Data
      addNote: (note) => set((state) => ({
        userData: {
          ...state.userData,
          notes: [...state.userData.notes, note]
        }
      })),
      
      removeNote: (index) => set((state) => ({
        userData: {
          ...state.userData,
          notes: state.userData.notes.filter((_, i) => i !== index)
        }
      }))
    }),
    {
      name: 'mario-portfolio-storage',
    }
  )
);