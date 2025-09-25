"use client";
import { SessionProvider } from "next-auth/react";
import { useState, useEffect, createContext, useContext } from "react";

// Context to provide dark mode state to children
const AdminDarkModeContext = createContext();

export function useAdminDarkMode() {
  return useContext(AdminDarkModeContext);
}

export default function AdminLayoutClient({ children }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  return (
    <SessionProvider>
      <AdminDarkModeContext.Provider value={{ dark, setDark }}>
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 flex flex-col">
          {children}
        </div>
      </AdminDarkModeContext.Provider>
    </SessionProvider>
  );
}


