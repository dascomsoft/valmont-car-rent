// 'use client';

// import { motion } from 'framer-motion';
// import Image from 'next/image';
// import { useEffect, useRef, useState } from 'react';

// export default function VehicleCard({ vehicle, index = 0 }) {
//   const cardRef = useRef(null);
//   const [imageError, setImageError] = useState(false);
//   const PLACEHOLDER_IMAGE = '/images/placeholder-car.jpg';

//   useEffect(() => {
//     // Animation avec Intersection Observer
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add('opacity-100', 'translate-y-0');
//             entry.target.classList.remove('opacity-0', 'translate-y-10');
//           }
//         });
//       },
//       { threshold: 0.1, rootMargin: '50px' }
//     );

//     if (cardRef.current) {
//       observer.observe(cardRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   const handleImageError = () => {
//     console.log('Erreur de chargement image pour:', vehicle.marque, vehicle.modele);
//     setImageError(true);
//   };

//   // Déterminer la source de l'image
//   const getImageSrc = () => {
//     if (imageError) return PLACEHOLDER_IMAGE;
    
//     try {
//       if (vehicle.image_data && typeof vehicle.image_data === 'string' && vehicle.image_data.startsWith('data:image')) {
//         return vehicle.image_data;
//       }
//       if (vehicle.image_url && typeof vehicle.image_url === 'string' && vehicle.image_url.trim() !== '') {
//         // Vérification basique que c'est une URL
//         if (vehicle.image_url.startsWith('http') || vehicle.image_url.startsWith('/')) {
//           return vehicle.image_url;
//         }
//       }
//     } catch (e) {
//       console.warn('Image invalide');
//     }
    
//     return PLACEHOLDER_IMAGE;
//   };

//   const imageSrc = getImageSrc();

//   const handleWhatsAppReservation = () => {
//     const message = encodeURIComponent(
//       `Bonjour, je souhaite réserver une ${vehicle.marque || 'voiture'} ${vehicle.modele || ''} pour une location.`
//     );
//     window.open(`https://wa.me/243811077897?text=${message}`, '_blank');
//   };

//   const formattedPrice = vehicle.prix?.toLocaleString('fr-FR') || '0';

//   return (
//     <motion.div
//       ref={cardRef}
//       whileHover={{ scale: 1.05 }}
//       transition={{ type: 'spring', stiffness: 300 }}
//       className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 opacity-0 translate-y-10 transition-all duration-700 hover:shadow-2xl hover:shadow-yellow-400/10"
//     >
//       <div className="relative h-48 w-full bg-gray-700 overflow-hidden">
//         <Image
//           src={imageSrc}
//           alt={`${vehicle.marque || 'Véhicule'} ${vehicle.modele || ''}`}
//           fill
//           className="object-cover transition-transform duration-500 hover:scale-110"
//           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//           unoptimized={imageSrc.startsWith('data:image')}
//           onError={handleImageError}
//           priority={index < 3}
//         />
        
//         {index === 0 && (
//           <span className="absolute top-2 left-2 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-full z-10">
//             Nouveau
//           </span>
//         )}
//       </div>

//       <div className="p-5">
//         <div className="flex justify-between items-start mb-2">
//           <h3 className="text-xl font-bold text-white">
//             {vehicle.marque || 'Marque inconnue'} {vehicle.modele || ''}
//           </h3>
//           <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ml-2">
//             {formattedPrice} $/jour
//           </span>
//         </div>

//         <p className="text-gray-400 mb-4 line-clamp-2 min-h-[3rem]">
//           {vehicle.description || 'Aucune description disponible.'}
//         </p>

