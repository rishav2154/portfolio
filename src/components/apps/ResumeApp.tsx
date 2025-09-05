import React from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, Share2 } from 'lucide-react';
import { personalInfo, education, experience, skills, certifications } from '../../data/portfolioData';

const ResumeApp: React.FC = () => {
  const handleDownload = () => {
    // In a real implementation, this would trigger a PDF download
    alert('Resume download initiated! (Demo only)');
  };

  const handleView = () => {
    // In a real implementation, this would open the PDF in a new tab
    window.open('#', '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Rishav Jaiswal - Resume',
        text: 'Check out my professional resume',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Resume link copied to clipboard!');
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header Actions */}
      <div className="p-4 bg-white border-b border-gray-200 flex justify-between items-center">
        <h1 className="text-lg font-bold text-mario-blue">📄 Professional Resume</h1>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleView}
            className="mario-block px-3 py-2 text-xs font-bold flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            View PDF
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            className="mario-block px-3 py-2 text-xs font-bold flex items-center gap-2 bg-mario-green"
          >
            <Download className="w-4 h-4" />
            Download
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="mario-block px-3 py-2 text-xs font-bold flex items-center gap-2 bg-mario-blue text-white"
          >
            <Share2 className="w-4 h-4" />
            Share
          </motion.button>
        </div>
      </div>

      {/* Resume Preview */}
      <div className="p-6 overflow-y-auto h-full">
        <div className="max-w-4xl mx-auto bg-white shadow-lg" style={{ aspectRatio: '8.5/11' }}>
          <div className="p-8 h-full">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8 pb-4 border-b-2 border-mario-blue"
            >
              <h1 className="text-3xl font-bold text-mario-blue mb-2">{personalInfo.name}</h1>
              <p className="text-lg text-gray-700 mb-2">BCA Student & Backend Developer</p>
              <div className="flex justify-center items-center gap-4 text-sm text-gray-600">
                <span>{personalInfo.email}</span>
                <span>•</span>
                <span>{personalInfo.phone}</span>
                <span>•</span>
                <span>{personalInfo.location}</span>
              </div>
            </motion.div>

            {/* Objective */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6"
            >
              <h2 className="text-lg font-bold text-mario-blue mb-3 flex items-center gap-2">
                🎯 CAREER OBJECTIVE
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {personalInfo.objective}
              </p>
            </motion.section>

            {/* Education */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <h2 className="text-lg font-bold text-mario-blue mb-3 flex items-center gap-2">
                🎓 EDUCATION
              </h2>
              {education.map((edu, index) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-sm text-gray-800">{edu.degree}</h3>
                      <p className="text-sm text-gray-600">{edu.institution}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{edu.period}</p>
                      <p className="text-sm font-medium text-mario-green">{edu.status}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.section>

            {/* Experience */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <h2 className="text-lg font-bold text-mario-blue mb-3 flex items-center gap-2">
                💼 PROFESSIONAL EXPERIENCE
              </h2>
              {experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-sm text-gray-800">{exp.title}</h3>
                      <p className="text-sm text-mario-red font-medium">{exp.company}</p>
                    </div>
                    <p className="text-sm text-gray-600">{exp.period}</p>
                  </div>
                  <ul className="text-sm text-gray-700 ml-4">
                    {exp.responsibilities.map((resp, respIndex) => (
                      <li key={respIndex} className="mb-1">• {resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.section>

            {/* Skills */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6"
            >
              <h2 className="text-lg font-bold text-mario-blue mb-3 flex items-center gap-2">
                💪 TECHNICAL SKILLS
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-bold text-sm text-gray-800 mb-1">Programming:</h3>
                  <p className="text-sm text-gray-700">{skills.programming.join(', ')}</p>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-800 mb-1">Databases:</h3>
                  <p className="text-sm text-gray-700">{skills.databases.join(', ')}</p>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-800 mb-1">Data Analysis:</h3>
                  <p className="text-sm text-gray-700">{skills.data.join(', ')}</p>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-800 mb-1">Web Technologies:</h3>
                  <p className="text-sm text-gray-700">{skills.web.join(', ')}</p>
                </div>
              </div>
            </motion.section>

            {/* Certifications */}
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-lg font-bold text-mario-blue mb-3 flex items-center gap-2">
                🏆 CERTIFICATIONS & ACHIEVEMENTS
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {certifications.map((cert, index) => (
                  <div key={index} className="text-sm text-gray-700">
                    • <span className="font-medium">{cert.name}</span> - {cert.issuer}
                  </div>
                ))}
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeApp;