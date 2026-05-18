'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaCreditCard, FaShieldAlt, FaLock } from 'react-icons/fa';

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Récupérer les paramètres
  const vehicleId = searchParams.get('vehicle_id');
  const vehicleMarque = searchParams.get('vehicle_marque');
  const vehicleModele = searchParams.get('vehicle_modele');
  const numberOfDays = searchParams.get('number_of_days');
  const totalPrice = searchParams.get('total_price');
  const pickupLocation = searchParams.get('pickup_location');
  const dropoffLocation = searchParams.get('dropoff_location');
  const pickupDate = searchParams.get('pickup_date');
  const pickupTime = searchParams.get('pickup_time');
  const returnDate = searchParams.get('return_date');
  const returnTime = searchParams.get('return_time');
  
  // Infos client
  const firstName = searchParams.get('first_name');
  const lastName = searchParams.get('last_name');
  const email = searchParams.get('email');
  const phone = searchParams.get('phone');
  const address = searchParams.get('address');
  const city = searchParams.get('city');
  const zipcode = searchParams.get('zipcode');
  const birthDate = searchParams.get('birth_date');
  const licenseNumber = searchParams.get('license_number');
  const flightNumber = searchParams.get('flight_number');
  const hotelName = searchParams.get('hotel_name');
  
  const vehicleName = `${vehicleMarque} ${vehicleModele}`;
  
  const handlePayment = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          totalPrice: parseFloat(totalPrice),
          vehicleName,
          customerEmail: email,
          customerName: `${firstName} ${lastName}`,
          pickupDate,
          returnDate,
        }),
      });
      
      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError('Erreur lors de la création du paiement');
      }
    } catch (err) {
      setError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };
  
  // Barre de progression
  const steps = [
    { number: 1, name: 'Dates', active: true },
    { number: 2, name: 'Véhicule', active: true },
    { number: 3, name: 'Informations', active: true },
    { number: 4, name: 'Paiement', active: true },
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white pt-16 sm:pt-20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        
        {/* Barre de progression */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, idx) => (
            <div key={idx} className="flex-1 text-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 ${
                step.active 
                  ? 'bg-yellow-400 text-gray-900' 
                  : 'bg-gray-700 text-gray-500'
              }`}>
                {step.number}
              </div>
              <span className={`text-xs ${step.active ? 'text-yellow-400' : 'text-gray-500'}`}>
                {step.name}
              </span>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Formulaire de paiement */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 border border-yellow-400/20 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Paiement sécurisé</h2>
              
              {error && (
                <div className="bg-red-500/20 border border-red-500/30 text-red-400 p-3 rounded-lg mb-4">
                  {error}
                </div>
              )}
              
              <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <FaCreditCard className="text-yellow-400" />
                  <span className="text-white font-medium">Carte bancaire</span>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Paiement sécurisé par Stripe. Accepte Mastercard, Visa, American Express.
                </p>
                <div className="flex gap-2">
                  <div className="w-10 h-6 bg-blue-600 rounded"></div>
                  <div className="w-10 h-6 bg-red-600 rounded"></div>
                  <div className="w-10 h-6 bg-blue-400 rounded"></div>
                </div>
              </div>
              
              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-400/50 text-gray-900 font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
              >
                {loading ? (
                  'Chargement...'
                ) : (
                  <>
                    <FaLock className="text-gray-900" />
                    Payer {totalPrice}$ avec Stripe
                  </>
                )}
              </button>
              
              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
                <FaShieldAlt />
                <span>Paiement 100% sécurisé</span>
              </div>
            </div>
          </div>
          
          {/* Récapitulatif */}
          <div>
            <div className="bg-gray-800/50 border border-yellow-400/20 rounded-xl p-6 sticky top-24">
              <h3 className="text-lg font-bold text-white mb-4">Récapitulatif</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Véhicule</span>
                  <span className="text-white font-medium">{vehicleName}</span>
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
                    <span className="text-white">{Math.round(totalPrice / numberOfDays)}$</span>
                  </div>
                  <div className="flex justify-between font-bold mt-2">
                    <span className="text-yellow-400">Total</span>
                    <span className="text-yellow-400 text-xl">{totalPrice}$</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t border-gray-700">
                <p className="text-xs text-gray-500">
                  Client: {firstName} {lastName}<br/>
                  Email: {email}<br/>
                  Tél: {phone}
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}