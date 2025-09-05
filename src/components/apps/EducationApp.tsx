import React from 'react';
import { motion } from 'framer-motion';
import { education } from '../../data/portfolioData';
import { GraduationCap, Calendar, Award } from 'lucide-react';

const EducationApp: React.FC = () => {
  return (
    <div className="p-6 h-full bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-mario-blue mb-6 flex items-center gap-3">
          <GraduationCap className="w-8 h-8" />
          Educational Journey
        </h1>

        <div className="space-y-6">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="mario-window p-6 relative"
            >
              <div className="absolute top-4 right-4">
                <div className="mario-block w-12 h-12 flex items-center justify-center text-2xl">
                  {index === 0 ? '🏆' : index === 1 ? '📚' : '🎓'}
                </div>
              </div>

              <div className="pr-16">
                <h3 className="text-lg font-bold text-mario-blue mb-2">{edu.degree}</h3>
                <p className="text-sm text-gray-700 mb-2">{edu.institution}</p>
                
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{edu.period}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    <span>{edu.status}</span>
                  </div>
                </div>

                {index === 0 && (
                  <div className="mt-4 p-3 bg-yellow-100 border-2 border-yellow-400 rounded">
                    <p className="text-xs font-bold text-yellow-800">
                      🌟 Outstanding Achievement: Rank 1 in BCA with CGPA 3.6
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <div className="mario-block p-4 inline-block">
            <p className="text-sm font-bold">🎯 Academic Focus</p>
            <p className="text-xs text-gray-700 mt-2">
              Backend Development & Data Analysis
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EducationApp;