

// // Schéma de la base de données pour les véhicules
// import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// export const vehicles = sqliteTable('vehicles', {
//   id: integer('id').primaryKey({ autoIncrement: true }),
//   marque: text('marque').notNull(),
//   modele: text('modele').notNull(),
//   prix: integer('prix').notNull(),
//   description: text('description').notNull(),
//   image_data: text('image_data'), // Pour les images uploadées en Base64
//   image_url: text('image_url'),   // Pour les URLs d'images
//   categorie: text('categorie').default('classique'),
//   created_at: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
// });





























// // Schéma de la base de données pour les véhicules et réservations
// import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// // =========================
// // VEHICLES TABLE
// // =========================
// export const vehicles = sqliteTable('vehicles', {
//   id: integer('id').primaryKey({ autoIncrement: true }),

//   marque: text('marque').notNull(),
//   modele: text('modele').notNull(),

//   prix: integer('prix').notNull(),

//   description: text('description').notNull(),

//   image_data: text('image_data'),
//   image_url: text('image_url'),

//   categorie: text('categorie').default('classique'),

//   created_at: integer('created_at', { mode: 'timestamp' })
//     .$defaultFn(() => new Date()),
// });

// // =========================
// // RESERVATIONS TABLE
// // =========================
// export const reservations = sqliteTable('reservations', {
//   id: integer('id').primaryKey({ autoIncrement: true }),

//   vehicle_id: integer('vehicle_id')
//     .notNull()
//     .references(() => vehicles.id, { onDelete: 'cascade' }),

//   customer_name: text('customer_name').notNull(),
//   customer_email: text('customer_email').notNull(),
//   customer_phone: text('customer_phone').notNull(),

//   pickup_location: text('pickup_location').notNull(),
//   dropoff_location: text('dropoff_location').notNull(),

//   pickup_date: text('pickup_date').notNull(),
//   return_date: text('return_date').notNull(),

//   total_price: integer('total_price').notNull(),

//   status: text('status').default('pending'), // pending, confirmed, cancelled, completed
  
//   payment_status: text('payment_status').default('unpaid'), // unpaid, paid, refunded
  
//   notes: text('notes'), // Commentaires optionnels du client

//   created_at: integer('created_at', { mode: 'timestamp' })
//     .$defaultFn(() => new Date()),
// });


























// Schéma de la base de données pour les véhicules et réservations
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// =========================
// VEHICLES TABLE
// =========================
export const vehicles = sqliteTable('vehicles', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  marque: text('marque').notNull(),
  modele: text('modele').notNull(),
  prix: integer('prix').notNull(),
  description: text('description').notNull(),
  image_data: text('image_data'), // Pour les images uploadées en Base64
  image_url: text('image_url'),   // Pour les URLs d'images
  categorie: text('categorie').default('classique'),
  created_at: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// =========================
// RESERVATIONS TABLE
// =========================
export const reservations = sqliteTable('reservations', {
  id: integer('id').primaryKey({ autoIncrement: true }),

  // Liaison avec le véhicule réservé
  vehicle_id: integer('vehicle_id')
    .notNull()
    .references(() => vehicles.id, { onDelete: 'cascade' }),

  // Informations client
  customer_name: text('customer_name').notNull(),
  customer_email: text('customer_email').notNull(),
  customer_phone: text('customer_phone').notNull(),

  // Lieux de prise en charge et dépose
  pickup_location: text('pickup_location').notNull(),
  dropoff_location: text('dropoff_location').notNull(),

  // Dates de réservation
  pickup_date: text('pickup_date').notNull(),
  return_date: text('return_date').notNull(),

  // Prix total calculé
  total_price: integer('total_price').notNull(),

  // Statut de la réservation
  status: text('status').default('pending'), // pending, confirmed, cancelled, completed
  
  // Statut du paiement
  payment_status: text('payment_status').default('unpaid'), // unpaid, paid, refunded
  
  // Commentaires optionnels du client
  notes: text('notes'),

  // Date de création
  created_at: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});