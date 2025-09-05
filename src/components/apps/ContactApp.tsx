import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../../data/portfolioData';
import { Mail, Phone, MapPin, Send, MessageCircle, Copy } from 'lucide-react';
import { soundManager } from '../../utils/soundManager';

const ContactApp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    soundManager.play('coin');
    alert('🍄 Message sent! Mario has received your letter!');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    soundManager.play('coin');
    alert(`${label} copied to clipboard! 🪙`);
  };

  return (
    <div className="h-full bg-gradient-to-br from-red-50 to-blue-50 overflow-y-auto">
      <div className="p-6">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-mario-blue mb-6 text-center flex items-center justify-center gap-3"
        >
          <MessageCircle className="w-8 h-8" />
          Let's Connect!
        </motion.h1>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="mario-window p-6">
              <h2 className="text-lg font-bold text-mario-blue mb-4 flex items-center gap-2">
                📞 Contact Information
              </h2>

              <div className="space-y-4">
                <motion.div 
                  className="mario-block p-4 flex items-center gap-4 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => copyToClipboard(personalInfo.email, 'Email')}
                >
                  <div className="w-12 h-12 bg-mario-blue rounded-full flex items-center justify-center text-white">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold">Email</p>
                    <p className="text-xs text-gray-600">{personalInfo.email}</p>
                  </div>
                  <Copy className="w-4 h-4 text-gray-400" />
                </motion.div>

                <motion.div 
                  className="mario-block p-4 flex items-center gap-4 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => copyToClipboard(personalInfo.phone, 'Phone')}
                >
                  <div className="w-12 h-12 bg-mario-green rounded-full flex items-center justify-center text-white">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold">Phone</p>
                    <p className="text-xs text-gray-600">{personalInfo.phone}</p>
                  </div>
                  <Copy className="w-4 h-4 text-gray-400" />
                </motion.div>

                <motion.div 
                  className="mario-block p-4 flex items-center gap-4"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-12 h-12 bg-mario-red rounded-full flex items-center justify-center text-white">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold">Location</p>
                    <p className="text-xs text-gray-600">{personalInfo.location}</p>
                  </div>
                </motion.div>
              </div>

              {/* Quick Actions */}
              <div className="mt-6 space-y-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open(`mailto:${personalInfo.email}`, '_blank')}
                  className="w-full mario-block p-3 font-bold text-sm flex items-center justify-center gap-2 bg-mario-blue text-white"
                >
                  <Mail className="w-4 h-4" />
                  Send Email Directly
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open(`tel:${personalInfo.phone}`, '_blank')}
                  className="w-full mario-block p-3 font-bold text-sm flex items-center justify-center gap-2 bg-mario-green text-white"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="mario-window p-6">
              <h2 className="text-lg font-bold text-mario-blue mb-4 flex items-center gap-2">
                💬 Send a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-3 border-2 border-black rounded font-mono text-sm"
                    placeholder="Enter your name..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full p-3 border-2 border-black rounded font-mono text-sm"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full p-3 border-2 border-black rounded font-mono text-sm"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full p-3 border-2 border-black rounded font-mono text-sm resize-none"
                    placeholder="Tell me about your project, question, or just say hi!"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mario-block p-3 font-bold text-sm flex items-center justify-center gap-2 bg-mario-red text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="mario-loader w-4 h-4"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message 🚀
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Fun Contact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 max-w-4xl mx-auto"
        >
          <div className="mario-window p-6 bg-gradient-to-r from-purple-100 to-pink-100">
            <h3 className="text-lg font-bold text-mario-blue mb-4 text-center">
              🤝 Let's Build Something Amazing Together!
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="mario-block p-4">
                <div className="text-2xl mb-2">⚡</div>
                <p className="text-sm font-bold">Quick Response</p>
                <p className="text-xs text-gray-600">Usually within 24 hours</p>
              </div>
              
              <div className="mario-block p-4">
                <div className="text-2xl mb-2">💼</div>
                <p className="text-sm font-bold">Open to Opportunities</p>
                <p className="text-xs text-gray-600">Backend & Data Analysis</p>
              </div>
              
              <div className="mario-block p-4">
                <div className="text-2xl mb-2">🌟</div>
                <p className="text-sm font-bold">Always Learning</p>
                <p className="text-xs text-gray-600">New technologies & skills</p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-700 italic">
                "Whether you have a project idea, want to collaborate, or just want to chat about tech, I'd love to hear from you! 🍄"
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactApp;