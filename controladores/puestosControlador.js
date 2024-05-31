const { ObjectId } = require('mongodb');
const { db } = require('../conexionDB');

// Funciones del controlador de puestos

// Crear un nuevo puesto
const crearPuesto = async (req, res) => {
  try {
    const result = await db.collection('Puesto').insertOne(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todos los puestos
const obtenerTodosLosPuestos = async (req, res) => {
  try {
    const puestos = await db.collection('Puesto').find().toArray();
    res.json(puestos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un puesto por su ID
const obtenerPuestoPorId = async (req, res) => {
  try {
    const puesto = await db.collection('Puesto').findOne({ _id: new ObjectId(req.params.id) });
    if (!puesto) return res.status(404).json({ message: 'Puesto no encontrado' });
    res.json(puesto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un puesto por su ID
const actualizarPuestoPorId = async (req, res) => {
  try {
    const result = await db.collection('Puesto').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) return res.status(404).json({ message: 'Puesto no encontrado' });
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un puesto por su ID
const eliminarPuestoPorId = async (req, res) => {
  try {
    const result = await db.collection('Puesto').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Puesto no encontrado' });
    res.json({ message: 'Puesto eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  crearPuesto,
  obtenerTodosLosPuestos,
  obtenerPuestoPorId,
  actualizarPuestoPorId,
  eliminarPuestoPorId
};
