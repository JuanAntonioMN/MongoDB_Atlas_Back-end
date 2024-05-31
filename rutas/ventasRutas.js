const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

// Controlador de ventas
const {
  crearVenta,
  obtenerTodasLasVentas,
  obtenerVentaPorId,
  actualizarVenta,
  eliminarVenta
} = require('../controladores/ventasControlador');

// Rutas CRUD para la colección de Ventas

// POST - Crear una nueva venta
router.post('/', crearVenta);

// GET - Obtener todas las ventas
router.get('/', obtenerTodasLasVentas);

// GET - Obtener una venta por su ID
router.get('/:id', obtenerVentaPorId);

// PATCH - Actualizar una venta por su ID
router.patch('/:id', actualizarVenta);

// DELETE - Eliminar una venta por su ID
router.delete('/:id', eliminarVenta);

module.exports = router;