//         <div className="mb-4">
//           <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
//             vehicle.categorie === 'prestige' ? 'bg-purple-900/50 text-purple-300 border border-purple-500/30' :
//             vehicle.categorie === 'suv' ? 'bg-green-900/50 text-green-300 border border-green-500/30' :
//             'bg-yellow-900/50 text-yellow-300 border border-yellow-500/30'
//           }`}>
//             {vehicle.categorie === 'prestige' ? 'Prestige' :
//              vehicle.categorie === 'suv' ? 'SUV' : 
//              vehicle.categorie || 'Classique'}
//           </span>
//         </div>

//         <motion.button
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//           onClick={handleWhatsAppReservation}
//           className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2 group"
//         >
//           <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771z"/>
//           </svg>
//           <span>Réserver via WhatsApp</span>
//           <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//           </svg>
//         </motion.button>
//       </div>
//     </motion.div>
//   );
// }































// 'use client';

// import { motion } from 'framer-motion';
// import Image from 'next/image';
// import { useEffect, useRef, useState } from 'react';
// import { useBooking } from '@/context/BookingContext'; // ← Import du hook

// export default function VehicleCard({ vehicle, index = 0 }) {
//   const cardRef = useRef(null);
//   const [imageError, setImageError] = useState(false);
//   const PLACEHOLDER_IMAGE = '/images/placeholder-car.jpg';
  
//   // Récupère la fonction pour ouvrir le modal global
//   const { openBooking } = useBooking();

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add('opacity-100', 'translate-y-0');
//             entry.target.classList.remove('opacity-0', 'translate-y-10');
//           }
//         });
//       },
//       { threshold: 0.1, rootMargin: '50px' }
//     );

//     if (cardRef.current) {
//       observer.observe(cardRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   const handleImageError = () => {
//     console.log('Erreur de chargement image pour:', vehicle.marque, vehicle.modele);
//     setImageError(true);
//   };

//   const getImageSrc = () => {
//     if (imageError) return PLACEHOLDER_IMAGE;
    
//     try {
//       if (vehicle.image_data && typeof vehicle.image_data === 'string' && vehicle.image_data.startsWith('data:image')) {
//         return vehicle.image_data;
//       }
//       if (vehicle.image_url && typeof vehicle.image_url === 'string' && vehicle.image_url.trim() !== '') {
//         if (vehicle.image_url.startsWith('http') || vehicle.image_url.startsWith('/')) {
//           return vehicle.image_url;
//         }
//       }
//     } catch (e) {
//       console.warn('Image invalide');
//     }
    
//     return PLACEHOLDER_IMAGE;
//   };

//   const imageSrc = getImageSrc();

//   const handleWhatsAppReservation = () => {
//     const message = encodeURIComponent(
//       `Bonjour, je souhaite réserver une ${vehicle.marque || 'voiture'} ${vehicle.modele || ''} pour une location.`
//     );
//     window.open(`https://wa.me/243811077897?text=${message}`, '_blank');
//   };

//   const formattedPrice = vehicle.prix?.toLocaleString('fr-FR') || '0';

//   return (
//     <motion.div
//       ref={cardRef}
//       whileHover={{ scale: 1.05 }}
//       transition={{ type: 'spring', stiffness: 300 }}
//       className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 opacity-0 translate-y-10 transition-all duration-700 hover:shadow-2xl hover:shadow-yellow-400/10"
//     >
//       {/* Image */}
//       <div className="relative h-48 w-full bg-gray-700 overflow-hidden">
//         <Image
//           src={imageSrc}
//           alt={`${vehicle.marque || 'Véhicule'} ${vehicle.modele || ''}`}
//           fill
//           className="object-cover transition-transform duration-500 hover:scale-110"
//           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//           unoptimized={imageSrc.startsWith('data:image')}
//           onError={handleImageError}
//           priority={index < 3}
//         />
        
//         {index === 0 && (
//           <span className="absolute top-2 left-2 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-full z-10">
//             Nouveau
//           </span>
//         )}
//       </div>

