


// src/app/fleet/page.js - PAGE DES RÉSULTATS APRÈS RECHERCHE
import { getVehicles } from '@/lib/actions.js';
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaCar, FaMoneyBillWave } from 'react-icons/fa';

// Composant de chargement
function ResultsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-gray-800/80 rounded-xl h-[400px] animate-pulse border border-gray-700"></div>
      ))}
    </div>
  );
}

// Carte véhicule pour les résultats (sans boutons de réservation directs)
function VehicleResultCard({ vehicle, numberOfDays, totalPrice }) {
  const formattedPrice = vehicle.prix?.toLocaleString('fr-FR') || '0';
  
  return (
    <div className="bg-gray-800/90 border border-gray-700 rounded-xl overflow-hidden hover:border-yellow-400/40 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-400/10">
      <div className="relative h-48 w-full bg-gray-700">
        <Image
          src={vehicle.image_url || '/images/placeholder-car.jpg'}
          alt={`${vehicle.marque} ${vehicle.modele}`}
          fill
          className="object-cover"
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
        
        <form action="/booking/customer" method="GET" className="mt-4">
          <input type="hidden" name="vehicle_id" value={vehicle.id} />
          <input type="hidden" name="vehicle_marque" value={vehicle.marque} />
          <input type="hidden" name="vehicle_modele" value={vehicle.modele} />
          <input type="hidden" name="vehicle_prix" value={vehicle.prix} />
          <input type="hidden" name="number_of_days" value={numberOfDays} />
          <input type="hidden" name="total_price" value={totalPrice} />
          
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded-lg transition duration-300 flex items-center justify-center gap-2"
          >
            <FaCar className="text-gray-900" />
            Sélectionner ce véhicule
          </button>
        </form>
      </div>
    </div>
  );
}

// Composant principal des résultats
async function ResultsList({ searchParams }) {
  // Récupérer les paramètres de recherche
  const params = await searchParams;
  
  const pickupLocation = params?.pickup_location;
  const dropoffLocation = params?.dropoff_location;
  const pickupDate = params?.pickup_date;
  const pickupTime = params?.pickup_time;
  const returnDate = params?.return_date;
  const returnTime = params?.return_time;
  
  // Vérifier que tous les paramètres sont présents
  if (!pickupDate || !returnDate || !pickupTime || !returnTime) {
    return (
      <div className="text-center py-16">
        <div className="text-yellow-400 text-5xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-white mb-2">Paramètres de recherche manquants</h2>
        <p className="text-gray-400 mb-6">Veuillez retourner à la page d'accueil et remplir le formulaire de recherche.</p>
        <Link
          href="/"
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-lg transition"
        >
          Retour à l'accueil
        </Link>
      </div>
    );
  }
  
  // Récupérer tous les véhicules
  const allVehicles = await getVehicles();
  
  // Calculer le nombre de jours
  const start = new Date(pickupDate);
  const end = new Date(returnDate);
  const diffTime = Math.abs(end - start);
  const numberOfDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
  
  // TODO: Filtrer les véhicules disponibles selon les dates
  // Pour l'instant, on affiche tous les véhicules
  // À améliorer avec getVehiclesAvailability()
  const availableVehicles = allVehicles;
  
  if (availableVehicles.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-yellow-400 text-5xl mb-4">🚫</div>
        <h2 className="text-2xl font-bold text-white mb-2">Aucun véhicule disponible</h2>
        <p className="text-gray-400 mb-6">Aucun véhicule n'est disponible pour les dates sélectionnées.</p>
        <Link
          href="/"
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-lg transition"
        >
          Modifier ma recherche
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      {/* Récapitulatif de la recherche */}
      <div className="bg-gray-800/50 border border-yellow-400/20 rounded-xl p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-yellow-400 text-lg" />
            <div>
              <p className="text-xs text-gray-400">Prise en charge</p>
              <p className="text-white font-medium">{pickupLocation || 'Non spécifié'}</p>
              <p className="text-gray-400 text-sm">{pickupDate} à {pickupTime}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-yellow-400 text-lg" />
            <div>
              <p className="text-xs text-gray-400">Dépose</p>
              <p className="text-white font-medium">{dropoffLocation || 'Non spécifié'}</p>
              <p className="text-gray-400 text-sm">{returnDate} à {returnTime}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FaCalendarAlt className="text-yellow-400 text-lg" />
            <div>
              <p className="text-xs text-gray-400">Durée</p>
              <p className="text-white font-medium">{numberOfDays} jour(s)</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FaMoneyBillWave className="text-yellow-400 text-lg" />
            <div>
              <p className="text-xs text-gray-400">Prix estimé</p>
              <p className="text-white font-medium">À partir de {numberOfDays * 50}$</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Liste des véhicules disponibles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableVehicles.map((vehicle) => {
          const totalPrice = numberOfDays * vehicle.prix;
          return (
            <VehicleResultCard
              key={vehicle.id}
              vehicle={vehicle}
              numberOfDays={numberOfDays}
              totalPrice={totalPrice}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function FleetPage({ searchParams }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white pt-16 sm:pt-20">
      {/* Hero section simplifiée */}
      <div className="relative bg-gradient-to-r from-gray-900/90 via-black to-gray-900/90 overflow-hidden py-12">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image
            src="/images/carjordyno8.jpg"
            alt="Résultats de recherche"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-black/80 to-gray-900/90"></div>
        </div>
        
        <div className="relative z-20 container mx-auto px-4 text-center">
          <Link href="/" className="inline-flex items-center gap-1 text-yellow-400 hover:text-yellow-500 mb-4 transition">
            ← Modifier ma recherche
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
            Véhicules disponibles
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Sélectionnez le véhicule qui correspond à vos besoins
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<ResultsLoading />}>
          <ResultsList searchParams={searchParams} />
        </Suspense>
      </div>
      
      {/* Lien de modification de recherche en bas */}
      <div className="text-center py-8">
        <Link
          href="/"
          className="text-yellow-400 hover:text-yellow-500 transition inline-flex items-center gap-2"
        >
          ← Retour à l'accueil pour modifier ma recherche
        </Link>
      </div>
    </div>
  );
}