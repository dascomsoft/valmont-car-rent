// import Image from 'next/image';
// import Link from 'next/link';
// import { FaCheck, FaArrowLeft, FaMapMarkedAlt, FaBaby, FaShieldAlt, FaCar } from 'react-icons/fa';
// import { getVehicleById } from '@/lib/actions.js';
// import { notFound } from 'next/navigation';

// // ================= PAGE DETAIL / OPTIONS =================

// export default async function VehicleDetailPage({ params }) {
//   const { id } = await params;
//   const vehicle = await getVehicleById(id);

//   if (!vehicle) {
//     notFound();
//   }

//   // Calcul du prix total (2 jours par défaut, à adapter selon les paramètres)
//   const durationDays = 2;
//   const basePrice = vehicle.prix || 100;
//   const totalBasePrice = basePrice * durationDays;

//   // Options disponibles
//   const options = [
//     {
//       id: "map",
//       icon: <FaMapMarkedAlt className="text-blue-400" />,
//       title: "Map of Seychelles",
//       desc: "Handy map to explore the Seychelles island",
//       price: 0,
//       image: "/images/map.jpg"
//     },
//     {
//       id: "baby_seat",
//       icon: <FaBaby className="text-pink-400" />,
//       title: "Baby Seat",
//       desc: "Keep your baby safe and comfortable during every car trip. Our car seats are built to exceed recommended safety standards",
//       price: 10,
//       image: "/images/carseat.jpg"
//     },
//     {
//       id: "cdw_1000",
//       icon: <FaShieldAlt className="text-green-400" />,
//       title: "Collision Damage Waiver",
//       desc: "Cover damages up to an excess of 1000Euro",
//       price: 20,
//       image: "/images/collision.jpg"
//     },
//     {
//       id: "cdw_500",
//       icon: <FaShieldAlt className="text-blue-400" />,
//       title: "Collision Damage Waiver",
//       desc: "Cover damages up to an excess of 500Euro",
//       price: 40,
//       image: "/images/collision1.jpg"
//     }
//   ];

//   // Source de l'image du véhicule
//   const vehicleImageSrc = vehicle.image_data || vehicle.image_url || '/images/placeholder-car.jpg';
//   const isBase64 = vehicleImageSrc.startsWith('data:image');

//   return (
//     <div className="min-h-screen bg-black text-white">
//       <div className="container mx-auto px-4 py-8 max-w-4xl pt-24">
        
//         {/* ================= PROGRESS BAR ================= */}
//         <div className="flex items-center justify-center mb-10">
//           <div className="flex items-center w-full max-w-2xl">
//             <div className="flex-1 h-1 bg-yellow-400 rounded"></div>
//             <div className="px-4 py-1 bg-yellow-400 text-black font-semibold rounded-full text-sm mx-2">
//               3 Options
//             </div>
//             <div className="flex-1 h-1 bg-gray-700 rounded"></div>
//           </div>
//         </div>

//         {/* ================= VEHICLE HEADER ================= */}
//         <div className="flex flex-col md:flex-row gap-6 items-center mb-10 bg-[#111111] p-6 rounded-2xl border border-gray-800">
//           <div className="relative w-48 h-32 flex-shrink-0">
//             {isBase64 ? (
//               <img
//                 src={vehicleImageSrc}
//                 alt={`${vehicle.marque} ${vehicle.modele}`}
//                 className="w-full h-full object-contain"
//               />
//             ) : (
//               <Image
//                 src={vehicleImageSrc}
//                 alt={`${vehicle.marque} ${vehicle.modele}`}
//                 fill
//                 className="object-contain"
//               />
//             )}
//           </div>
//           <div>
//             <h1 className="text-2xl md:text-3xl font-bold">
//               Rental {vehicle.marque} {vehicle.modele}
//             </h1>
//             <p className="text-yellow-400 text-xl mt-1">
//               for {durationDays} Days
//             </p>
//           </div>
//         </div>

