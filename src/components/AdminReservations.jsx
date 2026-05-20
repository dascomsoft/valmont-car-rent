





// 'use client';

// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { updateReservationStatus, deleteReservation } from '@/lib/actions';
// import { sendStatusUpdateEmail } from '@/lib/email';

// export default function AdminReservations({ reservations, vehicles }) {
//   const [loading, setLoading] = useState({});
//   const [localReservations, setLocalReservations] = useState(reservations);

//   // Fonction pour obtenir le texte du statut
//   const getStatusText = (status) => {
//     switch(status) {
//       case 'confirmed': return 'CONFIRMÉE';
//       case 'cancelled': return 'ANNULÉE';
//       case 'completed': return 'TERMINÉE';
//       default: return status;
//     }
//   };

//   // Fonction pour obtenir la couleur du statut
//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'confirmed': return '#22c55e';
//       case 'cancelled': return '#ef4444';
//       case 'completed': return '#3b82f6';
//       default: return '#FDBB02';
//     }
//   };

//   // Fonction pour obtenir le message du statut
//   const getStatusMessage = (status) => {
//     switch(status) {
//       case 'confirmed': return '✅ Votre véhicule est réservé et confirmé. Nous vous attendons aux dates convenues.';
//       case 'cancelled': return '❌ Votre réservation a été annulée. Contactez-nous pour plus d\'informations.';
//       case 'completed': return '🏁 Merci d\'avoir choisi Zua Car. Nous espérons vous revoir bientôt !';
//       default: return '';
//     }
//   };

//   // Obtenir le nom du véhicule par son ID
//   const getVehicleName = (vehicleId) => {
//     const vehicle = vehicles?.find(v => v.id === vehicleId);
//     return vehicle ? `${vehicle.marque} ${vehicle.modele}` : 'Véhicule inconnu';
//   };

//   // Mise à jour du statut
//   const handleStatusUpdate = async (reservationId, newStatus) => {
//     setLoading(prev => ({ ...prev, [reservationId]: true }));
    
//     // Récupérer la réservation avant modification
//     const reservation = localReservations.find(r => r.id === reservationId);
    
//     const result = await updateReservationStatus(reservationId, newStatus);
    
//     if (result.success) {
//       // Mettre à jour l'affichage local
//       setLocalReservations(prev =>
//         prev.map(res =>
//           res.id === reservationId ? { ...res, status: newStatus } : res
//         )
//       );
      
//       // Envoyer l'email depuis le client (côté navigateur)
//       if (reservation && (newStatus === 'confirmed' || newStatus === 'cancelled' || newStatus === 'completed')) {
//         const vehicle = vehicles?.find(v => v.id === reservation.vehicle_id);
        
//         if (vehicle) {
//           await sendStatusUpdateEmail({
//             to_email: reservation.customer_email,
//             to_name: reservation.customer_name,
//             status: getStatusText(newStatus),
//             status_color: getStatusColor(newStatus),
//             status_message: getStatusMessage(newStatus),
//             vehicle_name: `${vehicle.marque} ${vehicle.modele}`,
//             pickup_date: reservation.pickup_date,
//             return_date: reservation.return_date,
//             total_price: reservation.total_price,
//             whatsapp_number: '+243811077897',
//           });
//         }
//       }
//     }
    
//     setLoading(prev => ({ ...prev, [reservationId]: false }));
//   };

//   // Supprimer une réservation
//   const handleDelete = async (reservationId) => {
//     if (!confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) return;
    
//     setLoading(prev => ({ ...prev, [reservationId]: true }));
    
//     const result = await deleteReservation(reservationId);
    
//     if (result.success) {
//       setLocalReservations(prev => prev.filter(res => res.id !== reservationId));
//     }
    
//     setLoading(prev => ({ ...prev, [reservationId]: false }));
//   };

//   // Couleurs des statuts
//   const statusColors = {
//     pending: 'bg-yellow-400/20 text-yellow-300 border-yellow-400/30',
//     confirmed: 'bg-green-500/20 text-green-400 border-green-500/30',
//     cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
//     completed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
//   };

//   if (localReservations.length === 0) {
//     return (
//       <div className="bg-gray-800/90 border border-yellow-400/20 rounded-xl p-8 mt-10 text-center">
//         <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//         </svg>
//         <h3 className="text-xl font-semibold text-white mb-2">Aucune réservation</h3>
//         <p className="text-gray-400">Les réservations des clients apparaîtront ici.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-800/90 border border-yellow-400/20 rounded-xl p-6 mt-10 overflow-x-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-white">
//           📋 Réservations
//           <span className="ml-2 text-sm bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded-full">
//             {localReservations.length}
//           </span>
//         </h2>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full text-left text-gray-300">
//           <thead>
//             <tr className="border-b border-gray-700">
//               <th className="py-3 text-yellow-400">Client</th>
//               <th className="py-3 text-yellow-400">Véhicule</th>
//               <th className="py-3 text-yellow-400">Dates</th>
//               <th className="py-3 text-yellow-400">Lieux</th>
//               <th className="py-3 text-yellow-400">Prix</th>
//               <th className="py-3 text-yellow-400">Statut</th>
//               <th className="py-3 text-yellow-400">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {localReservations.map((reservation) => (
//               <motion.tr
//                 key={reservation.id}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="border-b border-gray-700 hover:bg-gray-700/30 transition"
//               >
//                 {/* Client */}
//                 <td className="py-4">
//                   <div>
//                     <p className="font-semibold text-white">{reservation.customer_name}</p>
//                     <p className="text-sm text-gray-400">{reservation.customer_email}</p>
//                     <p className="text-sm text-gray-500">{reservation.customer_phone}</p>
//                   </div>
//                 </td>

