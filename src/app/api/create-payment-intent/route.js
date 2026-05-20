


import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { totalPrice, vehicleName, customerEmail, customerName, pickupDate, returnDate, reservationData } = body;
    
    console.log('📦 Données reçues pour Stripe:', { 
      totalPrice, vehicleName, customerEmail, customerName, pickupDate, returnDate,
      hasReservationData: !!reservationData 
    });
    
    const amount = Math.round(parseFloat(totalPrice) * 100);
    
    // Création de la session avec TOUTES les métadonnées
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: vehicleName },
          unit_amount: amount,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/booking/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/booking/cars?canceled=true`,
      customer_email: customerEmail,
      metadata: {
        // Données de réservation complètes
        reservation_data: JSON.stringify({
          vehicleId: reservationData?.vehicleId,
          vehicleMarque: reservationData?.vehicleMarque,
          vehicleModele: reservationData?.vehicleModele,
          vehiclePrix: reservationData?.vehiclePrix,
          firstName: reservationData?.firstName,
          lastName: reservationData?.lastName,
          email: reservationData?.email,
          phone: reservationData?.phone,
          pickupLocation: reservationData?.pickupLocation,
          dropoffLocation: reservationData?.dropoffLocation,
          pickupDate: reservationData?.pickupDate,
          pickupTime: reservationData?.pickupTime,
          returnDate: reservationData?.returnDate,
          returnTime: reservationData?.returnTime,
          totalPrice: reservationData?.totalPrice,
          numberOfDays: reservationData?.numberOfDays,
          flightNumber: reservationData?.flightNumber,
          hotelName: reservationData?.hotelName,
          address: reservationData?.address,
          city: reservationData?.city,
        }),
        // Données directes pour backup
        vehicle_id: reservationData?.vehicleId || '',
        vehicle_marque: reservationData?.vehicleMarque || '',
        vehicle_modele: reservationData?.vehicleModele || '',
        customer_name: customerName,
        customer_email: customerEmail,
        pickup_date: pickupDate,
        return_date: returnDate,
        total_price: totalPrice.toString(),
        number_of_days: reservationData?.numberOfDays || '1',
        pickup_location: reservationData?.pickupLocation || '',
        dropoff_location: reservationData?.dropoffLocation || '',
        phone: reservationData?.phone || '',
        flight_number: reservationData?.flightNumber || '',
        hotel_name: reservationData?.hotelName || '',
        address: reservationData?.address || '',
        city: reservationData?.city || '',
      },
    });
    
    console.log('✅ Session Stripe créée');
    
    return NextResponse.json({ 
      success: true, 
      url: session.url,
      sessionId: session.id 
    });
    
  } catch (error) {
    console.error('❌ Erreur Stripe:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}