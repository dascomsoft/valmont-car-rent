'use client';

import { useState, useEffect } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

export default function DateSelector({ onDateChange, selectedDate: initialDate }) {
  // ✅ FORCER la date du jour indépendamment de la prop
  const getToday = () => new Date().toISOString().split('T')[0];
  const today = getToday();
  
  // ✅ Ignorer initialDate si elle est invalide ou dans le futur lointain
  const isValidDate = (date) => {
    if (!date) return false;
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    return year <= new Date().getFullYear() + 1 && year >= 2020;
  };
  
  const defaultDate = (isValidDate(initialDate) && initialDate <= today) ? initialDate : today;
  const [localDate, setLocalDate] = useState(defaultDate);

  // ✅ Synchroniser avec le parent uniquement si la date est valide
  useEffect(() => {
    if (initialDate && isValidDate(initialDate) && initialDate !== localDate) {
      setLocalDate(initialDate);
    }
  }, [initialDate]);

  // ✅ Forcer l'envoi de la date du jour au parent au montage
  useEffect(() => {
    if (onDateChange && localDate) {
      onDateChange(localDate);
    }
  }, []);

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setLocalDate(newDate);
    onDateChange(newDate);
  };

  const resetToToday = () => {
    const todayDate = getToday();
    setLocalDate(todayDate);
    onDateChange(todayDate);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 p-4 bg-gray-800/50 border border-yellow-400/20 rounded-xl">
      <div className="flex items-center gap-3">
        <FaCalendarAlt className="text-yellow-400 text-xl" />
        <span className="text-white font-medium">Voir disponibilités pour :</span>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="date"
          value={localDate}
          onChange={handleDateChange}
          min={today}
          className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-yellow-400 focus:outline-none transition"
        />
        
        <button
          onClick={resetToToday}
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-lg transition duration-300"
        >
          Aujourd'hui
        </button>
      </div>
      
      <p className="text-xs text-gray-400">
        Les badges vert/rouge s'adaptent à la date sélectionnée
      </p>
    </div>
  );
}