'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaCheckCircle, FaCar, FaEnvelope } from 'react-icons/fa';

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState('loading');
  
  useEffect(() => {
    if (sessionId) {
      // Ici, vous pouvez vérifier le statut du paiement via votre webhook
      setStatus('success');
    } else {
      setStatus('error');
    }
  }, [sessionId]);
  
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p>Vérification du paiement...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white pt-16 sm:pt-20">
      <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
        
        <div className="bg-gray-800/50 border border-yellow-400/20 rounded-xl p-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
              <FaCheckCircle className="text-green-500 text-4xl" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-4">
            Paiement confirmé !
          </h1>
          
          <p className="text-gray-300 mb-6">
            Votre réservation a été confirmée. Un email de confirmation vous a été envoyé.
          </p>
          
          <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center gap-2 text-yellow-400 mb-2">
              <FaCar />
              <span className="font-medium">Numéro de commande</span>
            </div>
            <p className="text-white font-mono text-lg">{sessionId?.substring(0, 15)}...</p>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-gray-400 mb-8">
            <FaEnvelope />
            <span>Un email récapitulatif a été envoyé</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-lg transition"
            >
              Retour à l'accueil
            </Link>
            <a
              href="https://wa.me/243811077897"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 font-semibold px-6 py-3 rounded-lg transition"
            >
              Contacter le support
            </a>
          </div>
        </div>
        
      </div>
    </div>
  );
}