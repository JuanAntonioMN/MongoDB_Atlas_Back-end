const { ObjectId } = require('mongodb');
const { db } = require('../conexionDB');

// Funciones del controlador de productos

// Crear un nuevo producto
const crearProducto = async (req, res) => {
  try {
    const result = await db.collection('Productos').insertOne(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todos los productos
const obtenerTodosLosProductos = async (req, res) => {
  try {
    const productos = await db.collection('Productos').find().toArray();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un producto por su ID
const obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await db.collection('Productos').findOne({ _id: new ObjectId(req.params.id) });
    if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un producto por su ID
const actualizarProducto = async (req, res) => {
  try {
    const result = await db.collection('Productos').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un producto por su ID
const eliminarProducto = async (req, res) => {
  try {
    const result = await db.collection('Productos').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  crearProducto,
  obtenerTodosLosProductos,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto
};
