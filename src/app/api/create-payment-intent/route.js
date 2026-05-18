import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { totalPrice, vehicleName, customerEmail, customerName, pickupDate, returnDate } = body;
    
    // Créer la session Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/booking/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/booking/payment?canceled=true`,
      customer_email: customerEmail,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Location ${vehicleName}`,
              description: `Du ${pickupDate} au ${returnDate}`,
            },
            unit_amount: Math.round(totalPrice * 100), // Stripe utilise les cents
          },
          quantity: 1,
        },
      ],
      metadata: {
        customer_name: customerName,
        vehicle_name: vehicleName,
        pickup_date: pickupDate,
        return_date: returnDate,
        total_price: totalPrice,
      },
    });
    
    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Erreur Stripe:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}