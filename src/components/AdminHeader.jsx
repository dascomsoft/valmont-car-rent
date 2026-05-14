// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { motion } from 'framer-motion';
// import Image from 'next/image';

// export default function AdminHeader() {
//   const pathname = usePathname();

//   const adminNavItems = [
//     { name: 'Dashboard', path: '/admin/dashboard' },
//     { name: 'Voir le site', path: '/' },
//   ];

//   return (
//     <header className="bg-gradient-to-r from-gray-900 to-black py-3 border-b border-yellow-400/20 shadow-lg">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center">
//           {/* Logo et titre */}
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center space-x-2">
//               {/* Logo Zua Car */}
//               <div className="relative w-8 h-8 overflow-hidden rounded-full border-2 border-yellow-400/50">
//                 <Image
//                   src="/images/zuacarlogo.jpg"
//                   alt="Zua Car Logo"
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <span className="font-bold text-white text-sm leading-tight">Admin</span>
//                 <span className="font-bold text-yellow-400 text-sm leading-tight -mt-1">Zua Car</span>
//               </div>
//             </div>

//             {/* Navigation admin */}
//             <nav className="hidden md:flex space-x-4 ml-8">
//               {adminNavItems.map((item) => (
//                 <Link
//                   key={item.path}
//                   href={item.path}
//                   className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
//                     pathname === item.path
//                       ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/30'
//                       : 'text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/5 border border-transparent'
//                   }`}
//                 >
//                   {item.name}
//                 </Link>
//               ))}
//             </nav>
//           </div>

//           {/* Badge admin */}
//           <div className="flex items-center gap-2">
//             <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></span>
//             <span className="text-xs sm:text-sm text-yellow-400/80 font-medium">
//               Espace administration
//             </span>
//           </div>
//         </div>

//         {/* Menu mobile simplifié */}
//         <div className="md:hidden mt-3 flex space-x-2">
//           {adminNavItems.map((item) => (
//             <Link
//               key={item.path}
//               href={item.path}
//               className={`flex-1 text-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
//                 pathname === item.path
//                   ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/30'
//                   : 'bg-gray-800/50 text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/5 border border-gray-700'
//               }`}
//             >
//               {item.name}
//             </Link>
//           ))}
//         </div>
//       </div>
//     </header>
//   );
// }























































'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { logoutAdmin } from '@/lib/actions';

export default function AdminHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Navigation complète pour l'admin
  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Accueil', path: '/' },
    { name: 'Flotte', path: '/fleet' },
    { name: 'Tarifs', path: '/pricing' },
  ];

  const handleLogout = async () => {
    await logoutAdmin();
    router.push('/');
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 to-black border-b border-yellow-400/20 shadow-lg">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/admin/dashboard" className="flex items-center space-x-2 group">
            <div className="relative w-12 h-12 overflow-hidden rounded-full border-2 border-yellow-400/50 group-hover:border-yellow-400 transition-all duration-300">
              <Image
                src="/images/zuacarlogo.jpg"
                alt="Zua Car Logo"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-white leading-tight">Zua</span>
              <span className="font-bold text-lg text-yellow-400 leading-tight -mt-1">Car</span>
              <span className="text-xs text-gray-400 -mt-0.5">Administration</span>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`font-medium transition-all duration-200 px-3 py-2 rounded-lg ${
                  pathname === item.path
                    ? 'text-yellow-400 bg-yellow-400/10'
                    : 'text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/5'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Séparateur */}
            <div className="w-px h-6 bg-gray-700 mx-2"></div>

            {/* Bouton Contact */}
            <a
              href="https://wa.me/243811077897"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-yellow-400/20"
            >
              Contact
            </a>

            {/* Bouton Déconnexion */}
            <button
              onClick={handleLogout}
              className="bg-red-600/90 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-red-600/20 ml-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4 4m4-4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Déconnexion</span>
            </button>
          </div>

          {/* Hamburger Mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg bg-gray-800 text-yellow-400 hover:bg-gray-700 transition border border-yellow-400/20"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Menu Mobile */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-gray-800/95 backdrop-blur-sm shadow-xl rounded-lg mt-2 border border-yellow-400/20"
            >
              <div className="flex flex-col p-4 space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`font-medium px-4 py-2 rounded-lg transition ${
                      pathname === item.path
                        ? 'text-yellow-400 bg-yellow-400/10'
                        : 'text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/5'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="pt-2 border-t border-gray-700">
                  <a
                    href="https://wa.me/243811077897"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-yellow-400 text-gray-900 text-center py-2 rounded-lg hover:bg-yellow-500 transition font-semibold block mb-2"
                  >
                    Contact WhatsApp
                  </a>
                  
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full bg-red-600/90 hover:bg-red-700 text-white py-2 rounded-lg transition font-semibold flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4 4m4-4H7" />
                    </svg>
                    Déconnexion
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}