//       {/* Infos */}
//       <div className="p-5">
//         <div className="flex justify-between items-start mb-2">
//           <h3 className="text-xl font-bold text-white">
//             {vehicle.marque || 'Marque inconnue'} {vehicle.modele || ''}
//           </h3>
//           <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ml-2">
//             {formattedPrice} $/jour
//           </span>
//         </div>

//         <p className="text-gray-400 mb-4 line-clamp-2 min-h-[3rem]">
//           {vehicle.description || 'Aucune description disponible.'}
//         </p>

//         <div className="mb-4">
//           <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
//             vehicle.categorie === 'prestige' ? 'bg-purple-900/50 text-purple-300 border border-purple-500/30' :
//             vehicle.categorie === 'suv' ? 'bg-green-900/50 text-green-300 border border-green-500/30' :
//             'bg-yellow-900/50 text-yellow-300 border border-yellow-500/30'
//           }`}>
//             {vehicle.categorie === 'prestige' ? 'Prestige' :
//              vehicle.categorie === 'suv' ? 'SUV' : 
//              vehicle.categorie || 'Classique'}
//           </span>
//         </div>

//         {/* ========== BOUTONS ========== */}
//         <div className="space-y-3">
//           {/* Bouton 1 : Réserver maintenant - OUVRE LE MODAL GLOBAL */}
//           <button
//             onClick={() => openBooking(vehicle)}
//             className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2"
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//             </svg>
//             <span>Réserver maintenant</span>
//           </button>

//           {/* Bouton 2 : Contact WhatsApp */}
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={handleWhatsAppReservation}
//             className="w-full border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 font-semibold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2 group"
//           >
//             <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771z"/>
//             </svg>
//             <span>Contact WhatsApp</span>
//           </motion.button>
//         </div>
//       </div>
//     </motion.div>
//   );
// }








// 'use client';

// import { motion } from 'framer-motion';
// import Image from 'next/image';
// import { useEffect, useRef, useState } from 'react';
// import { useBooking } from '@/context/BookingContext'; // ← Utiliser le contexte
// import { checkVehicleAvailabilityByDate } from '@/lib/actions';

// export default function VehicleCard({ vehicle, index = 0, selectedDate }) {
//   const cardRef = useRef(null);
//   const [imageError, setImageError] = useState(false);
//   const [isAvailable, setIsAvailable] = useState(true);
//   const [loadingAvailability, setLoadingAvailability] = useState(true);
//   const PLACEHOLDER_IMAGE = '/images/placeholder-car.jpg';
  
//   // Récupérer la fonction openBooking du contexte
//   const { openBooking } = useBooking();

//   // Vérifier la disponibilité à la date sélectionnée
//   useEffect(() => {
//     const checkAvailability = async () => {
//       try {
//         setLoadingAvailability(true);
//         const available = await checkVehicleAvailabilityByDate(vehicle.id, selectedDate);
//         setIsAvailable(available);
//       } catch (error) {
//         console.error('Erreur vérification disponibilité:', error);
//       } finally {
//         setLoadingAvailability(false);
//       }
//     };
    
//     if (selectedDate) {
//       checkAvailability();
//     }
//   }, [vehicle.id, selectedDate]);

//   // Animation Intersection Observer
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add('opacity-100', 'translate-y-0');
//             entry.target.classList.remove('opacity-0', 'translate-y-10');
//           }
//         });
//       },
//       { threshold: 0.1, rootMargin: '50px' }
//     );

//     if (cardRef.current) {
//       observer.observe(cardRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   const handleImageError = () => {
//     console.log('Erreur de chargement image pour:', vehicle.marque, vehicle.modele);
//     setImageError(true);
//   };

//   const getImageSrc = () => {
//     if (imageError) return PLACEHOLDER_IMAGE;
    
//     try {
//       if (vehicle.image_data && typeof vehicle.image_data === 'string' && vehicle.image_data.startsWith('data:image')) {
//         return vehicle.image_data;
//       }
//       if (vehicle.image_url && typeof vehicle.image_url === 'string' && vehicle.image_url.trim() !== '') {
//         if (vehicle.image_url.startsWith('http') || vehicle.image_url.startsWith('/')) {
//           return vehicle.image_url;
//         }
//       }
//     } catch (e) {
//       console.warn('Image invalide');
//     }
    