//                 {/* Véhicule */}
//                 <td className="py-4">
//                   <span className="text-white">{getVehicleName(reservation.vehicle_id)}</span>
//                 </td>

//                 {/* Dates */}
//                 <td className="py-4">
//                   <div className="text-sm">
//                     <p>📅 {reservation.pickup_date}</p>
//                     <p>➡ {reservation.return_date}</p>
//                   </div>
//                 </td>

//                 {/* Lieux */}
//                 <td className="py-4">
//                   <div className="text-sm">
//                     <p>🚗 {reservation.pickup_location}</p>
//                     <p>🏁 {reservation.dropoff_location}</p>
//                   </div>
//                 </td>

//                 {/* Prix */}
//                 <td className="py-4">
//                   <span className="font-semibold text-yellow-400">
//                     ${reservation.total_price}
//                   </span>
//                 </td>

//                 {/* Statut */}
//                 <td className="py-4">
//                   <select
//                     value={reservation.status}
//                     onChange={(e) => handleStatusUpdate(reservation.id, e.target.value)}
//                     disabled={loading[reservation.id]}
//                     className={`px-3 py-1 rounded-full text-xs font-medium border cursor-pointer transition ${
//                       statusColors[reservation.status] || 'bg-gray-700 text-gray-300'
//                     }`}
//                   >
//                     <option value="pending">📌 En attente</option>
//                     <option value="confirmed">✅ Confirmée</option>
//                     <option value="cancelled">❌ Annulée</option>
//                     <option value="completed">🏁 Terminée</option>
//                   </select>
//                 </td>

//                 {/* Actions */}
//                 <td className="py-4">
//                   <button
//                     onClick={() => handleDelete(reservation.id)}
//                     disabled={loading[reservation.id]}
//                     className="text-red-400 hover:text-red-300 transition disabled:opacity-50"
//                     title="Supprimer"
//                   >
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                     </svg>
//                   </button>
//                 </td>
//               </motion.tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="mt-4 text-center text-xs text-gray-500 border-t border-gray-700 pt-4">
//         Cliquez sur le statut pour modifier une réservation
//       </div>
//     </div>
//   );
// }












































// 'use client';

// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { updateReservationStatus, deleteReservation } from '@/lib/actions';
// import { sendStatusUpdateEmail } from '@/lib/email';

// export default function AdminReservations({ reservations, vehicles }) {
//   const [loading, setLoading] = useState({});
//   const [localReservations, setLocalReservations] = useState(reservations || []);

//   // Fonction pour obtenir le texte du statut
//   const getStatusText = (status) => {
//     switch(status) {
//       case 'confirmed': return 'CONFIRMÉE';
//       case 'cancelled': return 'ANNULÉE';
//       case 'completed': return 'TERMINÉE';
//       default: return status || 'PENDING';
//     }
//   };

//   // Fonction pour obtenir la couleur du statut
//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'confirmed': return '#22c55e';
//       case 'cancelled': return '#ef4444';
//       case 'completed': return '#3b82f6';
//       default: return '#FDBB02';
//     }
//   };

//   // Fonction pour obtenir le message du statut
//   const getStatusMessage = (status) => {
//     switch(status) {
//       case 'confirmed': return '✅ Votre véhicule est réservé et confirmé. Nous vous attendons aux dates convenues.';
//       case 'cancelled': return '❌ Votre réservation a été annulée. Contactez-nous pour plus d\'informations.';
//       case 'completed': return '🏁 Merci d\'avoir choisi Zua Car. Nous espérons vous revoir bientôt !';
//       default: return '';
//     }
//   };

//   // Obtenir le nom du véhicule
//   const getVehicleName = (vehicleId) => {
//     if (!vehicles || !Array.isArray(vehicles)) return 'Véhicule inconnu';
//     const vehicle = vehicles.find(v => v.id === vehicleId);
//     return vehicle ? `${vehicle.marque} ${vehicle.modele}` : 'Véhicule inconnu';
//   };

//   // Mise à jour du statut
//   const handleStatusUpdate = async (reservationId, newStatus) => {
//     setLoading(prev => ({ ...prev, [reservationId]: true }));
    
//     const reservation = localReservations.find(r => r.id === reservationId);
    
//     const result = await updateReservationStatus(reservationId, newStatus);
    
//     if (result && result.success) {
//       setLocalReservations(prev =>
//         prev.map(res =>
//           res.id === reservationId ? { ...res, status: newStatus } : res
//         )
//       );
      
//       if (reservation && (newStatus === 'confirmed' || newStatus === 'cancelled' || newStatus === 'completed')) {
//         const vehicle = vehicles?.find(v => v.id === reservation.vehicle_id);
        
//         if (vehicle) {
//           await sendStatusUpdateEmail({
//             to_email: reservation.customer_email,
//             to_name: reservation.customer_name,
//             status: getStatusText(newStatus),
//             status_color: getStatusColor(newStatus),
//             status_message: getStatusMessage(newStatus),
//             vehicle_name: `${vehicle.marque} ${vehicle.modele}`,
//             pickup_date: reservation.pickup_date,
//             return_date: reservation.return_date,
//             total_price: reservation.total_price,
//             whatsapp_number: '+243811077897',
//           });
//         }
//       }
//     }
    
//     setLoading(prev => ({ ...prev, [reservationId]: false }));
//   };

//   // Supprimer une réservation
//   const handleDelete = async (reservationId) => {
//     if (!confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) return;
    
//     setLoading(prev => ({ ...prev, [reservationId]: true }));
    
//     const result = await deleteReservation(reservationId);
    
