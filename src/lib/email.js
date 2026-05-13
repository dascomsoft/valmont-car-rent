// // src/lib/email.js
// import emailjs from '@emailjs/browser';

// // Configuration EmailJS
// const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
// const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
// const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

// /**
//  * Envoie un email de confirmation de réservation
//  * Fonction côté client (appelée depuis le navigateur)
//  */
// export async function sendBookingConfirmation({
//   customerEmail,
//   customerName,
//   customerPhone,
//   vehicle,
//   pickupDate,
//   returnDate,
//   totalPrice,
//   pickupLocation,
//   dropoffLocation,
// }) {
//   try {
//     const templateParams = {
//       to_email: customerEmail,
//       to_name: customerName,
//       customer_phone: customerPhone,
//       vehicle_name: `${vehicle.marque} ${vehicle.modele}`,
//       vehicle_price: vehicle.prix,
//       pickup_date: pickupDate,
//       return_date: returnDate,
//       total_price: totalPrice,
//       pickup_location: pickupLocation,
//       dropoff_location: dropoffLocation,
//       whatsapp_number: '+243811077897',
//       site_url: 'https://zuacar.vercel.app',
//     };

//     const response = await emailjs.send(
//       SERVICE_ID,
//       TEMPLATE_ID,
//       templateParams,
//       PUBLIC_KEY
//     );

//     console.log('✅ Email envoyé avec succès!', response.status);
//     return { success: true };
//   } catch (error) {
//     console.error('❌ Erreur envoi email:', error);
//     return { success: false, error: error.text };
//   }
// }

// /**
//  * Envoie une notification à l'admin (optionnel)
//  */
// export async function sendAdminNotification({
//   customerName,
//   customerEmail,
//   customerPhone,
//   vehicle,
//   pickupDate,
//   returnDate,
//   totalPrice,
// }) {
//   try {
//     const templateParams = {
//       customer_name: customerName,
//       customer_email: customerEmail,
//       customer_phone: customerPhone,
//       vehicle_name: `${vehicle.marque} ${vehicle.modele}`,
//       pickup_date: pickupDate,
//       return_date: returnDate,
//       total_price: totalPrice,
//       admin_email: 'admin@zuacar.com',
//     };

//     await emailjs.send(
//       SERVICE_ID,
//       'template_admin_notification', // Template admin séparé
//       templateParams,
//       PUBLIC_KEY
//     );

//     return { success: true };
//   } catch (error) {
//     console.error('Erreur notification admin:', error);
//     return { success: false };
//   }
// }


















// // src/lib/email.js
// import emailjs from '@emailjs/browser';

// // Configuration EmailJS
// const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
// const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
// const TEMPLATE_STATUS_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_STATUS_ID;
// const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

// /**
//  * Envoie un email de confirmation de réservation
//  * Fonction côté client (appelée depuis le navigateur)
//  */
// export async function sendBookingConfirmation({
//   customerEmail,
//   customerName,
//   customerPhone,
//   vehicle,
//   pickupDate,
//   returnDate,
//   totalPrice,
//   pickupLocation,
//   dropoffLocation,
// }) {
//   try {
//     const templateParams = {
//       to_email: customerEmail,
//       to_name: customerName,
//       customer_phone: customerPhone,
//       vehicle_name: `${vehicle.marque} ${vehicle.modele}`,
//       vehicle_price: vehicle.prix,
//       pickup_date: pickupDate,
//       return_date: returnDate,
//       total_price: totalPrice,
//       pickup_location: pickupLocation,
//       dropoff_location: dropoffLocation,
//       whatsapp_number: '+243811077897',
//       site_url: 'https://zuacar.vercel.app',
//     };

//     const response = await emailjs.send(
//       SERVICE_ID,
//       TEMPLATE_ID,
//       templateParams,
//       PUBLIC_KEY
//     );

//     console.log('✅ Email confirmation envoyé!', response.status);
//     return { success: true };
//   } catch (error) {
//     console.error('❌ Erreur envoi email confirmation:', error);
//     return { success: false, error: error.text };
//   }
// }

