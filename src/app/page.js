













// // Page d'accueil - Version Professionnelle avec Formulaire de Recherche
// import { getFeaturedVehicles } from '@/lib/actions.js';
// import VehicleCardSimple from '@/components/VehicleCardSimple.jsx';
// import HeroSection from '@/components/HeroSection.jsx';
// import { Suspense } from 'react';
// import { FaShieldAlt, FaMoneyBillWave, FaTruck, FaHeadset, FaStar, FaMapMarkerAlt, FaCalendarAlt, FaClock } from 'react-icons/fa';

// // Section véhicules vedettes
// async function FeaturedVehicles() {
//   const vehicles = await getFeaturedVehicles();
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-0">
//       {vehicles.map((vehicle, index) => (
//         <VehicleCardSimple key={vehicle.id} vehicle={vehicle} index={index} />
//       ))}
//     </div>
//   );
// }

// // Formulaire de recherche - IDENTIQUE À L'IMAGE 1
// function SearchForm() {
//   const today = new Date().toISOString().split('T')[0];
  
//   return (
//     <form action="/booking/cars" method="GET" className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-yellow-400/20">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        
//         {/* Pickup Location */}
//         <div>
//           <label className="block text-yellow-400 text-sm font-medium mb-2">
//             <FaMapMarkerAlt className="inline mr-2 text-yellow-400" />
//             Pickup Location
//           </label>
//           <select
//             name="pickup_location"
//             required
//             className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none transition"
//           >
//             <option value="">Select pickup location</option>
//             <option value="Seychelles International Airport">Seychelles International Airport</option>
//             <option value="Eden Island Marina Mahe">Eden Island Marina Mahe</option>
//             <option value="Victoria Port">Victoria Port</option>
//           </select>
//         </div>

//         {/* Drop Off Location */}
//         <div>
//           <label className="block text-yellow-400 text-sm font-medium mb-2">
//             <FaMapMarkerAlt className="inline mr-2 text-yellow-400" />
//             Drop Off Location
//           </label>
//           <select
//             name="dropoff_location"
//             required
//             className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none transition"
//           >
//             <option value="">Select drop off location</option>
//             <option value="Seychelles International Airport">Seychelles International Airport</option>
//             <option value="Eden Island Marina Mahe">Eden Island Marina Mahe</option>
//             <option value="Victoria Port">Victoria Port</option>
//           </select>
//         </div>

//         {/* Pickup Date */}
//         <div>
//           <label className="block text-yellow-400 text-sm font-medium mb-2">
//             <FaCalendarAlt className="inline mr-2 text-yellow-400" />
//             Pickup Date
//           </label>
//           <input
//             type="date"
//             name="pickup_date"
//             required
//             min={today}
//             className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none transition"
//           />
//         </div>

//         {/* Pickup Time */}
//         <div>
//           <label className="block text-yellow-400 text-sm font-medium mb-2">
//             <FaClock className="inline mr-2 text-yellow-400" />
//             Pickup Time
//           </label>
//           <input
//             type="time"
//             name="pickup_time"
//             required
//             className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none transition"
//           />
//         </div>

//         {/* Drop Off Date */}
//         <div>
//           <label className="block text-yellow-400 text-sm font-medium mb-2">
//             <FaCalendarAlt className="inline mr-2 text-yellow-400" />
//             Drop Off Date
//           </label>
//           <input
//             type="date"
//             name="return_date"
//             required
//             min={today}
//             className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none transition"
//           />
//         </div>

//         {/* Drop Off Time */}
//         <div>
//           <label className="block text-yellow-400 text-sm font-medium mb-2">
//             <FaClock className="inline mr-2 text-yellow-400" />
//             Drop Off Time
//           </label>
//           <input
//             type="time"
//             name="return_time"
//             required
//             className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none transition"
//           />
//         </div>
//       </div>

//       <div className="text-center mt-6">
//         <button
//           type="submit"
//           className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-yellow-400/20 text-base"
//         >
//           Search
//         </button>
//       </div>
//     </form>
//   );
// }

// export default function HomePage() {
//   return (
//     <main className="overflow-hidden bg-dark-bg text-white">
//       <div className="pt-16 sm:pt-20">
//         <HeroSection />
//       </div>

//       {/* SECTION RECHERCHE - IDENTIQUE À L'IMAGE 1 */}
//       <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-900 to-black">
//         <div className="container mx-auto px-4">
//           <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
//             <span className="text-yellow-400 font-semibold text-xs sm:text-sm uppercase tracking-wider">Rent a Car Seychelles</span>
//             <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2 sm:mt-4 mb-3 sm:mb-4">
//               Book Now
//             </h2>
//             <p className="text-sm sm:text-base md:text-lg text-gray-300 px-2">
//               Your preferred Car Rental in Seychelles
//             </p>
//           </div>
          
//           <SearchForm />
//         </div>
//       </section>

//       {/* Section avantages */}
//       <section className="py-12 sm:py-16 md:py-20 bg-black">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
//             {[
//               { icon: <FaShieldAlt className="w-8 h-8 text-yellow-400" />, title: 'Safety Guaranteed', text: 'All vehicles are regularly maintained and fully insured.' },
//               { icon: <FaMoneyBillWave className="w-8 h-8 text-yellow-400" />, title: 'Best Price Guarantee', text: 'We offer the most competitive rates in Seychelles.' },
//               { icon: <FaTruck className="w-8 h-8 text-yellow-400" />, title: 'Free Delivery', text: 'Free delivery to your hotel or airport.' },
//               { icon: <FaHeadset className="w-8 h-8 text-yellow-400" />, title: '24/7 Support', text: 'Our team is available around the clock.' }
//             ].map((avantage, index) => (
//               <div key={index} className="group relative bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-800">
//                 <div className="relative">
//                   <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-yellow-400/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
//                     {avantage.icon}
//                   </div>
//                   <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 text-white group-hover:text-yellow-400 transition-colors">{avantage.title}</h3>
//                   <p className="text-xs sm:text-sm md:text-base text-gray-400 leading-relaxed">{avantage.text}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }


























// Homepage - Professional Version with Search Form
import { getFeaturedVehicles } from '@/lib/actions.js';
import VehicleCardSimple from '@/components/VehicleCardSimple.jsx';
import HeroSection from '@/components/HeroSection.jsx';
import { Suspense } from 'react';
import { FaShieldAlt, FaMoneyBillWave, FaTruck, FaHeadset, FaStar, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaUmbrellaBeach, FaFish, FaHiking } from 'react-icons/fa';

// Featured vehicles section
async function FeaturedVehicles() {
  const vehicles = await getFeaturedVehicles();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-0">
      {vehicles.map((vehicle, index) => (
        <VehicleCardSimple key={vehicle.id} vehicle={vehicle} index={index} />
      ))}
    </div>
  );
}

// Search Form
function SearchForm() {
  const today = new Date().toISOString().split('T')[0];
  
  return (
    <form action="/booking/cars" method="GET" className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-yellow-400/20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* Pickup Location */}
        <div>
          <label className="block text-yellow-400 text-sm font-medium mb-2">
            <FaMapMarkerAlt className="inline mr-2 text-yellow-400" />
            Pickup Location
          </label>
          <select
            name="pickup_location"
            required
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none transition"
          >
            <option value="">Select pickup location</option>
            <option value="Seychelles International Airport (SEZ)">Seychelles International Airport (SEZ)</option>
            <option value="Eden Island Marina">Eden Island Marina</option>
            <option value="Victoria Port">Victoria Port</option>
            <option value="Beau Vallon Beach">Beau Vallon Beach</option>
            <option value="Anse Royale">Anse Royale</option>
          </select>
        </div>

        {/* Drop Off Location */}
        <div>
          <label className="block text-yellow-400 text-sm font-medium mb-2">
            <FaMapMarkerAlt className="inline mr-2 text-yellow-400" />
            Drop Off Location
          </label>
          <select
            name="dropoff_location"
            required
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none transition"
          >
            <option value="">Select drop off location</option>
            <option value="Seychelles International Airport (SEZ)">Seychelles International Airport (SEZ)</option>
            <option value="Eden Island Marina">Eden Island Marina</option>
            <option value="Victoria Port">Victoria Port</option>
            <option value="Beau Vallon Beach">Beau Vallon Beach</option>
            <option value="Anse Royale">Anse Royale</option>
          </select>
        </div>

        {/* Pickup Date */}
        <div>
          <label className="block text-yellow-400 text-sm font-medium mb-2">
            <FaCalendarAlt className="inline mr-2 text-yellow-400" />
            Pickup Date
          </label>
          <input
            type="date"
            name="pickup_date"
            required
            min={today}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none transition"
          />
        </div>

        {/* Pickup Time */}
        <div>
          <label className="block text-yellow-400 text-sm font-medium mb-2">
            <FaClock className="inline mr-2 text-yellow-400" />
            Pickup Time
          </label>
          <input
            type="time"
            name="pickup_time"
            required
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none transition"
          />
        </div>

        {/* Drop Off Date */}
        <div>
          <label className="block text-yellow-400 text-sm font-medium mb-2">
            <FaCalendarAlt className="inline mr-2 text-yellow-400" />
            Drop Off Date
          </label>
          <input
            type="date"
            name="return_date"
            required
            min={today}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none transition"
          />
        </div>

        {/* Drop Off Time */}
        <div>
          <label className="block text-yellow-400 text-sm font-medium mb-2">
            <FaClock className="inline mr-2 text-yellow-400" />
            Drop Off Time
          </label>
          <input
            type="time"
            name="return_time"
            required
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none transition"
          />
        </div>
      </div>

      <div className="text-center mt-6">
        <button
          type="submit"
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-yellow-400/20 text-base"
        >
          Search Available Cars
        </button>
      </div>
    </form>
  );
}

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-dark-bg text-white">
      <div className="pt-16 sm:pt-20">
        <HeroSection />
      </div>

      {/* SEARCH SECTION */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <span className="text-yellow-400 font-semibold text-xs sm:text-sm uppercase tracking-wider">Valmont Car Rent Seychelles</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2 sm:mt-4 mb-3 sm:mb-4">
              Book Your Dream Car
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 px-2">
              Explore Mahé, Praslin, and La Digue with our premium car rental service
            </p>
          </div>
          
          <SearchForm />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <span className="text-yellow-400 font-semibold text-xs sm:text-sm uppercase tracking-wider">Why Choose Us</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2 sm:mt-4 mb-3 sm:mb-4">
              Experience Seychelles Stress-Free
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 px-2">
              Discover why travelers trust Valmont Car Rent for their Seychelles adventure
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              { icon: <FaShieldAlt className="w-8 h-8 text-yellow-400" />, title: 'Safety Guaranteed', text: 'All vehicles are regularly maintained, fully insured, and road-tested for your safety.' },
              { icon: <FaMoneyBillWave className="w-8 h-8 text-yellow-400" />, title: 'Best Price Guarantee', text: 'We offer the most competitive rental rates in Seychelles with no hidden fees.' },
              { icon: <FaTruck className="w-8 h-8 text-yellow-400" />, title: 'Free Island Delivery', text: 'Free delivery to your hotel, villa, or anywhere on Mahé island.' },
              { icon: <FaHeadset className="w-8 h-8 text-yellow-400" />, title: '24/7 Roadside Support', text: 'Our team is available 24/7 to assist you anywhere in Seychelles.' }
            ].map((avantage, index) => (
              <div key={index} className="group relative bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-800">
                <div className="relative">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-yellow-400/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                    {avantage.icon}
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 text-white group-hover:text-yellow-400 transition-colors">{avantage.title}</h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-400 leading-relaxed">{avantage.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seychelles Experience Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <span className="text-yellow-400 font-semibold text-xs sm:text-sm uppercase tracking-wider">Explore Paradise</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2 sm:mt-4 mb-3 sm:mb-4">
              Discover Seychelles With Us
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 px-2">
              From pristine beaches to tropical forests, explore every corner of Seychelles
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-xl bg-gray-800/50">
              <FaUmbrellaBeach className="text-yellow-400 w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Beach Hopping</h3>
              <p className="text-gray-400">Visit Anse Source d'Argent, Anse Lazio, and Beau Vallon</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-800/50">
              <FaFish className="text-yellow-400 w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Marine Adventures</h3>
              <p className="text-gray-400">Explore Sainte Anne Marine Park & Aldabra Atoll</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-800/50">
              <FaHiking className="text-yellow-400 w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Jungle Trails</h3>
              <p className="text-gray-400">Hike Morne Seychellois, Copolia, and Trois Frères</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}