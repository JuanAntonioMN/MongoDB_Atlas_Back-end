const { ObjectId } = require('mongodb');
const { db } = require('../conexionDB');

// Funciones del controlador de ventas

// Crear una nueva venta
const crearVenta = async (req, res) => {
  try {
    const result = await db.collection('Ventas').insertOne(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todas las ventas
const obtenerTodasLasVentas = async (req, res) => {
  try {
    const ventas = await db.collection('Ventas').find().toArray();
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una venta por su ID
const obtenerVentaPorId = async (req, res) => {
  try {
    const venta = await db.collection('Ventas').findOne({ _id: new ObjectId(req.params.id) });
    if (!venta) return res.status(404).json({ message: 'Venta no encontrada' });
    res.json(venta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una venta por su ID
const actualizarVenta = async (req, res) => {
  try {
    const result = await db.collection('Ventas').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) return res.status(404).json({ message: 'Venta no encontrada' });
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar una venta por su ID
const eliminarVenta = async (req, res) => {
  try {
    const result = await db.collection('Ventas').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Venta no encontrada' });
    res.json({ message: 'Venta eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  crearVenta,
  obtenerTodasLasVentas,
  obtenerVentaPorId,
  actualizarVenta,
  eliminarVenta
};
