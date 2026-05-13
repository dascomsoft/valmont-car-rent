


























// // Server Actions pour les opérations CRUD
// 'use server';

// import { db } from './db.js';
// import { vehicles, reservations } from './schema.js';
// import { eq, desc } from 'drizzle-orm';
// import { revalidatePath, revalidateTag } from 'next/cache';
// import { cookies } from 'next/headers';
// import { redirect } from 'next/navigation';

// async function checkAdmin() {
//   const cookieStore = await cookies();
//   const isAdmin = cookieStore.get('admin_session');
//   if (!isAdmin || isAdmin.value !== 'authenticated') {
//     redirect('/admin/login');
//   }
// }

// // =========================
// // VEHICLES CRUD
// // =========================

// // Récupérer tous les véhicules
// export async function getVehicles() {
//   try {
//     return await db.select().from(vehicles);
//   } catch (error) {
//     console.error('Erreur:', error);
//     return [];
//   }
// }

// // Récupérer les véhicules en vedette
// export async function getFeaturedVehicles() {
//   try {
//     return await db.select().from(vehicles).limit(3);
//   } catch (error) {
//     console.error('Erreur:', error);
//     return [];
//   }
// }

// // Ajouter un véhicule
// export async function addVehicle(formData) {
//   await checkAdmin();
  
//   try {
//     const marque = formData.get('marque');
//     const modele = formData.get('modele');
//     const prix = parseInt(formData.get('prix'));
//     const description = formData.get('description');
//     const categorie = formData.get('categorie') || 'classique';
    
//     let imageData = null;
//     let imageUrl = null;
    
//     const imageFile = formData.get('imageFile');
//     const imageUrlInput = formData.get('imageUrl');
    
//     if (imageFile && imageFile.size > 0) {
//       const bytes = await imageFile.arrayBuffer();
//       const buffer = Buffer.from(bytes);
//       const base64 = buffer.toString('base64');
//       imageData = `data:${imageFile.type};base64,${base64}`;
//     } else if (imageUrlInput && imageUrlInput.trim() !== '') {
//       imageUrl = imageUrlInput;
//     } else {
//       imageUrl = '/images/placeholder-car.jpg';
//     }

//     const newVehicle = {
//       marque,
//       modele,
//       prix,
//       description,
//       categorie,
//       image_data: imageData,
//       image_url: imageUrl,
//     };

//     await db.insert(vehicles).values(newVehicle);
//     revalidatePath('/fleet');
//     revalidatePath('/admin/dashboard');
//     return { success: true, message: 'Véhicule ajouté avec succès' };
//   } catch (error) {
//     console.error('Erreur:', error);
//     return { success: false, message: error.message };
//   }
// }

// // Mettre à jour un véhicule
// export async function updateVehicle(id, formData) {
//   await checkAdmin();

//   try {
//     const updatedVehicle = {};
    
//     const marque = formData.get('marque');
//     const modele = formData.get('modele');
//     const prix = formData.get('prix');
//     const description = formData.get('description');
//     const categorie = formData.get('categorie');
    
//     if (marque) updatedVehicle.marque = marque;
//     if (modele) updatedVehicle.modele = modele;
//     if (prix) updatedVehicle.prix = parseInt(prix);
//     if (description) updatedVehicle.description = description;
//     if (categorie) updatedVehicle.categorie = categorie;
    
//     const imageFile = formData.get('imageFile');
//     const imageUrlInput = formData.get('imageUrl');
    
//     if (imageFile && imageFile.size > 0) {
//       const bytes = await imageFile.arrayBuffer();
//       const buffer = Buffer.from(bytes);
//       const base64 = buffer.toString('base64');
//       updatedVehicle.image_data = `data:${imageFile.type};base64,${base64}`;
//     } else if (imageUrlInput && imageUrlInput.trim() !== '') {
//       updatedVehicle.image_url = imageUrlInput;
//     }

//     if (Object.keys(updatedVehicle).length === 0) {
//       return { success: false, message: 'Aucune modification' };
//     }

