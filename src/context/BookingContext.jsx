'use client';

import { createContext, useContext, useState } from 'react';

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [modalState, setModalState] = useState({
    isOpen: false,
    vehicle: null,
  });

  const openBooking = (vehicle) => {
    console.log('📖 OUVERTURE MODAL', vehicle);
    setModalState({ isOpen: true, vehicle });
  };

  const closeBooking = () => {
    console.log('📖 FERMETURE MODAL');
    setModalState({ isOpen: false, vehicle: null });
  };

  const value = {
    modalState,
    openBooking,
    closeBooking,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking doit être utilisé à l\'intérieur de BookingProvider');
  }
  return context;
}