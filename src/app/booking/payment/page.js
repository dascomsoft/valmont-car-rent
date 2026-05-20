


'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaCreditCard, FaShieldAlt, FaLock } from 'react-icons/fa';

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Récupération des paramètres
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
  const firstName = searchParams.get('first_name');
  const lastName = searchParams.get('last_name');
  const email = searchParams.get('email');
  const phone = searchParams.get('phone');
  const address = searchParams.get('address');
  const city = searchParams.get('city');
  const country = searchParams.get('country');
  const birthDate = searchParams.get('birth_date');
  const licenseNumber = searchParams.get('license_number');
  const flightNumber = searchParams.get('flight_number');
  const hotelName = searchParams.get('hotel_name');
  
  const vehicleName = `${vehicleMarque} ${vehicleModele}`;
  const customerFullName = `${firstName} ${lastName}`;
  
  const handlePayment = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Vérification des données requises
      if (!totalPrice || !vehicleName || !email) {
        throw new Error('Informations de paiement incomplètes');
      }
      
      // Envoyer uniquement les données nécessaires à Stripe
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          totalPrice: parseFloat(totalPrice),
          vehicleName: vehicleName,
          customerEmail: email,
          pickupDate: pickupDate,
          returnDate: returnDate,
          // Les données supplémentaires seront stockées dans le webhook
          reservationData: {
            vehicleId: vehicleId,
            firstName: firstName,
            lastName: lastName,
            customerName: customerFullName,
            email: email,
            phone: phone,
            pickupLocation: pickupLocation,
            dropoffLocation: dropoffLocation,
            pickupDate: pickupDate,
            pickupTime: pickupTime,
            returnDate: returnDate,
            returnTime: returnTime,
            totalPrice: totalPrice,
            numberOfDays: numberOfDays,
            address: address,
            city: city,
            country: country,
            birthDate: birthDate,
            licenseNumber: licenseNumber,
            flightNumber: flightNumber,
            hotelName: hotelName,
          }
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Erreur de paiement');
      }
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('URL de paiement non reçue');
      }
      
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message || 'Erreur de connexion au serveur de paiement');
    } finally {
      setLoading(false);
    }
  };
  
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
            <span className="text-xs text-yellow-400">Vehicle</span>
          </div>
          <div className="flex-1 text-center">
            <div className="w-8 h-8 bg-yellow-400 text-gray-900 rounded-full flex items-center justify-center mx-auto mb-2">3</div>
            <span className="text-xs text-yellow-400">Information</span>
          </div>
          <div className="flex-1 text-center">
            <div className="w-8 h-8 bg-yellow-400 text-gray-900 rounded-full flex items-center justify-center mx-auto mb-2">4</div>
            <span className="text-xs text-yellow-400">Payment</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Formulaire de paiement */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 border border-yellow-400/20 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Secure Payment</h2>
              
              {error && (
                <div className="bg-red-500/20 border border-red-500/30 text-red-400 p-3 rounded-lg mb-4">
                  ❌ {error}
                </div>
              )}
              
              <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <FaCreditCard className="text-yellow-400" />
                  <span className="text-white font-medium">Credit Card</span>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Secure payment by Stripe. Accepts Mastercard, Visa, American Express.
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
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-900"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <FaLock className="text-gray-900" />
                    Pay {totalPrice}$ with Stripe
                  </>
                )}
              </button>
              
              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
                <FaShieldAlt />
                <span>100% secure payment</span>
              </div>
            </div>
          </div>
          
          {/* Récapitulatif */}
          <div>
            <div className="bg-gray-800/50 border border-yellow-400/20 rounded-xl p-6 sticky top-24">
              <h3 className="text-lg font-bold text-white mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Vehicle</span>
                  <span className="text-white font-medium">{vehicleName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Duration</span>
                  <span className="text-white">{numberOfDays} day(s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Pickup</span>
                  <span className="text-white text-right">{pickupDate} at {pickupTime}<br/>{pickupLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Return</span>
                  <span className="text-white text-right">{returnDate} at {returnTime}<br/>{dropoffLocation}</span>
                </div>
                <div className="border-t border-gray-700 pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Price per day</span>
                    <span className="text-white">{Math.round(parseFloat(totalPrice) / parseInt(numberOfDays))}$</span>
                  </div>
                  <div className="flex justify-between font-bold mt-2">
                    <span className="text-yellow-400">Total</span>
                    <span className="text-yellow-400 text-xl">{totalPrice}$</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t border-gray-700">
                <p className="text-xs text-gray-500">
                  Customer: {firstName} {lastName}<br/>
                  Email: {email}<br/>
                  Phone: {phone}
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}