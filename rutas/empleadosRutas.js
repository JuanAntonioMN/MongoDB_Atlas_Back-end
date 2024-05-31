const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

// Controlador de empleados
const {
  crearEmpleado,
  obtenerTodosLosEmpleados,
  obtenerEmpleadoPorId,
  actualizarEmpleado,
  eliminarEmpleado
} = require('../controladores/empleadosControlador');

// Rutas CRUD para la colección de Empleados

// POST - Crear un nuevo empleado
router.post('/', crearEmpleado);

// GET - Obtener todos los empleados
router.get('/', obtenerTodosLosEmpleados);

// GET - Obtener un empleado por su ID
router.get('/:id', obtenerEmpleadoPorId);

// PATCH - Actualizar un empleado por su ID
router.patch('/:id', actualizarEmpleado);

// DELETE - Eliminar un empleado por su ID
router.delete('/:id', eliminarEmpleado);

module.exports = router;