//     await db.update(vehicles).set(updatedVehicle).where(eq(vehicles.id, id));
//     revalidatePath('/fleet');
//     revalidatePath('/admin/dashboard');
//     return { success: true, message: 'Véhicule modifié avec succès' };
//   } catch (error) {
//     console.error('Erreur:', error);
//     return { success: false, message: error.message };
//   }
// }

// // Supprimer un véhicule
// export async function deleteVehicle(id) {
//   await checkAdmin();

//   try {
//     await db.delete(vehicles).where(eq(vehicles.id, id));
//     revalidatePath('/fleet');
//     revalidatePath('/admin/dashboard');
//     return { success: true, message: 'Véhicule supprimé avec succès' };
//   } catch (error) {
//     console.error('Erreur:', error);
//     return { success: false, message: error.message };
//   }
// }

// // =========================
// // RESERVATIONS CRUD
// // =========================

// // Récupérer toutes les réservations
// export async function getReservations() {
//   await checkAdmin();

//   try {
//     const allReservations = await db
//       .select()
//       .from(reservations)
//       .orderBy(desc(reservations.created_at));
    
//     return allReservations;
//   } catch (error) {
//     console.error('Erreur lors de la récupération des réservations:', error);
//     return [];
//   }
// }

// // Récupérer les réservations par véhicule
// export async function getReservationsByVehicle(vehicleId) {
//   try {
//     const vehicleReservations = await db
//       .select()
//       .from(reservations)
//       .where(eq(reservations.vehicle_id, vehicleId));
    
//     return vehicleReservations;
//   } catch (error) {
//     console.error('Erreur lors de la récupération des réservations:', error);
//     return [];
//   }
// }

// // Vérifier la disponibilité d'un véhicule
// export async function checkVehicleAvailability(
//   vehicleId,
//   pickupDate,
//   returnDate
// ) {
//   try {
//     const existingReservations = await db
//       .select()
//       .from(reservations)
//       .where(eq(reservations.vehicle_id, vehicleId));

//     const requestedPickup = new Date(pickupDate);
//     const requestedReturn = new Date(returnDate);

//     const hasConflict = existingReservations.some((reservation) => {
//       // Ignorer les réservations annulées
//       if (reservation.status === 'cancelled') return false;
      
//       const existingPickup = new Date(reservation.pickup_date);
//       const existingReturn = new Date(reservation.return_date);

//       return (
//         requestedPickup <= existingReturn &&
//         requestedReturn >= existingPickup
//       );
//     });

//     return !hasConflict;
//   } catch (error) {
//     console.error('Erreur lors de la vérification de disponibilité:', error);
//     return false;
//   }
// }

// // Créer une réservation
// export async function createReservation(formData) {
//   try {
//     const vehicleId = parseInt(formData.get('vehicle_id'));

//     const customerName = formData.get('customer_name');
//     const customerEmail = formData.get('customer_email');
//     const customerPhone = formData.get('customer_phone');

//     const pickupLocation = formData.get('pickup_location');
//     const dropoffLocation = formData.get('dropoff_location');

//     const pickupDate = formData.get('pickup_date');
//     const returnDate = formData.get('return_date');
    
//     const notes = formData.get('notes') || null;

//     // Validation des champs requis
//     if (!customerName || !customerEmail || !customerPhone) {
//       return {
//         success: false,
//         message: 'Veuillez remplir tous les champs obligatoires',
//       };
//     }

//     // Validation email
//     if (!customerEmail.includes('@') || !customerEmail.includes('.')) {
//       return {
//         success: false,
//         message: 'Veuillez entrer un email valide',
//       };
//     }

//     // Récupérer le véhicule
//     const vehicle = await db
//       .select()
//       .from(vehicles)
//       .where(eq(vehicles.id, vehicleId));

//     if (!vehicle.length) {
//       return {
//         success: false,
//         message: 'Véhicule non trouvé',
//       };
//     }

//     const selectedVehicle = vehicle[0];

//     // Vérifier la disponibilité
//     const isAvailable = await checkVehicleAvailability(
//       vehicleId,
//       pickupDate,
//       returnDate
//     );

//     if (!isAvailable) {
//       return {
//         success: false,
//         message: 'Ce véhicule n\'est pas disponible pour les dates sélectionnées',
//       };
//     }

