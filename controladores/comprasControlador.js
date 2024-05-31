const { ObjectId } = require('mongodb');
const { db } = require('../conexionDB');

// Funciones del controlador de compras

// Crear una nueva compra
const crearCompra = async (req, res) => {
  try {
    const result = await db.collection('Compras').insertOne(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todas las compras
const obtenerTodasLasCompras = async (req, res) => {
  try {
    const compras = await db.collection('Compras').find().toArray();
    res.json(compras);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una compra por su ID
const obtenerCompraPorId = async (req, res) => {
  try {
    const compra = await db.collection('Compras').findOne({ _id: new ObjectId(req.params.id) });
    if (!compra) return res.status(404).json({ message: 'Compra no encontrada' });
    res.json(compra);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una compra por su ID
const actualizarCompraPorId = async (req, res) => {
  try {
    const result = await db.collection('Compras').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) return res.status(404).json({ message: 'Compra no encontrada' });
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar una compra por su ID
const eliminarCompraPorId = async (req, res) => {
  try {
    const result = await db.collection('Compras').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Compra no encontrada' });
    res.json({ message: 'Compra eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  crearCompra,
  obtenerTodasLasCompras,
  obtenerCompraPorId,
  actualizarCompraPorId,
  eliminarCompraPorId
};