//         {/* ================= PRICE SECTION ================= */}
//         <div className="mb-8">
//           <h2 className="text-lg font-semibold mb-3">Price</h2>
//           <div className="bg-[#111111] border border-yellow-400/30 rounded-xl p-5 flex justify-between items-center">
//             <div>
//               <p className="text-gray-400">Regular Price</p>
//               <p className="text-3xl font-bold text-yellow-400">
//                 ${totalBasePrice}.00
//               </p>
//               <p className="text-gray-500 text-sm">
//                 ${basePrice} per day × {durationDays} days
//               </p>
//             </div>
//             <div className="w-6 h-6 rounded-full border-2 border-yellow-400 flex items-center justify-center">
//               <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
//             </div>
//           </div>
//         </div>

//         {/* ================= OPTIONS SECTION ================= */}
//         <div className="mb-10">
//           <h2 className="text-lg font-semibold mb-4">Options</h2>
          
//           <div className="space-y-4">
//             {options.map((option) => (
//               <div
//                 key={option.id}
//                 className="bg-[#111111] border border-gray-800 hover:border-gray-600 rounded-xl p-5 flex gap-5 items-start transition-all group"
//               >
//                 {/* Icon */}
//                 <div className="text-3xl mt-1">
//                   {option.icon}
//                 </div>
                
//                 {/* Content */}
//                 <div className="flex-1">
//                   <div className="flex justify-between flex-wrap gap-2">
//                     <h3 className="font-semibold text-lg">{option.title}</h3>
//                     <p className="font-bold text-yellow-400">
//                       ${option.price}.00
//                     </p>
//                   </div>
//                   <p className="text-gray-400 text-sm mt-1 leading-relaxed">
//                     {option.desc}
//                   </p>
//                 </div>

//                 {/* Checkbox */}
//                 <div className="pt-2">
//                   <input
//                     type="checkbox"
//                     className="w-6 h-6 accent-yellow-400 cursor-pointer"
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ================= ACTION BUTTONS ================= */}
//         <div className="flex flex-col sm:flex-row gap-4 justify-between pt-6 border-t border-gray-800">
//           <Link
//             href="/"
//             className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-10 rounded-xl transition"
//           >
//             <FaArrowLeft /> BACK
//           </Link>

//           <Link
//             href="/booking/customer"
//             className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-16 rounded-xl text-lg transition shadow-lg shadow-blue-500/30"
//           >
//             BOOK NOW
//           </Link>
//         </div>

//       </div>
//     </div>
//   );
// }















// import Image from 'next/image';
// import Link from 'next/link';
// import { FaArrowLeft, FaMapMarkedAlt, FaBaby, FaShieldAlt } from 'react-icons/fa';
// import { getVehicleById } from '@/lib/actions.js';
// import { notFound } from 'next/navigation';

// // ================= PAGE DETAIL / OPTIONS =================

// export default async function VehicleDetailPage({ params, searchParams }) {
//   const { id } = await params;
//   const vehicle = await getVehicleById(id);
  
//   // Récupérer les paramètres de recherche depuis l'URL (transmis par la page des résultats)
//   const resolvedSearchParams = await searchParams;
  
//   const pickupLocation = resolvedSearchParams?.pickup_location || '';
//   const dropoffLocation = resolvedSearchParams?.dropoff_location || '';
//   const pickupDate = resolvedSearchParams?.pickup_date || '';
//   const pickupTime = resolvedSearchParams?.pickup_time || '';
//   const returnDate = resolvedSearchParams?.return_date || '';
//   const returnTime = resolvedSearchParams?.return_time || '';
//   const numberOfDays = parseInt(resolvedSearchParams?.number_of_days) || 2;
//   const totalPrice = parseInt(resolvedSearchParams?.total_price) || (vehicle?.prix * numberOfDays) || 200;

//   if (!vehicle) {
//     notFound();
//   }

//   // Calcul du prix total
//   const basePrice = vehicle.prix || 100;
//   const totalBasePrice = basePrice * numberOfDays;

