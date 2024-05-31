const { ObjectId } = require('mongodb');
const { db } = require('../conexionDB');
// Funciones del controlador de créditos

// Crear un nuevo crédito
const crearCredito = async (req, res) => {
  try {
    const result = await db.collection('Creditos').insertOne(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todos los créditos
const obtenerTodosLosCreditos = async (req, res) => {
  try {
    const creditos = await db.collection('Creditos').find().toArray();
    res.json(creditos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un crédito por su ID
const obtenerCreditoPorId = async (req, res) => {
  try {
    const credito = await db.collection('Creditos').findOne({ _id: new ObjectId(req.params.id) });
    if (!credito) return res.status(404).json({ message: 'Crédito no encontrado' });
    res.json(credito);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un crédito por su ID
const actualizarCredito = async (req, res) => {
  try {
    const result = await db.collection('Creditos').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) return res.status(404).json({ message: 'Crédito no encontrado' });
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un crédito por su ID
const eliminarCredito = async (req, res) => {
  try {
    const result = await db.collection('Creditos').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Crédito no encontrado' });
    res.json({ message: 'Crédito eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  crearCredito,
  obtenerTodosLosCreditos,
  obtenerCreditoPorId,
  actualizarCredito,
  eliminarCredito
};
