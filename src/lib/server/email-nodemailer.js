'use server';

import nodemailer from 'nodemailer';

// Configuration Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Vérifier la connexion
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Gmail non configuré:', error);
  } else {
    console.log('✅ Gmail prêt à envoyer des emails');
  }
});

// Email 1: Demande de réservation (client)
export async function sendBookingRequestEmail({
  customerEmail,
  customerName,
  vehicle,
  pickupDate,
  pickupTime,
  returnDate,
  returnTime,
  totalPrice,
  pickupLocation,
  dropoffLocation,
  reservationId,
}) {
  try {
    await transporter.sendMail({
      from: `"Valmont Car Rent Seychelles" <${process.env.GMAIL_USER}>`,
      to: customerEmail,
      subject: `📋 Booking Request Received - #${reservationId.slice(-8)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h1 style="color: #FDBB02;">Valmont Car Rent Seychelles</h1>
          <h2>Dear ${customerName},</h2>
          <p>We have received your booking request!</p>
          <p><strong>Vehicle:</strong> ${vehicle.marque} ${vehicle.modele}</p>
          <p><strong>Pickup:</strong> ${pickupDate} at ${pickupTime}</p>
          <p><strong>Return:</strong> ${returnDate} at ${returnTime}</p>
          <p><strong>Pickup Location:</strong> ${pickupLocation}</p>
          <p><strong>Dropoff Location:</strong> ${dropoffLocation}</p>
          <p><strong>Total:</strong> $${totalPrice}</p>
          <p>We will review your request within 24 hours.</p>
          <p>📞 WhatsApp: +248 1234567</p>
        </div>
      `,
    });
    console.log('✅ Email request envoyé à:', customerEmail);
    return { success: true };
  } catch (error) {
    console.error('❌ Erreur:', error);
    return { success: false };
  }
}