//   // Options disponibles
//   const options = [
//     {
//       id: "map",
//       icon: <FaMapMarkedAlt className="text-blue-400" />,
//       title: "Map of Seychelles",
//       desc: "Handy map to explore the Seychelles island",
//       price: 0,
//       image: "/images/map.jpg"
//     },
//     {
//       id: "baby_seat",
//       icon: <FaBaby className="text-pink-400" />,
//       title: "Baby Seat",
//       desc: "Keep your baby safe and comfortable during every car trip. Our car seats are built to exceed recommended safety standards",
//       price: 10,
//       image: "/images/carseat.jpg"
//     },
//     {
//       id: "cdw_1000",
//       icon: <FaShieldAlt className="text-green-400" />,
//       title: "Collision Damage Waiver",
//       desc: "Cover damages up to an excess of 1000Euro",
//       price: 20,
//       image: "/images/collision.jpg"
//     },
//     {
//       id: "cdw_500",
//       icon: <FaShieldAlt className="text-blue-400" />,
//       title: "Collision Damage Waiver",
//       desc: "Cover damages up to an excess of 500Euro",
//       price: 40,
//       image: "/images/collision1.jpg"
//     }
//   ];

//   // Source de l'image du véhicule
//   const vehicleImageSrc = vehicle.image_data || vehicle.image_url || '/images/placeholder-car.jpg';
//   const isBase64 = vehicleImageSrc.startsWith('data:image');

//   // Construction de l'URL pour le bouton BOOK NOW avec TOUS les paramètres
//   const bookingUrl = `/booking/customer?${new URLSearchParams({
//     vehicle_id: vehicle.id,
//     vehicle_marque: vehicle.marque,
//     vehicle_modele: vehicle.modele,
//     vehicle_prix: vehicle.prix,
//     number_of_days: numberOfDays,
//     total_price: totalBasePrice,
//     pickup_location: pickupLocation,
//     dropoff_location: dropoffLocation,
//     pickup_date: pickupDate,
//     pickup_time: pickupTime,
//     return_date: returnDate,
//     return_time: returnTime,
//   }).toString()}`;

//   return (
//     <div className="min-h-screen bg-black text-white">
//       <div className="container mx-auto px-4 py-8 max-w-4xl pt-24">
        
//         {/* ================= PROGRESS BAR ================= */}
//         <div className="flex items-center justify-center mb-10">
//           <div className="flex items-center w-full max-w-2xl">
//             <div className="flex-1 h-1 bg-yellow-400 rounded"></div>
//             <div className="px-4 py-1 bg-yellow-400 text-black font-semibold rounded-full text-sm mx-2">
//               3 Options
//             </div>
//             <div className="flex-1 h-1 bg-gray-700 rounded"></div>
//           </div>
//         </div>

//         {/* ================= VEHICLE HEADER ================= */}
//         <div className="flex flex-col md:flex-row gap-6 items-center mb-10 bg-[#111111] p-6 rounded-2xl border border-gray-800">
//           <div className="relative w-48 h-32 flex-shrink-0">
//             {isBase64 ? (
//               <img
//                 src={vehicleImageSrc}
//                 alt={`${vehicle.marque} ${vehicle.modele}`}
//                 className="w-full h-full object-contain"
//               />
//             ) : (
//               <Image
//                 src={vehicleImageSrc}
//                 alt={`${vehicle.marque} ${vehicle.modele}`}
//                 fill
//                 className="object-contain"
//               />
//             )}
//           </div>
//           <div>
//             <h1 className="text-2xl md:text-3xl font-bold">
//               Rental {vehicle.marque} {vehicle.modele}
//             </h1>
//             <p className="text-yellow-400 text-xl mt-1">
//               for {numberOfDays} Days
//             </p>
//           </div>
//         </div>

//         {/* ================= PRICE SECTION ================= */}
//         <div className="mb-8">
//           <h2 className="text-lg font-semibold mb-3">Price</h2>
//           <div className="bg-[#111111] border border-yellow-400/30 rounded-xl p-5 flex justify-between items-center">
//             <div>
//               <p className="text-gray-400">Regular Price</p>
//               <p className="text-3xl font-bold text-yellow-400">
//                 ${totalBasePrice}.00
//               </p>
//               <p className="text-gray-500 text-sm">
//                 ${basePrice} per day × {numberOfDays} days
//               </p>
//             </div>
//             <div className="w-6 h-6 rounded-full border-2 border-yellow-400 flex items-center justify-center">
//               <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
//             </div>
//           </div>
//         </div>

//         {/* ================= OPTIONS SECTION ================= */}
//         <div className="mb-10">
//           <h2 className="text-lg font-semibold mb-4">Options</h2>
          
