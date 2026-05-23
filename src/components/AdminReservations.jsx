


// 'use client';

// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { updateReservationStatus, deleteReservation, validateReservation, rejectReservation } from '@/lib/actions';

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
//       case 'pending': return 'PENDING';
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

//   // Get vehicle name - CORRECTED VERSION
//   const getVehicleName = (vehicleId) => {
//     // Vérifier si vehicles existe et est un tableau
//     if (!vehicles || !Array.isArray(vehicles) || vehicles.length === 0) {
//       console.log('Vehicles array missing or empty');
//       return 'Loading...';
//     }
    
//     // Normaliser l'ID du véhicule pour la recherche
//     let searchId = null;
//     if (typeof vehicleId === 'object' && vehicleId !== null) {
//       searchId = vehicleId._id?.toString() || vehicleId.id?.toString() || vehicleId.toString();
//     } else if (vehicleId) {
//       searchId = vehicleId.toString();
//     }
    
//     if (!searchId) {
//       console.log('No valid vehicle ID to search for');
//       return 'Unknown vehicle';
//     }
    
//     // Chercher le véhicule dans la liste
//     const vehicle = vehicles.find(v => {
//       const vId = v._id?.toString() || v.id?.toString() || v.toString();
//       return vId === searchId;
//     });
    
//     // Debug - première réservation seulement pour voir
//     if (vehicle) {
//       return `${vehicle.marque || 'Unknown'} ${vehicle.modele || 'Vehicle'}`;
//     }
    
//     console.log(`Vehicle not found for ID: ${searchId}`);
//     return 'Unknown vehicle';
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
//         const vehicleName = getVehicleName(reservation.vehicle_id);
        
//         await sendStatusUpdateEmail({
//           to_email: reservation.customer_email,
//           to_name: reservation.customer_name,
//           status: getStatusText(newStatus),
//           status_color: getStatusColor(newStatus),
//           status_message: getStatusMessage(newStatus),
//           vehicle_name: vehicleName,
//           pickup_date: reservation.pickup_date,
//           return_date: reservation.return_date,
//           total_price: reservation.total_price,
//         });
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

//       {/* DESKTOP VERSION: TABLE */}
//       <div className="bg-gray-800/90 border border-yellow-400/20 rounded-xl p-4 overflow-x-auto">
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
//                   <span className="text-white font-medium">
//                     {getVehicleName(reservation.vehicle_id)}
//                   </span>
//                 </td>
//                 <td className="py-4">
//                   <div className="text-sm">
//                     <p>📅 {reservation.pickup_date}</p>
//                     <p>➡ {reservation.return_date}</p>
//                   </div>
//                 </td>
//                 <td className="py-4">
//                   <div className="text-sm">
//                     <p>🚗 {reservation.pickup_location || '-'}</p>
//                     <p>🏁 {reservation.dropoff_location || '-'}</p>
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
import {
  updateReservationStatus,
  deleteReservation,
  validateReservation,
  rejectReservation,
} from '@/lib/actions';

