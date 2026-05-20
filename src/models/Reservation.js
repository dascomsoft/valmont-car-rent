// Modèle MongoDB pour les réservations
import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: [true, 'Le véhicule est requis'],
  },
  customer_name: {
    type: String,
    required: [true, 'Le nom est requis'],
    trim: true,
  },
  customer_email: {
    type: String,
    required: [true, 'L\'email est requis'],
    lowercase: true,
    trim: true,
  },
  customer_phone: {
    type: String,
    required: [true, 'Le téléphone est requis'],
  },
  pickup_location: {
    type: String,
    required: [true, 'Le lieu de prise en charge est requis'],
  },
  dropoff_location: {
    type: String,
    required: [true, 'Le lieu de dépose est requis'],
  },
  pickup_date: {
    type: String,
    required: true,
  },

  pickup_time: {           // ← AJOUTER CETTE LIGNE
  type: String,
  required: true,
},
  return_date: {
    type: String,
    required: true,
  },

  return_time: {           // ← AJOUTER CETTE LIGNE
  type: String,
  required: true,
},
  total_price: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ['pending', 'pending_payment', 'confirmed', 'in_progress', 'completed', 'cancelled', 'expired'],
    default: 'pending',
  },
  payment_status: {
    type: String,
    enum: ['unpaid', 'paid', 'refunded'],
    default: 'unpaid',
  },
  notes: {
    type: String,
    default: null,
  },
  expires_at: {
    type: Date,
    default: () => new Date(Date.now() + 15 * 60 * 1000),
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Virtual fields pour compatibilité
reservationSchema.virtual('id').get(function() {
  return this._id.toString();
});

reservationSchema.virtual('vehicle_id').get(function() {
  return this.vehicleId?.toString();
});

// Index pour performances
reservationSchema.index({ vehicleId: 1, pickup_date: 1, return_date: 1 });
reservationSchema.index({ customer_email: 1 });
reservationSchema.index({ status: 1 });
reservationSchema.index({ expires_at: 1 });

export default mongoose.models.Reservation || mongoose.model('Reservation', reservationSchema);