//           <div className="space-y-4">
//             {options.map((option) => (
//               <div
//                 key={option.id}
//                 className="bg-[#111111] border border-gray-800 hover:border-gray-600 rounded-xl p-5 flex gap-5 items-start transition-all group"
//               >
//                 {/* Icon */}
//                 <div className="text-3xl mt-1">
//                   {option.icon}
//                 </div>
                
//                 {/* Content */}
//                 <div className="flex-1">
//                   <div className="flex justify-between flex-wrap gap-2">
//                     <h3 className="font-semibold text-lg">{option.title}</h3>
//                     <p className="font-bold text-yellow-400">
//                       ${option.price}.00
//                     </p>
//                   </div>
//                   <p className="text-gray-400 text-sm mt-1 leading-relaxed">
//                     {option.desc}
//                   </p>
//                 </div>

//                 {/* Checkbox */}
//                 <div className="pt-2">
//                   <input
//                     type="checkbox"
//                     className="w-6 h-6 accent-yellow-400 cursor-pointer"
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ================= ACTION BUTTONS ================= */}
//         <div className="flex flex-col sm:flex-row gap-4 justify-between pt-6 border-t border-gray-800">
//           <Link
//             href="/"
//             className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-10 rounded-xl transition"
//           >
//             <FaArrowLeft /> BACK
//           </Link>

//           {/* LIEN CORRIGÉ AVEC TOUS LES PARAMÈTRES */}
//           <Link
//             href={bookingUrl}
//             className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-16 rounded-xl text-lg transition shadow-lg shadow-blue-500/30"
//           >
//             BOOK NOW
//           </Link>
//         </div>

//       </div>
//     </div>
//   );
// }

































































































// import Image from 'next/image';
// import Link from 'next/link';
// import { FaArrowLeft, FaMapMarkedAlt, FaBaby, FaShieldAlt } from 'react-icons/fa';
// import { getVehicleById } from '@/lib/actions.js';
// import { notFound } from 'next/navigation';

// // ================= PAGE DETAIL / OPTIONS =================

// export default async function VehicleDetailPage({ params, searchParams }) {
//   // ATTENDRE searchParams (c'est une Promise dans Next.js 15)
//   const resolvedParams = await params;
//   const resolvedSearchParams = await searchParams;
  
//   const { id } = resolvedParams;
//   const vehicle = await getVehicleById(id);
  
//   // Récupérer les paramètres de recherche
//   const pickupLocation = resolvedSearchParams?.pickup_location || '';
//   const dropoffLocation = resolvedSearchParams?.dropoff_location || '';
//   const pickupDate = resolvedSearchParams?.pickup_date || '';
//   const pickupTime = resolvedSearchParams?.pickup_time || '';
//   const returnDate = resolvedSearchParams?.return_date || '';
//   const returnTime = resolvedSearchParams?.return_time || '';
//   const numberOfDays = parseInt(resolvedSearchParams?.number_of_days) || 2;
//   const totalPrice = parseInt(resolvedSearchParams?.total_price) || (vehicle?.prix * numberOfDays) || 200;

//   if (!vehicle) {
//     notFound();
//   }

//   // Calcul du prix total
//   const basePrice = vehicle.prix || 100;
//   const totalBasePrice = basePrice * numberOfDays;

//   // Options disponibles
//   const options = [
//     {
//       id: "map",
//       icon: <FaMapMarkedAlt className="text-blue-400" />,
//       title: "Map of Seychelles",
//       desc: "Handy map to explore the Seychelles island",
//       price: 0,
//       image: "/images/map.jpg"
//     },
//     {
//       id: "baby_seat",
//       icon: <FaBaby className="text-pink-400" />,
//       title: "Baby Seat",
//       desc: "Keep your baby safe and comfortable during every car trip. Our car seats are built to exceed recommended safety standards",
//       price: 10,
//       image: "/images/carseat.jpg"
//     },
//     {
//       id: "cdw_1000",
//       icon: <FaShieldAlt className="text-green-400" />,
//       title: "Collision Damage Waiver",
//       desc: "Cover damages up to an excess of 1000Euro",
//       price: 20,
//       image: "/images/collision.jpg"
//     },
//     {
//       id: "cdw_500",
//       icon: <FaShieldAlt className="text-blue-400" />,
//       title: "Collision Damage Waiver",
//       desc: "Cover damages up to an excess of 500Euro",
//       price: 40,
//       image: "/images/collision1.jpg"
//     }
//   ];