//     // Calculer le nombre de jours
//     const start = new Date(pickupDate);
//     const end = new Date(returnDate);
//     const diffTime = Math.abs(end - start);
//     const numberOfDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

//     // Calculer le prix total
//     const totalPrice = numberOfDays * selectedVehicle.prix;

//     // Créer la réservation
//     await db.insert(reservations).values({
//       vehicle_id: vehicleId,
//       customer_name: customerName,
//       customer_email: customerEmail,
//       customer_phone: customerPhone,
//       pickup_location: pickupLocation,
//       dropoff_location: dropoffLocation,
//       pickup_date: pickupDate,
//       return_date: returnDate,
//       total_price: totalPrice,
//       status: 'pending',
//       payment_status: 'unpaid',
//       notes: notes,
//     });

//     // Envoyer l'email de confirmation (non bloquant)
//     try {
//       const { sendBookingConfirmation } = await import('./email.js');
//       await sendBookingConfirmation({
//         customerEmail,
//         customerName,
//         customerPhone,
//         vehicle: selectedVehicle,
//         pickupDate,
//         returnDate,
//         totalPrice,
//         pickupLocation,
//         dropoffLocation,
//       });
//     } catch (emailError) {
//       console.log('Email non envoyé mais réservation OK:', emailError.message);
//     }

//     revalidatePath('/');
//     revalidatePath('/fleet');
//     revalidatePath('/admin/dashboard');
//     revalidateTag('reservations');

//     return {
//       success: true,
//       message: 'Réservation créée avec succès ! Un email de confirmation vous a été envoyé.',
//     };
//   } catch (error) {
//     console.error('Erreur lors de la création de la réservation:', error);
//     return {
//       success: false,
//       message: 'Une erreur est survenue. Veuillez réessayer.',
//     };
//   }
// }

// // Mettre à jour le statut d'une réservation (SANS EMAIL - l'email est envoyé côté client)
// export async function updateReservationStatus(reservationId, newStatus) {
//   await checkAdmin();

//   try {
//     await db
//       .update(reservations)
//       .set({ status: newStatus })
//       .where(eq(reservations.id, reservationId));

//     revalidatePath('/admin/dashboard');
//     revalidateTag('reservations');

//     // Retourner les infos nécessaires
//     return { 
//       success: true, 
//       message: 'Statut mis à jour',
//       status: newStatus,
//       reservationId
//     };
//   } catch (error) {
//     console.error('Erreur lors de la mise à jour du statut:', error);
//     return { success: false, message: 'Erreur lors de la mise à jour' };
//   }
// }







// // Supprimer une réservation
// export async function deleteReservation(reservationId) {
//   await checkAdmin();

//   try {
//     await db
//       .delete(reservations)
//       .where(eq(reservations.id, reservationId));

//     revalidatePath('/admin/dashboard');
//     revalidateTag('reservations');

//     return { success: true, message: 'Réservation supprimée' };
//   } catch (error) {
//     console.error('Erreur lors de la suppression:', error);
//     return { success: false, message: 'Erreur lors de la suppression' };
//   }
// }

// // =========================
// // AUTHENTIFICATION
// // =========================

// // Login admin
// export async function loginAdmin(formData) {
//   const email = formData.get('email');
//   const password = formData.get('password');

//   const adminEmail = process.env.ADMIN_EMAIL;
//   const adminPassword = process.env.ADMIN_PASSWORD;

//   if (!adminEmail || !adminPassword) {
//     return { success: false, message: 'Erreur de configuration' };
//   }

//   if (email === adminEmail && password === adminPassword) {
//     const cookieStore = await cookies();
//     cookieStore.set('admin_session', 'authenticated', {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       maxAge: 60 * 60 * 24,
//       path: '/',
//     });
//     redirect('/admin/dashboard');
//   } else {
//     return { success: false, message: 'Email ou mot de passe incorrect' };
//   }
// }

// // Logout admin
// export async function logoutAdmin() {
//   const cookieStore = await cookies();
//   cookieStore.delete('admin_session');
//   redirect('/');
// }









































































































// Server Actions pour les opérations CRUD
'use server';

import { db } from './db.js';
import { vehicles, reservations } from './schema.js';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath, revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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

