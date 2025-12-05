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
      '🍄 MARIO PORTFOLIO TERMINAL HELP 🍄',
      '=====================================',
      '',
      '📁 FILE SYSTEM:',
      '  ls          - List files and folders',
      '  cat <file>  - Read file contents',
      '  pwd         - Show current location',
      '  tree        - Show folder structure',
      '',
      '🎮 MARIO COMMANDS:',
      '  coin        - Collect coins (+1 🪙)',
      '  powerup     - Get random power-up',
      '  mario       - Talk to Mario',
      '  status      - Show game status',
      '  warp <app>  - Teleport to app',
      '  flag        - Victory celebration',
      '',
      '💼 PORTFOLIO:',
      '  about       - Personal information',
      '  skills      - Technical skills',
      '  projects    - View projects',
      '  resume      - Download resume',
      '  contact     - Contact details',
      '  education   - Academic background',
      '  experience  - Work history',
      '',
      '🛠️ UTILITIES:',
      '  weather     - Check weather',
      '  time        - Current time',
      '  date        - Current date',
      '  joke        - Random joke',
      '  quote       - Inspirational quote',
      '  calc <expr> - Calculator',
      '',
      '⚙️ SYSTEM:',
      '  clear       - Clear screen',
      '  reset       - Reset terminal',
      '  history     - Command history',
      '  whoami      - User info',
      '  neofetch    - System info',
      '  matrix      - Matrix effect',
      ''
    ],

    ls: () => [
      '📁 MARIO PORTFOLIO DIRECTORY',
      '============================',
      '',
      '📂 Personal/',
      '  📄 About.md         - Personal information',
      '  📄 Resume.pdf       - Professional resume',
      '  📄 Contact.json     - Contact details',
      '',
      '📂 Skills/',
      '  📄 Programming.js   - Coding languages',
      '  📄 Database.sql     - Database skills',
      '  📄 WebDev.html      - Web technologies',
      '',
      '📂 Projects/',
      '  📁 CTF-Platform/    - Competition system',
      '  📁 Data-Analysis/   - Python projects',
      '  📁 Backend-APIs/    - Server applications',
      '',
      '📂 Achievements/',
      '  📄 Certificates.pdf - All certifications',
      '  📄 Awards.txt       - Recognition received',
      '',
      '🎮 run_mario.sh       - Start portfolio adventure',
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
      if (!type) {
        // Random power-up if no type specified
        const powerUps = ['mushroom', 'fire', 'star'];
        type = powerUps[Math.floor(Math.random() * powerUps.length)];
      }
      
      const powerUps: { [key: string]: 'super' | 'fire' | 'star' } = {
        mushroom: 'super',
        fire: 'fire', 
        star: 'star'
      };

      const powerUp = powerUps[type.toLowerCase()];
      if (!powerUp) return ['🚫 Invalid power-up! Available: mushroom, fire, star', ''];

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
      '🍄 Wahoo! It\'s-a me, Mario!',
      '================================',
      '',
      '👋 Welcome to Rishav\'s Portfolio Kingdom!',
      '',
      '🎮 Here you can:',
      '  • Explore different worlds (apps)',
      '  • Collect coins by using commands',
      '  • Unlock power-ups and achievements',
      '  • Learn about Rishav\'s skills and projects',
      '',
      '💡 Pro tip: Type "help" to see all commands!',
      '🪙 Current coins: ' + useGameStore.getState().coins,
      ''
    ],

    status: () => {
      const state = useGameStore.getState();
      return [
        '🎮 MARIO PORTFOLIO STATUS',
        '========================',
        '',
        `🪙 Coins Collected: ${state.coins}`,
        `⭐ Power-up: ${state.powerUp ? state.powerUp.toUpperCase() : 'None'}`,
        `🌍 Current World: ${state.currentWorkspace.toUpperCase()}`,
        `📱 Apps Explored: ${state.visitedApps.length}/15`,
        `🏆 Achievements: ${state.achievements.length}/6`,
        `🎯 Progress: ${Math.round((state.achievements.length / 6) * 100)}%`,
        '',
        state.achievements.length === 6 ? '🎉 CONGRATULATIONS! All achievements unlocked!' : '💪 Keep exploring to unlock more achievements!',
        ''
      ];
    },

    weather: () => [
      '🌤️ MUSHROOM KINGDOM WEATHER',
      '============================',
      '',
      '📍 Location: New Delhi, India',
      '🌡️ Temperature: 24°C',
      '☀️ Condition: Sunny and bright',
      '💨 Wind: 12 km/h from east',
      '💧 Humidity: 45%',
      '👁️ Visibility: 10 km',
      '',
      '🍄 Mario says: "Perfect weather for coding adventures!"',
      ''
    ],

    joke: () => {
      const jokes = [
        '😄 Why did Mario become a developer?\n   Because he loves jumping through code blocks! 🍄',
        '☕ What\'s Mario\'s favorite programming language?\n   Java-Script! (Get it? Java... Script... 😉)',
        '🔧 Why doesn\'t Mario use Windows?\n   He prefers open source pipes! 🚰',
        '🐛 How does Mario debug his code?\n   He uses console.log("Mamma mia!"); 🍝',
        '🎮 Why did the developer go broke?\n   Because he used up all his cache! 💰',
        '🔄 Why do programmers prefer dark mode?\n   Because light attracts bugs! 🐛',
        '☁️ Why do Java developers wear glasses?\n   Because they can\'t C#! 👓'
      ];
      const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
      return ['🎭 MARIO\'S CODING JOKES', '===================', '', randomJoke, ''];
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
      return ['💾 Game state saved successfully!', '🍄 Your progress is safe in the Mushroom Kingdom!', ''];
    },

    restore: () => {
      // Restore from localStorage (already handled by zustand persist)  
      return ['📁 Game state restored successfully!', '🎮 Welcome back to the adventure!', ''];
    },

    tree: () => [
      '🌳 PORTFOLIO DIRECTORY TREE',
      '===========================',
      '',
      '📁 mario-portfolio/',
      '├── 📂 Personal/',
      '│   ├── 📄 About.md',
      '│   ├── 📄 Resume.pdf',
      '│   └── 📄 Contact.json',
      '├── 📂 Skills/',
      '│   ├── 📄 Programming.js',
      '│   ├── 📄 Database.sql',
      '│   └── 📄 WebDev.html',
      '├── 📂 Projects/',
      '│   ├── 📁 CTF-Platform/',
      '│   ├── 📁 Data-Analysis/',
      '│   └── 📁 Backend-APIs/',
      '└── 📂 Achievements/',
      '    ├── 📄 Certificates.pdf',
      '    └── 📄 Awards.txt',
      ''
    ],

    history: () => {
      const state = useGameStore.getState();
      return [
        '📜 COMMAND HISTORY',
        '==================',
        '',
        ...state.terminalHistory.slice(-10).map((cmd, i) => `${i + 1}. ${cmd}`),
        '',
        'Use ↑/↓ arrows to navigate history'
      ];
    },

    neofetch: () => [
      '🖥️ MARIO PORTFOLIO SYSTEM INFO',
      '==============================',
      '',
      '👤 User: Rishav Jaiswal',
      '💻 System: Mario Portfolio OS v1.0',
      '🏠 Location: New Delhi, India',
      '🎓 Education: BCA (Rank 1)',
      '💼 Role: Project Head at Cyber Knight',
      '🔧 Skills: Node.js, Python, MySQL, Express',
      '🎮 Power-up: ' + (useGameStore.getState().powerUp || 'None'),
      '🪙 Coins: ' + useGameStore.getState().coins,
      '🏆 Achievements: ' + useGameStore.getState().achievements.length + '/6',
      ''
    ],

    quote: () => {
      const quotes = [
        '"The only way to do great work is to love what you do." - Steve Jobs',
        '"Code is like humor. When you have to explain it, it\'s bad." - Cory House',
        '"First, solve the problem. Then, write the code." - John Johnson',
        '"Experience is the name everyone gives to their mistakes." - Oscar Wilde',
        '"The best error message is the one that never shows up." - Thomas Fuchs',
        '"Simplicity is the ultimate sophistication." - Leonardo da Vinci'
      ];
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      return ['💭 INSPIRATIONAL QUOTE', '====================', '', randomQuote, ''];
    },

    calc: (expression: string) => {
      if (!expression) return ['Usage: calc <expression>', 'Example: calc 2 + 2', ''];
      
      try {
        // Simple calculator - only allow basic operations for security
        const sanitized = expression.replace(/[^0-9+\-*/.() ]/g, '');
        const result = Function('"use strict"; return (' + sanitized + ')')();
        return [
          '🧮 MARIO CALCULATOR',
          '==================',
          '',
          `Expression: ${expression}`,
          `Result: ${result}`,
          ''
        ];
      } catch (error) {
        return ['❌ Invalid expression!', 'Use numbers and +, -, *, /, (, )', ''];
      }
    },

    matrix: () => {
      const chars = '01';
      const lines = [];
      for (let i = 0; i < 10; i++) {
        let line = '';
        for (let j = 0; j < 50; j++) {
          line += chars[Math.floor(Math.random() * chars.length)];
        }
        lines.push(line);
      }
      return [
        '🔢 ENTERING THE MATRIX...',
        '========================',
        '',
        ...lines,
        '',
        '🍄 Welcome to the real world, Mario!'
      ];
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