//   // Source de l'image du véhicule
//   const vehicleImageSrc = vehicle.image_data || vehicle.image_url || '/images/placeholder-car.jpg';
//   const isBase64 = vehicleImageSrc.startsWith('data:image');

//   // Construction de l'URL pour le bouton BOOK NOW
//   const bookingUrl = `/booking/customer?${new URLSearchParams({
//     vehicle_id: vehicle.id,
//     vehicle_marque: vehicle.marque,
//     vehicle_modele: vehicle.modele,
//     vehicle_prix: vehicle.prix,
//     number_of_days: numberOfDays,
//     total_price: totalBasePrice,
//     pickup_location: pickupLocation,
//     dropoff_location: dropoffLocation,
//     pickup_date: pickupDate,
//     pickup_time: pickupTime,
//     return_date: returnDate,
//     return_time: returnTime,
//   }).toString()}`;

//   return (
//     <div className="min-h-screen bg-black text-white">
//       <div className="container mx-auto px-4 py-8 max-w-4xl pt-24">
        
//         {/* Progress Bar */}
//         <div className="flex items-center justify-center mb-10">
//           <div className="flex items-center w-full max-w-2xl">
//             <div className="flex-1 h-1 bg-yellow-400 rounded"></div>
//             <div className="px-4 py-1 bg-yellow-400 text-black font-semibold rounded-full text-sm mx-2">
//               3 Options
//             </div>
//             <div className="flex-1 h-1 bg-gray-700 rounded"></div>
//           </div>
//         </div>

//         {/* Vehicle Header */}
//         <div className="flex flex-col md:flex-row gap-6 items-center mb-10 bg-[#111111] p-6 rounded-2xl border border-gray-800">
//           <div className="relative w-48 h-32 flex-shrink-0">
//             {isBase64 ? (
//               <img
//                 src={vehicleImageSrc}
//                 alt={`${vehicle.marque} ${vehicle.modele}`}
//                 className="w-full h-full object-contain"
//               />
//             ) : (
//               <Image
//                 src={vehicleImageSrc}
//                 alt={`${vehicle.marque} ${vehicle.modele}`}
//                 fill
//                 className="object-contain"
//                 unoptimized={vehicleImageSrc.includes('blob:') || vehicleImageSrc.includes('data:')}
//                 onError={(e) => {
//                   e.target.src = '/images/placeholder-car.jpg';
//                 }}
//               />
//             )}
//           </div>
//           <div>
//             <h1 className="text-2xl md:text-3xl font-bold">
//               Rental {vehicle.marque} {vehicle.modele}
//             </h1>
//             <p className="text-yellow-400 text-xl mt-1">
//               for {numberOfDays} Days
//             </p>
//           </div>
//         </div>

//         {/* Price Section */}
//         <div className="mb-8">
//           <h2 className="text-lg font-semibold mb-3">Price</h2>
//           <div className="bg-[#111111] border border-yellow-400/30 rounded-xl p-5 flex justify-between items-center">
//             <div>
//               <p className="text-gray-400">Regular Price</p>
//               <p className="text-3xl font-bold text-yellow-400">
//                 ${totalBasePrice}.00
//               </p>
//               <p className="text-gray-500 text-sm">
//                 ${basePrice} per day × {numberOfDays} days
//               </p>
//             </div>
//             <div className="w-6 h-6 rounded-full border-2 border-yellow-400 flex items-center justify-center">
//               <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
//             </div>
//           </div>
//         </div>

//         {/* Options Section */}
//         <div className="mb-10">
//           <h2 className="text-lg font-semibold mb-4">Options</h2>
          
//           <div className="space-y-4">
//             {options.map((option) => (
//               <div
//                 key={option.id}
//                 className="bg-[#111111] border border-gray-800 hover:border-gray-600 rounded-xl p-5 flex gap-5 items-start transition-all group"
//               >
//                 <div className="text-3xl mt-1">{option.icon}</div>
                