// Récupérer tous les véhicules
export async function getVehicles() {
  try {
    return await db.select().from(vehicles);
  } catch (error) {
    console.error('Erreur:', error);
    return [];
  }
}

// Récupérer les véhicules en vedette
export async function getFeaturedVehicles() {
  try {
    return await db.select().from(vehicles).limit(3);
  } catch (error) {
    console.error('Erreur:', error);
    return [];
  }
}

// Ajouter un véhicule
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
      imageData = `data:${imageFile.type};base64,${base64}`;
    } else if (imageUrlInput && imageUrlInput.trim() !== '') {
      imageUrl = imageUrlInput;
    } else {
      imageUrl = '/images/placeholder-car.jpg';
    }

    const newVehicle = {
      marque,
      modele,
      prix,
      description,
      categorie,
      image_data: imageData,
      image_url: imageUrl,
    };

    await db.insert(vehicles).values(newVehicle);
    revalidatePath('/fleet');
    revalidatePath('/admin/dashboard');
    return { success: true, message: 'Véhicule ajouté avec succès' };
  } catch (error) {
    console.error('Erreur:', error);
    return { success: false, message: error.message };
  }
}

// Mettre à jour un véhicule
export async function updateVehicle(id, formData) {
  await checkAdmin();

  try {
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
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = buffer.toString('base64');
      updatedVehicle.image_data = `data:${imageFile.type};base64,${base64}`;
    } else if (imageUrlInput && imageUrlInput.trim() !== '') {
      updatedVehicle.image_url = imageUrlInput;
    }

    if (Object.keys(updatedVehicle).length === 0) {
      return { success: false, message: 'Aucune modification' };
    }

    await db.update(vehicles).set(updatedVehicle).where(eq(vehicles.id, id));
    revalidatePath('/fleet');
    revalidatePath('/admin/dashboard');
    return { success: true, message: 'Véhicule modifié avec succès' };
  } catch (error) {
    console.error('Erreur:', error);
    return { success: false, message: error.message };
  }
}

// Supprimer un véhicule
export async function deleteVehicle(id) {
  await checkAdmin();

  try {
    await db.delete(vehicles).where(eq(vehicles.id, id));
    revalidatePath('/fleet');
    revalidatePath('/admin/dashboard');
    return { success: true, message: 'Véhicule supprimé avec succès' };
  } catch (error) {
    console.error('Erreur:', error);
    return { success: false, message: error.message };
  }
}

// =========================
// RESERVATIONS CRUD
// =========================

// Récupérer toutes les réservations
export async function getReservations() {
  await checkAdmin();

  try {
    const allReservations = await db
      .select()
      .from(reservations)
      .orderBy(desc(reservations.created_at));
    
    return allReservations;
  } catch (error) {
    console.error('Erreur lors de la récupération des réservations:', error);
    return [];
  }
}

// Récupérer les réservations par véhicule
export async function getReservationsByVehicle(vehicleId) {
  try {
    const vehicleReservations = await db
      .select()
      .from(reservations)
      .where(eq(reservations.vehicle_id, vehicleId));
    
    return vehicleReservations;
  } catch (error) {
    console.error('Erreur lors de la récupération des réservations:', error);
    return [];
  }
}

// Vérifier la disponibilité d'un véhicule
export async function checkVehicleAvailability(
  vehicleId,
  pickupDate,
  returnDate
) {
  try {
    const existingReservations = await db
      .select()
      .from(reservations)
      .where(eq(reservations.vehicle_id, vehicleId));

    const requestedPickup = new Date(pickupDate);
    const requestedReturn = new Date(returnDate);

    const hasConflict = existingReservations.some((reservation) => {
      // Ignorer les réservations annulées
      if (reservation.status === 'cancelled') return false;
      
      const existingPickup = new Date(reservation.pickup_date);
      const existingReturn = new Date(reservation.return_date);

      return (
        requestedPickup <= existingReturn &&
        requestedReturn >= existingPickup
      );
    });

    return !hasConflict;
  } catch (error) {
    console.error('Erreur lors de la vérification de disponibilité:', error);
    return false;
  }
}