//     return PLACEHOLDER_IMAGE;
//   };

//   const imageSrc = getImageSrc();

//   const handleWhatsAppReservation = () => {
//     const message = encodeURIComponent(
//       `Bonjour, je souhaite réserver une ${vehicle.marque || 'voiture'} ${vehicle.modele || ''} pour une location.`
//     );
//     window.open(`https://wa.me/243811077897?text=${message}`, '_blank');
//   };

//   const formattedPrice = vehicle.prix?.toLocaleString('fr-FR') || '0';

//   return (
//     <motion.div
//       ref={cardRef}
//       whileHover={{ scale: 1.05 }}
//       transition={{ type: 'spring', stiffness: 300 }}
//       className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 opacity-0 translate-y-10 transition-all duration-700 hover:shadow-2xl hover:shadow-yellow-400/10"
//     >
//       <div className="relative h-48 w-full bg-gray-700 overflow-hidden">
//         <Image
//           src={imageSrc}
//           alt={`${vehicle.marque || 'Véhicule'} ${vehicle.modele || ''}`}
//           fill
//           className="object-cover transition-transform duration-500 hover:scale-110"
//           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//           unoptimized={imageSrc.startsWith('data:image')}
//           onError={handleImageError}
//           priority={index < 3}
//         />
        
//         {/* Badge Disponibilité */}
//         {!loadingAvailability && (
//           <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold z-10 shadow-md ${
//             isAvailable 
//               ? 'bg-green-500 text-white' 
//               : 'bg-red-500 text-white'
//           }`}>
//             {isAvailable ? '✅ Disponible' : '❌ Réservé'}
//           </div>
//         )}
        
//         {/* Badge Nouveau */}
//         {index === 0 && (
//           <span className="absolute top-2 left-2 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-full z-10 shadow-md">
//             Nouveau
//           </span>
//         )}
//       </div>

//       <div className="p-5">
//         <div className="flex justify-between items-start mb-2">
//           <h3 className="text-xl font-bold text-white">
//             {vehicle.marque || 'Marque inconnue'} {vehicle.modele || ''}
//           </h3>
//           <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ml-2">
//             {formattedPrice} $/jour
//           </span>
//         </div>

//         <p className="text-gray-400 mb-4 line-clamp-2 min-h-[3rem]">
//           {vehicle.description || 'Aucune description disponible.'}
//         </p>

//         <div className="mb-4">
//           <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
//             vehicle.categorie === 'prestige' ? 'bg-purple-900/50 text-purple-300 border border-purple-500/30' :
//             vehicle.categorie === 'suv' ? 'bg-green-900/50 text-green-300 border border-green-500/30' :
//             'bg-yellow-900/50 text-yellow-300 border border-yellow-500/30'
//           }`}>
//             {vehicle.categorie === 'prestige' ? 'Prestige' :
//              vehicle.categorie === 'suv' ? 'SUV' : 
//              vehicle.categorie || 'Classique'}
//           </span>
//         </div>

//         <div className="space-y-3">
//           {/* Bouton Réserver - utilise le contexte global */}
//           <button
//             onClick={() => openBooking(vehicle)}
//             className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2"
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//             </svg>
//             <span>Réserver maintenant</span>
//           </button>

//           {/* Bouton WhatsApp */}
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={handleWhatsAppReservation}
//             className="w-full border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 font-semibold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2 group"
//           >
//             <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771z"/>
//             </svg>
//             <span>Contact WhatsApp</span>
//           </motion.button>
//         </div>
//       </div>
//     </motion.div>
//   );
// }





























































































































































































// 'use client';

