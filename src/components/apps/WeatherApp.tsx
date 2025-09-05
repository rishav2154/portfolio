import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Thermometer, Droplets, Eye } from 'lucide-react';

const WeatherApp: React.FC = () => {
  const [weather, setWeather] = useState({
    location: 'New Delhi, India',
    temperature: 24,
    condition: 'sunny',
    description: 'Sunny',
    humidity: 45,
    windSpeed: 12,
    visibility: 10,
    uvIndex: 5
  });

  const [forecast] = useState([
    { day: 'Today', high: 24, low: 15, condition: 'sunny', icon: '☀️' },
    { day: 'Tomorrow', high: 22, low: 14, condition: 'partly-cloudy', icon: '⛅' },
    { day: 'Wednesday', high: 26, low: 16, condition: 'sunny', icon: '☀️' },
    { day: 'Thursday', high: 20, low: 12, condition: 'rainy', icon: '🌧️' },
    { day: 'Friday', high: 18, low: 10, condition: 'cloudy', icon: '☁️' }
  ]);

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return <Sun className="w-16 h-16 text-yellow-400" />;
      case 'cloudy': return <Cloud className="w-16 h-16 text-gray-400" />;
      case 'rainy': return <CloudRain className="w-16 h-16 text-blue-400" />;
      case 'snowy': return <CloudSnow className="w-16 h-16 text-blue-200" />;
      default: return <Sun className="w-16 h-16 text-yellow-400" />;
    }
  };

  const getBackgroundGradient = (condition: string) => {
    switch (condition) {
      case 'sunny': return 'from-blue-400 via-blue-300 to-yellow-200';
      case 'cloudy': return 'from-gray-400 via-gray-300 to-gray-200';
      case 'rainy': return 'from-gray-600 via-gray-400 to-blue-300';
      case 'snowy': return 'from-gray-300 via-blue-200 to-white';
      default: return 'from-blue-400 via-blue-300 to-yellow-200';
    }
  };

  const getMarioWeatherComment = (condition: string, temp: number) => {
    if (condition === 'sunny' && temp > 20) {
      return "🍄 It's-a beautiful day for an adventure!";
    } else if (condition === 'rainy') {
      return "☔ Mama mia! Better stay inside the castle!";
    } else if (temp < 10) {
      return "🧊 Brr! Cold as Ice World!";
    } else if (condition === 'cloudy') {
      return "☁️ Perfect weather for exploring underground!";
    }
    return "🌟 What a wonderful day in the Mushroom Kingdom!";
  };

  return (
    <div className={`h-full bg-gradient-to-br ${getBackgroundGradient(weather.condition)} relative overflow-hidden`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {weather.condition === 'sunny' && (
          <>
            <motion.div
              className="absolute top-8 right-8 w-24 h-16 bg-white rounded-full opacity-80"
              animate={{ x: [-10, 10, -10] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-16 left-16 w-20 h-12 bg-white rounded-full opacity-60"
              animate={{ x: [10, -10, 10] }}
              transition={{ duration: 10, repeat: Infinity }}
            />
          </>
        )}
        
        {weather.condition === 'rainy' && (
          <>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 h-8 bg-blue-400 opacity-70"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-10px`,
                }}
                animate={{ y: [0, window.innerHeight + 50] }}
                transition={{
                  duration: 1 + Math.random(),
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </>
        )}
      </div>

      <div className="relative z-10 p-6 h-full overflow-y-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white text-center mb-6 flex items-center justify-center gap-3"
        >
          🌤️ Mario Weather Station
        </motion.h1>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Weather */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mario-window p-6 bg-white bg-opacity-90 backdrop-blur-sm"
            >
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-mario-blue mb-2">{weather.location}</h2>
                <div className="flex items-center justify-center mb-4">
                  {getWeatherIcon(weather.condition)}
                </div>
                <div className="text-5xl font-bold text-mario-blue mb-2">
                  {weather.temperature}°C
                </div>
                <p className="text-lg text-gray-700 capitalize">{weather.description}</p>
              </div>

              {/* Mario Comment */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mario-block p-4 bg-gradient-to-r from-red-400 to-yellow-400 text-center mb-6"
              >
                <p className="text-sm font-bold text-white">
                  {getMarioWeatherComment(weather.condition, weather.temperature)}
                </p>
              </motion.div>

              {/* Weather Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mario-block p-3 text-center"
                >
                  <Droplets className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                  <p className="text-xs font-bold text-gray-700">Humidity</p>
                  <p className="text-sm font-bold text-mario-blue">{weather.humidity}%</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mario-block p-3 text-center"
                >
                  <Wind className="w-6 h-6 text-green-500 mx-auto mb-1" />
                  <p className="text-xs font-bold text-gray-700">Wind</p>
                  <p className="text-sm font-bold text-mario-blue">{weather.windSpeed} km/h</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mario-block p-3 text-center"
                >
                  <Eye className="w-6 h-6 text-purple-500 mx-auto mb-1" />
                  <p className="text-xs font-bold text-gray-700">Visibility</p>
                  <p className="text-sm font-bold text-mario-blue">{weather.visibility} km</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mario-block p-3 text-center"
                >
                  <Sun className="w-6 h-6 text-orange-500 mx-auto mb-1" />
                  <p className="text-xs font-bold text-gray-700">UV Index</p>
                  <p className="text-sm font-bold text-mario-blue">{weather.uvIndex}</p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* 5-Day Forecast */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="mario-window p-4 bg-white bg-opacity-90 backdrop-blur-sm"
            >
              <h3 className="text-lg font-bold text-mario-blue mb-4 text-center">
                📅 5-Day Forecast
              </h3>
              
              <div className="space-y-3">
                {forecast.map((day, index) => (
                  <motion.div
                    key={day.day}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (index * 0.1) }}
                    className="mario-block p-3 flex items-center justify-between"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{day.icon}</span>
                      <div>
                        <p className="text-xs font-bold text-gray-800">{day.day}</p>
                        <p className="text-xs text-gray-600 capitalize">{day.condition}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-mario-blue">{day.high}°</p>
                      <p className="text-xs text-gray-500">{day.low}°</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Weather Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="mario-window p-4 bg-white bg-opacity-90 backdrop-blur-sm mt-6"
            >
              <h3 className="text-lg font-bold text-mario-blue mb-3 text-center">
                💡 Mario's Tips
              </h3>
              
              <div className="space-y-2">
                <div className="mario-block p-2 bg-yellow-100">
                  <p className="text-xs font-bold">🌞 Sunny Day:</p>
                  <p className="text-xs text-gray-700">Perfect for outdoor adventures!</p>
                </div>
                
                <div className="mario-block p-2 bg-blue-100">
                  <p className="text-xs font-bold">🌧️ Rainy Day:</p>
                  <p className="text-xs text-gray-700">Great time for indoor coding!</p>
                </div>
                
                <div className="mario-block p-2 bg-gray-100">
                  <p className="text-xs font-bold">☁️ Cloudy Day:</p>
                  <p className="text-xs text-gray-700">Ideal for exploring new places!</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;