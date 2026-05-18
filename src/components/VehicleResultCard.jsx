'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaCar } from 'react-icons/fa';

export default function VehicleResultCard({ vehicle, numberOfDays, totalPrice, searchParams }) {
  // Gérer l'image correctement
  const getImageSrc = () => {
    if (vehicle.image_data && vehicle.image_data.startsWith('data:image')) {
      return vehicle.image_data;
    }
    if (vehicle.image_url && vehicle.image_url.trim() !== '') {
      return vehicle.image_url;
    }
    return '/images/placeholder-car.jpg';
  };
  
  const imageSrc = getImageSrc();
  
  // Construire l'URL pour la page suivante
  const customerUrl = `/booking/customer?vehicle_id=${vehicle.id}&vehicle_marque=${encodeURIComponent(vehicle.marque)}&vehicle_modele=${encodeURIComponent(vehicle.modele)}&vehicle_prix=${vehicle.prix}&number_of_days=${numberOfDays}&total_price=${totalPrice}&pickup_location=${encodeURIComponent(searchParams.pickup_location)}&dropoff_location=${encodeURIComponent(searchParams.dropoff_location)}&pickup_date=${searchParams.pickup_date}&pickup_time=${searchParams.pickup_time}&return_date=${searchParams.return_date}&return_time=${searchParams.return_time}`;
  
  return (
    <div className="bg-gray-800/90 border border-gray-700 rounded-xl overflow-hidden hover:border-yellow-400/40 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-400/10">
      <div className="relative h-48 w-full bg-gray-700">
        <Image
          src={imageSrc}
          alt={`${vehicle.marque} ${vehicle.modele}`}
          fill
          className="object-cover"
          onError={(e) => {
            e.currentTarget.src = '/images/placeholder-car.jpg';
          }}
        />
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-white">
            {vehicle.marque} {vehicle.modele}
          </h3>
          <span className="bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded-full text-xs font-semibold">
            {vehicle.categorie || 'Classique'}
          </span>
        </div>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {vehicle.description || 'Véhicule confortable avec chauffeur professionnel inclus.'}
        </p>
        
        <div className="border-t border-gray-700 pt-3 mt-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400 text-sm">Prix total pour {numberOfDays} jour(s)</span>
            <span className="text-yellow-400 font-bold text-xl">{totalPrice}$</span>
          </div>
          <div className="text-xs text-gray-500">
            {vehicle.prix}$ / jour
          </div>
        </div>
        
        <Link
          href={customerUrl}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded-lg transition duration-300 flex items-center justify-center gap-2 mt-4"
        >
          <FaCar className="text-gray-900" />
          Sélectionner ce véhicule
        </Link>
      </div>
    </div>
  );
}