// import { motion } from 'framer-motion';
// import Image from 'next/image';
// import { useEffect, useRef, useState } from 'react';
// import { useBooking } from '@/context/BookingContext';

// export default function VehicleCard({ 
//   vehicle, 
//   index = 0, 
//   isAvailable = true,        // ← Nouvelle prop (calculée côté serveur)
//   reservationEndDate = null, // ← Nouvelle prop (date de fin de réservation)
//   selectedDate 
// }) {
//   const cardRef = useRef(null);
//   const [imageError, setImageError] = useState(false);
//   const PLACEHOLDER_IMAGE = '/images/placeholder-car.jpg';
  
//   // Récupérer la fonction openBooking du contexte
//   const { openBooking } = useBooking();

//   // Animation Intersection Observer (uniquement)
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add('opacity-100', 'translate-y-0');
//             entry.target.classList.remove('opacity-0', 'translate-y-10');
//           }
//         });
//       },
//       { threshold: 0.1, rootMargin: '50px' }
//     );

//     if (cardRef.current) {
//       observer.observe(cardRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   const handleImageError = () => {
//     console.log('Erreur de chargement image pour:', vehicle.marque, vehicle.modele);
//     setImageError(true);
//   };

//   const getImageSrc = () => {
//     if (imageError) return PLACEHOLDER_IMAGE;
    
//     try {
//       if (vehicle.image_data && typeof vehicle.image_data === 'string' && vehicle.image_data.startsWith('data:image')) {
//         return vehicle.image_data;
//       }
//       if (vehicle.image_url && typeof vehicle.image_url === 'string' && vehicle.image_url.trim() !== '') {
//         if (vehicle.image_url.startsWith('http') || vehicle.image_url.startsWith('/')) {
//           return vehicle.image_url;
//         }
//       }
//     } catch (e) {
//       console.warn('Image invalide');
//     }
    
//     return PLACEHOLDER_IMAGE;
//   };

//   const imageSrc = getImageSrc();

//   const handleWhatsAppReservation = () => {
//     const message = encodeURIComponent(
//       `Bonjour, je souhaite réserver une ${vehicle.marque || 'voiture'} ${vehicle.modele || ''} pour une location.`
//     );
//     window.open(`https://wa.me/243811077897?text=${message}`, '_blank');
//   };

//   const formattedPrice = vehicle.prix?.toLocaleString('fr-FR') || '0';

//   // Générer le texte du badge en fonction de la disponibilité
//   const getBadgeText = () => {
//     if (isAvailable) {
//       return '✅ Disponible';
//     } else if (reservationEndDate) {
//       return `❌ Réservé jusqu'au ${reservationEndDate}`;
//     }
//     return '❌ Réservé';
//   };

//   const getBadgeColor = () => {
//     if (isAvailable) {
//       return 'bg-green-500 text-white';
//     }
//     return 'bg-red-500 text-white';
//   };

//   return (
//     <motion.div
//       ref={cardRef}
//       whileHover={{ scale: 1.05 }}
//       transition={{ type: 'spring', stiffness: 300 }}
//       className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 opacity-0 translate-y-10 transition-all duration-700 hover:shadow-2xl hover:shadow-yellow-400/10"
//     >
//       <div className="relative h-48 w-full bg-gray-700 overflow-hidden">
//         <Image
//           src={imageSrc}
//           alt={`${vehicle.marque || 'Véhicule'} ${vehicle.modele || ''}`}
//           fill
//           className="object-cover transition-transform duration-500 hover:scale-110"
//           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//           unoptimized={imageSrc.startsWith('data:image')}
//           onError={handleImageError}
//           priority={index < 3}
//         />
        
//         {/* Badge Disponibilité - Plus d'appel serveur ! */}
//         <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold z-10 shadow-md ${getBadgeColor()}`}>
//           {getBadgeText()}
//         </div>
        
