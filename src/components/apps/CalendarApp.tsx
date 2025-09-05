import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon } from 'lucide-react';

const CalendarApp: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<{ [key: string]: string[] }>({
    '2024-12-25': ['🎄 Christmas Day'],
    '2024-12-31': ['🎉 New Year\'s Eve'],
    '2025-01-01': ['🎊 New Year\'s Day'],
    '2025-01-15': ['📚 Project Deadline'],
    '2025-02-14': ['💝 Valentine\'s Day']
  });

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const hasEvents = (date: Date | null) => {
    if (!date) return false;
    return events[formatDate(date)] && events[formatDate(date)].length > 0;
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="h-full bg-gradient-to-br from-green-50 to-blue-50 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-mario-blue mb-6 text-center flex items-center justify-center gap-3"
        >
          <CalendarIcon className="w-8 h-8" />
          Mario Calendar
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="mario-window p-6">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigateMonth('prev')}
                  className="mario-block p-2"
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>

                <h2 className="text-xl font-bold text-mario-blue">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigateMonth('next')}
                  className="mario-block p-2"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {dayNames.map((day) => (
                  <div key={day} className="text-center p-2 font-bold text-mario-blue text-sm">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <motion.div 
                className="grid grid-cols-7 gap-2"
                key={`${currentDate.getMonth()}-${currentDate.getFullYear()}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {days.map((day, index) => (
                  <motion.div
                    key={index}
                    whileHover={day ? { scale: 1.05 } : undefined}
                    whileTap={day ? { scale: 0.95 } : undefined}
                    onClick={() => day && setSelectedDate(day)}
                    className={`
                      aspect-square flex flex-col items-center justify-center p-2 rounded cursor-pointer relative
                      ${!day ? '' : 
                        isToday(day) ? 'mario-block bg-mario-red text-white' :
                        selectedDate && day.toDateString() === selectedDate.toDateString() ? 'mario-block bg-mario-blue text-white' :
                        hasEvents(day) ? 'mario-block bg-mario-yellow' :
                        'mario-block hover:bg-gray-200'
                      }
                    `}
                  >
                    {day && (
                      <>
                        <span className="text-sm font-bold">{day.getDate()}</span>
                        {hasEvents(day) && (
                          <div className="absolute bottom-1 w-2 h-2 bg-red-500 rounded-full"></div>
                        )}
                      </>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Events Panel */}
          <div className="space-y-6">
            {/* Today's Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mario-window p-4"
            >
              <h3 className="text-lg font-bold text-mario-blue mb-3">📅 Today</h3>
              <div className="text-sm text-gray-700">
                <p>{new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
            </motion.div>

            {/* Selected Date Events */}
            <AnimatePresence>
              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="mario-window p-4"
                >
                  <h3 className="text-lg font-bold text-mario-blue mb-3">
                    📝 {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    {events[formatDate(selectedDate)]?.map((event, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="mario-block p-2 text-xs"
                      >
                        {event}
                      </motion.div>
                    )) || (
                      <p className="text-xs text-gray-500 italic">No events scheduled</p>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full mario-block p-2 text-xs font-bold flex items-center justify-center gap-1 bg-mario-green text-white"
                    onClick={() => {
                      const eventName = prompt('Enter event name:');
                      if (eventName) {
                        const dateKey = formatDate(selectedDate);
                        setEvents(prev => ({
                          ...prev,
                          [dateKey]: [...(prev[dateKey] || []), eventName]
                        }));
                      }
                    }}
                  >
                    <Plus className="w-3 h-3" />
                    Add Event
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Upcoming Events */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="mario-window p-4"
            >
              <h3 className="text-lg font-bold text-mario-blue mb-3">🗓️ Upcoming</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {Object.entries(events)
                  .filter(([date]) => new Date(date) >= new Date())
                  .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
                  .slice(0, 5)
                  .map(([date, eventList]) => (
                    <div key={date} className="mario-block p-2">
                      <p className="text-xs font-bold text-mario-blue mb-1">
                        {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                      {eventList.map((event, index) => (
                        <p key={index} className="text-xs text-gray-700">
                          {event}
                        </p>
                      ))}
                    </div>
                  ))}
              </div>
            </motion.div>

            {/* Mario Quote */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="mario-window p-4 bg-gradient-to-r from-yellow-100 to-red-100 text-center"
            >
              <div className="text-4xl mb-2">🍄</div>
              <p className="text-xs font-bold text-mario-blue">
                "Let's-a go! Another day, another adventure!"
              </p>
              <p className="text-xs text-gray-600 mt-1">- Mario</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarApp;