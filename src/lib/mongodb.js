// Connexion à MongoDB Atlas
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('❌ MONGODB_URI non définie dans .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'zuacar', // Nom de votre base de données
    }).then((mongoose) => {
      console.log('✅ Connecté à MongoDB Atlas');
      return mongoose;
    }).catch(err => {
      console.error('❌ Erreur MongoDB:', err);
      throw err;
    });
  }
  
  cached.conn = await cached.promise;
  return cached.conn;
}