//         {/* Badge Nouveau */}
//         {index === 0 && (
//           <span className="absolute top-2 left-2 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-full z-10 shadow-md">
//             Nouveau
//           </span>
//         )}
//       </div>

//       <div className="p-5">
//         <div className="flex justify-between items-start mb-2">
//           <h3 className="text-xl font-bold text-white">
//             {vehicle.marque || 'Marque inconnue'} {vehicle.modele || ''}
//           </h3>
//           <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ml-2">
//             {formattedPrice} $/jour
//           </span>
//         </div>

//         <p className="text-gray-400 mb-4 line-clamp-2 min-h-[3rem]">
//           {vehicle.description || 'Aucune description disponible.'}
//         </p>

//         <div className="mb-4">
//           <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
//             vehicle.categorie === 'prestige' ? 'bg-purple-900/50 text-purple-300 border border-purple-500/30' :
//             vehicle.categorie === 'suv' ? 'bg-green-900/50 text-green-300 border border-green-500/30' :
//             'bg-yellow-900/50 text-yellow-300 border border-yellow-500/30'
//           }`}>
//             {vehicle.categorie === 'prestige' ? 'Prestige' :
//              vehicle.categorie === 'suv' ? 'SUV' : 
//              vehicle.categorie || 'Classique'}
//           </span>
//         </div>

//         <div className="space-y-3">
//           {/* Bouton Réserver - utilise le contexte global */}
//           <button
//             onClick={() => openBooking(vehicle)}
//             className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2"
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//             </svg>
//             <span>Réserver maintenant</span>
//           </button>

//           {/* Bouton WhatsApp */}
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={handleWhatsAppReservation}
//             className="w-full border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 font-semibold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2 group"
//           >
//             <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771z"/>
//             </svg>
//             <span>Contact WhatsApp</span>
//           </motion.button>
//         </div>
//       </div>
//     </motion.div>
//   );
// }


































// 'use client';

// import { motion } from 'framer-motion';
// import Image from 'next/image';
// import { useEffect, useRef, useState } from 'react';
// import { useBooking } from '@/context/BookingContext';

// export default function VehicleCard({ 
//   vehicle, 
//   index = 0, 
//   isAvailable = true,
//   reservationEndDate = null,
//   selectedDate 
// }) {
//   const cardRef = useRef(null);
//   const [imageError, setImageError] = useState(false);
//   const PLACEHOLDER_IMAGE = '/images/placeholder-car.jpg';
  
//   const { openBooking } = useBooking();

//   // Animation Intersection Observer
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add('opacity-100', 'translate-y-0');
//             entry.target.classList.remove('opacity-0', 'translate-y-10');
//           }
//         });
//       },
//       { threshold: 0.1, rootMargin: '50px' }
//     );

//     if (cardRef.current) {
//       observer.observe(cardRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   const handleImageError = () => {
//     console.log('Erreur de chargement image pour:', vehicle.marque, vehicle.modele);
//     setImageError(true);
//   };

//   const getImageSrc = () => {
//     if (imageError) return PLACEHOLDER_IMAGE;
    
//     try {
//       if (vehicle.image_data && typeof vehicle.image_data === 'string' && vehicle.image_data.startsWith('data:image')) {
//         return vehicle.image_data;
//       }
//       if (vehicle.image_url && typeof vehicle.image_url === 'string' && vehicle.image_url.trim() !== '') {
//         if (vehicle.image_url.startsWith('http') || vehicle.image_url.startsWith('/')) {
//           return vehicle.image_url;
//         }
//       }
//     } catch (e) {
//       console.warn('Image invalide');
//     }
    
//     return PLACEHOLDER_IMAGE;
//   };

//   const imageSrc = getImageSrc();

//   const handleWhatsAppReservation = () => {
//     const message = encodeURIComponent(
//       `Bonjour, je souhaite réserver une ${vehicle.marque || 'voiture'} ${vehicle.modele || ''} pour une location.`
//     );
//     window.open(`https://wa.me/243811077897?text=${message}`, '_blank');
//   };

//   const formattedPrice = vehicle.prix?.toLocaleString('fr-FR') || '0';

//   // Générer le texte du badge
//   const getBadgeText = () => {
//     if (isAvailable) {
//       return `✅ Disponible le ${selectedDate || 'aujourd\'hui'}`;
//     } else if (reservationEndDate) {
//       return `❌ Réservé jusqu'au ${reservationEndDate}`;
//     }
//     return '❌ Réservé';
//   };

//   const getBadgeColor = () => {
//     if (isAvailable) {
//       return 'bg-green-500 text-white';
//     }
//     return 'bg-red-500 text-white';
//   };

//   return (
//     <motion.div
//       ref={cardRef}
//       whileHover={{ scale: 1.05 }}
//       transition={{ type: 'spring', stiffness: 300 }}
//       className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 opacity-0 translate-y-10 transition-all duration-700 hover:shadow-2xl hover:shadow-yellow-400/10"
//     >
//       <div className="relative h-48 w-full bg-gray-700 overflow-hidden">
//         <Image
//           src={imageSrc}
//           alt={`${vehicle.marque || 'Véhicule'} ${vehicle.modele || ''}`}
//           fill
//           className="object-cover transition-transform duration-500 hover:scale-110"
//           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//           unoptimized={imageSrc.startsWith('data:image')}
//           onError={handleImageError}
//           priority={index < 3}
//         />
        
//         {/* Badge Disponibilité */}
//         <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold z-10 shadow-md ${getBadgeColor()}`}>
//           {getBadgeText()}
//         </div>
        
//         {/* Badge Nouveau */}
//         {index === 0 && (
//           <span className="absolute top-2 left-2 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-full z-10 shadow-md">
//             Nouveau
//           </span>
//         )}
//       </div>

//       <div className="p-5">
//         <div className="flex justify-between items-start mb-2">
//           <h3 className="text-xl font-bold text-white">
//             {vehicle.marque || 'Marque inconnue'} {vehicle.modele || ''}
//           </h3>
//           <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ml-2">
//             {formattedPrice} $/jour
//           </span>
//         </div>

//         <p className="text-gray-400 mb-4 line-clamp-2 min-h-[3rem]">
//           {vehicle.description || 'Aucune description disponible.'}
//         </p>

//         <div className="mb-4">
//           <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
//             vehicle.categorie === 'prestige' ? 'bg-purple-900/50 text-purple-300 border border-purple-500/30' :
//             vehicle.categorie === 'suv' ? 'bg-green-900/50 text-green-300 border border-green-500/30' :
//             'bg-yellow-900/50 text-yellow-300 border border-yellow-500/30'
//           }`}>
//             {vehicle.categorie === 'prestige' ? 'Prestige' :
//              vehicle.categorie === 'suv' ? 'SUV' : 
//              vehicle.categorie || 'Classique'}
//           </span>
//         </div>

//         <div className="space-y-3">
//           {/* Bouton Réserver */}
//           <button
//             onClick={() => openBooking(vehicle)}
//             className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2"
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//             </svg>
//             <span>Réserver maintenant</span>
//           </button>

//           {/* Bouton WhatsApp */}
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={handleWhatsAppReservation}
//             className="w-full border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 font-semibold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2 group"
//           >
//             <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771z"/>
//             </svg>
//             <span>Contact WhatsApp</span>
//           </motion.button>
//         </div>
//       </div>
//     </motion.div>
//   );
// }
































































'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { FaWhatsapp, FaCar, FaCalendarAlt, FaTag } from 'react-icons/fa';

