const { ObjectId } = require('mongodb');
const { db } = require('../conexionDB');

// Funciones del controlador de empleados

// Crear un nuevo empleado
const crearEmpleado = async (req, res) => {
  try {
    const result = await db.collection('Empleados').insertOne(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todos los empleados
const obtenerTodosLosEmpleados = async (req, res) => {
  try {
    const empleados = await db.collection('Empleados').find().toArray();
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un empleado por su ID
const obtenerEmpleadoPorId = async (req, res) => {
  try {
    const empleado = await db.collection('Empleados').findOne({ _id: new ObjectId(req.params.id) });
    if (!empleado) return res.status(404).json({ message: 'Empleado no encontrado' });
    res.json(empleado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un empleado por su ID
const actualizarEmpleado = async (req, res) => {
  try {
    const result = await db.collection('Empleados').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) return res.status(404).json({ message: 'Empleado no encontrado' });
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un empleado por su ID
const eliminarEmpleado = async (req, res) => {
  try {
    const result = await db.collection('Empleados').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Empleado no encontrado' });
    res.json({ message: 'Empleado eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  crearEmpleado,
  obtenerTodosLosEmpleados,
  obtenerEmpleadoPorId,
  actualizarEmpleado,
  eliminarEmpleado
};
