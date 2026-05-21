// 'use client';

// import { motion } from 'framer-motion';
// import { useEffect, useRef } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// export default function HeroSection() {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     AOS.init({ 
//       duration: 800,
//       once: true,
//       mirror: false
//     });
//   }, []);

//   const handleWhatsAppClick = () => {
//     const message = encodeURIComponent(
//       "Bonjour, je souhaite réserver un véhicule chez Zua Car à Kinshasa."
//     );
//     window.open(`https://wa.me/243811077897?text=${message}`, '_blank');
//   };

//   // Variantes d'animation
//   const fadeInUp = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { opacity: 1, y: 0 }
//   };

//   const staggerContainer = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.15
//       }
//     }
//   };

//   return (
//     <div ref={containerRef} className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white min-h-screen flex items-center overflow-hidden pt-16 sm:pt-20 pb-20">
//       {/* Image de fond avec overlay sombre */}
//       <div className="absolute inset-0 z-0">
//         <Image
//           src="/images/carjordyno.jpg"
//           alt="Véhicule Zua Car - Location avec chauffeur Kinshasa"
//           fill
//           className="object-cover opacity-60"
//           priority
//           quality={90}
//           sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
//         />
//         {/* Overlay sombre pour faire ressortir le texte jaune */}
//         <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-black/80 to-gray-900/80"></div>
//       </div>

//       {/* Overlay pattern jaune subtil */}
//       <div className="absolute inset-0 opacity-10 z-10 hidden sm:block">
//         <div className="absolute inset-0" style={{
//           backgroundImage: 'radial-gradient(circle at 2px 2px, #FDBB02 1px, transparent 0)',
//           backgroundSize: '50px 50px'
//         }}></div>
//       </div>

//       {/* Cercles décoratifs jaunes */}
//       <motion.div
//         animate={{
//           scale: [1, 1.2, 1],
//           opacity: [0.1, 0.15, 0.1],
//         }}
//         transition={{
//           duration: 8,
//           repeat: Infinity,
//           ease: "easeInOut"
//         }}
//         className="absolute -top-20 -right-20 w-64 sm:w-80 h-64 sm:h-80 bg-yellow-400 rounded-full filter blur-3xl opacity-20 z-20"
//       />
//       <motion.div
//         animate={{
//           scale: [1, 1.3, 1],
//           opacity: [0.1, 0.2, 0.1],
//         }}
//         transition={{
//           duration: 10,
//           repeat: Infinity,
//           ease: "easeInOut",
//           delay: 1
//         }}
//         className="absolute -bottom-20 -left-20 w-64 sm:w-80 h-64 sm:h-80 bg-yellow-400 rounded-full filter blur-3xl opacity-20 z-20"
//       />

//       {/* Contenu principal */}
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
//         <motion.div
//           variants={staggerContainer}
//           initial="hidden"
//           animate="visible"
//           className="max-w-4xl mx-auto text-center"
//         >
//           {/* Badge de localisation avec jaune */}
//           <motion.div
//             variants={fadeInUp}
//             className="inline-flex items-center gap-1.5 sm:gap-2 bg-yellow-400/10 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-6 sm:mb-8 border border-yellow-400/30 shadow-lg"
//           >
//             <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full animate-pulse"></span>
//             <span className="text-xs sm:text-sm font-medium tracking-wide text-yellow-400">
//               🇨🇩 Location avec chauffeur à Kinshasa
//             </span>
//           </motion.div>

//           {/* Titre principal avec jaune */}
//           <motion.h1 
//             variants={fadeInUp}
//             className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight drop-shadow-2xl"
//           >
//             <span className="block text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">Zua</span>
//             <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
//               Car
//             </span>
//           </motion.h1>

//           {/* Slogan */}
//           <motion.p 
//             variants={fadeInUp}
//             className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 py-2 bg-black/40 backdrop-blur-sm rounded-xl border border-yellow-400/10"
//           >
//             Vente & location, votre compagnon de route pour toutes vos activités
//           </motion.p>