export default function VehicleCard({ 
  vehicle, 
  index = 0, 
  isAvailable = true,
  reservationEndDate = null,
  selectedDate 
}) {
  const cardRef = useRef(null);
  const [imageError, setImageError] = useState(false);
  const PLACEHOLDER_IMAGE = '/images/placeholder-car.jpg';

  // Animation Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleImageError = () => {
    setImageError(true);
  };

  const getImageSrc = () => {
    if (imageError) return PLACEHOLDER_IMAGE;
    
    if (vehicle.image_data && typeof vehicle.image_data === 'string' && vehicle.image_data.startsWith('data:image')) {
      return vehicle.image_data;
    }
    if (vehicle.image_url && typeof vehicle.image_url === 'string' && vehicle.image_url.trim() !== '') {
      if (vehicle.image_url.startsWith('http') || vehicle.image_url.startsWith('/')) {
        return vehicle.image_url;
      }
    }
    
    return PLACEHOLDER_IMAGE;
  };

  const imageSrc = getImageSrc();

  const handleWhatsAppReservation = () => {
    const message = encodeURIComponent(
      `Hello, I would like to book a ${vehicle.marque || 'vehicle'} ${vehicle.modele || ''} for rental in Seychelles.`
    );
    window.open(`https://wa.me/2481234567?text=${message}`, '_blank');
  };

  const formattedPrice = vehicle.prix?.toLocaleString('en-US') || '0';

  const getBadgeText = () => {
    if (isAvailable) {
      return `✅ Available ${selectedDate ? `on ${selectedDate}` : 'today'}`;
    } else if (reservationEndDate) {
      return `❌ Booked until ${reservationEndDate}`;
    }
    return '❌ Booked';
  };

  const getBadgeColor = () => {
    if (isAvailable) return 'bg-green-500 text-white';
    return 'bg-red-500 text-white';
  };

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 opacity-0 translate-y-10 transition-all duration-700 hover:shadow-2xl hover:shadow-yellow-400/10"
    >
      <div className="relative h-48 w-full bg-gray-700 overflow-hidden">
        <Image
          src={imageSrc}
          alt={`${vehicle.marque || 'Vehicle'} ${vehicle.modele || ''}`}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized={imageSrc.startsWith('data:image')}
          onError={handleImageError}
          priority={index < 3}
        />
        
        {/* Availability Badge */}
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold z-10 shadow-md ${getBadgeColor()}`}>
          {getBadgeText()}
        </div>
        
        {/* New Badge */}
        {index === 0 && (
          <span className="absolute top-2 left-2 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-full z-10 shadow-md">
            New
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white">
            {vehicle.marque || 'Unknown'} <span className="text-yellow-400">{vehicle.modele || ''}</span>
          </h3>
          <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ml-2">
            ${formattedPrice}/day
          </span>
        </div>

        <p className="text-gray-400 mb-4 line-clamp-2 min-h-[3rem]">
          {vehicle.description || 'Comfortable vehicle for your Seychelles adventure.'}
        </p>

        <div className="mb-4">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${
            vehicle.categorie === 'prestige' ? 'bg-purple-900/50 text-purple-300 border border-purple-500/30' :
            vehicle.categorie === 'suv' ? 'bg-green-900/50 text-green-300 border border-green-500/30' :
            'bg-yellow-900/50 text-yellow-300 border border-yellow-500/30'
          }`}>
            <FaTag className="w-3 h-3" />
            {vehicle.categorie === 'prestige' ? 'Prestige' :
             vehicle.categorie === 'suv' ? 'SUV' : 
             vehicle.categorie || 'Classic'}
          </span>
        </div>

        <div className="space-y-3">
          {/* Book Now Button */}
          <a
            href={`https://wa.me/2481234567?text=${encodeURIComponent(`Hello, I would like to book ${vehicle.marque} ${vehicle.modele} for my trip to Seychelles.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2"
          >
            <FaCar className="w-5 h-5" />
            <span>Book Now</span>
          </a>

          {/* WhatsApp Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleWhatsAppReservation}
            className="w-full border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 font-semibold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2 group"
          >
            <FaWhatsapp className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Contact WhatsApp</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}