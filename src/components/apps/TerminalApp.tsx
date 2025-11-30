import React, { useState, useRef, useEffect } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { soundManager } from '../../utils/soundManager';
import { personalInfo, skills, projects, education, experience } from '../../data/portfolioData';

const TerminalApp: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([
    '🍄 Welcome to Mario Portfolio Terminal! 🍄',
    'Type "help" to see available commands.',
    ''
  ]);
  const { 
    addCoins, 
    setPowerUp, 
    openWindow, 
    terminalHistory, 
    addToTerminalHistory, 
    terminalHistoryIndex, 
    setTerminalHistoryIndex,
    addAchievement
  } = useGameStore();
  
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const commands = {
    help: () => [
      'Available Commands:',
      '==================',
      'System Commands:',
      '  ls - List directory contents',
      '  cd - Change directory (simulated)',
      '  pwd - Print working directory', 
      '  cat <file> - Display file contents',
      '  echo <text> - Display text',
      '  date - Show current date/time',
      '  time - Show current time',
      '  clear - Clear terminal',
      '  reset - Reset terminal',
      '  whoami - Show current user info',
      '',
      'Game Commands:',
      '  coin - Collect a coin (+1 🪙)',
      '  powerup <type> - Use power-up (mushroom/fire/star)',
      '  warp <app> - Warp to application',
      '  flag - Victory celebration',
      '  mario - Greet Mario',
      '  status - Show portfolio status',
      '  joke - Get a programming joke',
      '  save - Save current state',
      '  restore - Restore saved state',
      '',
      'Portfolio Commands:',
      '  about - Open About window',
      '  skills - Display skills list',
      '  projects - Open Projects app',
      '  resume - Download resume PDF',
      '  contact - Open contact form',
      '  education - Show education info',
      '  experience - Display work experience',
      '  weather - Check weather',
      '',
      'System:',
      '  helpme - Talk to Toad AI Assistant',
      '  guide - Interactive tutorial',
      ''
    ],

    ls: () => [
      'total 42',
      'drwxr-xr-x 2 mario mario 4096 Nov 21 2005 About/',
      '-rw-r--r-- 1 mario mario 2048 Nov 21 2005 Resume.pdf',
      '-rw-r--r-- 1 mario mario 1024 Nov 21 2005 Skills.json',
      '-rw-r--r-- 1 mario mario  512 Nov 21 2005 Contact.txt',
      'drwxr-xr-x 2 mario mario 4096 Nov 21 2005 Projects/',
      'drwxr-xr-x 2 mario mario 4096 Nov 21 2005 Certificates/',
      '-rwxr-xr-x 1 mario mario  256 Nov 21 2005 run_adventure.sh',
      ''
    ],

    pwd: () => ['/home/mario/portfolio', ''],

    date: () => [new Date().toString(), ''],

    clear: () => {
      setOutput([]);
      return [];
    },

    reset: () => {
      setOutput([
        '🍄 Welcome to Mario Portfolio Terminal! 🍄',
        'Type "help" to see available commands.',
        ''
      ]);
      return [];
    },

    coin: () => {
      addCoins(1);
      soundManager.play('coin');
      const newTotal = useGameStore.getState().coins;
      return [`🪙 +1 Coin collected! Total coins: ${newTotal}`, ''];
    },

    powerup: (type: string) => {
      if (!type) return ['Usage: powerup <mushroom|fire|star>', ''];
      
      const powerUps: { [key: string]: 'super' | 'fire' | 'star' } = {
        mushroom: 'super',
        fire: 'fire', 
        star: 'star'
      };

      const powerUp = powerUps[type.toLowerCase()];
      if (!powerUp) return ['Invalid power-up! Use: mushroom, fire, or star', ''];

      setPowerUp(powerUp);
      soundManager.play('powerup');
      addAchievement('power_user');

      const messages = {
        super: '🍄 Super Mario activated! You feel stronger!',
        fire: '🔥 Fire Mario activated! You can shoot fireballs!',
        star: '⭐ Star Power activated! You are invincible!'
      };

      return [messages[powerUp], ''];
    },

    mario: () => [
      '🍄 It\'s-a me, Mario!',
      'Welcome to my portfolio adventure!',
      'Use commands to explore and collect coins!',
      ''
    ],

    status: () => {
      const state = useGameStore.getState();
      return [
        'Portfolio Status:',
        '==================',
        `Coins: ${state.coins} 🪙`,
        `Power-up: ${state.powerUp || 'None'} ${state.powerUp ? '⭐' : ''}`,
        `Workspace: ${state.currentWorkspace} 🌍`,
        `Apps visited: ${state.visitedApps.length} 📱`,
        `Achievements: ${state.achievements.length} 🏆`,
        ''
      ];
    },

    weather: () => [
      '🌤️ Weather in Mushroom Kingdom:',
      'Temperature: 24°C ☀️',
      'Condition: Sunny and perfect for adventures!',
      'Wind: Light breeze from the east',
      'Perfect day to explore the portfolio!',
      ''
    ],

    joke: () => {
      const jokes = [
        'Why did Mario become a developer? Because he loves jumping through code blocks! 🍄',
        'What\'s Mario\'s favorite programming language? Java-Script! ☕',
        'Why doesn\'t Mario use Windows? He prefers open source pipes! 🔧',
        'How does Mario debug his code? He uses console.log(\'Mamma mia!\'); 🐛'
      ];
      const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
      return [randomJoke, ''];
    },

    time: () => [
      `Current time: ${new Date().toLocaleString()}`,
      `Time in Mushroom Kingdom: Adventure Time! 🕐`,
      ''
    ],

    whoami: () => [
      'You are: Portfolio Explorer 🎮',
      'Level: Beginner Adventurer',
      'Special abilities: Coin collecting, App navigation',
      'Current quest: Explore Rishav\'s portfolio',
      ''
    ],
    warp: (app: string) => {
      if (!app) return ['Usage: warp <app>', 'Available apps: about, skills, projects, resume, contact', ''];
      
      const apps = ['about', 'skills', 'projects', 'resume', 'contact', 'education', 'experience'];
      if (!apps.includes(app.toLowerCase())) {
        return [`Unknown app: ${app}`, 'Available apps: ' + apps.join(', '), ''];
      }

      soundManager.play('warp');
      openWindow({
        id: `${app}-${Date.now()}`,
        title: app.charAt(0).toUpperCase() + app.slice(1),
        component: app.toLowerCase(),
        x: Math.random() * 200 + 100,
        y: Math.random() * 200 + 100,
        width: 600,
        height: 400,
        minimized: false,
        maximized: false,
        resizable: true
      });

      return [`🌪️ Warping to ${app}...`, ''];
    },

    flag: () => {
      soundManager.play('flag');
      addAchievement('flag_bearer');
      return [
        'Congratulations! You have completed the adventure!',
        'Thanks for exploring Rishav Portfolio!',
        'Achievement unlocked: Flag Bearer',
        ''
      ];
    },

    about: () => {
      openWindow({
        id: `about-${Date.now()}`,
        title: 'About Me',
        component: 'about',
        x: Math.random() * 200 + 100,
        y: Math.random() * 200 + 100,
        width: 600,
        height: 400,
        minimized: false,
        maximized: false,
        resizable: true
      });
      return ['Opening About Me window...', ''];
    },

    skills: () => [
      'Skills Overview:',
      '==================',
      `Programming: ${skills.programming.join(', ')}`,
      `Databases: ${skills.databases.join(', ')}`,
      `Data Analysis: ${skills.data.join(', ')}`,
      `Web Development: ${skills.web.join(', ')}`,
      `Computer Science: ${skills.cs.join(', ')}`,
      `Soft Skills: ${skills.soft.join(', ')}`,
      ''
    ],

    projects: () => {
      openWindow({
        id: `projects-${Date.now()}`,
        title: 'Projects',
        component: 'projects',
        x: Math.random() * 200 + 100,
        y: Math.random() * 200 + 100,
        width: 700,
        height: 500,
        minimized: false,
        maximized: false,
        resizable: true
      });
      return ['Opening Projects window...', ''];
    },

    resume: () => [
      '📄 Resume download initiated...',
      '(In a real implementation, this would download the PDF)',
      ''
    ],

    contact: () => {
      openWindow({
        id: `contact-${Date.now()}`,
        title: 'Contact',
        component: 'contact',
        x: Math.random() * 200 + 100,
        y: Math.random() * 200 + 100,
        width: 500,
        height: 400,
        minimized: false,
        maximized: false,
        resizable: true
      });
      return ['Opening Contact form...', ''];
    },

    education: () => [
      'Education:',
      '=============',
      ...education.map(edu => 
        `${edu.degree} - ${edu.institution} (${edu.period}) - ${edu.status}`
      ),
      ''
    ],

    experience: () => [
      'Work Experience:',
      '==================',
      ...experience.map(exp => [
        `${exp.title} at ${exp.company} (${exp.period})`,
        ...exp.responsibilities.map(resp => `  • ${resp}`)
      ]).flat(),
      ''
    ],

    helpme: () => [
      'AI Assistant: "Hello! I am here to help!"',
      'Tips:',
      '  - Use Tab for command completion',
      '  - Use ↑/↓ arrows for command history',
      '  - Try the Mario commands for fun interactions!',
      '  - Collect coins by using various commands',
      '  - Power-ups change your abilities temporarily',
      ''
    ],

    guide: () => [
      'Interactive Tutorial:',
      '=======================',
      '1. Try "coin" to collect your first coin',
      '2. Use "powerup mushroom" to become Super Mario',
      '3. Use "warp about" to visit the About section',
      '4. Type "ls" to see the portfolio files',
      '5. End with "flag" for a victory celebration!',
      ''
    ],

    cat: (filename: string) => {
      if (!filename) return ['Usage: cat <filename>', ''];
      
      const files: { [key: string]: string[] } = {
        'About.txt': [
          personalInfo.name,
          personalInfo.email,
          personalInfo.phone,
          personalInfo.location,
          '',
          personalInfo.objective
        ],
        'Skills.json': [
          '{',
          '  "programming": ' + JSON.stringify(skills.programming, null, 4),
          '  "databases": ' + JSON.stringify(skills.databases, null, 4),
          '  "web": ' + JSON.stringify(skills.web, null, 4),
          '}'
        ],
        'Contact.txt': [
          'Contact Information',
          '==================',
          `Email: ${personalInfo.email}`,
          `Phone: ${personalInfo.phone}`,
          `Location: ${personalInfo.location}`
        ]
      };

      return files[filename] || [`cat: ${filename}: No such file or directory`, ''];
    },

    echo: (text: string) => [text || '', ''],

    save: () => {
      // Save state to localStorage (already handled by zustand persist)
      return ['Portfolio state saved!', ''];
    },

    restore: () => {
      // Restore from localStorage (already handled by zustand persist)  
      return ['Portfolio state restored!', ''];
    }
  };

  const handleCommand = (cmd: string) => {
    const [command, ...args] = cmd.trim().split(' ');
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand && commands.hasOwnProperty(lowerCommand)) {
      const commandFunc = commands[lowerCommand as keyof typeof commands] as any;
      return commandFunc(args.join(' '));
    }
    
    return [`Command not found: ${command}`, 'Type "help" for available commands.', ''];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.trim()) {
      addToTerminalHistory(input);
      setOutput(prev => [...prev, `mario@portfolio:~$ ${input}`, ...handleCommand(input)]);
      setInput('');
      setTerminalHistoryIndex(terminalHistory.length + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = Math.max(0, terminalHistoryIndex - 1);
      setTerminalHistoryIndex(newIndex);
      setInput(terminalHistory[newIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = Math.min(terminalHistory.length, terminalHistoryIndex + 1);
      setTerminalHistoryIndex(newIndex);
      setInput(newIndex === terminalHistory.length ? '' : terminalHistory[newIndex] || '');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const availableCommands = Object.keys(commands);
      const matches = availableCommands.filter(cmd => cmd.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        setOutput(prev => [...prev, `mario@portfolio:~$ ${input}`, ...matches, '']);
      }
    }
  };

  return (
    <div className="terminal h-full flex flex-col">
      <div ref={outputRef} className="flex-1 overflow-y-auto p-4 font-mono text-sm">
        {output.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap">
            {line}
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="border-t border-gray-600 p-4">
        <div className="flex items-center">
          <span className="text-green-400 mr-2 font-mono text-sm">mario@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-green-400 outline-none font-mono text-sm"
            autoFocus
          />
        </div>
      </form>
    </div>
  );
};

export default TerminalApp;