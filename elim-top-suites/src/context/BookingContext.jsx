import { createContext, useContext, useEffect, useState, useCallback } from "react";

const BookingContext = createContext(null);
const STORAGE_KEY = "elim-top-suites:bookings";

function loadBookings() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function makeRef() {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `ETS-${stamp}-${rand}`;
}

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(loadBookings);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }, [bookings]);

  const addBooking = useCallback((data) => {
    const record = {
      ...data,
      ref: makeRef(),
      createdAt: new Date().toISOString(),
      status: "pending",
    };
    setBookings((prev) => [record, ...prev]);
    return record;
  }, []);

  return (
    <BookingContext.Provider value={{ bookings, addBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBookings must be used within a BookingProvider");
  return ctx;
}