//     if (result && result.success) {
//       setLocalReservations(prev => prev.filter(res => res.id !== reservationId));
//     }
    
//     setLoading(prev => ({ ...prev, [reservationId]: false }));
//   };

//   if (!localReservations || localReservations.length === 0) {
//     return (
//       <div className="bg-gray-800/90 border border-yellow-400/20 rounded-xl p-8 mt-4 text-center">
//         <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//         </svg>
//         <h3 className="text-xl font-semibold text-white mb-2">Aucune réservation</h3>
//         <p className="text-gray-400">Les réservations des clients apparaîtront ici.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="mt-6">
//       {/* En-tête */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold text-white">
//           📋 <span className="text-yellow-400">Réservations</span>
//           <span className="ml-2 text-sm bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded-full">
//             {localReservations.length}
//           </span>
//         </h2>
//       </div>

//       {/* VERSION MOBILE : CARTES (visible sur mobile, caché sur desktop) */}
//       <div className="block lg:hidden space-y-3">
//         {localReservations.map((reservation, idx) => (
//           <motion.div
//             key={reservation.id}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: idx * 0.03 }}
//             className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden hover:border-yellow-400/30 transition-all duration-300"
//           >
//             <div className="p-4">
//               {/* Client + Statut */}
//               <div className="flex justify-between items-start mb-3">
//                 <div className="flex-1">
//                   <h4 className="text-white font-semibold text-base">
//                     {reservation.customer_name || 'Client inconnu'}
//                   </h4>
//                   <div className="flex flex-wrap gap-2 mt-1">
//                     <span className="text-xs text-gray-400 break-all">
//                       📧 {reservation.customer_email || '—'}
//                     </span>
//                     <span className="text-xs text-gray-500">
//                       📞 {reservation.customer_phone || '—'}
//                     </span>
//                   </div>
//                 </div>
//                 <select
//                   value={reservation.status || 'pending'}
//                   onChange={(e) => handleStatusUpdate(reservation.id, e.target.value)}
//                   disabled={loading[reservation.id]}
//                   className={`px-2 py-1 rounded-full text-xs font-medium border cursor-pointer transition ${
//                     reservation.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
//                     reservation.status === 'confirmed' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
//                     reservation.status === 'cancelled' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
//                     'bg-blue-500/20 text-blue-400 border-blue-500/30'
//                   }`}
//                 >
//                   <option value="pending">📌 En attente</option>
//                   <option value="confirmed">✅ Confirmée</option>
//                   <option value="cancelled">❌ Annulée</option>
//                   <option value="completed">🏁 Terminée</option>
//                 </select>
//               </div>

//               {/* Véhicule */}
//               <div className="mb-3 p-2 bg-gray-700/30 rounded-lg">
//                 <div className="flex items-center gap-2">
//                   <span className="text-lg">🚗</span>
//                   <span className="text-white text-sm font-medium break-all">
//                     {getVehicleName(reservation.vehicle_id)}
//                   </span>
//                 </div>
//               </div>

//               {/* Dates */}
//               <div className="grid grid-cols-2 gap-3 mb-3">
//                 <div>
//                   <p className="text-xs text-gray-400">📅 Prise en charge</p>
//                   <p className="text-white text-sm font-medium">{reservation.pickup_date || '—'}</p>
//                   <p className="text-gray-500 text-xs truncate">{reservation.pickup_location || '—'}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-400">🏁 Retour</p>
//                   <p className="text-white text-sm font-medium">{reservation.return_date || '—'}</p>
//                   <p className="text-gray-500 text-xs truncate">{reservation.dropoff_location || '—'}</p>
//                 </div>
//               </div>

//               {/* Prix + Suppression */}
//               <div className="flex justify-between items-center pt-2 border-t border-gray-700">
//                 <div>
//                   <span className="text-xs text-gray-400">Prix total</span>
//                   <p className="text-yellow-400 font-bold text-lg">
//                     ${reservation.total_price?.toLocaleString() || 0}
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => handleDelete(reservation.id)}
//                   disabled={loading[reservation.id]}
//                   className="text-red-400 hover:text-red-300 transition disabled:opacity-50 p-2 rounded-lg hover:bg-red-400/10"
//                   title="Supprimer"
//                 >
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* VERSION DESKTOP : TABLEAU (caché sur mobile, visible sur desktop) */}
//       <div className="hidden lg:block bg-gray-800/90 border border-yellow-400/20 rounded-xl p-4 overflow-x-auto">
//         <table className="w-full text-left text-gray-300">
//           <thead>
//             <tr className="border-b border-gray-700">
//               <th className="py-3 text-yellow-400">Client</th>
//               <th className="py-3 text-yellow-400">Véhicule</th>
//               <th className="py-3 text-yellow-400">Dates</th>
//               <th className="py-3 text-yellow-400">Lieux</th>
//               <th className="py-3 text-yellow-400">Prix</th>
//               <th className="py-3 text-yellow-400">Statut</th>
//               <th className="py-3 text-yellow-400">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {localReservations.map((reservation) => (
//               <tr key={reservation.id} className="border-b border-gray-700 hover:bg-gray-700/30 transition">
//                 <td className="py-4">
//                   <div>
//                     <p className="font-semibold text-white">{reservation.customer_name}</p>
//                     <p className="text-sm text-gray-400">{reservation.customer_email}</p>
//                     <p className="text-sm text-gray-500">{reservation.customer_phone}</p>
//                   </div>
//                 </td>
//                 <td className="py-4">
//                   <span className="text-white">{getVehicleName(reservation.vehicle_id)}</span>
//                 </td>
//                 <td className="py-4">
//                   <div className="text-sm">
//                     <p>📅 {reservation.pickup_date}</p>
//                     <p>➡ {reservation.return_date}</p>
//                   </div>
//                 </td>
//                 <td className="py-4">
//                   <div className="text-sm">
//                     <p>🚗 {reservation.pickup_location}</p>
//                     <p>🏁 {reservation.dropoff_location}</p>
//                   </div>
//                 </td>
//                 <td className="py-4">
//                   <span className="font-semibold text-yellow-400">${reservation.total_price}</span>
//                 </td>
//                 <td className="py-4">
//                   <select
//                     value={reservation.status}
//                     onChange={(e) => handleStatusUpdate(reservation.id, e.target.value)}
//                     disabled={loading[reservation.id]}
//                     className={`px-3 py-1 rounded-full text-xs font-medium border cursor-pointer transition ${
//                       reservation.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
//                       reservation.status === 'confirmed' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
//                       reservation.status === 'cancelled' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
//                       'bg-blue-500/20 text-blue-400 border-blue-500/30'
//                     }`}
//                   >
//                     <option value="pending">📌 En attente</option>
//                     <option value="confirmed">✅ Confirmée</option>
//                     <option value="cancelled">❌ Annulée</option>
//                     <option value="completed">🏁 Terminée</option>
//                   </select>
//                 </td>
//                 <td className="py-4">
//                   <button
//                     onClick={() => handleDelete(reservation.id)}
//                     disabled={loading[reservation.id]}
//                     className="text-red-400 hover:text-red-300 transition disabled:opacity-50"
//                   >
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                     </svg>
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="text-center text-xs text-gray-500 mt-4 pt-2 border-t border-gray-800">
//         Cliquez sur le statut pour modifier une réservation
//       </div>
//     </div>
//   );
// }






























