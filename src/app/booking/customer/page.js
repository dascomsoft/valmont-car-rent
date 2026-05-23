// import Link from 'next/link';
// import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaIdCard, FaPlane, FaHotel } from 'react-icons/fa';
// import { createReservation } from '@/lib/actions';
// import { redirect } from 'next/navigation';

// export default async function CustomerPage({ searchParams }) {
//   const params = await searchParams;

//   const vehicleId = params?.vehicle_id;
//   const vehicleMarque = params?.vehicle_marque;
//   const vehicleModele = params?.vehicle_modele;
//   const vehiclePrix = params?.vehicle_prix;
//   const numberOfDays = params?.number_of_days;
//   const totalPrice = params?.total_price;
//   const pickupLocation = params?.pickup_location;
//   const dropoffLocation = params?.dropoff_location;
//   const pickupDate = params?.pickup_date;
//   const pickupTime = params?.pickup_time;
//   const returnDate = params?.return_date;
//   const returnTime = params?.return_time;

//   async function handleSubmit(formData) {
//     'use server';
//     const result = await createReservation(formData);
//     if (result.success) {
//       redirect(`/booking/request-sent?reservation_id=${result.reservationId}`);
//     } else {
//       redirect(`/booking/error?message=${encodeURIComponent(result.message)}`);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white pt-16 sm:pt-20">
//       <div className="container mx-auto px-4 py-8 max-w-4xl">

//         {/* Progress bar */}
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex-1 text-center"><div className="w-8 h-8 bg-yellow-400 text-gray-900 rounded-full flex items-center justify-center mx-auto mb-2">1</div><span className="text-xs text-yellow-400">Dates</span></div>
//           <div className="flex-1 text-center"><div className="w-8 h-8 bg-yellow-400 text-gray-900 rounded-full flex items-center justify-center mx-auto mb-2">2</div><span className="text-xs text-yellow-400">Vehicle</span></div>
//           <div className="flex-1 text-center"><div className="w-8 h-8 bg-yellow-400 text-gray-900 rounded-full flex items-center justify-center mx-auto mb-2">3</div><span className="text-xs text-yellow-400">Information</span></div>
//           <div className="flex-1 text-center"><div className="w-8 h-8 bg-gray-700 text-gray-500 rounded-full flex items-center justify-center mx-auto mb-2">4</div><span className="text-xs text-gray-500">Confirmation</span></div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//           {/* Customer Form */}
//           <div className="lg:col-span-2">
//             <div className="bg-gray-800/50 border border-yellow-400/20 rounded-xl p-6">
//               <h2 className="text-2xl font-bold text-white mb-6">PERSONAL DETAILS</h2>

//               <form action={handleSubmit} className="space-y-4">
//                 <input type="hidden" name="vehicle_id" value={vehicleId} />
//                 <input type="hidden" name="vehicle_marque" value={vehicleMarque} />
//                 <input type="hidden" name="vehicle_modele" value={vehicleModele} />
//                 <input type="hidden" name="vehicle_prix" value={vehiclePrix} />
//                 <input type="hidden" name="number_of_days" value={numberOfDays} />
//                 <input type="hidden" name="total_price" value={totalPrice} />
//                 <input type="hidden" name="pickup_location" value={pickupLocation} />
//                 <input type="hidden" name="dropoff_location" value={dropoffLocation} />
//                 <input type="hidden" name="pickup_date" value={pickupDate} />
//                 <input type="hidden" name="pickup_time" value={pickupTime} />
//                 <input type="hidden" name="return_date" value={returnDate} />
//                 <input type="hidden" name="return_time" value={returnTime} />

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div><label className="block text-yellow-400 text-sm mb-2"><FaUser className="inline mr-2" /> First Name *</label><input type="text" name="first_name" required className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white" /></div>
//                   <div><label className="block text-yellow-400 text-sm mb-2"><FaUser className="inline mr-2" /> Last Name *</label><input type="text" name="last_name" required className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white" /></div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div><label className="block text-yellow-400 text-sm mb-2"><FaEnvelope className="inline mr-2" /> Email *</label><input type="email" name="email" required className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white" /></div>
//                   <div><label className="block text-yellow-400 text-sm mb-2"><FaPhone className="inline mr-2" /> Phone *</label><input type="tel" name="phone" required className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white" /></div>
//                 </div>

