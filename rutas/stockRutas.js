const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

// Controlador de stock
const {
  actualizarStock,
  obtenerTodoElStock,
  obtenerStockPorId,
  actualizarStockPorId,
  eliminarStockPorId
} = require('../controladores/stockControlador');

// Rutas CRUD para la colección de Stock

// POST - Actualizar el stock de un producto
router.post('/', actualizarStock);

// GET - Obtener todo el stock
router.get('/', obtenerTodoElStock);

// GET - Obtener el stock de un producto por su ID
router.get('/:id', obtenerStockPorId);

// PATCH - Actualizar el stock de un producto por su ID
router.patch('/:id', actualizarStockPorId);

// DELETE - Eliminar el stock de un producto por su ID
router.delete('/:id', eliminarStockPorId);

module.exports = router;