// 'use client';

// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { updateReservationStatus, deleteReservation, validateReservation, rejectReservation } from '@/lib/actions';
// import { sendStatusUpdateEmail } from '@/lib/email-brevo.js';  // ← CHANGEMENT ICI

// export default function AdminReservations({ reservations, vehicles }) {
//   const [loading, setLoading] = useState({});
//   const [localReservations, setLocalReservations] = useState(reservations || []);

//   // Get status text in English
//   const getStatusText = (status) => {
//     switch(status) {
//       case 'validated': return 'VALIDATED';
//       case 'confirmed': return 'CONFIRMED';
//       case 'cancelled': return 'CANCELLED';
//       case 'completed': return 'COMPLETED';
//       default: return status?.toUpperCase() || 'PENDING';
//     }
//   };

//   // Get status color
//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'confirmed': return '#22c55e';
//       case 'validated': return '#3b82f6';
//       case 'cancelled': return '#ef4444';
//       case 'completed': return '#8b5cf6';
//       default: return '#FDBB02';
//     }
//   };

//   // Get status message
//   const getStatusMessage = (status) => {
//     switch(status) {
//       case 'confirmed': return '✅ Your vehicle is confirmed and reserved. We look forward to welcoming you!';
//       case 'validated': return '⏳ Your booking is validated. Please complete the payment to confirm.';
//       case 'cancelled': return '❌ Your booking has been cancelled. Contact us for more information.';
//       case 'completed': return '🏁 Thank you for choosing Valmont Car Rent. We hope to see you again!';
//       default: return '';
//     }
//   };

//   // Get vehicle name
//   const getVehicleName = (vehicleId) => {
//     if (!vehicles || !Array.isArray(vehicles)) return 'Unknown vehicle';
//     const vehicle = vehicles.find(v => v.id === vehicleId);
//     return vehicle ? `${vehicle.marque} ${vehicle.modele}` : 'Unknown vehicle';
//   };

//   // Handle validate (send payment link)
//   const handleValidate = async (reservationId) => {
//     setLoading(prev => ({ ...prev, [reservationId]: true }));
    
//     const result = await validateReservation(reservationId);
    
//     if (result && result.success) {
//       setLocalReservations(prev =>
//         prev.map(res =>
//           res.id === reservationId ? { ...res, status: 'validated' } : res
//         )
//       );
//       alert('✅ Booking validated! Payment link sent to customer.');
//     } else {
//       alert('❌ Error: ' + (result?.message || 'Unknown error'));
//     }
    
//     setLoading(prev => ({ ...prev, [reservationId]: false }));
//   };

//   // Handle reject
//   const handleReject = async (reservationId) => {
//     const reason = prompt('Reason for rejection:');
//     if (!reason) return;
    
//     setLoading(prev => ({ ...prev, [reservationId]: true }));
    
//     const result = await rejectReservation(reservationId, reason);
    
//     if (result && result.success) {
//       setLocalReservations(prev =>
//         prev.map(res =>
//           res.id === reservationId ? { ...res, status: 'cancelled' } : res
//         )
//       );
//       alert('❌ Booking rejected.');
//     } else {
//       alert('❌ Error: ' + (result?.message || 'Unknown error'));
//     }
    
//     setLoading(prev => ({ ...prev, [reservationId]: false }));
//   };

//   // Update status (for confirmed/completed)
//   const handleStatusUpdate = async (reservationId, newStatus) => {
//     setLoading(prev => ({ ...prev, [reservationId]: true }));
    
//     const reservation = localReservations.find(r => r.id === reservationId);
    
//     const result = await updateReservationStatus(reservationId, newStatus);
    
//     if (result && result.success) {
//       setLocalReservations(prev =>
//         prev.map(res =>
//           res.id === reservationId ? { ...res, status: newStatus } : res
//         )
//       );
      