//                 <div><label className="block text-yellow-400 text-sm mb-2"><FaMapMarkerAlt className="inline mr-2" /> Address</label><input type="text" name="address" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white" /></div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div><label className="block text-yellow-400 text-sm mb-2">City</label><input type="text" name="city" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white" /></div>
//                   <div><label className="block text-yellow-400 text-sm mb-2">Country</label><select name="country" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"><option value="Seychelles">Seychelles</option><option value="Other">Other</option></select></div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div><label className="block text-yellow-400 text-sm mb-2"><FaCalendarAlt className="inline mr-2" /> Date of Birth</label><input type="date" name="birth_date" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white" /></div>
//                   <div><label className="block text-yellow-400 text-sm mb-2"><FaIdCard className="inline mr-2" /> License Number</label><input type="text" name="license_number" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white" /></div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div><label className="block text-yellow-400 text-sm mb-2"><FaPlane className="inline mr-2" /> Flight Number</label><input type="text" name="flight_number" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white" /></div>
//                   <div><label className="block text-yellow-400 text-sm mb-2"><FaHotel className="inline mr-2" /> Hotel Name</label><input type="text" name="hotel_name" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white" /></div>
//                 </div>

//                 <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded-lg transition mt-4">
//                   Submit Booking Request
//                 </button>

//                 <p className="text-xs text-gray-400 text-center mt-4">
//                   ⚠️ No payment now. You will pay after our team validates your request.
//                 </p>
//               </form>
//             </div>
//           </div>

//           {/* Summary */}
//           <div>
//             <div className="bg-gray-800/50 border border-yellow-400/20 rounded-xl p-6 sticky top-24">
//               <h3 className="text-lg font-bold text-white mb-4">Booking Summary</h3>
//               <div className="space-y-3 text-sm">
//                 <div className="flex justify-between"><span className="text-gray-400">Vehicle</span><span className="text-white">{vehicleMarque} {vehicleModele}</span></div>
//                 <div className="flex justify-between"><span className="text-gray-400">Duration</span><span className="text-white">{numberOfDays} day(s)</span></div>
//                 <div className="flex justify-between"><span className="text-gray-400">Pickup</span><span className="text-white text-right">{pickupDate} at {pickupTime}<br/>{pickupLocation}</span></div>
//                 <div className="flex justify-between"><span className="text-gray-400">Return</span><span className="text-white text-right">{returnDate} at {returnTime}<br/>{dropoffLocation}</span></div>
//                 <div className="border-t border-gray-700 pt-3 mt-3"><div className="flex justify-between font-bold"><span className="text-yellow-400">Total</span><span className="text-yellow-400 text-xl">{totalPrice}$</span></div></div>
//               </div>
//               <div className="mt-4 pt-3 border-t border-gray-700">
//                 <p className="text-xs text-gray-500">You will receive a confirmation email after our team validates your request.</p>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }





















// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { FaMapMarkerAlt, FaExclamationTriangle } from 'react-icons/fa';
// import PhoneInput from 'react-phone-number-input';
// import 'react-phone-number-input/style.css';
// import { useState, useEffect } from 'react';
// import { useSearchParams } from 'next/navigation';

// export default function OrderSummaryPage() {
//   const searchParams = useSearchParams();
//   const [phoneValue, setPhoneValue] = useState("");
//   const [bookingData, setBookingData] = useState({
//     vehicleId: null,
//     vehicleMarque: '',
//     vehicleModele: '',
//     vehicleImage: '',
//     vehiclePrix: 0,
//     numberOfDays: 1,
//     totalPrice: 0,
//     pickupLocation: '',
//     dropoffLocation: '',
//     pickupDate: '',
//     pickupTime: '',
//     returnDate: '',
//     returnTime: '',
//   });

//   const [isLoading, setIsLoading] = useState(true);

//   // Récupérer les paramètres de l'URL
//   useEffect(() => {
//     const params = {
//       vehicleId: searchParams.get('vehicle_id'),
//       vehicleMarque: searchParams.get('vehicle_marque'),
//       vehicleModele: searchParams.get('vehicle_modele'),
//       vehicleImage: searchParams.get('vehicle_image') || '',
//       vehiclePrix: parseInt(searchParams.get('vehicle_prix')) || 0,
//       numberOfDays: parseInt(searchParams.get('number_of_days')) || 1,
//       totalPrice: parseInt(searchParams.get('total_price')) || 0,
//       pickupLocation: searchParams.get('pickup_location') || '',
//       dropoffLocation: searchParams.get('dropoff_location') || '',
//       pickupDate: searchParams.get('pickup_date') || '',
//       pickupTime: searchParams.get('pickup_time') || '',
//       returnDate: searchParams.get('return_date') || '',
//       returnTime: searchParams.get('return_time') || '',
//     };

