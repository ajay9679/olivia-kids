"use client";
import React, { useEffect, useState } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-gray-900 text-white px-4 py-4 flex flex-col sm:flex-row items-center justify-between shadow-lg animate-fadein">
      <span className="mb-2 sm:mb-0 text-sm">
        We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
      </span>
      <button
        onClick={acceptCookies}
        className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded shadow transition ml-0 sm:ml-4 mt-2 sm:mt-0"
      >
        Accept
      </button>
    </div>
  );
}
