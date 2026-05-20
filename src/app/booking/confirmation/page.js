'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaCheckCircle, FaCar, FaEnvelope } from 'react-icons/fa';

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get('session_id');
  const reservationId = searchParams?.get('reservation_id');
  const [status, setStatus] = useState('loading');
  
  useEffect(() => {
    if (sessionId && status === 'loading') {
      fetch('/api/confirm-reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, reservationId }),
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      })
      .catch(err => {
        console.error('Error:', err);
        setStatus('error');
      });
    }
  }, [sessionId, reservationId, status]);
  
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p>Confirming your payment...</p>
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
            Payment Confirmed! 
          </h1>
          
          <p className="text-gray-300 mb-6">
            Your booking has been confirmed. A confirmation email has been sent to you.
          </p>
          
          <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center gap-2 text-yellow-400 mb-2">
              <FaCar />
              <span className="font-medium">Reservation Number</span>
            </div>
            <p className="text-white font-mono text-lg">{reservationId?.slice(-8) || 'N/A'}</p>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-gray-400 mb-8">
            <FaEnvelope />
            <span>A summary email has been sent to you</span>
          </div>
          
          <Link href="/" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-lg inline-block transition">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}