//       if (reservation && (newStatus === 'confirmed' || newStatus === 'cancelled' || newStatus === 'completed')) {
//         const vehicle = vehicles?.find(v => v.id === reservation.vehicle_id);
        
//         if (vehicle) {
//           await sendStatusUpdateEmail({
//             to_email: reservation.customer_email,
//             to_name: reservation.customer_name,
//             status: getStatusText(newStatus),
//             status_color: getStatusColor(newStatus),
//             status_message: getStatusMessage(newStatus),
//             vehicle_name: `${vehicle.marque} ${vehicle.modele}`,
//             pickup_date: reservation.pickup_date,
//             return_date: reservation.return_date,
//             total_price: reservation.total_price,
//             whatsapp_number: '+2481234567',
//           });
//         }
//       }
//     }
    
//     setLoading(prev => ({ ...prev, [reservationId]: false }));
//   };

//   // Delete reservation
//   const handleDelete = async (reservationId) => {
//     if (!confirm('Are you sure you want to delete this reservation?')) return;
    
//     setLoading(prev => ({ ...prev, [reservationId]: true }));
    
//     const result = await deleteReservation(reservationId);
    
//     if (result && result.success) {
//       setLocalReservations(prev => prev.filter(res => res.id !== reservationId));
//     }
    
//     setLoading(prev => ({ ...prev, [reservationId]: false }));
//   };

//   if (!localReservations || localReservations.length === 0) {
//     return (
//       <div className="bg-gray-800/90 border border-yellow-400/20 rounded-xl p-8 mt-4 text-center">
//         <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//         </svg>
//         <h3 className="text-xl font-semibold text-white mb-2">No Reservations</h3>
//         <p className="text-gray-400">Customer bookings will appear here.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="mt-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold text-white">
//           📋 <span className="text-yellow-400">Reservations</span>
//           <span className="ml-2 text-sm bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded-full">
//             {localReservations.length}
//           </span>
//         </h2>
//       </div>

//       {/* MOBILE VERSION: CARDS */}
//       <div className="block lg:hidden space-y-3">
//         {localReservations.map((reservation, idx) => (
//           <motion.div
//             key={reservation.id}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: idx * 0.03 }}
//             className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden hover:border-yellow-400/30 transition-all duration-300"
//           >
//             <div className="p-4">
//               {/* Customer + Status */}
//               <div className="flex justify-between items-start mb-3">
//                 <div className="flex-1">
//                   <h4 className="text-white font-semibold text-base">
//                     {reservation.customer_name || 'Unknown customer'}
//                   </h4>
//                   <div className="flex flex-wrap gap-2 mt-1">
//                     <span className="text-xs text-gray-400 break-all">
//                       📧 {reservation.customer_email || '—'}
//                     </span>
//                     <span className="text-xs text-gray-500">
//                       📞 {reservation.customer_phone || '—'}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="flex flex-col gap-1">
//                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                     reservation.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
//                     reservation.status === 'validated' ? 'bg-blue-500/20 text-blue-400' :
//                     reservation.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
//                     reservation.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
//                     'bg-purple-500/20 text-purple-400'
//                   }`}>
//                     {reservation.status === 'pending' ? '🕐 PENDING' :
//                      reservation.status === 'validated' ? '⏳ VALIDATED' :
//                      reservation.status === 'confirmed' ? '✅ CONFIRMED' :
//                      reservation.status === 'cancelled' ? '❌ CANCELLED' : '🏁 COMPLETED'}
//                   </span>
//                 </div>
//               </div>

//               {/* Vehicle */}
//               <div className="mb-3 p-2 bg-gray-700/30 rounded-lg">
//                 <div className="flex items-center gap-2">
//                   <span className="text-lg">🚗</span>
//                   <span className="text-white text-sm font-medium break-all">
//                     {getVehicleName(reservation.vehicle_id)}
//                   </span>
//                 </div>
//               </div>

//               {/* Dates */}
//               <div className="grid grid-cols-2 gap-3 mb-3">
//                 <div>
//                   <p className="text-xs text-gray-400">📅 Pickup</p>
//                   <p className="text-white text-sm font-medium">{reservation.pickup_date || '—'}</p>
//                   <p className="text-gray-500 text-xs truncate">{reservation.pickup_location || '—'}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-400">🏁 Return</p>
//                   <p className="text-white text-sm font-medium">{reservation.return_date || '—'}</p>
//                   <p className="text-gray-500 text-xs truncate">{reservation.dropoff_location || '—'}</p>
//                 </div>
//               </div>

