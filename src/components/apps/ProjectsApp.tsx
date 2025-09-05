import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '../../data/portfolioData';
import { ExternalLink, Github, Code, Zap } from 'lucide-react';

const ProjectsApp: React.FC = () => {
  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'beginner': return '🌱';
      case 'intermediate': return '🍄';
      case 'advanced': return '⭐';
      default: return '🎮';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'from-green-400 to-green-600';
      case 'ongoing': return 'from-yellow-400 to-yellow-600';
      case 'planned': return 'from-blue-400 to-blue-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className="p-6 h-full bg-gradient-to-br from-green-50 to-blue-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-mario-blue mb-6 text-center flex items-center justify-center gap-3"
        >
          <Code className="w-8 h-8" />
          Mario Level Projects
        </motion.h1>

        <div className="grid gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="mario-window p-0 overflow-hidden"
            >
              {/* Project Header */}
              <div className={`bg-gradient-to-r ${getStatusColor(project.status)} p-4 text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{getLevelIcon(project.level)}</div>
                    <div>
                      <h3 className="font-bold text-lg">{project.title}</h3>
                      <div className="flex items-center gap-2 text-sm opacity-90">
                        <span className="capitalize">{project.status}</span>
                        <span>•</span>
                        <span className="capitalize">{project.level}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
                      title="View on GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="mb-4">
                  <h4 className="text-sm font-bold text-mario-blue mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: (index * 0.2) + (techIndex * 0.1) + 0.3 }}
                        className="mario-block px-3 py-1 text-xs font-bold"
                        whileHover={{ scale: 1.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Project Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="mario-window p-3 bg-yellow-50">
                    <h5 className="text-xs font-bold text-mario-blue mb-2">🎯 Key Features</h5>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {project.title.includes('CTF') && (
                        <>
                          <li>• End-to-end competition management</li>
                          <li>• Real-time scoring system</li>
                          <li>• Secure challenge deployment</li>
                        </>
                      )}
                      {project.title.includes('Data') && (
                        <>
                          <li>• Advanced data visualization</li>
                          <li>• Statistical analysis tools</li>
                          <li>• Business insight generation</li>
                        </>
                      )}
                      {project.title.includes('Backend') && (
                        <>
                          <li>• RESTful API architecture</li>
                          <li>• Database optimization</li>
                          <li>• Scalable infrastructure</li>
                        </>
                      )}
                    </ul>
                  </div>

                  <div className="mario-window p-3 bg-green-50">
                    <h5 className="text-xs font-bold text-mario-blue mb-2">📈 Impact & Results</h5>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Successfully deployed in production</li>
                      <li>• Enhanced user experience</li>
                      <li>• Improved system performance</li>
                      <li>• Positive stakeholder feedback</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Project Footer */}
              <div className="px-6 pb-4">
                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-500">
                    Level {project.level === 'beginner' ? '1' : project.level === 'intermediate' ? '2' : '3'}-{index + 1}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="mario-block px-4 py-2 text-xs font-bold flex items-center gap-2"
                  >
                    Explore Level
                    <ExternalLink className="w-3 h-3" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 mario-window p-6 bg-gradient-to-r from-purple-100 to-blue-100"
        >
          <h2 className="text-lg font-bold text-mario-blue mb-4 text-center">
            🏆 Project Statistics
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="mario-block p-4">
              <div className="text-2xl mb-2">🎮</div>
              <p className="text-sm font-bold">{projects.length}</p>
              <p className="text-xs text-gray-600">Total Projects</p>
            </div>
            
            <div className="mario-block p-4">
              <div className="text-2xl mb-2">⭐</div>
              <p className="text-sm font-bold">{projects.filter(p => p.level === 'advanced').length}</p>
              <p className="text-xs text-gray-600">Advanced Level</p>
            </div>
            
            <div className="mario-block p-4">
              <div className="text-2xl mb-2">🚀</div>
              <p className="text-sm font-bold">{projects.filter(p => p.status === 'completed').length}</p>
              <p className="text-xs text-gray-600">Completed</p>
            </div>
            
            <div className="mario-block p-4">
              <div className="text-2xl mb-2">🔥</div>
              <p className="text-sm font-bold">{projects.filter(p => p.status === 'ongoing').length}</p>
              <p className="text-xs text-gray-600">In Progress</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectsApp;