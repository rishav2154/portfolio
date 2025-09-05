import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Download, Share2 } from 'lucide-react';

const GalleryApp: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const gallery = [
    {
      id: 1,
      title: 'Mario Overworld',
      description: 'Classic green hills and blue sky',
      url: 'https://images.pexels.com/photos/1142950/pexels-photo-1142950.jpeg',
      category: 'Nature'
    },
    {
      id: 2,
      title: 'Underground Cave',
      description: 'Dark mysterious underground world',
      url: 'https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg',
      category: 'Underground'
    },
    {
      id: 3,
      title: 'Castle Architecture',
      description: 'Medieval castle inspiration',
      url: 'https://images.pexels.com/photos/161763/castle-czech-republic-czechia-161763.jpeg',
      category: 'Castle'
    },
    {
      id: 4,
      title: 'Sky Clouds',
      description: 'Fluffy white clouds in blue sky',
      url: 'https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg',
      category: 'Sky'
    },
    {
      id: 5,
      title: 'Retro Gaming',
      description: 'Classic arcade vibes',
      url: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg',
      category: 'Gaming'
    },
    {
      id: 6,
      title: 'Pixel Art',
      description: '8-bit style artwork',
      url: 'https://images.pexels.com/photos/1666319/pexels-photo-1666319.jpeg',
      category: 'Art'
    },
    {
      id: 7,
      title: 'Tech Setup',
      description: 'Developer workspace',
      url: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg',
      category: 'Tech'
    },
    {
      id: 8,
      title: 'Code Screen',
      description: 'Programming in action',
      url: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg',
      category: 'Tech'
    }
  ];

  const categories = ['All', ...new Set(gallery.map(img => img.category))];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredImages = selectedCategory === 'All' 
    ? gallery 
    : gallery.filter(img => img.category === selectedCategory);

  return (
    <div className="h-full bg-gradient-to-br from-purple-50 to-pink-50 overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-2xl font-bold text-mario-blue flex items-center justify-center gap-3 mb-2">
            📸 Mario Photo Gallery
          </h1>
          <p className="text-sm text-gray-600">Inspiration from the Mushroom Kingdom</p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-6"
        >
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`mario-block px-4 py-2 text-xs font-bold whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-mario-blue text-white'
                    : 'bg-yellow-400 text-black'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Image Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          layout
        >
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.1 }}
                className="mario-window p-0 overflow-hidden cursor-pointer group"
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedImage(index)}
              >
                <div className="relative aspect-square">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover pixel-perfect"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                    <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8" />
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className="mario-block px-2 py-1 text-xs font-bold">
                      {image.category}
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-xs font-bold text-mario-blue mb-1">{image.title}</h3>
                  <p className="text-xs text-gray-600">{image.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white hover:bg-opacity-40 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image */}
              <img
                src={filteredImages[selectedImage]?.url}
                alt={filteredImages[selectedImage]?.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 text-white p-4 rounded-b-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold">{filteredImages[selectedImage]?.title}</h3>
                    <p className="text-sm opacity-75">{filteredImages[selectedImage]?.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
                      onClick={() => alert('Download feature (Demo only)')}
                    >
                      <Download className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
                      onClick={() => alert('Share feature (Demo only)')}
                    >
                      <Share2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              {filteredImages.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage((prev) => 
                      prev === null ? 0 : (prev - 1 + filteredImages.length) % filteredImages.length
                    )}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white hover:bg-opacity-40 transition-colors"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => setSelectedImage((prev) => 
                      prev === null ? 0 : (prev + 1) % filteredImages.length
                    )}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white hover:bg-opacity-40 transition-colors"
                  >
                    →
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryApp;