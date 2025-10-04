
'use client';
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const sentinelRef = useRef(null);

  useEffect(() => {
  const sentinel = sentinelRef.current;
  const observer = new window.IntersectionObserver(
    ([entry]) => {
      setIsSticky(!entry.isIntersecting);
    },
    { threshold: 0 }
  );
  if (sentinel) {
    observer.observe(sentinel);
  }
  return () => {
    if(sentinel) observer.unobserve(sentinel);
    observer.disconnect();
  };
  }, []);

  // Close menu on navigation
  const handleNavClick = () => setMenuOpen(false);

  return (
    <>
      {/* Sentinel element for intersection observer */}
      <div ref={sentinelRef} style={{ height: 0 }}></div>
      <header
        ref={headerRef}
        className={`w-full bg-gradient-to-r from-blue-500 via-pink-400 to-yellow-300 shadow transition-all duration-300 z-10 ${isSticky ? 'fixed top-0 left-0 animate-slideDown' : 'sticky top-0'}`}
        style={{
          boxShadow: isSticky ? '0 4px 24px 0 rgba(0,0,0,0.10)' : undefined,
        }}
      >
        <nav className="max-w-6xl mx-auto flex items-center justify-between py-2 px-2 sm:py-4 sm:px-6">
          <Link href="/">
            <div className="flex items-center gap-2">
              <Image width={100} height={100} src="/logo.png" alt="Olivia Kids Logo" className="h-14 sm:h-20 w-auto -my-2 sm:-my-4" style={{ maxHeight: '80px' }} />
              <span className="text-xs bg-pink-200 text-pink-700 px-2 py-1 rounded-full ml-2">Olivia Enlightened English School</span>
            </div>
          </Link>
          {/* Hamburger for mobile/tablet */}
          <button
            className="sm:hidden flex flex-col justify-center items-center w-10 h-10 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
            aria-label="Open menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className={`block w-6 h-0.5 bg-white mb-1 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white mb-1 transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
          {/* Desktop menu */}
          <ul className="hidden sm:flex gap-4 md:gap-6 text-base md:text-lg font-semibold text-white">
            <li><a href="#gallery" className="hover:text-yellow-200 transition" onClick={handleNavClick}>Gallery</a></li>
            <li><a href="#programs" className="hover:text-yellow-200 transition" onClick={handleNavClick}>Programs</a></li>
            <li><a href="#events" className="hover:text-yellow-200 transition" onClick={handleNavClick}>Events</a></li>
            <li><a href="#testimonials" className="hover:text-yellow-200 transition" onClick={handleNavClick}>Testimonials</a></li>
            <li><a href="#admission" className="hover:text-yellow-200 transition" onClick={handleNavClick}>Admission</a></li>
          </ul>
        </nav>
      </header>
      {/* Mobile/tablet menu rendered in portal for highest stacking */}
      {typeof window !== 'undefined' && menuOpen && createPortal(
        <>
          <div className="fixed inset-0 z-[99999] bg-black/40 sm:hidden" onClick={() => setMenuOpen(false)}></div>
          <ul
            className={`fixed top-0 right-0 h-full w-3/4 max-w-xs bg-gradient-to-b from-blue-500 via-pink-400 to-yellow-300 shadow-lg z-[100000] p-8 flex flex-col gap-6 text-lg font-semibold text-white transform transition-transform duration-300 sm:hidden ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            style={{ pointerEvents: menuOpen ? 'auto' : 'none' }}
          >
            <li className="self-end mb-4">
              <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="text-3xl font-bold text-white">&times;</button>
            </li>
            <li><a href="#gallery" className="hover:text-yellow-200 transition" onClick={handleNavClick}>Gallery</a></li>
            <li><a href="#programs" className="hover:text-yellow-200 transition" onClick={handleNavClick}>Programs</a></li>
            <li><a href="#events" className="hover:text-yellow-200 transition" onClick={handleNavClick}>Events</a></li>
            <li><a href="#testimonials" className="hover:text-yellow-200 transition" onClick={handleNavClick}>Testimonials</a></li>
            <li><a href="#admission" className="hover:text-yellow-200 transition" onClick={handleNavClick}>Admission</a></li>
          </ul>
        </>,
        document.body
      )}
    </>
  );
}