//               {/* Actions + Price */}
//               <div className="flex justify-between items-center pt-2 border-t border-gray-700">
//                 <div>
//                   <span className="text-xs text-gray-400">Total Price</span>
//                   <p className="text-yellow-400 font-bold text-lg">
//                     ${reservation.total_price?.toLocaleString() || 0}
//                   </p>
//                 </div>
//                 <div className="flex gap-2">
//                   {reservation.status === 'pending' && (
//                     <>
//                       <button
//                         onClick={() => handleValidate(reservation.id)}
//                         disabled={loading[reservation.id]}
//                         className="bg-green-600 hover:bg-green-700 disabled:opacity-50 px-3 py-1 rounded text-xs transition"
//                       >
//                         ✅ Validate
//                       </button>
//                       <button
//                         onClick={() => handleReject(reservation.id)}
//                         disabled={loading[reservation.id]}
//                         className="bg-red-600 hover:bg-red-700 disabled:opacity-50 px-3 py-1 rounded text-xs transition"
//                       >
//                         ❌ Reject
//                       </button>
//                     </>
//                   )}
//                   {reservation.status === 'validated' && (
//                     <select
//                       value={reservation.status}
//                       onChange={(e) => {
//                         if (e.target.value === 'confirmed') {
//                           handleStatusUpdate(reservation.id, 'confirmed');
//                         } else if (e.target.value === 'cancelled') {
//                           handleReject(reservation.id);
//                         }
//                       }}
//                       disabled={loading[reservation.id]}
//                       className="bg-blue-600/50 text-white px-2 py-1 rounded text-xs"
//                     >
//                       <option value="validated">⏳ Payment sent</option>
//                       <option value="confirmed">✅ Mark paid</option>
//                       <option value="cancelled">❌ Cancel</option>
//                     </select>
//                   )}
//                   {(reservation.status === 'confirmed' || reservation.status === 'completed') && (
//                     <select
//                       value={reservation.status}
//                       onChange={(e) => handleStatusUpdate(reservation.id, e.target.value)}
//                       disabled={loading[reservation.id]}
//                       className="bg-gray-600/50 text-white px-2 py-1 rounded text-xs"
//                     >
//                       <option value="confirmed">✅ Confirmed</option>
//                       <option value="completed">🏁 Mark completed</option>
//                       <option value="cancelled">❌ Cancel</option>
//                     </select>
//                   )}
//                   <button
//                     onClick={() => handleDelete(reservation.id)}
//                     disabled={loading[reservation.id]}
//                     className="text-red-400 hover:text-red-300 transition disabled:opacity-50 p-2 rounded-lg hover:bg-red-400/10"
//                     title="Delete"
//                   >
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* DESKTOP VERSION: TABLE */}
//       <div className="hidden lg:block bg-gray-800/90 border border-yellow-400/20 rounded-xl p-4 overflow-x-auto">
//         <table className="w-full text-left text-gray-300">
//           <thead>
//             <tr className="border-b border-gray-700">
//               <th className="py-3 text-yellow-400">Customer</th>
//               <th className="py-3 text-yellow-400">Vehicle</th>
//               <th className="py-3 text-yellow-400">Dates</th>
//               <th className="py-3 text-yellow-400">Locations</th>
//               <th className="py-3 text-yellow-400">Price</th>
//               <th className="py-3 text-yellow-400">Status</th>
//               <th className="py-3 text-yellow-400">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {localReservations.map((reservation) => (
//               <tr key={reservation.id} className="border-b border-gray-700 hover:bg-gray-700/30 transition">
//                 <td className="py-4">
//                   <div>
//                     <p className="font-semibold text-white">{reservation.customer_name}</p>
//                     <p className="text-sm text-gray-400">{reservation.customer_email}</p>
//                     <p className="text-sm text-gray-500">{reservation.customer_phone}</p>
//                   </div>
//                 </td>
//                 <td className="py-4">
//                   <span className="text-white">{getVehicleName(reservation.vehicle_id)}</span>
//                 </td>
//                 <td className="py-4">
//                   <div className="text-sm">
//                     <p>📅 {reservation.pickup_date}</p>
//                     <p>➡ {reservation.return_date}</p>
//                   </div>
//                 </td>
//                 <td className="py-4">
//                   <div className="text-sm">
//                     <p>🚗 {reservation.pickup_location}</p>
//                     <p>🏁 {reservation.dropoff_location}</p>
//                   </div>
//                 </td>
//                 <td className="py-4">
//                   <span className="font-semibold text-yellow-400">${reservation.total_price}</span>
//                 </td>
//                 <td className="py-4">
//                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                     reservation.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
//                     reservation.status === 'validated' ? 'bg-blue-500/20 text-blue-400' :
//                     reservation.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
//                     reservation.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
//                     'bg-purple-500/20 text-purple-400'
//                   }`}>
//                     {reservation.status === 'pending' ? '🕐 PENDING' :
//                      reservation.status === 'validated' ? '⏳ VALIDATED' :
//                      reservation.status === 'confirmed' ? '✅ CONFIRMED' :
//                      reservation.status === 'cancelled' ? '❌ CANCELLED' : '🏁 COMPLETED'}
//                   </span>
//                 </td>
//                 <td className="py-4">
//                   <div className="flex gap-2 flex-wrap">
//                     {reservation.status === 'pending' && (
//                       <>
//                         <button
//                           onClick={() => handleValidate(reservation.id)}
//                           disabled={loading[reservation.id]}
//                           className="bg-green-600 hover:bg-green-700 disabled:opacity-50 px-3 py-1 rounded text-xs transition"
//                         >
//                           ✅ Validate
//                         </button>
//                         <button
//                           onClick={() => handleReject(reservation.id)}
//                           disabled={loading[reservation.id]}
//                           className="bg-red-600 hover:bg-red-700 disabled:opacity-50 px-3 py-1 rounded text-xs transition"
//                         >
//                           ❌ Reject
//                         </button>
//                       </>
//                     )}
//                     {reservation.status === 'validated' && (
//                       <select
//                         onChange={(e) => {
//                           if (e.target.value === 'confirmed') {
//                             handleStatusUpdate(reservation.id, 'confirmed');
//                           } else if (e.target.value === 'cancelled') {
//                             handleReject(reservation.id);
//                           }
//                         }}
//                         disabled={loading[reservation.id]}
//                         className="bg-blue-600/50 text-white px-2 py-1 rounded text-xs"
//                         defaultValue="validated"
//                       >
//                         <option value="validated">⏳ Payment sent</option>
//                         <option value="confirmed">✅ Mark as paid</option>
//                         <option value="cancelled">❌ Cancel</option>
//                       </select>
//                     )}
//                     {(reservation.status === 'confirmed' || reservation.status === 'completed') && (
//                       <select
//                         value={reservation.status}
//                         onChange={(e) => handleStatusUpdate(reservation.id, e.target.value)}
//                         disabled={loading[reservation.id]}
//                         className="bg-gray-600/50 text-white px-2 py-1 rounded text-xs"
//                       >
//                         <option value="confirmed">✅ Confirmed</option>
//                         <option value="completed">🏁 Mark completed</option>
//                         <option value="cancelled">❌ Cancel</option>
//                       </select>
//                     )}
//                     <button
//                       onClick={() => handleDelete(reservation.id)}
//                       disabled={loading[reservation.id]}
//                       className="text-red-400 hover:text-red-300 transition disabled:opacity-50"
//                       title="Delete"
//                     >
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                       </svg>
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="text-center text-xs text-gray-500 mt-4 pt-2 border-t border-gray-800">
//         Click on status to update a reservation
//       </div>
//     </div>
//   );
// }



































