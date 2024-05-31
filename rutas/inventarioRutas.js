const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

// Controlador de inventario
const {
  crearProductoEnInventario,
  obtenerTodosLosProductosEnInventario,
  obtenerProductoEnInventarioPorId,
  actualizarProductoEnInventario,
  eliminarProductoEnInventario
} = require('../controladores/inventarioControlador');

// Rutas CRUD para la colección de Inventario

// POST - Crear un nuevo producto en inventario
router.post('/', crearProductoEnInventario);

// GET - Obtener todos los productos en inventario
router.get('/', obtenerTodosLosProductosEnInventario);

// GET - Obtener un producto en inventario por su ID
router.get('/:id', obtenerProductoEnInventarioPorId);

// PATCH - Actualizar un producto en inventario por su ID
router.patch('/:id', actualizarProductoEnInventario);

// DELETE - Eliminar un producto en inventario por su ID
router.delete('/:id', eliminarProductoEnInventario);

module.exports = router;
