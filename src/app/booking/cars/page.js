// import { getVehicles, getVehiclesAvailability } from '@/lib/actions.js';
// import { Suspense } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaMoneyBillWave, FaWhatsapp } from 'react-icons/fa';

// // Composant de chargement
// function ResultsLoading() {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {[1, 2, 3, 4, 5, 6].map((i) => (
//         <div key={i} className="bg-gray-800/80 rounded-xl h-[400px] animate-pulse border border-gray-700"></div>
//       ))}
//     </div>
//   );
// }

// // Composant principal des résultats
// async function ResultsList({ searchParams }) {
//   const params = await searchParams;

//   const pickupLocation = params?.pickup_location;
//   const dropoffLocation = params?.dropoff_location;
//   const pickupDate = params?.pickup_date;
//   const pickupTime = params?.pickup_time;
//   const returnDate = params?.return_date;
//   const returnTime = params?.return_time;

//   if (!pickupDate || !returnDate || !pickupTime || !returnTime) {
//     return (
//       <div className="text-center py-16">
//         <div className="text-yellow-400 text-5xl mb-4">⚠️</div>
//         <h2 className="text-2xl font-bold text-white mb-2">Missing search parameters</h2>
//         <Link href="/" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-lg transition">
//           Back to Home
//         </Link>
//       </div>
//     );
//   }

//   const allVehicles = await getVehicles();
//   const unavailableMap = await getVehiclesAvailability(pickupDate);

//   // Filtrer les véhicules disponibles
//   const availableVehicles = allVehicles.filter(vehicle => !unavailableMap.has(vehicle.id));

//   const start = new Date(pickupDate);
//   const end = new Date(returnDate);
//   const numberOfDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) || 1;

//   if (availableVehicles.length === 0) {
//     return (
//       <div className="text-center py-16">
//         <div className="text-yellow-400 text-5xl mb-4">🚫</div>
//         <h2 className="text-2xl font-bold text-white mb-2">No vehicles available</h2>
//         <Link href="/" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-lg transition">
//           Modify search
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div>
//       {/* Récapitulatif de la recherche */}
//       <div className="bg-gray-800/50 border border-yellow-400/20 rounded-xl p-4 mb-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           <div className="flex items-center gap-3">
//             <FaMapMarkerAlt className="text-yellow-400 text-lg" />
//             <div>
//               <p className="text-xs text-gray-400">Pickup Location</p>
//               <p className="text-white font-medium">{pickupLocation}</p>
//               <p className="text-gray-400 text-sm">{pickupDate} at {pickupTime}</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-3">
//             <FaMapMarkerAlt className="text-yellow-400 text-lg" />
//             <div>
//               <p className="text-xs text-gray-400">Drop Off Location</p>
//               <p className="text-white font-medium">{dropoffLocation}</p>
//               <p className="text-gray-400 text-sm">{returnDate} at {returnTime}</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-3">
//             <FaCalendarAlt className="text-yellow-400 text-lg" />
//             <div>
//               <p className="text-xs text-gray-400">Duration</p>
//               <p className="text-white font-medium">{numberOfDays} day(s)</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-3">
//             <FaMoneyBillWave className="text-yellow-400 text-lg" />
//             <div>
//               <p className="text-xs text-gray-400">Estimated Price</p>
//               <p className="text-white font-medium">From {numberOfDays * 50}$</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Liste des véhicules */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {availableVehicles.map((vehicle) => {
//           const totalPrice = numberOfDays * vehicle.prix;
//           // Déterminer la source de l'image (priorité à image_data puis image_url)
//           const imageSrc = vehicle.image_data || vehicle.image_url || '/images/placeholder-car.jpg';

