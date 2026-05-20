import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { connectToDatabase } from '@/lib/mongodb';
import Reservation from '@/models/Reservation';
import Vehicle from '@/models/Vehicle';
import { sendBookingConfirmation } from '@/lib/email';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');
  
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }
  
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const reservationData = JSON.parse(session.metadata.reservationData);
    
    await connectToDatabase();
    
    const vehicle = await Vehicle.findById(reservationData.vehicleId);
    
    const reservation = new Reservation({
      vehicleId: reservationData.vehicleId,
      customer_name: `${reservationData.firstName} ${reservationData.lastName}`,
      customer_email: reservationData.email,
      customer_phone: reservationData.phone,
      pickup_location: reservationData.pickupLocation,
      dropoff_location: reservationData.dropoffLocation,
      pickup_date: reservationData.pickupDate,
      return_date: reservationData.returnDate,
      total_price: reservationData.totalPrice,
      status: 'confirmed',
      payment_status: 'paid',
      notes: `Flight: ${reservationData.flightNumber || 'N/A'}, Hotel: ${reservationData.hotelName || 'N/A'}`,
    });
    
    await reservation.save();
    
    await sendBookingConfirmation({
      customerEmail: reservationData.email,
      customerName: `${reservationData.firstName} ${reservationData.lastName}`,
      customerPhone: reservationData.phone,
      vehicle: { marque: vehicle.marque, modele: vehicle.modele, prix: vehicle.prix },
      pickupDate: reservationData.pickupDate,
      returnDate: reservationData.returnDate,
      totalPrice: reservationData.totalPrice,
      pickupLocation: reservationData.pickupLocation,
      dropoffLocation: reservationData.dropoffLocation,
    });
  }
  
  return NextResponse.json({ received: true });
}