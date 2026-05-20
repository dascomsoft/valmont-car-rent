'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    // Ici vous pouvez intégrer un service d'envoi d'email (Brevo, EmailJS, etc.)
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(''), 3000);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-20">
      {/* Hero */}
      <div className="relative h-64 flex items-center justify-center overflow-hidden">
        <Image src="/images/seychelles-beach.jpg" alt="Contact Valmont Car Rent" fill className="object-cover opacity-30" priority />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Contact <span className="text-yellow-400">Us</span></h1>
          <p className="text-gray-300">We're here to help you explore Seychelles</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-yellow-400/20">
              <h2 className="text-xl font-bold mb-4 text-yellow-400">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3"><FaMapMarkerAlt className="text-yellow-400 mt-1" /><div><p className="font-semibold">Location</p><p className="text-gray-300">Mahé, Seychelles</p></div></div>
                <div className="flex items-start gap-3"><FaPhone className="text-yellow-400 mt-1" /><div><p className="font-semibold">Phone / WhatsApp</p><a href="https://wa.me/2481234567" className="text-gray-300 hover:text-yellow-400">+248 123 4567</a></div></div>
                <div className="flex items-start gap-3"><FaEnvelope className="text-yellow-400 mt-1" /><div><p className="font-semibold">Email</p><a href="mailto:contact@valmontcarrent.com" className="text-gray-300 hover:text-yellow-400">contact@valmontcarrent.com</a></div></div>
                <div className="flex items-start gap-3"><FaClock className="text-yellow-400 mt-1" /><div><p className="font-semibold">Opening Hours</p><p className="text-gray-300">Monday - Saturday: 7:00 - 20:00<br />Sunday: By appointment</p></div></div>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 border border-yellow-400/20">
              <h2 className="text-xl font-bold mb-4 text-yellow-400">Follow Us</h2>
              <div className="flex gap-4">
                <a href="#" className="p-3 bg-gray-700 rounded-full hover:bg-yellow-400 hover:text-gray-900 transition"><FaFacebook className="w-5 h-5" /></a>
                <a href="#" className="p-3 bg-gray-700 rounded-full hover:bg-yellow-400 hover:text-gray-900 transition"><FaInstagram className="w-5 h-5" /></a>
                <a href="#" className="p-3 bg-gray-700 rounded-full hover:bg-yellow-400 hover:text-gray-900 transition"><FaTwitter className="w-5 h-5" /></a>
                <a href="https://wa.me/2481234567" className="p-3 bg-gray-700 rounded-full hover:bg-green-600 transition"><FaWhatsapp className="w-5 h-5" /></a>
              </div>
            </div>

            <a href="https://wa.me/2481234567" target="_blank" className="block bg-green-600 hover:bg-green-700 text-white text-center py-4 rounded-xl font-semibold transition flex items-center justify-center gap-2"><FaWhatsapp className="w-5 h-5" /> Chat on WhatsApp</a>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-yellow-400/20">
              <h2 className="text-xl font-bold mb-4 text-yellow-400">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div><label className="block text-sm mb-1">Full Name *</label><input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-yellow-400 outline-none" /></div>
                <div><label className="block text-sm mb-1">Email *</label><input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-yellow-400 outline-none" /></div>
                <div><label className="block text-sm mb-1">Message *</label><textarea rows={5} required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-yellow-400 outline-none"></textarea></div>
                <button type="submit" disabled={status === 'sending'} className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded-lg transition disabled:opacity-50">{status === 'sending' ? 'Sending...' : 'Send Message'}</button>
                {status === 'success' && <p className="text-green-400 text-center">✅ Message sent! We'll get back to you soon.</p>}
              </form>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-12 bg-gray-800/50 rounded-xl p-6 border border-yellow-400/20">
          <h2 className="text-xl font-bold mb-4 text-yellow-400 text-center">Find Us in Seychelles</h2>
          <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400">📍 Map of Seychelles - Main office in Mahé</div>
        </div>
      </div>
    </main>
  );
}