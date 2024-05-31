const { MongoClient } = require('mongodb');

// URI de conexión a MongoDB Atlas
const MONGODB_URI = process.env.MONGODB_URI;
const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

// Función para conectar a MongoDB
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    db = client.db('Coppel'); // Reemplaza 'Coppel' con el nombre de tu base de datos
    return db;
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
}

module.exports = { connectToMongoDB, db };
