const { ObjectId } = require('mongodb');
const { db } = require('../conexionDB');

// Funciones del controlador de tiendas

// Crear una nueva tienda
const crearTienda = async (req, res) => {
  try {
    const result = await db.collection('Tienda').insertOne(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todas las tiendas
const obtenerTodasLasTiendas = async (req, res) => {
  try {
    const tiendas = await db.collection('Tienda').find().toArray();
    res.json(tiendas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una tienda por su ID
const obtenerTiendaPorId = async (req, res) => {
  try {
    const tienda = await db.collection('Tienda').findOne({ _id: new ObjectId(req.params.id) });
    if (!tienda) return res.status(404).json({ message: 'Tienda no encontrada' });
    res.json(tienda);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una tienda por su ID
const actualizarTiendaPorId = async (req, res) => {
  try {
    const result = await db.collection('Tienda').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) return res.status(404).json({ message: 'Tienda no encontrada' });
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar una tienda por su ID
const eliminarTiendaPorId = async (req, res) => {
  try {
    const result = await db.collection('Tienda').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Tienda no encontrada' });
    res.json({ message: 'Tienda eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  crearTienda,
  obtenerTodasLasTiendas,
  obtenerTiendaPorId,
  actualizarTiendaPorId,
  eliminarTiendaPorId
};

