import React from 'react';
import { motion } from 'framer-motion';
import { experience } from '../../data/portfolioData';
import { Briefcase, Calendar, CheckCircle } from 'lucide-react';

const ExperienceApp: React.FC = () => {
  return (
    <div className="p-6 h-full bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-mario-blue mb-6 flex items-center gap-3">
          <Briefcase className="w-8 h-8" />
          Professional Experience
        </h1>

        <div className="space-y-6">
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              className="mario-window p-6 relative"
            >
              <div className="absolute top-4 right-4">
                <div className="mario-block w-12 h-12 flex items-center justify-center text-2xl">
                  👨‍💼
                </div>
              </div>

              <div className="pr-16">
                <h3 className="text-lg font-bold text-mario-blue mb-2">{exp.title}</h3>
                <p className="text-md text-mario-red font-bold mb-2">{exp.company}</p>
                
                <div className="flex items-center gap-1 text-xs text-gray-600 mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>{exp.period}</span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-gray-800">Key Achievements:</h4>
                  {exp.responsibilities.map((responsibility, respIndex) => (
                    <motion.div
                      key={respIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index * 0.2) + (respIndex * 0.1) + 0.3 }}
                      className="flex items-start gap-2"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-gray-700">{responsibility}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills Gained */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <h2 className="text-lg font-bold text-mario-blue mb-4">Skills Developed</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['Node.js', 'Express', 'MySQL', 'Event Planning', 'Team Leadership', 'CTF Security', 'Project Management', 'Backend Architecture'].map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + (index * 0.1) }}
                className="mario-block p-2 text-center"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-xs font-bold">{skill}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Leadership Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 text-center"
        >
          <div className="mario-window p-4 bg-gradient-to-r from-yellow-100 to-red-100">
            <p className="text-sm font-bold text-mario-blue mb-2">💪 Leadership Philosophy</p>
            <p className="text-xs text-gray-700 italic">
              "Leading by example, building robust systems, and empowering teams to achieve extraordinary results in tech competitions and beyond."
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ExperienceApp;