// Email 2: Notification admin
export async function sendAdminNotificationEmail({
  customerEmail,
  customerName,
  customerPhone,
  vehicle,
  pickupDate,
  pickupTime,
  returnDate,
  returnTime,
  totalPrice,
  pickupLocation,
  dropoffLocation,
  reservationId,
}) {
  try {
    await transporter.sendMail({
      from: `"Valmont Car Rent" <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || 'admin@valmont-car-rent.com',
      subject: `🔔 NEW BOOKING - #${reservationId.slice(-8)}`,
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Customer:</strong> ${customerName} (${customerEmail})</p>
        <p><strong>Phone:</strong> ${customerPhone}</p>
        <p><strong>Vehicle:</strong> ${vehicle.marque} ${vehicle.modele}</p>
        <p><strong>Pickup:</strong> ${pickupDate} at ${pickupTime}</p>
        <p><strong>Return:</strong> ${returnDate} at ${returnTime}</p>
        <p><strong>Pickup Location:</strong> ${pickupLocation}</p>
        <p><strong>Dropoff Location:</strong> ${dropoffLocation}</p>
        <p><strong>Total:</strong> $${totalPrice}</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/dashboard">View Dashboard</a>
      `,
    });
    console.log('✅ Notification admin envoyée');
    return { success: true };
  } catch (error) {
    console.error('❌ Erreur:', error);
    return { success: false };
  }
}

// Email 3: Lien de paiement
export async function sendPaymentLinkEmail({
  customerEmail,
  customerName,
  vehicle,
  pickupDate,
  pickupTime,
  returnDate,
  returnTime,
  totalPrice,
  paymentLink,
}) {
  try {
    await transporter.sendMail({
      from: `"Valmont Car Rent Seychelles" <${process.env.GMAIL_USER}>`,
      to: customerEmail,
      subject: `✅ Booking Validated - Complete Your Payment`,
      html: `
        <h2>Dear ${customerName},</h2>
        <p>Good news! Your booking has been validated.</p>
        <p><strong>Vehicle:</strong> ${vehicle.marque} ${vehicle.modele}</p>
        <p><strong>Pickup:</strong> ${pickupDate} at ${pickupTime}</p>
        <p><strong>Return:</strong> ${returnDate} at ${returnTime}</p>
        <p><strong>Total:</strong> $${totalPrice}</p>
        <div style="margin: 20px 0;">
          <a href="${paymentLink}" style="background: #FDBB02; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 8px;">💰 PAY NOW</a>
        </div>
        <p>⚠️ Your booking will be confirmed only after payment.</p>
      `,
    });
    console.log('✅ Email paiement envoyé à:', customerEmail);
    return { success: true };
  } catch (error) {
    console.error('❌ Erreur:', error);
    return { success: false };
  }
}

// Email 4: Confirmation finale
export async function sendFinalConfirmationEmail({
  customerEmail,
  customerName,
  vehicle,
  pickupDate,
  pickupTime,
  returnDate,
  returnTime,
  totalPrice,
  pickupLocation,
  dropoffLocation,
}) {
  try {
    await transporter.sendMail({
      from: `"Valmont Car Rent Seychelles" <${process.env.GMAIL_USER}>`,
      to: customerEmail,
      subject: `🎉 Booking Confirmed - Welcome to Seychelles!`,
      html: `
        <h2>Dear ${customerName},</h2>
        <p>🎉 Your booking is now <strong>CONFIRMED</strong>!</p>
        <p><strong>Vehicle:</strong> ${vehicle.marque} ${vehicle.modele}</p>
        <p><strong>Pickup:</strong> ${pickupDate} at ${pickupTime}</p>
        <p><strong>Return:</strong> ${returnDate} at ${returnTime}</p>
        <p><strong>Pickup Location:</strong> ${pickupLocation}</p>
        <p><strong>Dropoff Location:</strong> ${dropoffLocation}</p>
        <p><strong>Total Paid:</strong> $${totalPrice}</p>
        <p>🇸🇨 Enjoy your tropical getaway!</p>
      `,
    });
    console.log('✅ Email confirmation finale envoyé');
    return { success: true };
  } catch (error) {
    console.error('❌ Erreur:', error);
    return { success: false };
  }
}

// Email 5: Rejet
export async function sendRejectionEmail({
  customerEmail,
  customerName,
  reason,
}) {
  try {
    await transporter.sendMail({
      from: `"Valmont Car Rent Seychelles" <${process.env.GMAIL_USER}>`,
      to: customerEmail,
      subject: `⚠️ Booking Request Update`,
      html: `
        <h2>Dear ${customerName},</h2>
        <p>We regret to inform you that your booking could not be validated.</p>
        <p><strong>Reason:</strong> ${reason}</p>
        <p>Contact us on WhatsApp: +248 1234567</p>
      `,
    });
    console.log('✅ Email rejet envoyé');
    return { success: true };
  } catch (error) {
    console.error('❌ Erreur:', error);
    return { success: false };
  }
}

// Email 6: Mise à jour statut
export async function sendStatusUpdateEmail({
  to_email,
  to_name,
  status,
  status_color,
  status_message,
  vehicle_name,
  pickup_date,
  pickup_time,
  return_date,
  return_time,
  total_price,
}) {
  try {
    await transporter.sendMail({
      from: `"Valmont Car Rent" <${process.env.GMAIL_USER}>`,
      to: to_email,
      subject: `📝 Booking Status Update - ${vehicle_name}`,
      html: `
        <h2>Dear ${to_name},</h2>
        <p>Your booking status has been updated to: <strong style="color:${status_color};">${status}</strong></p>
        <p>${status_message || ''}</p>
        <p><strong>Vehicle:</strong> ${vehicle_name}</p>
        <p><strong>Pickup:</strong> ${pickup_date} at ${pickup_time}</p>
        <p><strong>Return:</strong> ${return_date} at ${return_time}</p>
        <p><strong>Total:</strong> $${total_price}</p>
      `,
    });
    console.log('✅ Email statut envoyé');
    return { success: true };
  } catch (error) {
    console.error('❌ Erreur:', error);
    return { success: false };
  }
}