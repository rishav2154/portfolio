import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../../data/portfolioData';
import { MapPin, Calendar, Mail, Phone } from 'lucide-react';

const AboutApp: React.FC = () => {
  return (
    <div className="p-6 h-full bg-gradient-to-br from-blue-50 to-yellow-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-4xl">
            👨‍💻
          </div>
          <h1 className="text-2xl font-bold text-mario-blue mb-2">{personalInfo.name}</h1>
          <p className="text-sm text-gray-600">BCA Student & Backend Developer</p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="mario-block p-3 flex items-center gap-3">
            <Mail className="w-5 h-5 text-mario-blue" />
            <div>
              <p className="text-xs font-bold">Email</p>
              <p className="text-xs">{personalInfo.email}</p>
            </div>
          </div>
          
          <div className="mario-block p-3 flex items-center gap-3">
            <Phone className="w-5 h-5 text-mario-green" />
            <div>
              <p className="text-xs font-bold">Phone</p>
              <p className="text-xs">{personalInfo.phone}</p>
            </div>
          </div>
          
          <div className="mario-block p-3 flex items-center gap-3">
            <MapPin className="w-5 h-5 text-mario-red" />
            <div>
              <p className="text-xs font-bold">Location</p>
              <p className="text-xs">{personalInfo.location}</p>
            </div>
          </div>
          
          <div className="mario-block p-3 flex items-center gap-3">
            <Calendar className="w-5 h-5 text-mario-purple" />
            <div>
              <p className="text-xs font-bold">Date of Birth</p>
              <p className="text-xs">{personalInfo.dob}</p>
            </div>
          </div>
        </div>

        {/* Objective */}
        <div className="mario-window p-4">
          <h2 className="text-lg font-bold text-mario-blue mb-3 flex items-center gap-2">
            🎯 Career Objective
          </h2>
          <p className="text-sm leading-relaxed text-gray-700">
            {personalInfo.objective}
          </p>
        </div>

        {/* Fun Facts */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div 
            className="mario-block p-4 text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-2xl mb-2">🏆</div>
            <p className="text-xs font-bold">Rank 1 in BCA</p>
            <p className="text-xs text-gray-600">CGPA 3.6</p>
          </motion.div>
          
          <motion.div 
            className="mario-block p-4 text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-2xl mb-2">💻</div>
            <p className="text-xs font-bold">Project Head</p>
            <p className="text-xs text-gray-600">Cyber Knight</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutApp;