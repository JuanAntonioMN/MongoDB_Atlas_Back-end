const { ObjectId } = require('mongodb');
const { db } = require('../conexionDB');

// Funciones del controlador de gastos

// Crear un nuevo registro de gasto
const crearGasto = async (req, res) => {
  try {
    const result = await db.collection('Gastos').insertOne(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todos los registros de gastos
const obtenerTodosLosGastos = async (req, res) => {
  try {
    const gastos = await db.collection('Gastos').find().toArray();
    res.json(gastos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un registro de gasto por su ID
const obtenerGastoPorId = async (req, res) => {
  try {
    const gasto = await db.collection('Gastos').findOne({ _id: new ObjectId(req.params.id) });
    if (!gasto) return res.status(404).json({ message: 'Registro de gasto no encontrado' });
    res.json(gasto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un registro de gasto por su ID
const actualizarGasto = async (req, res) => {
  try {
    const result = await db.collection('Gastos').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) return res.status(404).json({ message: 'Registro de gasto no encontrado' });
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un registro de gasto por su ID
const eliminarGasto = async (req, res) => {
  try {
    const result = await db.collection('Gastos').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Registro de gasto no encontrado' });
    res.json({ message: 'Registro de gasto eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  crearGasto,
  obtenerTodosLosGastos,
  obtenerGastoPorId,
  actualizarGasto,
  eliminarGasto
};