//     console.log('Paramètres reçus:', params); // Debug
//     setBookingData(params);
//     setIsLoading(false);
//   }, [searchParams]);

//   // Vérifier si les données essentielles sont présentes
//   const hasRequiredData = bookingData.vehicleId && bookingData.totalPrice > 0;

//   // Construction du nom du véhicule
//   const vehicleName = `${bookingData.vehicleMarque || 'Unknown'} ${bookingData.vehicleModele || 'Vehicle'}`;

//   // Formatage des dates
//   const formatDate = (dateStr, timeStr) => {
//     if (!dateStr || !timeStr) return 'Not specified';
//     return `${dateStr} at ${timeStr}`;
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-black text-white flex items-center justify-center pt-24">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400 mx-auto mb-4"></div>
//           <p className="text-gray-400">Loading order summary...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!hasRequiredData) {
//     return (
//       <div className="min-h-screen bg-black text-white py-8 pt-24">
//         <div className="max-w-2xl mx-auto px-4 text-center">
//           <div className="bg-[#111111] border border-yellow-400/30 rounded-2xl p-8">
//             <FaExclamationTriangle className="text-yellow-400 text-6xl mx-auto mb-4" />
//             <h1 className="text-2xl font-bold text-white mb-4">Missing Booking Information</h1>
//             <p className="text-gray-400 mb-6">
//               Please select a vehicle first from the search results.
//             </p>
//             <Link
//               href="/"
//               className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-xl transition"
//             >
//               Back to Home
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-black text-white py-8 pt-24">
//       <div className="max-w-6xl mx-auto px-4">

//         {/* ================= PROGRESS BAR ================= */}
//         <div className="flex justify-center mb-8">
//           <div className="flex items-center w-full max-w-3xl">
//             <div className="flex items-center flex-1">
//               <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-500 text-white font-bold">✓</div>
//               <div className="flex-1 h-0.5 bg-green-500 mx-2"></div>
//             </div>
//             <div className="flex items-center flex-1">
//               <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-500 text-white font-bold">✓</div>
//               <div className="flex-1 h-0.5 bg-green-500 mx-2"></div>
//             </div>
//             <div className="flex items-center flex-1">
//               <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-500 text-white font-bold">✓</div>
//               <div className="flex-1 h-0.5 bg-green-500 mx-2"></div>
//             </div>
//             <div className="flex items-center flex-1">
//               <div className="w-8 h-8 rounded-full flex items-center justify-center bg-yellow-400 text-black font-bold">4</div>
//               <div className="flex-1 h-0.5 bg-gray-700 mx-2"></div>
//             </div>
//           </div>
//         </div>

//         {/* Titre */}
//         <h1 className="text-4xl font-bold text-center mb-8">Order Summary</h1>

//         {/* ================= BOOKING INFO + VEHICLE IMAGE ================= */}
//         <div className="bg-[#111111] border border-gray-800 rounded-2xl p-6 mb-6">
//           <div className="flex flex-col lg:flex-row justify-between gap-6">
//             <div className="flex-1">
//               <h2 className="text-2xl font-semibold">
//                 Rental {vehicleName}
//               </h2>
//               <p className="text-yellow-400 text-xl mt-1">
//                 for {bookingData.numberOfDays} Day{bookingData.numberOfDays > 1 ? 's' : ''}
//               </p>