export default function AdminReservations({
  reservations,
  vehicles,
}) {
  const [loading, setLoading] = useState({});
  const [localReservations, setLocalReservations] = useState(
    reservations || []
  );

  // STATUS TEXT
  const getStatusText = (status) => {
    switch (status) {
      case 'validated':
        return 'VALIDATED';
      case 'confirmed':
        return 'CONFIRMED';
      case 'cancelled':
        return 'CANCELLED';
      case 'completed':
        return 'COMPLETED';
      case 'pending':
        return 'PENDING';
      default:
        return status?.toUpperCase() || 'PENDING';
    }
  };

  // STATUS COLOR
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return '#22c55e';
      case 'validated':
        return '#3b82f6';
      case 'cancelled':
        return '#ef4444';
      case 'completed':
        return '#8b5cf6';
      default:
        return '#FDBB02';
    }
  };

  // VEHICLE NAME
  const getVehicleName = (vehicleId) => {
    if (
      !vehicles ||
      !Array.isArray(vehicles) ||
      vehicles.length === 0
    ) {
      return 'Loading...';
    }

    let searchId = null;

    if (
      typeof vehicleId === 'object' &&
      vehicleId !== null
    ) {
      searchId =
        vehicleId._id?.toString() ||
        vehicleId.id?.toString() ||
        vehicleId.toString();
    } else if (vehicleId) {
      searchId = vehicleId.toString();
    }

    if (!searchId) {
      return 'Unknown vehicle';
    }

    const vehicle = vehicles.find((v) => {
      const vId =
        v._id?.toString() ||
        v.id?.toString() ||
        v.toString();

      return vId === searchId;
    });

    if (vehicle) {
      return `${vehicle.marque || 'Unknown'} ${
        vehicle.modele || 'Vehicle'
      }`;
    }

    return 'Unknown vehicle';
  };

  // STATUS MESSAGE
  const getStatusMessage = (status) => {
    switch (status) {
      case 'confirmed':
        return '✅ Your vehicle is confirmed and reserved.';
      case 'validated':
        return '⏳ Your booking is validated.';
      case 'cancelled':
        return '❌ Your booking has been cancelled.';
      case 'completed':
        return '🏁 Booking completed.';
      default:
        return '';
    }
  };

  // VALIDATE
  const handleValidate = async (reservationId) => {
    setLoading((prev) => ({
      ...prev,
      [reservationId]: true,
    }));

    const result = await validateReservation(
      reservationId
    );

    if (result?.success) {
      setLocalReservations((prev) =>
        prev.map((res) =>
          res.id === reservationId
            ? { ...res, status: 'validated' }
            : res
        )
      );

      alert(
        '✅ Booking validated! Payment link sent.'
      );
    } else {
      alert(
        '❌ Error: ' +
          (result?.message || 'Unknown error')
      );
    }

    setLoading((prev) => ({
      ...prev,
      [reservationId]: false,
    }));
  };

  // REJECT
  const handleReject = async (reservationId) => {
    const reason = prompt('Reason for rejection:');

    if (!reason) return;

    setLoading((prev) => ({
      ...prev,
      [reservationId]: true,
    }));

    const result = await rejectReservation(
      reservationId,
      reason
    );

    if (result?.success) {
      setLocalReservations((prev) =>
        prev.map((res) =>
          res.id === reservationId
            ? { ...res, status: 'cancelled' }
            : res
        )
      );

      alert('❌ Booking rejected.');
    } else {
      alert(
        '❌ Error: ' +
          (result?.message || 'Unknown error')
      );
    }

    setLoading((prev) => ({
      ...prev,
      [reservationId]: false,
    }));
  };

  // STATUS UPDATE
  const handleStatusUpdate = async (
    reservationId,
    newStatus
  ) => {
    setLoading((prev) => ({
      ...prev,
      [reservationId]: true,
    }));

    const result = await updateReservationStatus(
      reservationId,
      newStatus
    );

    if (result?.success) {
      setLocalReservations((prev) =>
        prev.map((res) =>
          res.id === reservationId
            ? { ...res, status: newStatus }
            : res
        )
      );
    }

    setLoading((prev) => ({
      ...prev,
      [reservationId]: false,
    }));
  };

  // DELETE
  const handleDelete = async (reservationId) => {
    if (
      !confirm(
        'Are you sure you want to delete this reservation?'
      )
    )
      return;

    setLoading((prev) => ({
      ...prev,
      [reservationId]: true,
    }));

    const result = await deleteReservation(
      reservationId
    );

    if (result?.success) {
      setLocalReservations((prev) =>
        prev.filter(
          (res) => res.id !== reservationId
        )
      );
    }

    setLoading((prev) => ({
      ...prev,
      [reservationId]: false,
    }));
  };

  // EMPTY
  if (
    !localReservations ||
    localReservations.length === 0
  ) {
    return (
      <div className="bg-gray-800/90 border border-yellow-400/20 rounded-xl p-8 mt-4 text-center">
        <h3 className="text-xl font-semibold text-white mb-2">
          No Reservations
        </h3>

        <p className="text-gray-400">
          Customer bookings will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">
          📋{' '}
          <span className="text-yellow-400">
            Reservations
          </span>

          <span className="ml-2 text-sm bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded-full">
            {localReservations.length}
          </span>
        </h2>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden lg:block bg-gray-800/90 border border-yellow-400/20 rounded-xl p-4 overflow-x-auto">
        <table className="w-full text-left text-gray-300">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-3 text-yellow-400">
                Customer
              </th>

              <th className="py-3 text-yellow-400">
                Vehicle
              </th>

              <th className="py-3 text-yellow-400">
                Dates
              </th>

              <th className="py-3 text-yellow-400">
                Locations
              </th>

              <th className="py-3 text-yellow-400">
                Price
              </th>

              <th className="py-3 text-yellow-400">
                Status
              </th>

              <th className="py-3 text-yellow-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {localReservations.map((reservation) => (
              <tr
                key={reservation.id}
                className="border-b border-gray-700 hover:bg-gray-700/30 transition"
              >
                <td className="py-4">
                  <div>
                    <p className="font-semibold text-white">
                      {reservation.customer_name}
                    </p>

                    <p className="text-sm text-gray-400">
                      {reservation.customer_email}
                    </p>

                    <p className="text-sm text-gray-500">
                      {reservation.customer_phone}
                    </p>
                  </div>
                </td>

                <td className="py-4">
                  <span className="text-white font-medium">
                    {getVehicleName(
                      reservation.vehicle_id
                    )}
                  </span>
                </td>

                <td className="py-4 text-sm">
                  <p>
                    📅 {reservation.pickup_date}
                  </p>

                  <p>
                    ➡ {reservation.return_date}
                  </p>
                </td>

                <td className="py-4 text-sm">
                  <p>
                    🚗{' '}
                    {reservation.pickup_location ||
                      '-'}
                  </p>

                  <p>
                    🏁{' '}
                    {reservation.dropoff_location ||
                      '-'}
                  </p>
                </td>

                <td className="py-4">
                  <span className="font-semibold text-yellow-400">
                    ${reservation.total_price}
                  </span>
                </td>

                <td className="py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      reservation.status ===
                      'pending'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : reservation.status ===
                          'validated'
                        ? 'bg-blue-500/20 text-blue-400'
                        : reservation.status ===
                          'confirmed'
                        ? 'bg-green-500/20 text-green-400'
                        : reservation.status ===
                          'cancelled'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-purple-500/20 text-purple-400'
                    }`}
                  >
                    {getStatusText(
                      reservation.status
                    )}
                  </span>
                </td>

                <td className="py-4">
                  <div className="flex flex-wrap gap-2">
                    {reservation.status ===
                      'pending' && (
                      <>
                        <button
                          onClick={() =>
                            handleValidate(
                              reservation.id
                            )
                          }
                          className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-xs"
                        >
                          ✅ Validate
                        </button>

                        <button
                          onClick={() =>
                            handleReject(
                              reservation.id
                            )
                          }
                          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-xs"
                        >
                          ❌ Reject
                        </button>
                      </>
                    )}

                    <button
                      onClick={() =>
                        handleDelete(
                          reservation.id
                        )
                      }
                      className="text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="lg:hidden space-y-4">
        {localReservations.map((reservation) => (
          <motion.div
            key={reservation.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 border border-yellow-400/20 rounded-xl p-4"
          >
            {/* CUSTOMER */}
            <div className="mb-4">
              <p className="text-white font-semibold">
                {reservation.customer_name}
              </p>

              <p className="text-sm text-gray-400 break-all">
                {reservation.customer_email}
              </p>

              <p className="text-sm text-gray-500">
                {reservation.customer_phone}
              </p>
            </div>

            {/* VEHICLE */}
            <div className="mb-4">
              <p className="text-yellow-400 text-sm mb-1">
                Vehicle
              </p>

              <p className="text-white">
                {getVehicleName(
                  reservation.vehicle_id
                )}
              </p>
            </div>

            {/* DATES */}
            <div className="mb-4 text-sm">
              <p className="text-yellow-400 mb-1">
                Dates
              </p>

              <p className="text-gray-300">
                📅 {reservation.pickup_date}
              </p>

              <p className="text-gray-300">
                ➡ {reservation.return_date}
              </p>
            </div>

            {/* LOCATIONS */}
            <div className="mb-4 text-sm">
              <p className="text-yellow-400 mb-1">
                Locations
              </p>

              <p className="text-gray-300">
                🚗{' '}
                {reservation.pickup_location ||
                  '-'}
              </p>

              <p className="text-gray-300">
                🏁{' '}
                {reservation.dropoff_location ||
                  '-'}
              </p>
            </div>

            {/* PRICE */}
            <div className="mb-4">
              <p className="text-yellow-400 text-sm mb-1">
                Price
              </p>

              <p className="text-white font-bold">
                ${reservation.total_price}
              </p>
            </div>

            {/* STATUS */}
            <div className="mb-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  reservation.status === 'pending'
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : reservation.status ===
                      'validated'
                    ? 'bg-blue-500/20 text-blue-400'
                    : reservation.status ===
                      'confirmed'
                    ? 'bg-green-500/20 text-green-400'
                    : reservation.status ===
                      'cancelled'
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-purple-500/20 text-purple-400'
                }`}
              >
                {getStatusText(
                  reservation.status
                )}
              </span>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-wrap gap-2">
              {reservation.status ===
                'pending' && (
                <>
                  <button
                    onClick={() =>
                      handleValidate(
                        reservation.id
                      )
                    }
                    disabled={
                      loading[reservation.id]
                    }
                    className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded text-sm"
                  >
                    ✅ Validate
                  </button>

                  <button
                    onClick={() =>
                      handleReject(
                        reservation.id
                      )
                    }
                    disabled={
                      loading[reservation.id]
                    }
                    className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded text-sm"
                  >
                    ❌ Reject
                  </button>
                </>
              )}

              <button
                onClick={() =>
                  handleDelete(reservation.id)
                }
                disabled={loading[reservation.id]}
                className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded text-sm text-red-400"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="text-center text-xs text-gray-500 mt-4 pt-2 border-t border-gray-800">
        Click on status to update reservation
      </div>
    </div>
  );
}