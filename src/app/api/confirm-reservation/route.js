// import { NextResponse } from 'next/server';
// import { connectToDatabase } from '@/lib/mongodb';
// import Reservation from '@/models/Reservation';
// import Vehicle from '@/models/Vehicle';
// import { sendBookingConfirmation } from '@/lib/email';
// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export async function POST(request) {
//   try {
//     const body = await request.json();
//     const { sessionId } = body;
    
//     console.log('📥 Réception requête confirmation:', { sessionId });
    
//     if (!sessionId) {
//       return NextResponse.json({ error: 'Session ID manquant' }, { status: 400 });
//     }
    
//     // Récupérer la session Stripe
//     const session = await stripe.checkout.sessions.retrieve(sessionId);
//     console.log('✅ Session Stripe:', { 
//       payment_status: session.payment_status,
//       metadata_keys: Object.keys(session.metadata || {})
//     });
    
//     if (session.payment_status !== 'paid') {
//       return NextResponse.json({ error: 'Paiement non effectué' }, { status: 400 });
//     }
    
//     // Récupérer les métadonnées
//     let reservationData = {};
//     if (session.metadata && session.metadata.reservation_data) {
//       try {
//         reservationData = JSON.parse(session.metadata.reservation_data);
//         console.log('📦 Données du parse JSON:', reservationData);
//       } catch (e) {
//         console.error('❌ Erreur parsing JSON:', e);
//       }
//     }
    
//     // AFFICHER TOUTES LES MÉTADONNÉES POUR DIAGNOSTIC
//     console.log('🔍 Métadonnées Stripe complètes:', JSON.stringify(session.metadata, null, 2));
    
//     // Récupérer les données depuis les métadonnées directes si pas dans reservation_data
//     const vehicleId = reservationData.vehicleId || session.metadata.vehicle_id;
//     const vehicleMarque = reservationData.vehicleMarque || session.metadata.vehicle_marque || 'Voiture';
//     const vehicleModele = reservationData.vehicleModele || session.metadata.vehicle_modele || '';
//     const totalPrice = parseFloat(reservationData.totalPrice || session.metadata.total_price || 0);
//     const pickupDate = reservationData.pickupDate || session.metadata.pickup_date;
//     const returnDate = reservationData.returnDate || session.metadata.return_date;
//     const customerEmail = reservationData.email || session.metadata.customer_email || session.customer_email;
//     const customerName = reservationData.customerName || session.metadata.customer_name || 'Client';
//     const firstName = reservationData.firstName || customerName.split(' ')[0] || 'Client';
//     const lastName = reservationData.lastName || customerName.split(' ')[1] || '';
    
//     // CRITIQUE: Récupérer les locations depuis les bons champs
//     let pickupLocation = reservationData.pickupLocation || session.metadata.pickup_location;
//     let dropoffLocation = reservationData.dropoffLocation || session.metadata.dropoff_location;
    
//     console.log('📍 Locations trouvées:', { pickupLocation, dropoffLocation });
    
//     // Si toujours vide, essayer de récupérer depuis d'autres champs possibles
//     if (!pickupLocation) pickupLocation = session.metadata.pickup_location || 'Aéroport';
//     if (!dropoffLocation) dropoffLocation = session.metadata.dropoff_location || 'Aéroport';
    
//     const phone = reservationData.phone || session.metadata.phone || '';
//     const numberOfDays = reservationData.numberOfDays || parseInt(session.metadata.number_of_days) || 1;
//     const flightNumber = reservationData.flightNumber || session.metadata.flight_number || '';
//     const hotelName = reservationData.hotelName || session.metadata.hotel_name || '';
//     const address = reservationData.address || session.metadata.address || '';
//     const city = reservationData.city || session.metadata.city || '';
    
//     await connectToDatabase();
    
//     // Vérifier si la réservation existe déjà
//     const existingReservation = await Reservation.findOne({ 
//       customer_email: customerEmail,
//       pickup_date: pickupDate,
//       vehicleId: vehicleId,
//     });
    
//     if (existingReservation) {
//       console.log('✅ Réservation déjà existante');
//       return NextResponse.json({ 
//         success: true, 
//         reservationId: existingReservation._id,
//         alreadyExists: true
//       });
//     }
    
//     // CRÉER LA RÉSERVATION AVEC VALEURS PAR DÉFAUT
//     const reservation = new Reservation({
//       vehicleId: vehicleId,
//       customer_name: customerName,
//       customer_email: customerEmail,
//       customer_phone: phone || 'Non spécifié',
//       pickup_location: pickupLocation || 'Aéroport international',
//       dropoff_location: dropoffLocation || 'Aéroport international',
//       pickup_date: pickupDate || new Date().toISOString().split('T')[0],
//       return_date: returnDate || new Date().toISOString().split('T')[0],
//       total_price: totalPrice,
//       status: 'confirmed',
//       payment_status: 'paid',
//       notes: `Flight: ${flightNumber || 'N/A'}, Hotel: ${hotelName || 'N/A'}, Address: ${address || 'N/A'}, City: ${city || 'N/A'}`,
//     });
    
//     await reservation.save();
//     console.log('✅ Réservation créée avec succès:', reservation._id);
    
//     // Envoyer l'email de confirmation
//     const emailResult = await sendBookingConfirmation({
//       customerEmail: customerEmail,
//       customerName: customerName,
//       customerPhone: phone || 'Non spécifié',
//       vehicle: { 
//         marque: vehicleMarque, 
//         modele: vehicleModele, 
//         prix: Math.round(totalPrice / numberOfDays) 
//       },
//       pickupDate: pickupDate,
//       returnDate: returnDate,
//       totalPrice: totalPrice,
//       pickupLocation: pickupLocation || 'Aéroport international',
//       dropoffLocation: dropoffLocation || 'Aéroport international',
//     });
    
//     console.log('📧 Email envoyé:', emailResult.success ? '✅ Succès' : '❌ Échec');
    
//     return NextResponse.json({ 
//       success: true, 
//       reservationId: reservation._id,
//       emailSent: emailResult.success
//     });
    
//   } catch (error) {
//     console.error('❌ Erreur détaillée:', error);
//     return NextResponse.json({ 
//       error: error.message,
//       details: error.errors ? Object.keys(error.errors).map(k => ({ field: k, message: error.errors[k].message })) : null
//     }, { status: 500 });
//   }
// }


















import { NextResponse } from 'next/server';
import { confirmPayment } from '@/lib/actions';

export async function POST(request) {
  try {
    const { sessionId, reservationId } = await request.json();
    
    if (!sessionId || !reservationId) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }
    
    const result = await confirmPayment(reservationId, sessionId);
    
    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: result.message }, { status: 500 });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}