//               <div className="mt-8 space-y-6">
//                 {/* Pickup */}
//                 <div className="flex gap-4">
//                   <FaMapMarkerAlt className="text-green-500 mt-1" size={26} />
//                   <div>
//                     <p className="font-semibold text-green-500">PICKUP</p>
//                     <p>{bookingData.pickupLocation || 'Not specified'}</p>
//                     <p className="text-gray-400">
//                       📅 {formatDate(bookingData.pickupDate, bookingData.pickupTime)}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Drop Off */}
//                 <div className="flex gap-4">
//                   <FaMapMarkerAlt className="text-red-500 mt-1" size={26} />
//                   <div>
//                     <p className="font-semibold text-red-500">DROP OFF</p>
//                     <p>{bookingData.dropoffLocation || 'Not specified'}</p>
//                     <p className="text-gray-400">
//                       📅 {formatDate(bookingData.returnDate, bookingData.returnTime)}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Vehicle Image */}
//             <div className="flex-shrink-0">
//               <div className="relative w-72 h-44 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
//                 {bookingData.vehicleImage ? (
//                   <img
//                     src={bookingData.vehicleImage}
//                     alt={vehicleName}
//                     className="w-full h-full object-contain"
//                     onError={(e) => {
//                       e.currentTarget.src = '/images/placeholder-car.jpg';
//                     }}
//                   />
//                 ) : (
//                   <div className="text-gray-500 text-center">
//                     <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7h8m-8 4h8m-8 4h8M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
//                     </svg>
//                     <p className="text-sm">{vehicleName}</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ================= PRICE BREAKDOWN ================= */}
//         <div className="bg-[#111111] border border-gray-800 rounded-2xl p-6 mb-8">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b border-gray-700 text-gray-400 text-sm">
//                 <th className="text-left pb-4">Description</th>
//                 <th className="pb-4 text-center">DAYS</th>
//                 <th className="pb-4 text-center">NET PRICE</th>
//                 <th className="pb-4 text-center">TAX</th>
//                 <th className="pb-4 text-right">TOTAL PRICE</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td className="py-5">
//                   {vehicleName}<br />
//                   <span className="text-sm text-gray-500">Regular Price</span>
//                 </td>
//                 <td className="text-center py-5">{bookingData.numberOfDays}</td>
//                 <td className="text-center py-5">${bookingData.vehiclePrix}.00</td>
//                 <td className="text-center py-5">$0.00</td>
//                 <td className="text-right py-5 font-semibold">${bookingData.totalPrice}.00</td>
//               </tr>
//             </tbody>
//           </table>

//           <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-700 text-2xl font-bold">
//             <span>TOTAL</span>
//             <span className="text-yellow-400">${bookingData.totalPrice}.00</span>
//           </div>
//         </div>

//         {/* ================= DRIVER INFORMATION ================= */}
//         <div className="bg-[#111111] border border-gray-800 rounded-2xl p-6">
//           <h3 className="text-xl font-semibold mb-6">Driver Information</h3>

//           <form action="/booking/payment" method="GET">
//             {/* Passer tous les paramètres */}
//             <input type="hidden" name="vehicle_id" value={bookingData.vehicleId || ''} />
//             <input type="hidden" name="vehicle_marque" value={bookingData.vehicleMarque || ''} />
//             <input type="hidden" name="vehicle_modele" value={bookingData.vehicleModele || ''} />
//             <input type="hidden" name="vehicle_prix" value={bookingData.vehiclePrix || 0} />
//             <input type="hidden" name="number_of_days" value={bookingData.numberOfDays || 1} />
//             <input type="hidden" name="total_price" value={bookingData.totalPrice || 0} />
//             <input type="hidden" name="pickup_location" value={bookingData.pickupLocation || ''} />
//             <input type="hidden" name="dropoff_location" value={bookingData.dropoffLocation || ''} />
//             <input type="hidden" name="pickup_date" value={bookingData.pickupDate || ''} />
//             <input type="hidden" name="pickup_time" value={bookingData.pickupTime || ''} />
//             <input type="hidden" name="return_date" value={bookingData.returnDate || ''} />
//             <input type="hidden" name="return_time" value={bookingData.returnTime || ''} />

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               <div>
//                 <label className="block text-sm text-gray-400 mb-1">* First Name</label>
//                 <input type="text" name="first_name" required className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 focus:border-yellow-400 outline-none" />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-400 mb-1">* Last Name</label>
//                 <input type="text" name="last_name" required className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 focus:border-yellow-400 outline-none" />
//               </div>

//               <div>
//                 <label className="block text-sm text-gray-400 mb-1">* Email</label>
//                 <input type="email" name="email" required className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 focus:border-yellow-400 outline-none" />
//               </div>

//               <div>
//                 <label className="block text-sm text-gray-400 mb-1">* Phone</label>
//                 <PhoneInput
//                   international
//                   countryCallingCodeEditable={false}
//                   defaultCountry="SC"
//                   value={phoneValue}
//                   onChange={setPhoneValue}
//                   className="react-phone-input-custom"
//                   numberInputProps={{
//                     className: "w-full bg-black border border-gray-700 rounded-lg px-4 py-3 focus:border-yellow-400 outline-none text-white"
//                   }}
//                 />
//                 <input type="hidden" name="phone" value={phoneValue} />
//               </div>

