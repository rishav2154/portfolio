import React from 'react';
import { motion } from 'framer-motion';
import { certifications } from '../../data/portfolioData';
import { Award, Download, ExternalLink } from 'lucide-react';

const CertificatesApp: React.FC = () => {
  const getCertificateIcon = (type: string) => {
    switch (type) {
      case 'certification': return '🏆';
      case 'volunteer': return '🤝';
      default: return '📜';
    }
  };

  const getCertificateColor = (issuer: string) => {
    const colors: { [key: string]: string } = {
      'IBM': 'from-blue-500 to-blue-700',
      'Lernx': 'from-green-500 to-green-700',
      'TechSamaaroh': 'from-purple-500 to-purple-700'
    };
    return colors[issuer] || 'from-gray-500 to-gray-700';
  };

  return (
    <div className="p-6 h-full bg-gradient-to-br from-yellow-50 to-orange-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-mario-blue mb-6 text-center flex items-center justify-center gap-3"
        >
          <Award className="w-8 h-8" />
          Certificates & Achievements
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20, rotateY: -10 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="mario-window p-0 overflow-hidden transform perspective-1000"
              whileHover={{ scale: 1.05, rotateY: 5 }}
            >
              {/* Certificate Header */}
              <div className={`bg-gradient-to-r ${getCertificateColor(cert.issuer)} p-4 text-white relative`}>
                <div className="absolute top-2 right-2 text-2xl">
                  {getCertificateIcon(cert.type)}
                </div>
                <div className="pr-8">
                  <h3 className="font-bold text-sm mb-1 leading-tight">{cert.name}</h3>
                  <p className="text-xs opacity-90">{cert.issuer}</p>
                </div>
              </div>

              {/* Certificate Content */}
              <div className="p-4">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-2xl mb-2">
                    🏅
                  </div>
                  <p className="text-xs text-gray-600 capitalize">
                    {cert.type} Certificate
                  </p>
                </div>

                {/* Certificate Details */}
                <div className="space-y-2 mb-4">
                  <div className="mario-block p-2 text-center">
                    <p className="text-xs font-bold">Issued by</p>
                    <p className="text-xs text-gray-700">{cert.issuer}</p>
                  </div>
                  
                  <div className="mario-block p-2 text-center">
                    <p className="text-xs font-bold">Status</p>
                    <p className="text-xs text-green-600 font-bold">✅ Verified</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 mario-block py-2 px-3 text-xs font-bold flex items-center justify-center gap-1"
                    onClick={() => alert('Certificate view (Demo only)')}
                  >
                    <ExternalLink className="w-3 h-3" />
                    View
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 mario-block py-2 px-3 text-xs font-bold flex items-center justify-center gap-1 bg-mario-green"
                    onClick={() => alert('Download certificate (Demo only)')}
                  >
                    <Download className="w-3 h-3" />
                    Download
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievement Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 mario-window p-6 bg-gradient-to-r from-gold-100 to-yellow-100"
        >
          <h2 className="text-lg font-bold text-mario-blue mb-4 text-center">
            🏆 Achievement Summary
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="mario-block p-4">
              <div className="text-2xl mb-2">📜</div>
              <p className="text-sm font-bold">{certifications.length}</p>
              <p className="text-xs text-gray-600">Total Certificates</p>
            </div>
            
            <div className="mario-block p-4">
              <div className="text-2xl mb-2">💻</div>
              <p className="text-sm font-bold">{certifications.filter(c => c.type === 'certification').length}</p>
              <p className="text-xs text-gray-600">Tech Certifications</p>
            </div>
            
            <div className="mario-block p-4">
              <div className="text-2xl mb-2">🤝</div>
              <p className="text-sm font-bold">{certifications.filter(c => c.type === 'volunteer').length}</p>
              <p className="text-xs text-gray-600">Volunteer Work</p>
            </div>
            
            <div className="mario-block p-4">
              <div className="text-2xl mb-2">🌟</div>
              <p className="text-sm font-bold">A+</p>
              <p className="text-xs text-gray-600">Learning Grade</p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="inline-flex items-center gap-2 mario-block p-3"
            >
              <span className="text-xs font-bold">🚀 Next Goal:</span>
              <span className="text-xs text-gray-700">AWS Certification</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Learning Path */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0 }}
          className="mt-6 mario-window p-4 bg-gradient-to-r from-blue-100 to-purple-100"
        >
          <h3 className="text-md font-bold text-mario-blue mb-3 text-center">
            📚 Continuous Learning Journey
          </h3>
          <div className="flex justify-center items-center gap-2 text-xs">
            <span className="mario-block p-2">Web Dev Fundamentals</span>
            <span>→</span>
            <span className="mario-block p-2">Backend Specialization</span>
            <span>→</span>
            <span className="mario-block p-2">Full Stack Mastery</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CertificatesApp;