// Créer une réservation (SANS EMAIL - envoyé côté client)
export async function createReservation(formData) {
  try {
    const vehicleId = parseInt(formData.get('vehicle_id'));

    const customerName = formData.get('customer_name');
    const customerEmail = formData.get('customer_email');
    const customerPhone = formData.get('customer_phone');

    const pickupLocation = formData.get('pickup_location');
    const dropoffLocation = formData.get('dropoff_location');

    const pickupDate = formData.get('pickup_date');
    const returnDate = formData.get('return_date');
    
    const notes = formData.get('notes') || null;

    // Validation des champs requis
    if (!customerName || !customerEmail || !customerPhone) {
      return {
        success: false,
        message: 'Veuillez remplir tous les champs obligatoires',
      };
    }

    // Validation email
    if (!customerEmail.includes('@') || !customerEmail.includes('.')) {
      return {
        success: false,
        message: 'Veuillez entrer un email valide',
      };
    }

    // Récupérer le véhicule
    const vehicle = await db
      .select()
      .from(vehicles)
      .where(eq(vehicles.id, vehicleId));

    if (!vehicle.length) {
      return {
        success: false,
        message: 'Véhicule non trouvé',
      };
    }

    const selectedVehicle = vehicle[0];

    // Vérifier la disponibilité
    const isAvailable = await checkVehicleAvailability(
      vehicleId,
      pickupDate,
      returnDate
    );

    if (!isAvailable) {
      return {
        success: false,
        message: 'Ce véhicule n\'est pas disponible pour les dates sélectionnées',
      };
    }

    // Calculer le nombre de jours
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const diffTime = Math.abs(end - start);
    const numberOfDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

    // Calculer le prix total
    const totalPrice = numberOfDays * selectedVehicle.prix;

    // Créer la réservation
    await db.insert(reservations).values({
      vehicle_id: vehicleId,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      pickup_location: pickupLocation,
      dropoff_location: dropoffLocation,
      pickup_date: pickupDate,
      return_date: returnDate,
      total_price: totalPrice,
      status: 'pending',
      payment_status: 'unpaid',
      notes: notes,
    });

    // ⚠️ L'EMAIL DE CONFIRMATION EST ENVOYÉ PAR BookingModalGlobal.jsx (CÔTÉ CLIENT)
    // On ne l'envoie PAS ici pour éviter l'erreur "location is not defined"

    revalidatePath('/');
    revalidatePath('/fleet');
    revalidatePath('/admin/dashboard');
    revalidateTag('reservations');

    // Retourner les détails pour l'email côté client
    return {
      success: true,
      message: 'Réservation créée avec succès ! Un email de confirmation vous a été envoyé.',
      reservation: {
        id: null, // L'ID sera généré
        customerName,
        customerEmail,
        customerPhone,
        vehicle: selectedVehicle,
        pickupDate,
        returnDate,
        totalPrice,
        pickupLocation,
        dropoffLocation,
      }
    };
  } catch (error) {
    console.error('Erreur lors de la création de la réservation:', error);
    return {
      success: false,
      message: 'Une erreur est survenue. Veuillez réessayer.',
    };
  }
}

// Mettre à jour le statut d'une réservation (SANS EMAIL - envoyé côté client)
export async function updateReservationStatus(reservationId, newStatus) {
  await checkAdmin();

  try {
    await db
      .update(reservations)
      .set({ status: newStatus })
      .where(eq(reservations.id, reservationId));

    revalidatePath('/admin/dashboard');
    revalidateTag('reservations');

    return { 
      success: true, 
      message: 'Statut mis à jour',
      status: newStatus,
      reservationId
    };
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut:', error);
    return { success: false, message: 'Erreur lors de la mise à jour' };
  }
}

// Supprimer une réservation
export async function deleteReservation(reservationId) {
  await checkAdmin();

  try {
    await db
      .delete(reservations)
      .where(eq(reservations.id, reservationId));

    revalidatePath('/admin/dashboard');
    revalidateTag('reservations');

    return { success: true, message: 'Réservation supprimée' };
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    return { success: false, message: 'Erreur lors de la suppression' };
  }
}

// =========================
// AUTHENTIFICATION
// =========================

// Login admin
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

// Logout admin
export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/');
}