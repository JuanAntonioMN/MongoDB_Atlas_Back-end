const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

// Controlador de compras
const {
  crearCompra,
  obtenerTodasLasCompras,
  obtenerCompraPorId,
  actualizarCompraPorId,
  eliminarCompraPorId
} = require('../controladores/comprasControlador');

// Rutas CRUD para la colección de Compras

// POST - Crear una nueva compra
router.post('/', crearCompra);

// GET - Obtener todas las compras
router.get('/', obtenerTodasLasCompras);

// GET - Obtener una compra por su ID
router.get('/:id', obtenerCompraPorId);

// PATCH - Actualizar una compra por su ID
router.patch('/:id', actualizarCompraPorId);

// DELETE - Eliminar una compra por su ID
router.delete('/:id', eliminarCompraPorId);

module.exports = router;
