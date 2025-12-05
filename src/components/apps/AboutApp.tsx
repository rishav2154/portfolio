import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../../data/portfolioData';
import { MapPin, Calendar, Mail, Phone } from 'lucide-react';

const AboutApp: React.FC = () => {
  return (
    <div className="p-6 h-full bg-gradient-to-br from-blue-50 to-yellow-50 relative overflow-hidden">
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-300 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              x: [-5, 5, -5],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div 
            className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-bold text-6xl border-4 border-white shadow-2xl"
            whileHover={{ 
              scale: 1.1,
              rotate: 360,
              boxShadow: "0 0 30px rgba(239, 68, 68, 0.5)",
            }}
            transition={{ duration: 0.8 }}
          >
            R
          </motion.div>
          <h1 className="text-2xl font-bold text-mario-blue mb-2">{personalInfo.name}</h1>
          <p className="text-sm text-gray-600">BCA Student & Backend Developer</p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div 
            className="mario-block p-3 flex items-center gap-3"
            whileHover={{ scale: 1.05, rotateY: 5 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Mail className="w-5 h-5 text-mario-blue" />
            <div>
              <p className="text-xs font-bold">Email</p>
              <p className="text-xs">{personalInfo.email}</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="mario-block p-3 flex items-center gap-3"
            whileHover={{ scale: 1.05, rotateY: 5 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Phone className="w-5 h-5 text-mario-green" />
            <div>
              <p className="text-xs font-bold">Phone</p>
              <p className="text-xs">{personalInfo.phone}</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="mario-block p-3 flex items-center gap-3"
            whileHover={{ scale: 1.05, rotateY: 5 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <MapPin className="w-5 h-5 text-mario-red" />
            <div>
              <p className="text-xs font-bold">Location</p>
              <p className="text-xs">{personalInfo.location}</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="mario-block p-3 flex items-center gap-3"
            whileHover={{ scale: 1.05, rotateY: 5 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Calendar className="w-5 h-5 text-mario-purple" />
            <div>
              <p className="text-xs font-bold">Date of Birth</p>
              <p className="text-xs">{personalInfo.dob}</p>
            </div>
          </motion.div>
        </div>

        {/* Objective */}
        <motion.div 
          className="mario-window p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-lg font-bold text-mario-blue mb-3 flex items-center gap-2">
            🎯 Career Objective
          </h2>
          <p className="text-sm leading-relaxed text-gray-700">
            {personalInfo.objective}
          </p>
        </motion.div>

        {/* Detailed Background */}
        <motion.div 
          className="mt-6 mario-window p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-lg font-bold text-mario-blue mb-3 flex items-center gap-2">
            📚 Background & Interests
          </h2>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <strong>🎓 Academic Excellence:</strong> Currently maintaining Rank 1 in BCA program with a CGPA of 3.6, 
              demonstrating consistent academic performance and dedication to learning.
            </p>
            <p>
              <strong>💻 Technical Passion:</strong> Deeply passionate about backend development and data analysis. 
              I enjoy building scalable systems and extracting meaningful insights from complex datasets using Python and SQL.
            </p>
            <p>
              <strong>🏆 Leadership Experience:</strong> As Project Head at Cyber Knight, I lead technical teams in organizing 
              cybersecurity events and competitions, managing end-to-end project delivery and infrastructure development.
            </p>
            <p>
              <strong>🚀 Innovation Focus:</strong> Always exploring new technologies and methodologies to solve real-world problems. 
              Currently working on advanced CTF platforms and data visualization projects.
            </p>
          </div>
        </motion.div>

        {/* Skills Highlight */}
        <motion.div 
          className="mt-6 mario-window p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-lg font-bold text-mario-blue mb-3 flex items-center gap-2">
            ⚡ Core Competencies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold text-mario-red mb-2">🔧 Technical Skills</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Backend Development (Node.js, Express)</li>
                <li>• Database Management (MySQL, SQL)</li>
                <li>• Data Analysis (Python, Pandas, NumPy)</li>
                <li>• Web Technologies (HTML, CSS, React)</li>
                <li>• Programming (Python, C, Java)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-mario-green mb-2">🤝 Soft Skills</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Project Management & Leadership</li>
                <li>• Problem-solving & Critical Thinking</li>
                <li>• Team Collaboration & Communication</li>
                <li>• Event Planning & Execution</li>
                <li>• Adaptability & Quick Learning</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Personal Interests */}
        <motion.div 
          className="mt-6 mario-window p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-lg font-bold text-mario-blue mb-3 flex items-center gap-2">
            🎨 Personal Interests & Hobbies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="mario-block p-3 text-center">
              <div className="text-2xl mb-2">🔐</div>
              <p className="text-xs font-bold">Cybersecurity</p>
              <p className="text-xs text-gray-600">CTF competitions & security research</p>
            </div>
            <div className="mario-block p-3 text-center">
              <div className="text-2xl mb-2">📊</div>
              <p className="text-xs font-bold">Data Science</p>
              <p className="text-xs text-gray-600">Analytics & visualization projects</p>
            </div>
            <div className="mario-block p-3 text-center">
              <div className="text-2xl mb-2">🎮</div>
              <p className="text-xs font-bold">Gaming</p>
              <p className="text-xs text-gray-600">Strategy games & puzzle solving</p>
            </div>
          </div>
        </motion.div>

        {/* Goals & Aspirations */}
        <motion.div 
          className="mt-6 mario-window p-4 bg-gradient-to-r from-purple-100 to-blue-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-lg font-bold text-mario-blue mb-3 flex items-center gap-2">
            🌟 Future Goals & Aspirations
          </h2>
          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <strong>🎯 Short-term Goals:</strong> Complete BCA with distinction, gain hands-on experience in 
              enterprise-level backend systems, and contribute to open-source projects in the data analysis domain.
            </p>
            <p>
              <strong>🚀 Long-term Vision:</strong> Become a senior backend architect specializing in scalable systems 
              and data infrastructure. Aspire to lead technical teams in building innovative solutions that impact millions of users.
            </p>
            <p>
              <strong>📈 Continuous Learning:</strong> Currently pursuing advanced certifications in cloud technologies (AWS) 
              and exploring machine learning applications in backend systems.
            </p>
          </div>
        </motion.div>
        {/* Fun Facts */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div 
            className="mario-block p-4 text-center"
            whileHover={{ 
              scale: 1.05,
              rotateY: 10,
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-2xl mb-2">🏆</div>
            <p className="text-xs font-bold">Rank 1 in BCA</p>
            <p className="text-xs text-gray-600">CGPA 3.6</p>
          </motion.div>
          
          <motion.div 
            className="mario-block p-4 text-center"
            whileHover={{ 
              scale: 1.05,
              rotateY: 10,
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="text-2xl mb-2">💻</div>
            <p className="text-xs font-bold">Project Head</p>
            <p className="text-xs text-gray-600">Cyber Knight</p>
          </motion.div>
        </div>

        {/* Contact CTA */}
        <motion.div 
          className="mt-6 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0 }}
        >
          <div className="mario-window p-4 bg-gradient-to-r from-green-100 to-yellow-100">
            <h3 className="text-lg font-bold text-mario-blue mb-2">🤝 Let's Connect!</h3>
            <p className="text-sm text-gray-700 mb-3">
              Interested in collaborating or discussing opportunities? I'd love to hear from you!
            </p>
            <div className="flex justify-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open(`mailto:${personalInfo.email}`, '_blank')}
                className="mario-block px-4 py-2 text-xs font-bold bg-mario-blue text-white"
              >
                📧 Email Me
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open(`tel:${personalInfo.phone}`, '_blank')}
                className="mario-block px-4 py-2 text-xs font-bold bg-mario-green text-white"
              >
                📞 Call Me
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutApp;