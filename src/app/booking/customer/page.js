// src/app/booking/customer/page.js
import Link from 'next/link';
import Image from 'next/image';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaIdCard, FaPlane, FaHotel } from 'react-icons/fa';

export default async function CustomerPage({ searchParams }) {
  const params = await searchParams;
  
  const vehicleId = params?.vehicle_id;
  const vehicleMarque = params?.vehicle_marque;
  const vehicleModele = params?.vehicle_modele;
  const vehiclePrix = params?.vehicle_prix;
  const numberOfDays = params?.number_of_days;
  const totalPrice = params?.total_price;
  
  const pickupLocation = params?.pickup_location;
  const dropoffLocation = params?.dropoff_location;
  const pickupDate = params?.pickup_date;
  const pickupTime = params?.pickup_time;
  const returnDate = params?.return_date;
  const returnTime = params?.return_time;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white pt-16 sm:pt-20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        
        {/* Barre de progression */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1 text-center">
            <div className="w-8 h-8 bg-yellow-400 text-gray-900 rounded-full flex items-center justify-center mx-auto mb-2">1</div>
            <span className="text-xs text-yellow-400">Dates</span>
          </div>
          <div className="flex-1 text-center">
            <div className="w-8 h-8 bg-yellow-400 text-gray-900 rounded-full flex items-center justify-center mx-auto mb-2">2</div>
            <span className="text-xs text-yellow-400">Véhicule</span>
          </div>
          <div className="flex-1 text-center">
            <div className="w-8 h-8 bg-yellow-400/20 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-2">3</div>
            <span className="text-xs text-gray-500">Informations</span>
          </div>
          <div className="flex-1 text-center">
            <div className="w-8 h-8 bg-gray-700 text-gray-500 rounded-full flex items-center justify-center mx-auto mb-2">4</div>
            <span className="text-xs text-gray-500">Paiement</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Formulaire client */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 border border-yellow-400/20 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Vos informations</h2>
              
              <form action="/booking/payment" method="GET" className="space-y-4">
                {/* Passer les paramètres de réservation */}
                <input type="hidden" name="vehicle_id" value={vehicleId} />
                <input type="hidden" name="vehicle_marque" value={vehicleMarque} />
                <input type="hidden" name="vehicle_modele" value={vehicleModele} />
                <input type="hidden" name="number_of_days" value={numberOfDays} />
                <input type="hidden" name="total_price" value={totalPrice} />
                <input type="hidden" name="pickup_location" value={pickupLocation} />
                <input type="hidden" name="dropoff_location" value={dropoffLocation} />
                <input type="hidden" name="pickup_date" value={pickupDate} />
                <input type="hidden" name="pickup_time" value={pickupTime} />
                <input type="hidden" name="return_date" value={returnDate} />
                <input type="hidden" name="return_time" value={returnTime} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-yellow-400 text-sm mb-2">
                      <FaUser className="inline mr-2" /> Nom *
                    </label>
                    <input type="text" name="last_name" required className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white" />
                  </div>
                  <div>
                    <label className="block text-yellow-400 text-sm mb-2">
                      <FaUser className="inline mr-2" /> Prénom *
                    </label>
                    <input type="text" name="first_name" required className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-yellow-400 text-sm mb-2">
                      <FaEnvelope className="inline mr-2" /> Email *
                    </label>
                    <input type="email" name="email" required className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white" />
                  </div>
                  <div>
                    <label className="block text-yellow-400 text-sm mb-2">
                      <FaPhone className="inline mr-2" /> Téléphone *
                    </label>
                    <input type="tel" name="phone" required className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-yellow-400 text-sm mb-2">
                    <FaMapMarkerAlt className="inline mr-2" /> Adresse
                  </label>
                  <input type="text" name="address" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-yellow-400 text-sm mb-2">Ville</label>
                    <input type="text" name="city" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white" />
                  </div>
                  <div>
                    <label className="block text-yellow-400 text-sm mb-2">Code postal</label>
                    <input type="text" name="zipcode" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-yellow-400 text-sm mb-2">
                      <FaCalendarAlt className="inline mr-2" /> Date de naissance
                    </label>
                    <input type="date" name="birth_date" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white" />
                  </div>
                  <div>
                    <label className="block text-yellow-400 text-sm mb-2">
                      <FaIdCard className="inline mr-2" /> Numéro de permis
                    </label>
                    <input type="text" name="license_number" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-yellow-400 text-sm mb-2">
                      <FaPlane className="inline mr-2" /> Numéro de vol
                    </label>
                    <input type="text" name="flight_number" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white" />
                  </div>
                  <div>
                    <label className="block text-yellow-400 text-sm mb-2">
                      <FaHotel className="inline mr-2" /> Nom de l'hôtel
                    </label>
                    <input type="text" name="hotel_name" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white" />
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded-lg transition mt-4"
                >
                  Continuer vers le paiement
                </button>
              </form>
            </div>
          </div>
          
          {/* Récapitulatif de la commande */}
          <div>
            <div className="bg-gray-800/50 border border-yellow-400/20 rounded-xl p-6 sticky top-24">
              <h3 className="text-lg font-bold text-white mb-4">Récapitulatif</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Véhicule</span>
                  <span className="text-white font-medium">{vehicleMarque} {vehicleModele}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Durée</span>
                  <span className="text-white">{numberOfDays} jour(s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Prise en charge</span>
                  <span className="text-white text-right">{pickupDate} à {pickupTime}<br/>{pickupLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Retour</span>
                  <span className="text-white text-right">{returnDate} à {returnTime}<br/>{dropoffLocation}</span>
                </div>
                <div className="border-t border-gray-700 pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Prix par jour</span>
                    <span className="text-white">{vehiclePrix}$</span>
                  </div>
                  <div className="flex justify-between font-bold mt-2">
                    <span className="text-yellow-400">Total</span>
                    <span className="text-yellow-400 text-xl">{totalPrice}$</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}