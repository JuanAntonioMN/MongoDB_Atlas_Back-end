const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

// Controlador de tiendas
const {
  crearTienda,
  obtenerTodasLasTiendas,
  obtenerTiendaPorId,
  actualizarTiendaPorId,
  eliminarTiendaPorId
} = require('../controladores/tiendaControlador');

// Rutas CRUD para la colección de Tiendas

// POST - Crear una nueva tienda
router.post('/', crearTienda);

// GET - Obtener todas las tiendas
router.get('/', obtenerTodasLasTiendas);

// GET - Obtener una tienda por su ID
router.get('/:id', obtenerTiendaPorId);

// PATCH - Actualizar una tienda por su ID
router.patch('/:id', actualizarTiendaPorId);

// DELETE - Eliminar una tienda por su ID
router.delete('/:id', eliminarTiendaPorId);

module.exports = router;