// /**
//  * Envoie un email de mise à jour de statut (confirmée/annulée/terminée)
//  */
// export async function sendStatusUpdateEmail({
//   to_email,
//   to_name,
//   status,
//   status_color,
//   status_message,
//   vehicle_name,
//   pickup_date,
//   return_date,
//   total_price,
//   whatsapp_number,
// }) {
//   if (!TEMPLATE_STATUS_ID) {
//     console.error('❌ TEMPLATE_STATUS_ID non configuré');
//     return { success: false, error: 'Template status non configuré' };
//   }

//   try {
//     const templateParams = {
//       to_email: to_email,
//       to_name: to_name,
//       status: status,
//       status_color: status_color,
//       status_message: status_message || '',
//       vehicle_name: vehicle_name,
//       pickup_date: pickup_date,
//       return_date: return_date,
//       total_price: total_price,
//       whatsapp_number: whatsapp_number,
//     };

//     const response = await emailjs.send(
//       SERVICE_ID,
//       TEMPLATE_STATUS_ID,
//       templateParams,
//       PUBLIC_KEY
//     );

//     console.log(`✅ Email de statut (${status}) envoyé!`, response.status);
//     return { success: true };
//   } catch (error) {
//     console.error('❌ Erreur envoi email statut:', error);
//     return { success: false, error: error.text };
//   }
// }

// /**
//  * Envoie une notification à l'admin (optionnel)
//  */
// export async function sendAdminNotification({
//   customerName,
//   customerEmail,
//   customerPhone,
//   vehicle,
//   pickupDate,
//   returnDate,
//   totalPrice,
// }) {
//   try {
//     const templateParams = {
//       customer_name: customerName,
//       customer_email: customerEmail,
//       customer_phone: customerPhone,
//       vehicle_name: `${vehicle.marque} ${vehicle.modele}`,
//       pickup_date: pickupDate,
//       return_date: returnDate,
//       total_price: totalPrice,
//       admin_email: 'admin@zuacar.com',
//     };

//     await emailjs.send(
//       SERVICE_ID,
//       'template_admin_notification',
//       templateParams,
//       PUBLIC_KEY
//     );

//     return { success: true };
//   } catch (error) {
//     console.error('Erreur notification admin:', error);
//     return { success: false };
//   }
// }














// src/lib/email.js
import emailjs from '@emailjs/browser';

// Configuration EmailJS
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const TEMPLATE_STATUS_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_STATUS_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

/**
 * Envoie un email de confirmation de réservation
 */
export async function sendBookingConfirmation({
  customerEmail,
  customerName,
  customerPhone,
  vehicle,
  pickupDate,
  returnDate,
  totalPrice,
  pickupLocation,
  dropoffLocation,
}) {
  try {
    const templateParams = {
      to_email: customerEmail,
      to_name: customerName,
      customer_phone: customerPhone,
      vehicle_name: `${vehicle.marque} ${vehicle.modele}`,
      vehicle_price: vehicle.prix,
      pickup_date: pickupDate,
      return_date: returnDate,
      total_price: totalPrice,
      pickup_location: pickupLocation,
      dropoff_location: dropoffLocation,
      whatsapp_number: '+243811077897',
      site_url: 'https://zuacar.vercel.app',
    };

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );

    console.log('✅ Email confirmation envoyé!', response.status);
    return { success: true };
  } catch (error) {
    console.error('❌ Erreur envoi email confirmation:', error);
    return { success: false, error: error.text };
  }
}

/**
 * Envoie un email de mise à jour de statut
 */
export async function sendStatusUpdateEmail({
  to_email,
  to_name,
  status,
  status_color,
  status_message,
  vehicle_name,
  pickup_date,
  return_date,
  total_price,
  whatsapp_number,
}) {
  if (!TEMPLATE_STATUS_ID) {
    console.error('❌ TEMPLATE_STATUS_ID non configuré');
    return { success: false, error: 'Template status non configuré' };
  }

  try {
    const templateParams = {
      to_email: to_email,
      to_name: to_name,
      status: status,
      status_color: status_color,
      status_message: status_message || '',
      vehicle_name: vehicle_name,
      pickup_date: pickup_date,
      return_date: return_date,
      total_price: total_price,
      whatsapp_number: whatsapp_number,
    };

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_STATUS_ID,
      templateParams,
      PUBLIC_KEY
    );

    console.log(`✅ Email de statut (${status}) envoyé!`, response.status);
    return { success: true };
  } catch (error) {
    console.error('❌ Erreur envoi email statut:', error);
    return { success: false, error: error.text };
  }
}