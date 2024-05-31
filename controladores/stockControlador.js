const { ObjectId } = require('mongodb');
const { db } = require('../conexionDB');

// Funciones del controlador de stock

// Actualizar el stock de un producto
const actualizarStock = async (req, res) => {
  try {
    const result = await db.collection('Stock').insertOne(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todo el stock
const obtenerTodoElStock = async (req, res) => {
  try {
    const stock = await db.collection('Stock').find().toArray();
    res.json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener el stock de un producto por su ID
const obtenerStockPorId = async (req, res) => {
  try {
    const stock = await db.collection('Stock').findOne({ _id: new ObjectId(req.params.id) });
    if (!stock) return res.status(404).json({ message: 'Stock no encontrado' });
    res.json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar el stock de un producto por su ID
const actualizarStockPorId = async (req, res) => {
  try {
    const result = await db.collection('Stock').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) return res.status(404).json({ message: 'Stock no encontrado' });
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar el stock de un producto por su ID
const eliminarStockPorId = async (req, res) => {
  try {
    const result = await db.collection('Stock').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Stock no encontrado' });
    res.json({ message: 'Stock eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  actualizarStock,
  obtenerTodoElStock,
  obtenerStockPorId,
  actualizarStockPorId,
  eliminarStockPorId
};
