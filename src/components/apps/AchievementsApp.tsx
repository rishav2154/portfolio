import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { achievements as allAchievements } from '../../data/portfolioData';
import { Trophy, Star, Award, Target } from 'lucide-react';

const AchievementsApp: React.FC = () => {
  const { achievements: unlockedAchievements, coins, visitedApps } = useGameStore();

  const getAchievementProgress = () => {
    const totalAchievements = allAchievements.length;
    const unlockedCount = unlockedAchievements.length;
    return {
      total: totalAchievements,
      unlocked: unlockedCount,
      percentage: Math.round((unlockedCount / totalAchievements) * 100)
    };
  };

  const progress = getAchievementProgress();

  const isUnlocked = (achievementId: string) => {
    return unlockedAchievements.includes(achievementId);
  };

  const getAchievementRarity = (id: string) => {
    const rarities: { [key: string]: 'common' | 'rare' | 'epic' | 'legendary' } = {
      'first_visit': 'common',
      'coin_collector': 'common',
      'power_user': 'rare',
      'terminal_master': 'epic',
      'explorer': 'epic',
      'flag_bearer': 'legendary'
    };
    return rarities[id] || 'common';
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-orange-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-yellow-50 to-purple-50 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-mario-blue mb-6 text-center flex items-center justify-center gap-3"
        >
          <Trophy className="w-8 h-8" />
          Achievement Gallery
        </motion.h1>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mario-window p-6 mb-8 bg-gradient-to-r from-gold-100 to-yellow-100"
        >
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-mario-blue mb-2">🏆 Achievement Progress</h2>
            <div className="text-4xl font-bold text-mario-green mb-2">
              {progress.unlocked} / {progress.total}
            </div>
            <p className="text-sm text-gray-600">Achievements Unlocked</p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-6 mb-4">
            <motion.div
              className="bg-gradient-to-r from-mario-green to-mario-yellow h-6 rounded-full flex items-center justify-center"
              initial={{ width: 0 }}
              animate={{ width: `${progress.percentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <span className="text-xs font-bold text-white">
                {progress.percentage}%
              </span>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="mario-block p-3 text-center">
              <div className="text-2xl mb-1">🪙</div>
              <p className="text-sm font-bold">{coins}</p>
              <p className="text-xs text-gray-600">Total Coins</p>
            </div>
            
            <div className="mario-block p-3 text-center">
              <div className="text-2xl mb-1">📱</div>
              <p className="text-sm font-bold">{visitedApps.length}</p>
              <p className="text-xs text-gray-600">Apps Visited</p>
            </div>
            
            <div className="mario-block p-3 text-center">
              <div className="text-2xl mb-1">⭐</div>
              <p className="text-sm font-bold">{unlockedAchievements.filter(id => getRarityColor(id) === 'legendary').length}</p>
              <p className="text-xs text-gray-600">Legendary</p>
            </div>
            
            <div className="mario-block p-3 text-center">
              <div className="text-2xl mb-1">🎯</div>
              <p className="text-sm font-bold">{progress.percentage}%</p>
              <p className="text-xs text-gray-600">Completion</p>
            </div>
          </div>
        </motion.div>

        {/* Achievement Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allAchievements.map((achievement, index) => {
            const unlocked = isUnlocked(achievement.id);
            const rarity = getAchievementRarity(achievement.id);
            const rarityColor = getRarityColor(rarity);

            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20, rotateY: -10 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`mario-window p-0 overflow-hidden relative ${
                  unlocked ? '' : 'opacity-60 grayscale'
                }`}
                whileHover={unlocked ? { scale: 1.05, rotateY: 5 } : undefined}
              >
                {/* Rarity Border */}
                <div className={`h-2 bg-gradient-to-r ${rarityColor}`} />

                {/* Achievement Content */}
                <div className="p-4">
                  {/* Icon and Status */}
                  <div className="flex items-center justify-between mb-3">
                    <div className={`text-4xl ${unlocked ? '' : 'opacity-50'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex items-center gap-1">
                      {unlocked ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="achievement-badge w-8 h-8 text-sm"
                        >
                          ✓
                        </motion.div>
                      ) : (
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs">
                          🔒
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Title and Description */}
                  <h3 className={`text-sm font-bold mb-2 ${unlocked ? 'text-mario-blue' : 'text-gray-500'}`}>
                    {achievement.title}
                  </h3>
                  <p className={`text-xs leading-relaxed ${unlocked ? 'text-gray-700' : 'text-gray-400'}`}>
                    {achievement.description}
                  </p>

                  {/* Rarity Badge */}
                  <div className="mt-3 flex justify-between items-center">
                    <span className={`text-xs px-2 py-1 rounded capitalize font-bold bg-gradient-to-r ${rarityColor} text-white`}>
                      {rarity}
                    </span>
                    {unlocked && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center gap-1 text-xs text-green-600"
                      >
                        <Star className="w-3 h-3" />
                        <span>Unlocked!</span>
                      </motion.div>
                    )}
                  </div>

                  {/* Progress Indicator (for some achievements) */}
                  {achievement.id === 'coin_collector' && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Coins Collected</span>
                        <span>{Math.min(coins, 10)}/10</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-mario-yellow h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min((coins / 10) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {achievement.id === 'explorer' && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Apps Explored</span>
                        <span>{Math.min(visitedApps.length, 10)}/10</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-mario-blue h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min((visitedApps.length / 10) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Sparkle Effect for Unlocked Achievements */}
                {unlocked && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                        style={{
                          left: `${20 + i * 30}%`,
                          top: `${20 + i * 20}%`,
                        }}
                        animate={{
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Next Achievement Hint */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-8 mario-window p-6 bg-gradient-to-r from-blue-100 to-purple-100 text-center"
        >
          <h3 className="text-lg font-bold text-mario-blue mb-3 flex items-center justify-center gap-2">
            <Target className="w-6 h-6" />
            Next Achievement
          </h3>
          
          {progress.unlocked < progress.total ? (
            <div>
              <p className="text-sm text-gray-700 mb-2">
                Keep exploring to unlock more achievements!
              </p>
              <div className="mario-block p-3 inline-block">
                <p className="text-xs font-bold">💡 Hint: Try using terminal commands or exploring different apps!</p>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-lg font-bold text-mario-green mb-2">
                🎉 Congratulations! You've unlocked all achievements!
              </p>
              <p className="text-sm text-gray-700">
                You are a true Mario Portfolio master! 🍄👑
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AchievementsApp;