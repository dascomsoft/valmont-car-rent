// Modèle MongoDB pour les véhicules
import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  marque: {
    type: String,
    required: [true, 'La marque est requise'],
    trim: true,
  },
  modele: {
    type: String,
    required: [true, 'Le modèle est requis'],
    trim: true,
  },
  prix: {
    type: Number,
    required: [true, 'Le prix est requis'],
    min: 0,
  },
  description: {
    type: String,
    required: [true, 'La description est requise'],
  },
  image_data: {
    type: String,
    default: null,
  },
  image_url: {
    type: String,
    default: '/images/placeholder-car.jpg',
  },
  categorie: {
    type: String,
    default: 'classique',
    enum: ['classique', 'luxe', 'suv', 'utilitaire', 'sport'],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Virtual field pour compatibilité avec l'ancien code
vehicleSchema.virtual('id').get(function() {
  return this._id.toString();
});

// Index
vehicleSchema.index({ marque: 1, modele: 1 });
vehicleSchema.index({ categorie: 1 });
vehicleSchema.index({ prix: 1 });

export default mongoose.models.Vehicle || mongoose.model('Vehicle', vehicleSchema);