//           {/* Tags de positionnement en jaune */}
//           <motion.div
//             variants={fadeInUp}
//             className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10"
//           >
//             {['Rapide', 'Abordable', 'Fiable'].map((tag, index) => (
//               <span
//                 key={index}
//                 className="bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-lg"
//               >
//                 {tag}
//               </span>
//             ))}
//           </motion.div>

//           {/* Prix mis en avant avec jaune */}
//           <motion.div
//             variants={fadeInUp}
//             className="bg-gradient-to-r from-gray-900/90 to-black/90 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-8 sm:mb-10 inline-block border border-yellow-400/30 shadow-2xl mx-2 sm:mx-0"
//           >
//             <p className="text-xl sm:text-2xl md:text-3xl text-white">
//               À partir de{' '}
//               <span className="font-bold text-3xl sm:text-4xl md:text-5xl text-yellow-400 block sm:inline">
//                 50$
//               </span>
//               <span className="text-base sm:text-lg md:text-xl text-gray-300 block sm:inline">/jour</span>
//             </p>
//             <p className="text-sm sm:text-base md:text-lg mt-1 sm:mt-2 text-gray-300">
//               Véhicules confortables • Chauffeur professionnel • Sécurité garantie
//             </p>
//           </motion.div>

//           {/* Boutons d'action */}
//           <motion.div
//             variants={fadeInUp}
//             className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0"
//           >
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={handleWhatsAppClick}
//               className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl shadow-lg shadow-yellow-400/30 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group text-sm sm:text-base"
//             >
//               <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771z"/>
//               </svg>
//               <span className="whitespace-nowrap">Réserver sur WhatsApp</span>
//               <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//               </svg>
//             </motion.button>

//             <Link
//               href="/fleet"
//               className="bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border border-yellow-400/30 text-sm sm:text-base hover:border-yellow-400/60"
//             >
//               Voir nos véhicules
//             </Link>
//           </motion.div>

//           {/* Indicateurs de confiance */}
//           <motion.div
//             variants={fadeInUp}
//             className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-2 sm:gap-6 mt-8 sm:mt-12 px-2"
//           >
//             {[
//               { icon: '🛡️', text: 'Sécurité garantie' },
//               { icon: '👔', text: 'Chauffeurs en costume' },
//               { icon: '📍', text: 'Livraison gratuite' },
//               { icon: '✨', text: 'Véhicules luxe' },
//             ].map((item, index) => (
//               <motion.div
//                 key={index}
//                 whileHover={{ y: -2 }}
//                 className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-white bg-black/40 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1 rounded-full justify-center border border-yellow-400/20 shadow-lg"
//               >
//                 <span className="text-sm sm:text-base">{item.icon}</span>
//                 <span className="whitespace-nowrap text-yellow-400/90">{item.text}</span>
//               </motion.div>
//             ))}
//           </motion.div>

//           {/* Adresse */}
//           <motion.div
//             variants={fadeInUp}
//             className="mt-6 sm:mt-8 text-xs sm:text-sm text-yellow-400/80 bg-black/40 backdrop-blur-sm inline-block px-4 py-2 rounded-full border border-yellow-400/20"
//           >
//             📍 Gombe – Avenue Lokele 02, près de la Gare Centrale, Kinshasa
//           </motion.div>
//         </motion.div>
//       </div>

//       {/* Vague décorative sombre */}
//       <div className="absolute bottom-0 left-0 right-0 z-20">
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto fill-black/60" preserveAspectRatio="none">
//           <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"/>
//         </svg>
//       </div>
//     </div>
//   );
// }










































