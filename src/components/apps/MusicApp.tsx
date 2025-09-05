import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat } from 'lucide-react';

const MusicApp: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(75);

  const playlist = [
    {
      title: 'Super Mario Bros Theme',
      artist: 'Koji Kondo',
      duration: '2:24',
      cover: '🍄'
    },
    {
      title: 'Underground Theme',
      artist: 'Nintendo',
      duration: '1:58',
      cover: '🕳️'
    },
    {
      title: 'Castle Theme',
      artist: 'Nintendo',
      duration: '2:45',
      cover: '🏰'
    },
    {
      title: 'Star Power Theme',
      artist: 'Nintendo',
      duration: '0:45',
      cover: '⭐'
    },
    {
      title: 'Victory Fanfare',
      artist: 'Nintendo',
      duration: '0:15',
      cover: '🏁'
    }
  ];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  const currentSong = playlist[currentTrack];

  return (
    <div className="h-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -40, -20],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-6 h-full flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl font-bold mb-2">🎵 Mario Music Player</h1>
          <p className="text-sm opacity-75">Classic Nintendo Soundtrack</p>
        </motion.div>

        {/* Current Track Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 flex flex-col items-center justify-center"
        >
          <motion.div
            className="w-48 h-48 rounded-full bg-gradient-to-br from-red-500 to-yellow-500 flex items-center justify-center text-8xl mb-6 shadow-2xl"
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 4, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
          >
            {currentSong.cover}
          </motion.div>

          <h2 className="text-xl font-bold mb-2 text-center">{currentSong.title}</h2>
          <p className="text-sm opacity-75 mb-6">{currentSong.artist}</p>

          {/* Progress Bar */}
          <div className="w-full max-w-md mb-6">
            <div className="flex justify-between text-xs mb-2">
              <span>1:23</span>
              <span>{currentSong.duration}</span>
            </div>
            <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
              <motion.div
                className="bg-yellow-400 h-2 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: isPlaying ? "60%" : "40%" }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center gap-4 mb-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTrack}
              className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur"
            >
              <SkipBack className="w-6 h-6" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlay}
              className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-black shadow-lg"
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTrack}
              className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur"
            >
              <SkipForward className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Additional Controls */}
          <div className="flex items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="opacity-50 hover:opacity-100 transition-opacity"
            >
              <Shuffle className="w-5 h-5" />
            </motion.button>

            <div className="flex items-center gap-2">
              <Volume2 className="w-5 h-5" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(parseInt(e.target.value))}
                className="w-20 accent-yellow-400"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="opacity-50 hover:opacity-100 transition-opacity"
            >
              <Repeat className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Playlist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-h-48 overflow-y-auto"
        >
          <h3 className="text-lg font-bold mb-3">🎼 Playlist</h3>
          <div className="space-y-2">
            {playlist.map((track, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                onClick={() => setCurrentTrack(index)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  index === currentTrack
                    ? 'bg-yellow-400 text-black'
                    : 'bg-white bg-opacity-10 hover:bg-opacity-20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{track.cover}</div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{track.title}</p>
                    <p className="text-xs opacity-75">{track.artist}</p>
                  </div>
                  <span className="text-xs">{track.duration}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MusicApp;