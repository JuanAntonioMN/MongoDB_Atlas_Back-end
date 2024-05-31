const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

// Controlador de puestos
const {
  crearPuesto,
  obtenerTodosLosPuestos,
  obtenerPuestoPorId,
  actualizarPuestoPorId,
  eliminarPuestoPorId
} = require('../controladores/puestosControlador');

// Rutas CRUD para la colección de Puestos

// POST - Crear un nuevo puesto
router.post('/', crearPuesto);

// GET - Obtener todos los puestos
router.get('/', obtenerTodosLosPuestos);

// GET - Obtener un puesto por su ID
router.get('/:id', obtenerPuestoPorId);

// PATCH - Actualizar un puesto por su ID
router.patch('/:id', actualizarPuestoPorId);

// DELETE - Eliminar un puesto por su ID
router.delete('/:id', eliminarPuestoPorId);

module.exports = router;