//           return (
//             <div key={vehicle.id} className="bg-gray-800/90 border border-gray-700 rounded-xl overflow-hidden hover:border-yellow-400/40 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-400/10">
//               <div className="relative h-48 w-full bg-gray-700">
//                 {imageSrc.startsWith('data:image') ? (
//                   // eslint-disable-next-line @next/next/no-img-element
//                   <img
//                     src={imageSrc}
//                     alt={`${vehicle.marque} ${vehicle.modele}`}
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <Image
//                     src={imageSrc}
//                     alt={`${vehicle.marque} ${vehicle.modele}`}
//                     fill
//                     className="object-cover"
//                     unoptimized={imageSrc.startsWith('data:')}
//                     onError={(e) => {
//                       e.target.src = '/images/placeholder-car.jpg';
//                     }}
//                   />
//                 )}
//               </div>
//               <div className="p-5">
//                 <div className="flex justify-between items-start mb-3">
//                   <h3 className="text-xl font-bold text-white">{vehicle.marque} {vehicle.modele}</h3>
//                   <span className="bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded-full text-xs font-semibold">{vehicle.categorie || 'Classic'}</span>
//                 </div>
//                 <p className="text-gray-400 text-sm mb-4 line-clamp-2">{vehicle.description?.substring(0, 100)}...</p>
//                 <div className="border-t border-gray-700 pt-3 mt-2">
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="text-gray-400 text-sm">Total for {numberOfDays} day(s)</span>
//                     <span className="text-yellow-400 font-bold text-xl">{totalPrice}$</span>
//                   </div>
//                   <div className="text-xs text-gray-500">{vehicle.prix}$ / day</div>
//                 </div>

//                 <form action="/booking/customer" method="GET" className="mt-4">
//                   <input type="hidden" name="vehicle_id" value={vehicle.id} />
//                   <input type="hidden" name="vehicle_marque" value={vehicle.marque} />
//                   <input type="hidden" name="vehicle_modele" value={vehicle.modele} />
//                   <input type="hidden" name="vehicle_prix" value={vehicle.prix} />
//                   <input type="hidden" name="number_of_days" value={numberOfDays} />
//                   <input type="hidden" name="total_price" value={totalPrice} />
//                   <input type="hidden" name="pickup_location" value={pickupLocation} />
//                   <input type="hidden" name="dropoff_location" value={dropoffLocation} />
//                   <input type="hidden" name="pickup_date" value={pickupDate} />
//                   <input type="hidden" name="pickup_time" value={pickupTime} />
//                   <input type="hidden" name="return_date" value={returnDate} />
//                   <input type="hidden" name="return_time" value={returnTime} />
//                   <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded-lg transition">
//                     Select this vehicle
//                   </button>
//                 </form>

//                 {/* Alternative: Book on WhatsApp directement */}
//                 <a
//                   href={`https://wa.me/2481234567?text=${encodeURIComponent(`Hello, I'm interested in ${vehicle.marque} ${vehicle.modele} from ${pickupDate} to ${returnDate}. Total: ${totalPrice}$. Pickup: ${pickupLocation}.`)}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition mt-2"
//                 >
//                   <FaWhatsapp className="w-4 h-4" />
//                   Quick WhatsApp
//                 </a>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default function CarsPage({ searchParams }) {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white pt-16 sm:pt-20">
//       <div className="relative bg-gradient-to-r from-gray-900/90 via-black to-gray-900/90 overflow-hidden py-12">
//         <div className="absolute inset-0 z-0 opacity-30">
//           <Image src="/images/seychelles-beach.jpg" alt="Available cars" fill className="object-cover" priority />
//           <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-black/80 to-gray-900/90"></div>
//         </div>
//         <div className="relative z-20 container mx-auto px-4 text-center">
//           <Link href="/" className="inline-flex items-center gap-1 text-yellow-400 hover:text-yellow-500 mb-4 transition">← Modify search</Link>
//           <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">Available Vehicles</h1>
//           <p className="text-gray-300 max-w-2xl mx-auto">Select the vehicle that best suits your needs</p>
//         </div>
//       </div>
//       <div className="container mx-auto px-4 py-8">
//         <Suspense fallback={<ResultsLoading />}>
//           <ResultsList searchParams={searchParams} />
//         </Suspense>
//       </div>
//     </div>
//   );
// }











import { getVehicles, getVehiclesAvailability } from '@/lib/actions.js';
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaWhatsapp,
  FaEye,
} from 'react-icons/fa';

// ================= LOADING =================

function ResultsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="bg-[#111111] border border-gray-800 rounded-3xl h-[420px] animate-pulse"
        ></div>
      ))}
    </div>
  );
}

// ================= RESULTS =================

