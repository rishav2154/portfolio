import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../../data/portfolioData';
import { Code, Database, BarChart, Globe, Brain, Users } from 'lucide-react';

const SkillsApp: React.FC = () => {
  const skillCategories = [
    {
      title: 'Programming',
      icon: Code,
      skills: skills.programming,
      color: 'from-red-400 to-red-600',
      powerUp: '🔥'
    },
    {
      title: 'Databases',
      icon: Database,
      skills: skills.databases,
      color: 'from-blue-400 to-blue-600',
      powerUp: '💧'
    },
    {
      title: 'Data Analysis',
      icon: BarChart,
      skills: skills.data,
      color: 'from-green-400 to-green-600',
      powerUp: '🍃'
    },
    {
      title: 'Web Development',
      icon: Globe,
      skills: skills.web,
      color: 'from-yellow-400 to-yellow-600',
      powerUp: '⚡'
    },
    {
      title: 'Computer Science',
      icon: Brain,
      skills: skills.cs,
      color: 'from-purple-400 to-purple-600',
      powerUp: '🔮'
    },
    {
      title: 'Soft Skills',
      icon: Users,
      skills: skills.soft,
      color: 'from-pink-400 to-pink-600',
      powerUp: '💖'
    }
  ];

  return (
    <div className="p-6 h-full bg-gradient-to-br from-blue-50 to-purple-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-mario-blue mb-6 text-center flex items-center justify-center gap-3"
        >
          <Code className="w-8 h-8" />
          Mario Power-Up Skills
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="mario-window p-0 overflow-hidden"
            >
              {/* Category Header */}
              <div className={`bg-gradient-to-r ${category.color} p-4 text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <category.icon className="w-6 h-6" />
                    <h3 className="font-bold text-sm">{category.title}</h3>
                  </div>
                  <div className="text-2xl">{category.powerUp}</div>
                </div>
              </div>

              {/* Skills List */}
              <div className="p-4">
                <div className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05) + 0.2 }}
                      className="mario-block p-2 text-center hover:scale-105 transition-transform cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-xs font-bold">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Skill Level Indicator */}
              <div className="p-4 pt-0">
                <div className="flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        i < Math.min(category.skills.length, 5)
                          ? 'bg-yellow-400'
                          : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-center text-gray-600 mt-1">
                  Level {Math.min(category.skills.length, 5)}/5
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skill Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 mario-window p-6 bg-gradient-to-r from-yellow-100 to-red-100"
        >
          <h2 className="text-lg font-bold text-mario-blue mb-4 text-center">
            🏆 Skill Summary
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="mario-block p-4">
              <div className="text-2xl mb-2">💻</div>
              <p className="text-xs font-bold">Programming Languages</p>
              <p className="text-xs text-gray-600">{skills.programming.length} Technologies</p>
            </div>
            
            <div className="mario-block p-4">
              <div className="text-2xl mb-2">📊</div>
              <p className="text-xs font-bold">Data & Analytics</p>
              <p className="text-xs text-gray-600">Python Specialist</p>
            </div>
            
            <div className="mario-block p-4">
              <div className="text-2xl mb-2">🚀</div>
              <p className="text-xs font-bold">Backend Focus</p>
              <p className="text-xs text-gray-600">Node.js & Express</p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-700 italic">
              "Continuously learning and growing in backend development and data analysis!"
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SkillsApp;