'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { updateReservationStatus, deleteReservation, validateReservation, rejectReservation } from '@/lib/actions';

export default function AdminReservations({ reservations, vehicles }) {
  const [loading, setLoading] = useState({});
  const [localReservations, setLocalReservations] = useState(reservations || []);

  // Get status text in English
  const getStatusText = (status) => {
    switch(status) {
      case 'validated': return 'VALIDATED';
      case 'confirmed': return 'CONFIRMED';
      case 'cancelled': return 'CANCELLED';
      case 'completed': return 'COMPLETED';
      case 'pending': return 'PENDING';
      default: return status?.toUpperCase() || 'PENDING';
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return '#22c55e';
      case 'validated': return '#3b82f6';
      case 'cancelled': return '#ef4444';
      case 'completed': return '#8b5cf6';
      default: return '#FDBB02';
    }
  };

  // Get vehicle name - CORRECTED VERSION
  const getVehicleName = (vehicleId) => {
    // Vérifier si vehicles existe et est un tableau
    if (!vehicles || !Array.isArray(vehicles) || vehicles.length === 0) {
      console.log('Vehicles array missing or empty');
      return 'Loading...';
    }
    
    // Normaliser l'ID du véhicule pour la recherche
    let searchId = null;
    if (typeof vehicleId === 'object' && vehicleId !== null) {
      searchId = vehicleId._id?.toString() || vehicleId.id?.toString() || vehicleId.toString();
    } else if (vehicleId) {
      searchId = vehicleId.toString();
    }
    
    if (!searchId) {
      console.log('No valid vehicle ID to search for');
      return 'Unknown vehicle';
    }
    
    // Chercher le véhicule dans la liste
    const vehicle = vehicles.find(v => {
      const vId = v._id?.toString() || v.id?.toString() || v.toString();
      return vId === searchId;
    });
    
    // Debug - première réservation seulement pour voir
    if (vehicle) {
      return `${vehicle.marque || 'Unknown'} ${vehicle.modele || 'Vehicle'}`;
    }
    
    console.log(`Vehicle not found for ID: ${searchId}`);
    return 'Unknown vehicle';
  };

  // Get status message
  const getStatusMessage = (status) => {
    switch(status) {
      case 'confirmed': return '✅ Your vehicle is confirmed and reserved. We look forward to welcoming you!';
      case 'validated': return '⏳ Your booking is validated. Please complete the payment to confirm.';
      case 'cancelled': return '❌ Your booking has been cancelled. Contact us for more information.';
      case 'completed': return '🏁 Thank you for choosing Valmont Car Rent. We hope to see you again!';
      default: return '';
    }
  };

  // Handle validate (send payment link)
  const handleValidate = async (reservationId) => {
    setLoading(prev => ({ ...prev, [reservationId]: true }));
    
    const result = await validateReservation(reservationId);
    
    if (result && result.success) {
      setLocalReservations(prev =>
        prev.map(res =>
          res.id === reservationId ? { ...res, status: 'validated' } : res
        )
      );
      alert('✅ Booking validated! Payment link sent to customer.');
    } else {
      alert('❌ Error: ' + (result?.message || 'Unknown error'));
    }
    
    setLoading(prev => ({ ...prev, [reservationId]: false }));
  };

  // Handle reject
  const handleReject = async (reservationId) => {
    const reason = prompt('Reason for rejection:');
    if (!reason) return;
    
    setLoading(prev => ({ ...prev, [reservationId]: true }));
    
    const result = await rejectReservation(reservationId, reason);
    
    if (result && result.success) {
      setLocalReservations(prev =>
        prev.map(res =>
          res.id === reservationId ? { ...res, status: 'cancelled' } : res
        )
      );
      alert('❌ Booking rejected.');
    } else {
      alert('❌ Error: ' + (result?.message || 'Unknown error'));
    }
    
    setLoading(prev => ({ ...prev, [reservationId]: false }));
  };

  // Update status (for confirmed/completed)
  const handleStatusUpdate = async (reservationId, newStatus) => {
    setLoading(prev => ({ ...prev, [reservationId]: true }));
    
    const reservation = localReservations.find(r => r.id === reservationId);
    
    const result = await updateReservationStatus(reservationId, newStatus);
    
    if (result && result.success) {
      setLocalReservations(prev =>
        prev.map(res =>
          res.id === reservationId ? { ...res, status: newStatus } : res
        )
      );
      
      if (reservation && (newStatus === 'confirmed' || newStatus === 'cancelled' || newStatus === 'completed')) {
        const vehicleName = getVehicleName(reservation.vehicle_id);
        
        await sendStatusUpdateEmail({
          to_email: reservation.customer_email,
          to_name: reservation.customer_name,
          status: getStatusText(newStatus),
          status_color: getStatusColor(newStatus),
          status_message: getStatusMessage(newStatus),
          vehicle_name: vehicleName,
          pickup_date: reservation.pickup_date,
          return_date: reservation.return_date,
          total_price: reservation.total_price,
        });
      }
    }
    
    setLoading(prev => ({ ...prev, [reservationId]: false }));
  };

  // Delete reservation
  const handleDelete = async (reservationId) => {
    if (!confirm('Are you sure you want to delete this reservation?')) return;
    
    setLoading(prev => ({ ...prev, [reservationId]: true }));
    
    const result = await deleteReservation(reservationId);
    
    if (result && result.success) {
      setLocalReservations(prev => prev.filter(res => res.id !== reservationId));
    }
    
    setLoading(prev => ({ ...prev, [reservationId]: false }));
  };

  if (!localReservations || localReservations.length === 0) {
    return (
      <div className="bg-gray-800/90 border border-yellow-400/20 rounded-xl p-8 mt-4 text-center">
        <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 className="text-xl font-semibold text-white mb-2">No Reservations</h3>
        <p className="text-gray-400">Customer bookings will appear here.</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">
          📋 <span className="text-yellow-400">Reservations</span>
          <span className="ml-2 text-sm bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded-full">
            {localReservations.length}
          </span>
        </h2>
      </div>

      {/* DESKTOP VERSION: TABLE */}
      <div className="bg-gray-800/90 border border-yellow-400/20 rounded-xl p-4 overflow-x-auto">
        <table className="w-full text-left text-gray-300">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-3 text-yellow-400">Customer</th>
              <th className="py-3 text-yellow-400">Vehicle</th>
              <th className="py-3 text-yellow-400">Dates</th>
              <th className="py-3 text-yellow-400">Locations</th>
              <th className="py-3 text-yellow-400">Price</th>
              <th className="py-3 text-yellow-400">Status</th>
              <th className="py-3 text-yellow-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {localReservations.map((reservation) => (
              <tr key={reservation.id} className="border-b border-gray-700 hover:bg-gray-700/30 transition">
                <td className="py-4">
                  <div>
                    <p className="font-semibold text-white">{reservation.customer_name}</p>
                    <p className="text-sm text-gray-400">{reservation.customer_email}</p>
                    <p className="text-sm text-gray-500">{reservation.customer_phone}</p>
                  </div>
                </td>
                <td className="py-4">
                  <span className="text-white font-medium">
                    {getVehicleName(reservation.vehicle_id)}
                  </span>
                </td>
                <td className="py-4">
                  <div className="text-sm">
                    <p>📅 {reservation.pickup_date}</p>
                    <p>➡ {reservation.return_date}</p>
                  </div>
                </td>
                <td className="py-4">
                  <div className="text-sm">
                    <p>🚗 {reservation.pickup_location || '-'}</p>
                    <p>🏁 {reservation.dropoff_location || '-'}</p>
                  </div>
                </td>
                <td className="py-4">
                  <span className="font-semibold text-yellow-400">${reservation.total_price}</span>
                </td>
                <td className="py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    reservation.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                    reservation.status === 'validated' ? 'bg-blue-500/20 text-blue-400' :
                    reservation.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                    reservation.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>
                    {reservation.status === 'pending' ? '🕐 PENDING' :
                     reservation.status === 'validated' ? '⏳ VALIDATED' :
                     reservation.status === 'confirmed' ? '✅ CONFIRMED' :
                     reservation.status === 'cancelled' ? '❌ CANCELLED' : '🏁 COMPLETED'}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex gap-2 flex-wrap">
                    {reservation.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleValidate(reservation.id)}
                          disabled={loading[reservation.id]}
                          className="bg-green-600 hover:bg-green-700 disabled:opacity-50 px-3 py-1 rounded text-xs transition"
                        >
                          ✅ Validate
                        </button>
                        <button
                          onClick={() => handleReject(reservation.id)}
                          disabled={loading[reservation.id]}
                          className="bg-red-600 hover:bg-red-700 disabled:opacity-50 px-3 py-1 rounded text-xs transition"
                        >
                          ❌ Reject
                        </button>
                      </>
                    )}
                    {reservation.status === 'validated' && (
                      <select
                        onChange={(e) => {
                          if (e.target.value === 'confirmed') {
                            handleStatusUpdate(reservation.id, 'confirmed');
                          } else if (e.target.value === 'cancelled') {
                            handleReject(reservation.id);
                          }
                        }}
                        disabled={loading[reservation.id]}
                        className="bg-blue-600/50 text-white px-2 py-1 rounded text-xs"
                        defaultValue="validated"
                      >
                        <option value="validated">⏳ Payment sent</option>
                        <option value="confirmed">✅ Mark as paid</option>
                        <option value="cancelled">❌ Cancel</option>
                      </select>
                    )}
                    {(reservation.status === 'confirmed' || reservation.status === 'completed') && (
                      <select
                        value={reservation.status}
                        onChange={(e) => handleStatusUpdate(reservation.id, e.target.value)}
                        disabled={loading[reservation.id]}
                        className="bg-gray-600/50 text-white px-2 py-1 rounded text-xs"
                      >
                        <option value="confirmed">✅ Confirmed</option>
                        <option value="completed">🏁 Mark completed</option>
                        <option value="cancelled">❌ Cancel</option>
                      </select>
                    )}
                    <button
                      onClick={() => handleDelete(reservation.id)}
                      disabled={loading[reservation.id]}
                      className="text-red-400 hover:text-red-300 transition disabled:opacity-50"
                      title="Delete"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center text-xs text-gray-500 mt-4 pt-2 border-t border-gray-800">
        Click on status to update a reservation
      </div>
    </div>
  );
}