async function ResultsList({ searchParams }) {
  const params = await searchParams;

  const pickupLocation = params?.pickup_location;
  const dropoffLocation = params?.dropoff_location;
  const pickupDate = params?.pickup_date;
  const pickupTime = params?.pickup_time;
  const returnDate = params?.return_date;
  const returnTime = params?.return_time;

  if (!pickupDate || !returnDate || !pickupTime || !returnTime) {
    return (
      <div className="text-center py-20">
        <div className="text-yellow-400 text-6xl mb-5">⚠️</div>

        <h2 className="text-3xl font-bold text-white mb-4">
          Missing search parameters
        </h2>

        <Link
          href="/"
          className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4 rounded-xl transition"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const allVehicles = await getVehicles();

  const unavailableMap = await getVehiclesAvailability(pickupDate);

  const availableVehicles = allVehicles.filter(
    (vehicle) => !unavailableMap.has(vehicle.id)
  );

  const start = new Date(pickupDate);

  const end = new Date(returnDate);

  const numberOfDays =
    Math.ceil((end - start) / (1000 * 60 * 60 * 24)) || 1;

  if (availableVehicles.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-yellow-400 text-6xl mb-5">🚫</div>

        <h2 className="text-3xl font-bold text-white mb-4">
          No vehicles available
        </h2>

        <Link
          href="/"
          className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4 rounded-xl transition"
        >
          Modify Search
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* ================= SEARCH SUMMARY ================= */}

      <div className="bg-[#111111] border border-gray-800 rounded-3xl p-6 mb-10 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 flex items-center justify-center">
              <FaMapMarkerAlt className="text-yellow-400 text-lg" />
            </div>

            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wider">
                Pickup Location
              </p>

              <p className="text-white font-semibold text-lg">
                {pickupLocation}
              </p>

              <p className="text-gray-400 text-sm">
                {pickupDate} at {pickupTime}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 flex items-center justify-center">
              <FaMapMarkerAlt className="text-yellow-400 text-lg" />
            </div>

            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wider">
                Drop Off
              </p>

              <p className="text-white font-semibold text-lg">
                {dropoffLocation}
              </p>

              <p className="text-gray-400 text-sm">
                {returnDate} at {returnTime}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 flex items-center justify-center">
              <FaCalendarAlt className="text-yellow-400 text-lg" />
            </div>

            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wider">
                Duration
              </p>

              <p className="text-white font-semibold text-lg">
                {numberOfDays} day(s)
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 flex items-center justify-center">
              <FaMoneyBillWave className="text-yellow-400 text-lg" />
            </div>

            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wider">
                Estimated
              </p>

              <p className="text-yellow-400 font-bold text-2xl">
                {numberOfDays * 50}$
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= VEHICLES ================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {availableVehicles.map((vehicle) => {
          const totalPrice = numberOfDays * vehicle.prix;

          const imageSrc =
            vehicle.image_data ||
            vehicle.image_url ||
            '/images/placeholder-car.jpg';

          // Construction de l'URL vers la page de détail avec tous les paramètres
          const vehicleDetailUrl = {
            pathname: `/vehicles/${vehicle.id}`,
            query: {
              pickup_location: pickupLocation,
              dropoff_location: dropoffLocation,
              pickup_date: pickupDate,
              pickup_time: pickupTime,
              return_date: returnDate,
              return_time: returnTime,
              number_of_days: numberOfDays,
              total_price: totalPrice,
            },
          };

          return (
            <div
              key={vehicle.id}
              className="group bg-[#111111] border border-gray-800 rounded-3xl overflow-hidden hover:border-yellow-400/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-400/10"
            >
              {/* IMAGE */}

              <div className="relative h-40 overflow-hidden bg-black">
                {imageSrc.startsWith('data:image') ? (
                  <img
                    src={imageSrc}
                    alt={`${vehicle.marque} ${vehicle.modele}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                ) : (
                  <Image
                    src={imageSrc}
                    alt={`${vehicle.marque} ${vehicle.modele}`}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-700"
                    unoptimized={imageSrc.startsWith('data:')}
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>

                <div className="absolute top-4 right-4">
                  <span className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                    {vehicle.categorie || 'Classic'}
                  </span>
                </div>
              </div>

              {/* CONTENT */}

              <div className="p-5">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-1 leading-tight">
                    {vehicle.marque}
                  </h3>

                  <p className="text-yellow-400 font-medium text-sm">
                    {vehicle.modele}
                  </p>
                </div>

                <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-2">
                  {vehicle.description?.substring(0, 110)}...
                </p>

                {/* PRICE */}

                <div className="border-t border-gray-800 pt-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider">
                        Total Price
                      </p>

                      <p className="text-yellow-400 text-3xl font-bold">
                        ${totalPrice}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-gray-500 text-xs uppercase tracking-wider">
                        Per Day
                      </p>

                      <p className="text-white font-semibold">
                        ${vehicle.prix}
                      </p>
                    </div>
                  </div>
                </div>

                {/* BUTTONS */}

                <div className="mt-6 flex flex-col gap-3">
                  {/* VIEW DETAILS BUTTON - LIEN VERS LA PAGE DE DÉTAIL */}
                  <Link
                    href={{
                      pathname: `/vehicle/${vehicle.id}`,
                      query: {
                        pickup_location: pickupLocation,
                        dropoff_location: dropoffLocation,
                        pickup_date: pickupDate,
                        pickup_time: pickupTime,
                        return_date: returnDate,
                        return_time: returnTime,
                        number_of_days: numberOfDays,
                        total_price: totalPrice,
                      }
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-2xl transition"
                  >
                    <FaEye className="w-4 h-4" />
                    View Details
                  </Link>

                  {/* WHATSAPP BUTTON - SANS onClick (supprimé) */}
                  <a
                    href={`https://wa.me/2481234567?text=${encodeURIComponent(
                      `Hello, I'm interested in ${vehicle.marque} ${vehicle.modele} from ${pickupDate} to ${returnDate}. Total: ${totalPrice}$. Pickup: ${pickupLocation}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#1f1f1f] hover:bg-green-600 text-white font-semibold py-3 rounded-2xl transition"
                  >
                    <FaWhatsapp className="w-4 h-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ================= PAGE =================

export default function CarsPage({ searchParams }) {
  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* ================= HERO ================= */}

      <div className="relative overflow-hidden border-b border-gray-900">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/images/seychelles-beach.jpg"
            alt="Luxury Cars"
            fill
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 bg-black/80"></div>
        </div>

        <div className="relative z-20 container mx-auto px-4 py-16">
          {/* ================= STEPPER ================= */}

          <div className="flex items-center justify-center mb-14 overflow-x-auto">
            <div className="flex items-center gap-2 sm:gap-5">
              {/* STEP 1 */}

              <Link href="/" className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center font-bold shadow-lg">
                  ✓
                </div>

                <span className="hidden sm:block text-sm text-green-400 font-medium">
                  Search
                </span>
              </Link>

              <div className="w-10 sm:w-24 h-[2px] bg-yellow-400"></div>

              {/* STEP 2 */}

              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold shadow-lg">
                  2
                </div>

                <span className="hidden sm:block text-sm text-yellow-400 font-medium">
                  Vehicles
                </span>
              </div>

              <div className="w-10 sm:w-24 h-[2px] bg-gray-800"></div>

              {/* STEP 3 */}

              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-[#111111] border border-gray-700 text-gray-500 flex items-center justify-center font-bold">
                  3
                </div>

                <span className="hidden sm:block text-sm text-gray-500">
                  Details
                </span>
              </div>

              <div className="w-10 sm:w-24 h-[2px] bg-gray-800"></div>

              {/* STEP 4 */}

              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-[#111111] border border-gray-700 text-gray-500 flex items-center justify-center font-bold">
                  4
                </div>

                <span className="hidden sm:block text-sm text-gray-500">
                  Booking
                </span>
              </div>
            </div>
          </div>

          {/* TITLE */}

          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-500 mb-6 transition"
            >
              ← Modify search
            </Link>

            <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
              Available Vehicles
            </h1>

            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Select the perfect vehicle for your luxury journey
            </p>
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}

      <div className="container mx-auto px-4 py-12">
        <Suspense fallback={<ResultsLoading />}>
          <ResultsList searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}