//               <div>
//                 <label className="block text-sm text-gray-400 mb-1">Address</label>
//                 <input type="text" name="address" className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3" />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-400 mb-1">Zip Code</label>
//                 <input type="text" name="zipcode" className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3" />
//               </div>

//               <div>
//                 <label className="block text-sm text-gray-400 mb-1">City</label>
//                 <input type="text" name="city" className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3" />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-400 mb-1">* Country</label>
//                 <select name="country" defaultValue="Seychelles" className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3">
//                   <option value="Seychelles">Seychelles</option>
//                   <option value="France">France</option>
//                   <option value="Cameroon">Cameroon</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm text-gray-400 mb-1">* Date of Birth</label>
//                 <input type="date" name="birth_date" className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3" />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-400 mb-1">* License Number</label>
//                 <input type="text" name="license_number" className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3" />
//               </div>

//               <div>
//                 <label className="block text-sm text-gray-400 mb-1">Flight Number</label>
//                 <input type="text" name="flight_number" className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3" />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-400 mb-1">Hotel Name</label>
//                 <input type="text" name="hotel_name" className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3" />
//               </div>
//             </div>

//             {/* Terms and Conditions */}
//             <div className="mt-8 space-y-6">
//               <div className="flex items-center gap-2">
//                 <input type="checkbox" defaultChecked required className="accent-yellow-400 w-5 h-5" />
//                 <span>I agree to the terms and conditions</span>
//               </div>
//             </div>

//             {/* Buttons */}
//             <div className="flex justify-between mt-10">
//               <Link href="/" className="bg-red-600 hover:bg-red-700 px-12 py-4 rounded-xl font-semibold transition">
//                 BACK
//               </Link>
//               <button type="submit" className="bg-green-600 hover:bg-green-700 px-12 py-4 rounded-xl font-bold transition">
//                 CONFIRM ORDER
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }











































'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaMapMarkerAlt, FaExclamationTriangle } from 'react-icons/fa';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { createReservation } from '@/lib/actions';

