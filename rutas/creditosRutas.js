const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

// Controlador de créditos
const {
  crearCredito,
  obtenerTodosLosCreditos,
  obtenerCreditoPorId,
  actualizarCredito,
  eliminarCredito
} = require('../controladores/creditosControlador');

// Rutas CRUD para la colección de Creditos

// POST - Crear un nuevo crédito
router.post('/', crearCredito);

// GET - Obtener todos los créditos
router.get('/', obtenerTodosLosCreditos);

// GET - Obtener un crédito por su ID
router.get('/:id', obtenerCreditoPorId);

// PATCH - Actualizar un crédito por su ID
router.patch('/:id', actualizarCredito);

// DELETE - Eliminar un crédito por su ID
router.delete('/:id', eliminarCredito);

module.exports = router;
