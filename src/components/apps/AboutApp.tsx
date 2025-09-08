import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../../data/portfolioData';
import { MapPin, Calendar, Mail, Phone, Star, Zap } from 'lucide-react';

const AboutApp: React.FC = () => {
  return (
    <div className="p-6 h-full bg-gradient-to-br from-blue-50 to-yellow-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <motion.div 
            className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-500 via-red-600 to-red-700 flex items-center justify-center text-white font-bold text-6xl border-4 border-white shadow-2xl relative overflow-hidden"
            whileHover={{ 
              scale: 1.1,
              rotate: [0, -5, 5, 0],
              boxShadow: "0 0 30px rgba(220, 38, 38, 0.5)"
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Animated shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
              animate={{ 
                x: [-100, 200],
                opacity: [0, 0.3, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            />
            R
          </motion.div>
          <h1 className="text-2xl font-bold text-mario-blue mb-2">{personalInfo.name}</h1>
          <motion.p 
            className="text-sm text-gray-600"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            BCA Student & Backend Developer
          </motion.p>
        </motion.div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div 
            className="mario-block p-3 flex items-center gap-3 cursor-pointer"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Mail className="w-5 h-5 text-mario-blue" />
            </motion.div>
            <div>
              <p className="text-xs font-bold">Email</p>
              <p className="text-xs">{personalInfo.email}</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="mario-block p-3 flex items-center gap-3 cursor-pointer"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            >
              <Phone className="w-5 h-5 text-mario-green" />
            </motion.div>
            <div>
              <p className="text-xs font-bold">Phone</p>
              <p className="text-xs">{personalInfo.phone}</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="mario-block p-3 flex items-center gap-3 cursor-pointer"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MapPin className="w-5 h-5 text-mario-red" />
            </motion.div>
            <div>
              <p className="text-xs font-bold">Location</p>
              <p className="text-xs">{personalInfo.location}</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="mario-block p-3 flex items-center gap-3 cursor-pointer"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Calendar className="w-5 h-5 text-mario-purple" />
            </motion.div>
            <div>
              <p className="text-xs font-bold">Date of Birth</p>
              <p className="text-xs">{personalInfo.dob}</p>
            </div>
          </motion.div>
        </div>

        {/* Objective */}
        <motion.div 
          className="mario-window p-4 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ 
            boxShadow: "0 15px 30px rgba(0,0,0,0.1)"
          }}
        >
          {/* Background animation */}
          <motion.div
            className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-transparent rounded-full opacity-50"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <h2 className="text-lg font-bold text-mario-blue mb-3 flex items-center gap-2">
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              🎯
            </motion.span>
            Career Objective
          </h2>
          <p className="text-sm leading-relaxed text-gray-700">
            {personalInfo.objective}
          </p>
        </motion.div>

        {/* Fun Facts */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div 
            className="mario-block p-4 text-center cursor-pointer relative overflow-hidden"
            whileHover={{ 
              scale: 1.08,
              rotate: [0, -2, 2, 0],
              boxShadow: "0 15px 30px rgba(0,0,0,0.15)"
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
          >
            <motion.div 
              className="text-3xl mb-2"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
              🏆
            </motion.div>
            <p className="text-xs font-bold">Rank 1 in BCA</p>
            <p className="text-xs text-gray-600">CGPA 3.6</p>
            {/* Sparkle effects */}
            <motion.div
              className="absolute top-2 right-2 text-yellow-400"
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            >
              ✨
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="mario-block p-4 text-center cursor-pointer relative overflow-hidden"
            whileHover={{ 
              scale: 1.08,
              rotate: [0, 2, -2, 0],
              boxShadow: "0 15px 30px rgba(0,0,0,0.15)"
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
          >
            <motion.div 
              className="text-3xl mb-2"
              animate={{ 
                y: [-2, 2, -2],
                rotate: [0, -3, 3, 0]
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              💻
            </motion.div>
            <p className="text-xs font-bold">Project Head</p>
            <p className="text-xs text-gray-600">Cyber Knight</p>
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 rounded"
              whileHover={{ opacity: 0.1 }}
            />
          </motion.div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-mario-yellow rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                opacity: [0.1, 0.6, 0.1],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AboutApp;