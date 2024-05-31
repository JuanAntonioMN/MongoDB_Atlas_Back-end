const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

// Controlador de gastos
const {
  crearGasto,
  obtenerTodosLosGastos,
  obtenerGastoPorId,
  actualizarGasto,
  eliminarGasto
} = require('../controladores/gastosControlador');

// Rutas CRUD para la colección de Gastos

// POST - Crear un nuevo registro de gasto
router.post('/', crearGasto);

// GET - Obtener todos los registros de gastos
router.get('/', obtenerTodosLosGastos);

// GET - Obtener un registro de gasto por su ID
router.get('/:id', obtenerGastoPorId);

// PATCH - Actualizar un registro de gasto por su ID
router.patch('/:id', actualizarGasto);

// DELETE - Eliminar un registro de gasto por su ID
router.delete('/:id', eliminarGasto);

module.exports = router;
