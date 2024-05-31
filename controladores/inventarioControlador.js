const { ObjectId } = require('mongodb');
const { db } = require('../conexionDB');

// Funciones del controlador de inventario

// Crear un nuevo producto en inventario
const crearProductoEnInventario = async (req, res) => {
  try {
    const result = await db.collection('Inventario').insertOne(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todos los productos en inventario
const obtenerTodosLosProductosEnInventario = async (req, res) => {
  try {
    const productos = await db.collection('Inventario').find().toArray();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un producto en inventario por su ID
const obtenerProductoEnInventarioPorId = async (req, res) => {
  try {
    const producto = await db.collection('Inventario').findOne({ _id: new ObjectId(req.params.id) });
    if (!producto) return res.status(404).json({ message: 'Producto en inventario no encontrado' });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un producto en inventario por su ID
const actualizarProductoEnInventario = async (req, res) => {
  try {
    const result = await db.collection('Inventario').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) return res.status(404).json({ message: 'Producto en inventario no encontrado' });
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un producto en inventario por su ID
const eliminarProductoEnInventario = async (req, res) => {
  try {
    const result = await db.collection('Inventario').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Producto en inventario no encontrado' });
    res.json({ message: 'Producto en inventario eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  crearProductoEnInventario,
  obtenerTodosLosProductosEnInventario,
  obtenerProductoEnInventarioPorId,
  actualizarProductoEnInventario,
  eliminarProductoEnInventario
};
