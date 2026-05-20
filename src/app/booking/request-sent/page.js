import Link from 'next/link';
import { FaCheckCircle, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

export default async function RequestSentPage({ searchParams }) {
  // IMPORTANT: await searchParams dans Next.js 15
  const params = await searchParams;
  const reservationId = params?.reservation_id;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white pt-16 sm:pt-20">
      <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
        <div className="bg-gray-800/50 border border-yellow-400/20 rounded-xl p-8">
          
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-yellow-400/20 rounded-full flex items-center justify-center">
              <FaCheckCircle className="text-yellow-400 text-4xl" />
            </div>
          </div>
          
          {/* Title */}
          <h1 className="text-3xl font-bold text-white mb-4">
            Request Submitted! 
          </h1>
          
          {/* Message */}
          <p className="text-gray-300 mb-6">
            Your booking request has been received. Our team will review your request and get back to you within 24 hours.
          </p>
          
          {/* Reservation ID */}
          {reservationId && (
            <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
              <p className="text-gray-400 text-sm">Reservation Reference</p>
              <p className="text-yellow-400 font-mono text-lg">{reservationId.slice(-8)}</p>
            </div>
          )}
          
          {/* Email notification */}
          <div className="flex items-center justify-center gap-2 text-gray-400 mb-8">
            <FaEnvelope />
            <span>Check your email for confirmation</span>
          </div>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-lg transition"
            >
              Return Home
            </Link>
            <a
              href="https://wa.me/2481234567"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 font-semibold px-6 py-3 rounded-lg transition flex items-center justify-center gap-2"
            >
              <FaWhatsapp />
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}