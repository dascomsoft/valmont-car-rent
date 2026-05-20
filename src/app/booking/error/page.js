import Link from 'next/link';
import { FaExclamationTriangle, FaArrowLeft, FaWhatsapp } from 'react-icons/fa';

export default async function BookingErrorPage({ searchParams }) {
  // IMPORTANT: await searchParams dans Next.js 15
  const params = await searchParams;
  const message = params?.message || 'An unexpected error occurred. Please try again.';
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white pt-16 sm:pt-20">
      <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
        <div className="bg-gray-800/50 border border-red-400/20 rounded-xl p-8">
          
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center">
              <FaExclamationTriangle className="text-red-500 text-4xl" />
            </div>
          </div>
          
          {/* Title */}
          <h1 className="text-3xl font-bold text-white mb-4">
            Booking Error
          </h1>
          
          {/* Message */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
            <p className="text-red-400">{decodeURIComponent(message)}</p>
          </div>
          
          {/* Help Text */}
          <p className="text-gray-300 mb-8">
            Please try again or contact our support team for assistance.
          </p>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-lg transition flex items-center justify-center gap-2"
            >
              <FaArrowLeft />
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
          
          {/* Retry Link */}
          <div className="mt-6">
            <Link
              href="/"
              className="text-gray-400 hover:text-yellow-400 text-sm transition"
            >
              ← Go back and try again
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}