'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaWhatsapp, FaArrowRight, FaShieldAlt, FaMapMarkerAlt, FaCar, FaStar, FaClock, FaHeadset, FaUmbrellaBeach, FaFish, FaHiking } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function HeroSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    AOS.init({ 
      duration: 800,
      once: true,
      mirror: false
    });
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Hello, I would like to book a vehicle with Valmont Car Rent in Seychelles."
    );
    window.open(`https://wa.me/2481234567?text=${message}`, '_blank');
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div ref={containerRef} className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white min-h-screen flex items-center overflow-hidden pt-16 sm:pt-20 pb-20">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/main.jpg"
          alt="Valmont Car Rent Seychelles"
          fill
          className="object-cover opacity-50"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-black/70 to-transparent"></div>
      </div>

      {/* Decorative elements */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -right-20 w-80 h-80 bg-yellow-400 rounded-full filter blur-3xl opacity-20 z-20"
      />

      {/* Main content - LEFT ALIGNED */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-2xl lg:max-w-3xl text-left"
        >
          {/* Location badge */}
          <motion.div
            variants={fadeInLeft}
            className="inline-flex items-center gap-2 bg-yellow-400/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-yellow-400/30"
          >
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-yellow-400 flex items-center gap-1">
              <FaUmbrellaBeach className="w-3 h-3" /> Premium Car Rental in Seychelles
            </span>
          </motion.div>

          {/* Main title */}
          <motion.h1 variants={fadeInLeft} className="mb-6">
            <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white block drop-shadow-2xl">
              Valmont
            </span>
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-500 drop-shadow-2xl">
              Car Rent
            </span>
          </motion.h1>

          {/* Slogan */}
          <motion.p variants={fadeInLeft} className="text-xl sm:text-2xl text-gray-200 mb-6 max-w-xl">
            Your trusted car rental partner for exploring paradise
          </motion.p>

          {/* Feature tags */}
          <motion.div variants={fadeInLeft} className="flex flex-wrap gap-3 mb-8">
            {['Fast Booking', 'Best Price', '24/7 Support', 'Free Delivery'].map((tag, index) => (
              <span key={index} className="flex items-center gap-1 bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 px-4 py-1.5 rounded-full text-sm font-medium">
                <FaStar className="w-3 h-3" /> {tag}
              </span>
            ))}
          </motion.div>

          {/* Price card */}
          <motion.div variants={fadeInLeft} className="bg-gradient-to-r from-gray-900/90 to-black/90 backdrop-blur-md rounded-2xl p-6 mb-8 inline-block border border-yellow-400/30">
            <p className="text-xl text-white">
              Starting from{' '}
              <span className="font-bold text-4xl text-yellow-400">$45</span>
              <span className="text-lg text-gray-300">/day</span>
            </p>
            <p className="text-sm text-gray-300 mt-1 flex items-center gap-2">
              <FaShieldAlt className="text-yellow-400" /> Modern vehicles • Fully insured • Free delivery
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div variants={fadeInLeft} className="flex flex-col sm:flex-row gap-4 mb-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleWhatsAppClick}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-8 rounded-xl shadow-lg shadow-yellow-400/30 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <FaWhatsapp className="w-5 h-5" />
              <span>Book on WhatsApp</span>
              <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <Link
              href="/fleet"
              className="bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border border-yellow-400/30 hover:border-yellow-400/60"
            >
              <FaCar className="w-5 h-5" />
              View Our Fleet
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div variants={fadeInLeft} className="flex flex-wrap gap-4">
            {[
              { icon: FaShieldAlt, text: 'Fully Insured' },
              { icon: FaHeadset, text: '24/7 Support' },
              { icon: FaClock, text: 'Free Delivery' },
              { icon: FaMapMarkerAlt, text: 'All Islands' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-yellow-400/20">
                <item.icon className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-white">{item.text}</span>
              </div>
            ))}
          </motion.div>

          {/* Location */}
          <motion.div variants={fadeInLeft} className="mt-8 flex items-center gap-2 text-yellow-400/80 bg-black/40 backdrop-blur-sm inline-flex px-4 py-2 rounded-full border border-yellow-400/20">
            <FaMapMarkerAlt className="w-4 h-4" />
            <span className="text-sm">Mahé, Praslin & La Digue • Airport & Hotel Delivery</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto fill-black/60" preserveAspectRatio="none">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"/>
        </svg>
      </div>
    </div>
  );
}