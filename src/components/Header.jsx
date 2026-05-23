'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { FaBars, FaTimes, FaWhatsapp, FaCar, FaInfoCircle, FaEnvelope, FaUserSecret } from 'react-icons/fa';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/', icon: FaCar },
    { name: 'Seychelles', path: '/seychelles', icon: FaInfoCircle },
    { name: 'Contact', path: '/contact', icon: FaEnvelope },
    { name: 'Admin', path: '/admin/login', icon: FaUserSecret },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/95 backdrop-blur-md shadow-lg border-b border-yellow-400/20' : 'bg-gradient-to-b from-black/80 to-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-36 md:h-36">

          {/* ==================== LOGO CORRIGÉ ==================== */}
          <Link href="/" className="flex items-center gap-3 sm:gap-4 group" aria-label="Valmont Car Rent Seychelles">
            
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-16 md:h-16 lg:w-20 lg:h-20 flex-shrink-0">
              <div className="absolute inset-0 rounded-full border border-yellow-400/30 bg-black/40"></div>
              <Image
                src="/images/valmontlogo.png"
                alt="Valmont Car Rent Seychelles"
                fill
                className="object-contain p-2"
                priority
              />
            </div>

            <div className="flex flex-col -space-y-1">
              <span className="text-2xl sm:text-3xl md:text-2xl lg:text-3xl font-bold text-white tracking-tighter">Valmont</span>
              <span className="text-2xl sm:text-3xl md:text-2xl lg:text-3xl font-bold text-yellow-400 tracking-tighter">Car Rent</span>
              <span className="text-xs text-gray-400 tracking-widest hidden sm:block">SEYCHELLES</span>
            </div>
          </Link>
          {/* ==================================================== */}

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Navigation principale">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/30'
                      : 'text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/5'
                  }`}
                >
                  <item.icon className="w-4 h-4" aria-hidden="true" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* WhatsApp Desktop */}
          <a
            href="https://wa.me/2481234567"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-green-600/20"
            aria-label="Contacter via WhatsApp"
          >
            <FaWhatsapp className="w-4 h-4" aria-hidden="true" />
            <span className="text-sm font-semibold">WhatsApp</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-3 rounded-lg bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/20 transition border border-yellow-400/30"
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
          <div className="py-4 space-y-2 border-t border-yellow-400/20">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  pathname === item.path
                    ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/30'
                    : 'text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/5'
                }`}
              >
                <item.icon className="w-5 h-5" aria-hidden="true" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}

            <a
              href="https://wa.me/2481234567"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-all duration-300 mt-4"
            >
              <FaWhatsapp className="w-5 h-5" aria-hidden="true" />
              <span className="font-semibold">Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}