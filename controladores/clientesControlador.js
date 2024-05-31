const { ObjectId } = require('mongodb');
const { db } = require('../conexionDB');
async function createCliente(req, res, db) {
  try {
    const result = await db.collection('Clientes').insertOne(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getAllClientes(req, res, db) {
  try {
    const clientes = await db.collection('Clientes').find().toArray();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getClienteById(req, res, db) {
  try {
    const cliente = await db.collection('Clientes').findOne({ _id: new ObjectId(req.params.id) });
    if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateCliente(req, res, db) {
  try {
    const result = await db.collection('Clientes').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteCliente(req, res, db) {
  try {
    const result = await db.collection('Clientes').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.json({ message: 'Cliente eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createCliente,
  getAllClientes,
  getClienteById,
  updateCliente,
  deleteCliente
};
