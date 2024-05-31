const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

// Controlador de productos
const {
  crearProducto,
  obtenerTodosLosProductos,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto
} = require('../controladores/productosControlador');

// Rutas CRUD para la colección de Productos

// POST - Crear un nuevo producto
router.post('/', crearProducto);

// GET - Obtener todos los productos
router.get('/', obtenerTodosLosProductos);

// GET - Obtener un producto por su ID
router.get('/:id', obtenerProductoPorId);

// PATCH - Actualizar un producto por su ID
router.patch('/:id', actualizarProducto);

// DELETE - Eliminar un producto por su ID
router.delete('/:id', eliminarProducto);

module.exports = router;
