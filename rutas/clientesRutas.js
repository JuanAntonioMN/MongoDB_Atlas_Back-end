const express = require('express');
const { MongoClient } = require('mongodb');
const { 
    createCliente, 
    getAllClientes, 
    getClienteById, 
    updateCliente, 
    deleteCliente } = require('../controladores/clientesControlador');

const router = express.Router();

// Rutas CRUD para la colección de Clientes
router.post('/', async (req, res) => createCliente(req, res, db));
router.get('/', async (req, res) => getAllClientes(req, res, db));
router.get('/:id', async (req, res) => getClienteById(req, res, db));
router.patch('/:id', async (req, res) => updateCliente(req, res, db));
router.delete('/:id', async (req, res) => deleteCliente(req, res, db));

module.exports = router;
