// Server Actions pour les opérations CRUD
'use server';

import { connectToDatabase } from './mongodb';
import Vehicle from '@/models/Vehicle';
import Reservation from '@/models/Reservation';
import { revalidatePath, revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Stripe from 'stripe';

// Import des fonctions email
import { 
  sendBookingRequestEmail, 
  sendAdminNotificationEmail, 
  sendPaymentLinkEmail,
  sendFinalConfirmationEmail,
  sendRejectionEmail 
} from '@/lib/server/email-nodemailer';




// =========================
// CONSTANTES
// =========================
const EXPIRATION_MINUTES = 15;
const ACTIVE_STATUSES = ['pending', 'confirmed'];
const BLOCKING_STATUSES = ['pending', 'confirmed'];

// =========================
// FONCTIONS ADMIN
// =========================

async function checkAdmin() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get('admin_session');
  if (!isAdmin || isAdmin.value !== 'authenticated') {
    redirect('/admin/login');
  }
}

// =========================
// VEHICLES CRUD
// =========================

export async function getVehicles() {
  try {
    await connectToDatabase();
    const allVehicles = await Vehicle.find({}).sort({ created_at: -1 }).lean();
    
    // Sérialisation COMPLÈTE
    return allVehicles.map(v => ({
      _id: v._id.toString(),
      id: v._id.toString(),
      marque: v.marque || '',
      modele: v.modele || '',
      prix: v.prix || 0,
      description: v.description || '',
      image_data: v.image_data || null,
      image_url: v.image_url || '/images/placeholder-car.jpg',
      categorie: v.categorie || 'classique',
      created_at: v.created_at ? new Date(v.created_at).toISOString() : new Date().toISOString(),
    }));
  } catch (error) {
    console.error('Erreur getVehicles:', error);
    return [];
  }
}

export async function getFeaturedVehicles() {
  try {
    await connectToDatabase();
    const featured = await Vehicle.find({}).limit(3).lean();
    return featured.map(v => ({
      _id: v._id.toString(),
      id: v._id.toString(),
      marque: v.marque || '',
      modele: v.modele || '',
      prix: v.prix || 0,
      description: v.description || '',
      image_data: v.image_data || null,
      image_url: v.image_url || '/images/placeholder-car.jpg',
      categorie: v.categorie || 'classique',
      created_at: v.created_at ? new Date(v.created_at).toISOString() : new Date().toISOString(),
    }));
  } catch (error) {
    console.error('Erreur getFeaturedVehicles:', error);
    return [];
  }
}

export async function getVehicleById(id) {
  try {
    await connectToDatabase();
    const vehicle = await Vehicle.findById(id).lean();
    if (!vehicle) return null;
    return {
      _id: vehicle._id.toString(),
      id: vehicle._id.toString(),
      marque: vehicle.marque || '',
      modele: vehicle.modele || '',
      prix: vehicle.prix || 0,
      description: vehicle.description || '',
      image_data: vehicle.image_data || null,
      image_url: vehicle.image_url || '/images/placeholder-car.jpg',
      categorie: vehicle.categorie || 'classique',
      created_at: vehicle.created_at ? new Date(vehicle.created_at).toISOString() : new Date().toISOString(),
    };
  } catch (error) {
    console.error('Erreur getVehicleById:', error);
    return null;
  }
}
export async function addVehicle(formData) {
  await checkAdmin();
  
  try {
    const marque = formData.get('marque');
    const modele = formData.get('modele');
    const prix = parseInt(formData.get('prix'));
    const description = formData.get('description');
    const categorie = formData.get('categorie') || 'classique';
    
    let imageData = null;
    let imageUrl = null;
    
    const imageFile = formData.get('imageFile');
    const imageUrlInput = formData.get('imageUrl');
    
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = buffer.toString('base64');
      const dataUri = `data:${imageFile.type};base64,${base64}`;
      
      const uploadFormData = new FormData();
      uploadFormData.append('file', imageFile);
      
      const uploadResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/upload`, {
        method: 'POST',
        body: uploadFormData,
      });
      
      if (uploadResponse.ok) {
        const { url } = await uploadResponse.json();
        imageUrl = url;
        imageData = null;
      } else {
        imageData = dataUri;
      }
    } else if (imageUrlInput && imageUrlInput.trim() !== '') {
      imageUrl = imageUrlInput;
    } else {
      imageUrl = '/images/placeholder-car.jpg';
    }

    await connectToDatabase();
    
    const newVehicle = new Vehicle({
      marque,
      modele,
      prix,
      description,
      categorie,
      image_data: imageData,
      image_url: imageUrl,
    });

    await newVehicle.save();
    
    revalidatePath('/fleet');
    revalidatePath('/admin/dashboard');
    return { success: true, message: 'Véhicule ajouté avec succès' };
  } catch (error) {
    console.error('Erreur addVehicle:', error);
    return { success: false, message: error.message };
  }
}

export async function updateVehicle(id, formData) {
  await checkAdmin();

  try {
    await connectToDatabase();
    
    const updatedVehicle = {};
    
    const marque = formData.get('marque');
    const modele = formData.get('modele');
    const prix = formData.get('prix');
    const description = formData.get('description');
    const categorie = formData.get('categorie');
    
    if (marque) updatedVehicle.marque = marque;
    if (modele) updatedVehicle.modele = modele;
    if (prix) updatedVehicle.prix = parseInt(prix);
    if (description) updatedVehicle.description = description;
    if (categorie) updatedVehicle.categorie = categorie;
    
    const imageFile = formData.get('imageFile');
    const imageUrlInput = formData.get('imageUrl');
    
    if (imageFile && imageFile.size > 0) {
      const uploadFormData = new FormData();
      uploadFormData.append('file', imageFile);
      
      const uploadResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/upload`, {
        method: 'POST',
        body: uploadFormData,
      });
      
      if (uploadResponse.ok) {
        const { url } = await uploadResponse.json();
        updatedVehicle.image_url = url;
        updatedVehicle.image_data = null;
      } else {
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = buffer.toString('base64');
        updatedVehicle.image_data = `data:${imageFile.type};base64,${base64}`;
      }
    } else if (imageUrlInput && imageUrlInput.trim() !== '') {
      updatedVehicle.image_url = imageUrlInput;
    }

    if (Object.keys(updatedVehicle).length === 0) {
      return { success: false, message: 'Aucune modification' };
    }

    await Vehicle.findByIdAndUpdate(id, updatedVehicle);
    
    revalidatePath('/fleet');
    revalidatePath('/admin/dashboard');
    return { success: true, message: 'Véhicule modifié avec succès' };
  } catch (error) {
    console.error('Erreur updateVehicle:', error);
    return { success: false, message: error.message };
  }
}

export async function deleteVehicle(id) {
  await checkAdmin();

  try {
    await connectToDatabase();
    await Vehicle.findByIdAndDelete(id);
    revalidatePath('/fleet');
    revalidatePath('/admin/dashboard');
    return { success: true, message: 'Véhicule supprimé avec succès' };
  } catch (error) {
    console.error('Erreur deleteVehicle:', error);
    return { success: false, message: error.message };
  }
}


export async function getReservations() {
  await checkAdmin();

  try {
    await connectToDatabase();
    const allReservations = await Reservation.find({})
      .populate('vehicleId')  // ← La clé : populate
      .sort({ created_at: -1 })
      .lean();
    
    return allReservations.map(r => {
      // Si populate a fonctionné
      if (r.vehicleId && typeof r.vehicleId === 'object') {
        return {
          ...r,
          _id: r._id.toString(),
          id: r._id.toString(),
          vehicle: {
            _id: r.vehicleId._id.toString(),
            id: r.vehicleId._id.toString(),
            marque: r.vehicleId.marque || 'Unknown',
            modele: r.vehicleId.modele || 'Vehicle',
            prix: r.vehicleId.prix || 0,
          },
          vehicle_id: r.vehicleId._id.toString(),
        };
      }
      
      // Fallback si populate n'a pas fonctionné
      return {
        ...r,
        _id: r._id.toString(),
        id: r._id.toString(),
        vehicle: null,
        vehicle_id: r.vehicleId?.toString() || null,
      };
    });
  } catch (error) {
    console.error('Erreur getReservations:', error);
    return [];
  }
}




export async function getReservationsByVehicle(vehicleId) {
  try {
    await connectToDatabase();
    const reservationsList = await Reservation.find({ vehicleId }).lean();
    return reservationsList.map(r => ({
      ...r,
      _id: r._id.toString(),
      id: r._id.toString(),
    }));
  } catch (error) {
    console.error('Erreur getReservationsByVehicle:', error);
    return [];
  }
}




// =========================
// GENERATE PAYMENT LINK (STRIPE)
// =========================