//                 <div className="flex-1">
//                   <div className="flex justify-between flex-wrap gap-2">
//                     <h3 className="font-semibold text-lg">{option.title}</h3>
//                     <p className="font-bold text-yellow-400">${option.price}.00</p>
//                   </div>
//                   <p className="text-gray-400 text-sm mt-1 leading-relaxed">{option.desc}</p>
//                 </div>

//                 <div className="pt-2">
//                   <input type="checkbox" className="w-6 h-6 accent-yellow-400 cursor-pointer" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex flex-col sm:flex-row gap-4 justify-between pt-6 border-t border-gray-800">
//           <Link
//             href="/"
//             className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-10 rounded-xl transition"
//           >
//             <FaArrowLeft /> BACK
//           </Link>

//           <Link
//             href={bookingUrl}
//             className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-16 rounded-xl text-lg transition shadow-lg shadow-blue-500/30"
//           >
//             BOOK NOW
//           </Link>
//         </div>

//       </div>
//     </div>
//   );
// }



























































































































import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaMapMarkedAlt, FaBaby, FaShieldAlt } from 'react-icons/fa';
import { getVehicleById } from '@/lib/actions.js';
import { notFound } from 'next/navigation';

// ================= PAGE DETAIL / OPTIONS =================

export default async function VehicleDetailPage({ params, searchParams }) {
  // ATTENDRE searchParams (c'est une Promise dans Next.js 15)
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const { id } = resolvedParams;
  const vehicle = await getVehicleById(id);
  
  // Récupérer les paramètres de recherche
  const pickupLocation = resolvedSearchParams?.pickup_location || '';
  const dropoffLocation = resolvedSearchParams?.dropoff_location || '';
  const pickupDate = resolvedSearchParams?.pickup_date || '';
  const pickupTime = resolvedSearchParams?.pickup_time || '';
  const returnDate = resolvedSearchParams?.return_date || '';
  const returnTime = resolvedSearchParams?.return_time || '';
  const numberOfDays = parseInt(resolvedSearchParams?.number_of_days) || 2;
  const totalPrice = parseInt(resolvedSearchParams?.total_price) || (vehicle?.prix * numberOfDays) || 200;

  if (!vehicle) {
    notFound();
  }

  // Calcul du prix total
  const basePrice = vehicle.prix || 100;
  const totalBasePrice = basePrice * numberOfDays;

  // Options disponibles
  const options = [
    {
      id: "map",
      icon: <FaMapMarkedAlt className="text-blue-400" />,
      title: "Map of Seychelles",
      desc: "Handy map to explore the Seychelles island",
      price: 0,
      image: "/images/map.jpg"
    },
    {
      id: "baby_seat",
      icon: <FaBaby className="text-pink-400" />,
      title: "Baby Seat",
      desc: "Keep your baby safe and comfortable during every car trip. Our car seats are built to exceed recommended safety standards",
      price: 10,
      image: "/images/carseat.jpg"
    },
    {
      id: "cdw_1000",
      icon: <FaShieldAlt className="text-green-400" />,
      title: "Collision Damage Waiver",
      desc: "Cover damages up to an excess of 1000Euro",
      price: 20,
      image: "/images/collision.jpg"
    },
    {
      id: "cdw_500",
      icon: <FaShieldAlt className="text-blue-400" />,
      title: "Collision Damage Waiver",
      desc: "Cover damages up to an excess of 500Euro",
      price: 40,
      image: "/images/collision1.jpg"
    }
  ];

  // Source de l'image du véhicule
  const vehicleImageSrc = vehicle.image_data || vehicle.image_url || '/images/placeholder-car.jpg';
  const isBase64 = vehicleImageSrc.startsWith('data:image');

  // Construction de l'URL pour le bouton BOOK NOW
  const bookingUrl = `/booking/customer?${new URLSearchParams({
    vehicle_id: vehicle.id,
    vehicle_marque: vehicle.marque,
    vehicle_modele: vehicle.modele,
    vehicle_prix: vehicle.prix,
    number_of_days: numberOfDays,
    total_price: totalBasePrice,
    pickup_location: pickupLocation,
    dropoff_location: dropoffLocation,
    pickup_date: pickupDate,
    pickup_time: pickupTime,
    return_date: returnDate,
    return_time: returnTime,
  }).toString()}`;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl pt-24">
        
        {/* ================= STEPPER ================= */}

        <div className="flex items-center justify-center mb-14 overflow-x-auto">
          <div className="flex items-center gap-2 sm:gap-5 min-w-max px-2">
            
            {/* STEP 1 */}

            <Link href="/" className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center font-bold shadow-lg flex-shrink-0">
                ✓
              </div>

              <span className="hidden sm:block text-sm text-green-400 font-medium">
                Search
              </span>
            </Link>

            <div className="w-10 sm:w-24 h-[2px] bg-green-500 flex-shrink-0"></div>

            {/* STEP 2 */}

            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center font-bold shadow-lg flex-shrink-0">
                ✓
              </div>

              <span className="hidden sm:block text-sm text-green-400 font-medium">
                Vehicles
              </span>
            </div>

            <div className="w-10 sm:w-24 h-[2px] bg-yellow-400 flex-shrink-0"></div>

            {/* STEP 3 */}

            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold shadow-lg flex-shrink-0">
                3
              </div>

              <span className="hidden sm:block text-sm text-yellow-400 font-medium">
                Details
              </span>
            </div>

            <div className="w-10 sm:w-24 h-[2px] bg-gray-800 flex-shrink-0"></div>

            {/* STEP 4 */}

            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-[#111111] border border-gray-700 text-gray-500 flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>

              <span className="hidden sm:block text-sm text-gray-500">
                Booking
              </span>
            </div>
          </div>
        </div>

        {/* Vehicle Header */}
        <div className="flex flex-col md:flex-row gap-6 items-center mb-10 bg-[#111111] p-6 rounded-2xl border border-gray-800">
          <div className="relative w-48 h-32 flex-shrink-0">
            {isBase64 ? (
              <img
                src={vehicleImageSrc}
                alt={`${vehicle.marque} ${vehicle.modele}`}
                className="w-full h-full object-contain"
              />
            ) : (
              <Image
                src={vehicleImageSrc}
                alt={`${vehicle.marque} ${vehicle.modele}`}
                fill
                className="object-contain"
                unoptimized={vehicleImageSrc.includes('blob:') || vehicleImageSrc.includes('data:')}
                onError={(e) => {
                  e.target.src = '/images/placeholder-car.jpg';
                }}
              />
            )}
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Rental {vehicle.marque} {vehicle.modele}
            </h1>

            <p className="text-yellow-400 text-xl mt-1">
              for {numberOfDays} Days
            </p>
          </div>
        </div>

        {/* Price Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Price</h2>

          <div className="bg-[#111111] border border-yellow-400/30 rounded-xl p-5 flex justify-between items-center">
            <div>
              <p className="text-gray-400">Regular Price</p>

              <p className="text-3xl font-bold text-yellow-400">
                ${totalBasePrice}.00
              </p>

              <p className="text-gray-500 text-sm">
                ${basePrice} per day × {numberOfDays} days
              </p>
            </div>

            <div className="w-6 h-6 rounded-full border-2 border-yellow-400 flex items-center justify-center">
              <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Options Section */}
        <div className="mb-10">
          <h2 className="text-lg font-semibold mb-4">Options</h2>
          
          <div className="space-y-4">
            {options.map((option) => (
              <div
                key={option.id}
                className="bg-[#111111] border border-gray-800 hover:border-gray-600 rounded-xl p-5 flex gap-5 items-start transition-all group"
              >
                <div className="text-3xl mt-1">
                  {option.icon}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between flex-wrap gap-2">
                    <h3 className="font-semibold text-lg">
                      {option.title}
                    </h3>

                    <p className="font-bold text-yellow-400">
                      ${option.price}.00
                    </p>
                  </div>

                  <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                    {option.desc}
                  </p>
                </div>

                <div className="pt-2">
                  <input
                    type="checkbox"
                    className="w-6 h-6 accent-yellow-400 cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between pt-6 border-t border-gray-800">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-10 rounded-xl transition"
          >
            <FaArrowLeft /> BACK
          </Link>

          <Link
            href={bookingUrl}
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-16 rounded-xl text-lg transition shadow-lg shadow-blue-500/30"
          >
            BOOK NOW
          </Link>
        </div>

      </div>
    </div>
  );
}