export default function OrderSummaryPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [phoneValue, setPhoneValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingData, setBookingData] = useState({
    vehicleId: null,
    vehicleMarque: '',
    vehicleModele: '',
    vehicleImage: '',
    vehiclePrix: 0,
    numberOfDays: 1,
    totalPrice: 0,
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    pickupTime: '',
    returnDate: '',
    returnTime: '',
  });

  const [isLoading, setIsLoading] = useState(true);

  // Récupérer les paramètres de l'URL
  useEffect(() => {
    const params = {
      vehicleId: searchParams.get('vehicle_id'),
      vehicleMarque: searchParams.get('vehicle_marque'),
      vehicleModele: searchParams.get('vehicle_modele'),
      vehicleImage: searchParams.get('vehicle_image') || '',
      vehiclePrix: parseInt(searchParams.get('vehicle_prix')) || 0,
      numberOfDays: parseInt(searchParams.get('number_of_days')) || 1,
      totalPrice: parseInt(searchParams.get('total_price')) || 0,
      pickupLocation: searchParams.get('pickup_location') || '',
      dropoffLocation: searchParams.get('dropoff_location') || '',
      pickupDate: searchParams.get('pickup_date') || '',
      pickupTime: searchParams.get('pickup_time') || '',
      returnDate: searchParams.get('return_date') || '',
      returnTime: searchParams.get('return_time') || '',
    };

    console.log('Paramètres reçus:', params);
    setBookingData(params);
    setIsLoading(false);
  }, [searchParams]);

  // Vérifier si les données essentielles sont présentes
  const hasRequiredData = bookingData.vehicleId && bookingData.totalPrice > 0;

  // Construction du nom du véhicule
  const vehicleName = `${bookingData.vehicleMarque || 'Unknown'} ${bookingData.vehicleModele || 'Vehicle'}`;

  // Formatage des dates
  const formatDate = (dateStr, timeStr) => {
    if (!dateStr || !timeStr) return 'Not specified';
    return `${dateStr} at ${timeStr}`;
  };

  // Soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.target);
    
    // Ajouter les paramètres de réservation
    formData.append('vehicle_id', bookingData.vehicleId);
    formData.append('vehicle_marque', bookingData.vehicleMarque);
    formData.append('vehicle_modele', bookingData.vehicleModele);
    formData.append('vehicle_prix', bookingData.vehiclePrix);
    formData.append('number_of_days', bookingData.numberOfDays);
    formData.append('total_price', bookingData.totalPrice);
    formData.append('pickup_location', bookingData.pickupLocation);
    formData.append('dropoff_location', bookingData.dropoffLocation);
    formData.append('pickup_date', bookingData.pickupDate);
    formData.append('pickup_time', bookingData.pickupTime);
    formData.append('return_date', bookingData.returnDate);
    formData.append('return_time', bookingData.returnTime);

    const result = await createReservation(formData);
    
    if (result.success) {
      router.push(`/booking/request-sent?reservation_id=${result.reservationId}`);
    } else {
      router.push(`/booking/error?message=${encodeURIComponent(result.message)}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center pt-24">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading order summary...</p>
        </div>
      </div>
    );
  }

  if (!hasRequiredData) {
    return (
      <div className="min-h-screen bg-black text-white py-8 pt-24">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-[#111111] border border-yellow-400/30 rounded-2xl p-8">
            <FaExclamationTriangle className="text-yellow-400 text-6xl mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-4">Missing Booking Information</h1>
            <p className="text-gray-400 mb-6">
              Please select a vehicle first from the search results.
            </p>
            <Link
              href="/"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-xl transition"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-8 pt-24">
      <div className="max-w-6xl mx-auto px-4">

        {/* ================= PROGRESS BAR ================= */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center w-full max-w-3xl">
            <div className="flex items-center flex-1">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-500 text-white font-bold">✓</div>
              <div className="flex-1 h-0.5 bg-green-500 mx-2"></div>
            </div>
            <div className="flex items-center flex-1">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-500 text-white font-bold">✓</div>
              <div className="flex-1 h-0.5 bg-green-500 mx-2"></div>
            </div>
            <div className="flex items-center flex-1">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-500 text-white font-bold">✓</div>
              <div className="flex-1 h-0.5 bg-green-500 mx-2"></div>
            </div>
            <div className="flex items-center flex-1">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-yellow-400 text-black font-bold">4</div>
              <div className="flex-1 h-0.5 bg-gray-700 mx-2"></div>
            </div>
          </div>
        </div>

        {/* Titre */}
        <h1 className="text-4xl font-bold text-center mb-8">Order Summary</h1>

        {/* ================= BOOKING INFO + VEHICLE IMAGE ================= */}
        <div className="bg-[#111111] border border-gray-800 rounded-2xl p-6 mb-6">
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold">
                Rental {vehicleName}
              </h2>
              <p className="text-yellow-400 text-xl mt-1">
                for {bookingData.numberOfDays} Day{bookingData.numberOfDays > 1 ? 's' : ''}
              </p>

              <div className="mt-8 space-y-6">
                {/* Pickup */}
                <div className="flex gap-4">
                  <FaMapMarkerAlt className="text-green-500 mt-1" size={26} />
                  <div>
                    <p className="font-semibold text-green-500">PICKUP</p>
                    <p>{bookingData.pickupLocation || 'Not specified'}</p>
                    <p className="text-gray-400">
                      📅 {formatDate(bookingData.pickupDate, bookingData.pickupTime)}
                    </p>
                  </div>
                </div>

                {/* Drop Off */}
                <div className="flex gap-4">
                  <FaMapMarkerAlt className="text-red-500 mt-1" size={26} />
                  <div>
                    <p className="font-semibold text-red-500">DROP OFF</p>
                    <p>{bookingData.dropoffLocation || 'Not specified'}</p>
                    <p className="text-gray-400">
                      📅 {formatDate(bookingData.returnDate, bookingData.returnTime)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle Image */}
            <div className="flex-shrink-0">
              <div className="relative w-72 h-44 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
                {bookingData.vehicleImage ? (
                  <img
                    src={bookingData.vehicleImage}
                    alt={vehicleName}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.src = '/images/placeholder-car.jpg';
                    }}
                  />
                ) : (
                  <div className="text-gray-500 text-center">
                    <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7h8m-8 4h8m-8 4h8M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
                    </svg>
                    <p className="text-sm">{vehicleName}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ================= PRICE BREAKDOWN ================= */}
        <div className="bg-[#111111] border border-gray-800 rounded-2xl p-6 mb-8">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700 text-gray-400 text-sm">
                <th className="text-left pb-4">Description</th>
                <th className="pb-4 text-center">DAYS</th>
                <th className="pb-4 text-center">NET PRICE</th>
                <th className="pb-4 text-center">TAX</th>
                <th className="pb-4 text-right">TOTAL PRICE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-5">
                  {vehicleName}<br />
                  <span className="text-sm text-gray-500">Regular Price</span>
                </td>
                <td className="text-center py-5">{bookingData.numberOfDays}</td>
                <td className="text-center py-5">${bookingData.vehiclePrix}.00</td>
                <td className="text-center py-5">$0.00</td>
                <td className="text-right py-5 font-semibold">${bookingData.totalPrice}.00</td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-700 text-2xl font-bold">
            <span>TOTAL</span>
            <span className="text-yellow-400">${bookingData.totalPrice}.00</span>
          </div>
        </div>

        {/* ================= DRIVER INFORMATION ================= */}
        <div className="bg-[#111111] border border-gray-800 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-6">Driver Information</h3>

          <form onSubmit={handleSubmit}>
            {/* Passer tous les paramètres */}
            <input type="hidden" name="vehicle_id" value={bookingData.vehicleId || ''} />
            <input type="hidden" name="vehicle_marque" value={bookingData.vehicleMarque || ''} />
            <input type="hidden" name="vehicle_modele" value={bookingData.vehicleModele || ''} />
            <input type="hidden" name="vehicle_prix" value={bookingData.vehiclePrix || 0} />
            <input type="hidden" name="number_of_days" value={bookingData.numberOfDays || 1} />
            <input type="hidden" name="total_price" value={bookingData.totalPrice || 0} />
            <input type="hidden" name="pickup_location" value={bookingData.pickupLocation || ''} />
            <input type="hidden" name="dropoff_location" value={bookingData.dropoffLocation || ''} />
            <input type="hidden" name="pickup_date" value={bookingData.pickupDate || ''} />
            <input type="hidden" name="pickup_time" value={bookingData.pickupTime || ''} />
            <input type="hidden" name="return_date" value={bookingData.returnDate || ''} />
            <input type="hidden" name="return_time" value={bookingData.returnTime || ''} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-gray-400 mb-1">* First Name</label>
                <input type="text" name="first_name" required className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 focus:border-yellow-400 outline-none" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">* Last Name</label>
                <input type="text" name="last_name" required className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 focus:border-yellow-400 outline-none" />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">* Email</label>
                <input type="email" name="email" required className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 focus:border-yellow-400 outline-none" />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">* Phone</label>
                <PhoneInput
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry="SC"
                  value={phoneValue}
                  onChange={setPhoneValue}
                  className="react-phone-input-custom"
                  numberInputProps={{
                    className: "w-full bg-black border border-gray-700 rounded-lg px-4 py-3 focus:border-yellow-400 outline-none text-white"
                  }}
                />
                <input type="hidden" name="phone" value={phoneValue} />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Address</label>
                <input type="text" name="address" className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Zip Code</label>
                <input type="text" name="zipcode" className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3" />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">City</label>
                <input type="text" name="city" className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">* Country</label>
                <select name="country" defaultValue="Seychelles" className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3">
                  <option value="Seychelles">Seychelles</option>
                  <option value="France">France</option>
                  <option value="Cameroon">Cameroon</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">* Date of Birth</label>
                <input type="date" name="birth_date" className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">* License Number</label>
                <input type="text" name="license_number" className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3" />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Flight Number</label>
                <input type="text" name="flight_number" className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Hotel Name</label>
                <input type="text" name="hotel_name" className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3" />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="mt-8 space-y-6">
              <div className="flex items-center gap-2">
                <input type="checkbox" defaultChecked required className="accent-yellow-400 w-5 h-5" />
                <span>I agree to the terms and conditions</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-10">
              <Link
                href="/" 
                className="bg-red-600 hover:bg-red-700 px-12 py-4 rounded-xl font-semibold transition"
              >
                BACK
              </Link>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700 px-12 py-4 rounded-xl font-bold transition disabled:opacity-50"
              >
                {isSubmitting ? 'SUBMITTING...' : 'CONFIRM ORDER'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}






































