async function generatePaymentLink({ reservationId, totalPrice, vehicleName, customerEmail, customerName, pickupDate, returnDate }) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: vehicleName,
            description: `Reservation: ${reservationId} | ${pickupDate} to ${returnDate}`,
          },
          unit_amount: Math.round(totalPrice * 100),
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/booking/confirmation?session_id={CHECKOUT_SESSION_ID}&reservation_id=${reservationId}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/booking/cancel?reservation_id=${reservationId}`,
    customer_email: customerEmail,
    metadata: {
      reservation_id: reservationId,
      customer_name: customerName,
      vehicle_name: vehicleName,
    },
  });
  
  return session.url;
}







// =========================
// CONFIRM PAYMENT (WEBHOOK or API)
// =========================

export async function confirmPayment(reservationId, sessionId) {
  try {
    await connectToDatabase();
    
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.payment_status !== 'paid') {
      return { success: false, message: 'Payment not completed' };
    }
    
    // Update reservation to confirmed
    await Reservation.findByIdAndUpdate(reservationId, { 
      status: 'confirmed',
      payment_status: 'paid',
    });
    
    const reservation = await Reservation.findById(reservationId).populate('vehicleId');
    
    // Send final confirmation email
    await sendFinalConfirmationEmail({
      customerEmail: reservation.customer_email,
      customerName: reservation.customer_name,
      vehicle: reservation.vehicleId,
      pickupDate: reservation.pickup_date,
      pickupTime: reservation.pickup_time,      // ← AJOUTER
      returnDate: reservation.return_date,
      returnTime: reservation.return_time,      // ← AJOUTER
      totalPrice: reservation.total_price,
      pickupLocation: reservation.pickup_location,
      dropoffLocation: reservation.dropoff_location
    });
    
    revalidatePath('/admin/dashboard');
    
    return { success: true };
  } catch (error) {
    console.error('Error confirmPayment:', error);
    return { success: false };
  }
}



// =========================
// VÉRIFICATION DISPONIBILITÉ
// =========================

export async function getVehiclesAvailability(dateStr) {
  try {
    await connectToDatabase();
    
    const activeReservations = await Reservation.find({
      status: { $in: ['pending', 'confirmed'] },
      pickup_date: { $lte: dateStr },
      return_date: { $gte: dateStr },
    }).lean();
    
    const unavailableMap = new Map();
    
    for (const reservation of activeReservations) {
      unavailableMap.set(reservation.vehicleId.toString(), {
        vehicle_id: reservation.vehicleId,
        return_date: reservation.return_date,
        pickup_date: reservation.pickup_date,
      });
    }
    
    return unavailableMap;
  } catch (error) {
    console.error('Erreur getVehiclesAvailability:', error);
    return new Map();
  }
}


// =========================
// CRÉATION RÉSERVATION (SANS PAIEMENT)
// =========================

export async function createReservation(formData) {
  try {
    await connectToDatabase();
    
    const vehicleId = formData.get('vehicle_id');
    const firstName = formData.get('first_name');
    const lastName = formData.get('last_name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const address = formData.get('address');
    const city = formData.get('city');
    const country = formData.get('country');
    const birthDate = formData.get('birth_date');
    const licenseNumber = formData.get('license_number');
    const flightNumber = formData.get('flight_number');
    const hotelName = formData.get('hotel_name');
    const pickupLocation = formData.get('pickup_location');
    const dropoffLocation = formData.get('dropoff_location');
    const pickupDate = formData.get('pickup_date');
    const pickupTime = formData.get('pickup_time');
    const returnDate = formData.get('return_date');
    const returnTime = formData.get('return_time');

    // Validation
    if (!firstName || !lastName || !email || !phone) {
      return { success: false, message: 'Please fill all required fields' };
    }

    if (!email.includes('@')) {
      return { success: false, message: 'Please enter a valid email' };
    }

    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    
    if (end < start) {
      return { success: false, message: 'Return date must be after pickup date' };
    }
    
    if (start < new Date()) {
      return { success: false, message: 'Pickup date cannot be in the past' };
    }

    // Get vehicle
    const selectedVehicle = await Vehicle.findById(vehicleId).lean();
    
    if (!selectedVehicle) {
      return { success: false, message: 'Vehicle not found' };
    }

    // Calculate price
    const diffTime = Math.abs(end - start);
    const numberOfDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    const totalPrice = numberOfDays * selectedVehicle.prix;

    // Check availability
    const existingReservations = await Reservation.find({
      vehicleId: vehicleId,
      status: { $in: ['confirmed', 'validated', 'in_progress'] },
    });

    const requestedPickup = new Date(pickupDate);
    const requestedReturn = new Date(returnDate);

    const hasConflict = existingReservations.some((reservation) => {
      const existingPickup = new Date(reservation.pickup_date);
      const existingReturn = new Date(reservation.return_date);
      return requestedPickup <= existingReturn && requestedReturn >= existingPickup;
    });

    if (hasConflict) {
      return { success: false, message: 'This vehicle is not available for the selected dates' };
    }

    // Create reservation with status 'pending'
    const newReservation = new Reservation({
      vehicleId: vehicleId,
      customer_name: `${firstName} ${lastName}`,
      customer_email: email,
      customer_phone: phone,
      pickup_location: pickupLocation,
      dropoff_location: dropoffLocation,
      pickup_date: pickupDate,
      pickup_time: pickupTime,
      return_date: returnDate,
      return_time: returnTime,
      total_price: totalPrice,
      status: 'pending',
      payment_status: 'unpaid',
      notes: `Flight: ${flightNumber || 'N/A'}, Hotel: ${hotelName || 'N/A'}, Address: ${address || 'N/A'}, City: ${city || 'N/A'}, License: ${licenseNumber || 'N/A'}, Birth: ${birthDate || 'N/A'}`,
    });
    
    const saved = await newReservation.save();

    // Send email to customer (request received)
  await sendBookingRequestEmail({
  customerEmail: email,
  customerName: `${firstName} ${lastName}`,
  vehicle: selectedVehicle,
  pickupDate: pickupDate,
  pickupTime: pickupTime,        
  returnDate: returnDate,
  returnTime: returnTime,       
  totalPrice: totalPrice,
  pickupLocation: pickupLocation,
  dropoffLocation: dropoffLocation,
  reservationId: saved._id.toString(),
});

    // Send email to admin (new request)
  await sendAdminNotificationEmail({
  customerEmail: email,
  customerName: `${firstName} ${lastName}`,
  customerPhone: phone,
  vehicle: selectedVehicle,
  pickupDate: pickupDate,
  pickupTime: pickupTime,        
  returnDate: returnDate,
  returnTime: returnTime,        
  totalPrice: totalPrice,
  pickupLocation: pickupLocation,
  dropoffLocation: dropoffLocation,
  reservationId: saved._id.toString(),
});

    revalidatePath('/');
    revalidatePath('/fleet');
    revalidatePath('/admin/dashboard');

    return {
      success: true,
      message: 'Your booking request has been submitted! You will receive a confirmation email once our team validates your request.',
      reservationId: saved._id.toString(),
    };
    
  } catch (error) {
    console.error('Error createReservation:', error);
    return { success: false, message: 'An error occurred. Please try again.' };
  }
}


// =========================
// NETTOYAGE DES RÉSERVATIONS EXPIRÉES
// =========================

export async function cleanExpiredReservations() {
  try {
    await connectToDatabase();
    const result = await Reservation.updateMany(
      {
        status: 'pending',
        expires_at: { $lt: new Date() }
      },
      {
        $set: { status: 'expired' }
      }
    );
    
    console.log(`✅ ${result.modifiedCount || 0} réservations expirées nettoyées`);
    return { success: true, count: result.modifiedCount || 0 };
  } catch (error) {
    console.error('Erreur cleanExpiredReservations:', error);
    return { success: false, count: 0 };
  }
}

// =========================
// GESTION STATUT RÉSERVATION
// =========================

export async function updateReservationStatus(reservationId, newStatus) {
  await checkAdmin();

  try {
    await connectToDatabase();
    
    const reservation = await Reservation.findById(reservationId).lean();
    
    if (!reservation) {
      return { success: false, message: 'Réservation non trouvée' };
    }
    
    await Reservation.findByIdAndUpdate(reservationId, { status: newStatus });

    revalidatePath('/admin/dashboard');
    revalidateTag('reservations');

    return { 
      success: true, 
      message: 'Statut mis à jour',
      status: newStatus,
      reservationId,
      reservation: {
        customerEmail: reservation.customer_email,
        customerName: reservation.customer_name,
        pickupDate: reservation.pickup_date,
        returnDate: reservation.return_date,
        totalPrice: reservation.total_price,
      }
    };
  } catch (error) {
    console.error('Erreur updateReservationStatus:', error);
    return { success: false, message: 'Erreur lors de la mise à jour' };
  }
}

export async function deleteReservation(reservationId) {
  await checkAdmin();

  try {
    await connectToDatabase();
    await Reservation.findByIdAndDelete(reservationId);
    revalidatePath('/admin/dashboard');
    revalidateTag('reservations');
    return { success: true, message: 'Réservation supprimée' };
  } catch (error) {
    console.error('Erreur deleteReservation:', error);
    return { success: false, message: 'Erreur lors de la suppression' };
  }
}


//VALIDATE RESERVATION
export async function validateReservation(reservationId) {
  await checkAdmin();

  try {
    console.log('🔍 1. Début validation pour:', reservationId);
    
    await connectToDatabase();
    
    const reservation = await Reservation.findById(reservationId).populate('vehicleId');
    
    if (!reservation) {
      console.log('❌ Réservation non trouvée');
      return { success: false, message: 'Reservation not found' };
    }
    
    console.log('✅ 2. Réservation trouvée:', reservation.customer_email);
    console.log('💰 3. Prix total:', reservation.total_price);
    
    // Update status to 'validated'
    await Reservation.findByIdAndUpdate(reservationId, { status: 'validated' });
    console.log('✅ 4. Statut mis à jour: validated');

    // Generate payment link
    console.log('🔗 5. Génération lien Stripe...');
    const paymentLink = await generatePaymentLink({
      reservationId: reservation._id.toString(),
      totalPrice: reservation.total_price,
      vehicleName: `${reservation.vehicleId.marque} ${reservation.vehicleId.modele}`,
      customerEmail: reservation.customer_email,
      customerName: reservation.customer_name,
      pickupDate: reservation.pickup_date,
      returnDate: reservation.return_date,
    });
    
    console.log('✅ 6. Lien généré:', paymentLink);

    // Send payment link email
    console.log('📧 7. Envoi email paiement à:', reservation.customer_email);
    const emailResult = await sendPaymentLinkEmail({
  customerEmail: reservation.customer_email,
  customerName: reservation.customer_name,
  vehicle: reservation.vehicleId,
  pickupDate: reservation.pickup_date,
  pickupTime: reservation.pickup_time,      // ← Metre APRES pickupDate
  returnDate: reservation.return_date,
  returnTime: reservation.return_time,      // ← Metre APRES returnDate
  totalPrice: reservation.total_price,
  paymentLink,
    });
    
    console.log('✅ 8. Résultat email:', emailResult);

    revalidatePath('/admin/dashboard');
    revalidateTag('reservations');

    return { 
      success: true, 
      message: 'Reservation validated. Payment link sent to customer.',
    };
    
  } catch (error) {
    console.error('❌ ERREUR validateReservation:', error);
    return { success: false, message: error.message };
  }
}



// =========================
// ADMIN REJECTS RESERVATION
// =========================

export async function rejectReservation(reservationId, reason) {
  await checkAdmin();

  try {
    await connectToDatabase();
    
    await Reservation.findByIdAndUpdate(reservationId, { 
      status: 'cancelled',
      notes: `Rejected: ${reason || 'No reason provided'}`,
    });
    
    const reservation = await Reservation.findById(reservationId);
    
    // Send rejection email
    await sendRejectionEmail({
      customerEmail: reservation.customer_email,
      customerName: reservation.customer_name,
      reason: reason || 'Availability issues',
    });
    
    revalidatePath('/admin/dashboard');
    
    return { success: true, message: 'Reservation rejected.' };
  } catch (error) {
    console.error('Error rejectReservation:', error);
    return { success: false, message: error.message };
  }
}







// =========================
// STATISTIQUES
// =========================

export async function getDashboardStats() {
  await checkAdmin();

  try {
    await connectToDatabase();
    
    const allReservations = await Reservation.find({}).lean();
    const allVehicles = await Vehicle.find({}).lean();
    
    const pendingReservations = allReservations.filter(r => r.status === 'pending').length;
    const confirmedReservations = allReservations.filter(r => r.status === 'confirmed').length;
    const cancelledReservations = allReservations.filter(r => r.status === 'cancelled').length;
    const completedReservations = allReservations.filter(r => r.status === 'completed').length;
    
    const totalRevenue = allReservations
      .filter(r => r.status === 'confirmed' || r.status === 'completed')
      .reduce((sum, r) => sum + (r.total_price || 0), 0);
    
    return {
      success: true,
      stats: {
        totalVehicles: allVehicles.length,
        totalReservations: allReservations.length,
        pendingReservations,
        confirmedReservations,
        cancelledReservations,
        completedReservations,
        totalRevenue,
      }
    };
  } catch (error) {
    console.error('Erreur getDashboardStats:', error);
    return { success: false, stats: {
      totalVehicles: 0,
      totalReservations: 0,
      pendingReservations: 0,
      confirmedReservations: 0,
      cancelledReservations: 0,
      completedReservations: 0,
      totalRevenue: 0,
    } };
  }
}

// =========================
// AUTHENTIFICATION
// =========================

export async function loginAdmin(formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    return { success: false, message: 'Erreur de configuration' };
  }

  if (email === adminEmail && password === adminPassword) {
    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      path: '/',
    });
    redirect('/admin/dashboard');
  } else {
    return { success: false, message: 'Email ou mot de passe incorrect' };
  }
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/');
}