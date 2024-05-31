const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
 
const app = express();


// Middleware para parsear JSON
app.use(bodyParser.json());

// URI de conexión a MongoDB Atlas
const uri = "mongodb+srv://Equipo:holamundo@uaa.lvs1ml1.mongodb.net/?retryWrites=true&w=majority&appName=UAA";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

// Conectar a MongoDB y iniciar el servidor
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    db = client.db('Coppel'); // Reemplaza 'Coppel' con el nombre de tu base de datos

    // Iniciar el servidor de Express después de conectar a MongoDB
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });

  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
}

connectToMongoDB();

/*CLIENTES 1*/
// Rutas CRUD para la colección de Clientes
// POST - Crear un nuevo cliente
app.post('/clientes', async (req, res) => {
  try {
    const result = await db.collection('Clientes').insertOne(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET - Obtener todos los clientes
app.get('/clientes', async (req, res) => {
  try {
    const clientes = await db.collection('Clientes').find().toArray();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Obtener un cliente por su ID
app.get('/clientes/:id', async (req, res) => {
  try {
    const cliente = await db.collection('Clientes').findOne({ _id: new ObjectId(req.params.id) });
    if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH - Actualizar un cliente por su ID
app.patch('/clientes/:id', async (req, res) => {
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
});

// DELETE - Eliminar un cliente por su ID
app.delete('/clientes/:id', async (req, res) => {
  try {
    const result = await db.collection('Clientes').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.json({ message: 'Cliente eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*EMPLEADOS 2*/
// POST - Crear un nuevo empleado
app.post('/empleados', async (req, res) => {
  try {
    const result = await db.collection('Empleados').insertOne(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET - Obtener todos los empleados
app.get('/empleados', async (req, res) => {
  try {
    const empleados = await db.collection('Empleados').find().toArray();
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Obtener un empleado por su ID
app.get('/empleados/:id', async (req, res) => {
  try {
    const empleado = await db.collection('Empleados').findOne({ _id: new ObjectId(req.params.id) });
    if (!empleado) return res.status(404).json({ message: 'Empleado no encontrado' });
    res.json(empleado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH - Actualizar un empleado por su ID
app.patch('/empleados/:id', async (req, res) => {
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
});

// DELETE - Eliminar un empleado por su ID
app.delete('/empleados/:id', async (req, res) => {
  try {
    const result = await db.collection('Empleados').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Empleado no encontrado' });
    res.json({ message: 'Empleado eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*CREDITOS 3*/
// POST - Crear un nuevo crédito
app.post('/creditos', async (req, res) => {
  try {
    const result = await db.collection('Creditos').insertOne(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET - Obtener todos los créditos
app.get('/creditos', async (req, res) => {
  try {
    const creditos = await db.collection('Creditos').find().toArray();
    res.json(creditos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Obtener un crédito por su ID
app.get('/creditos/:id', async (req, res) => {
  try {
    const credito = await db.collection('Creditos').findOne({ _id: new ObjectId(req.params.id) });
    if (!credito) return res.status(404).json({ message: 'Crédito no encontrado' });
    res.json(credito);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH - Actualizar un crédito por su ID
app.patch('/creditos/:id', async (req, res) => {
  try {
    const result = await db.collection('Creditos').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) return res.status(404).json({ message: 'Crédito no encontrado' });
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Eliminar un crédito por su ID
app.delete('/creditos/:id', async (req, res) => {
  try {
    const result = await db.collection('Creditos').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Crédito no encontrado' });
    res.json({ message: 'Crédito eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


/*VENTAS 4*/
// POST - Crear una nueva venta
app.post('/ventas', async (req, res) => {
  try {
    const result = await db.collection('Ventas').insertOne(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET - Obtener todas las ventas
app.get('/ventas', async (req, res) => {
  try {
    const ventas = await db.collection('Ventas').find().toArray();
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Obtener una venta por su ID
app.get('/ventas/:id', async (req, res) => {
  try {
    const venta = await db.collection('Ventas').findOne({ _id: new ObjectId(req.params.id) });
    if (!venta) return res.status(404).json({ message: 'Venta no encontrada' });
    res.json(venta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH - Actualizar una venta por su ID
app.patch('/ventas/:id', async (req, res) => {
  try {
    const result = await db.collection('Ventas').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) return res.status(404).json({ message: 'Venta no encontrada' });
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Eliminar una venta por su ID
app.delete('/ventas/:id', async (req, res) => {
  try {
    const result = await db.collection('Ventas').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Venta no encontrada' });
    res.json({ message: 'Venta eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*INVENTARIO 5*/
// POST - Crear un nuevo producto en inventario
app.post('/inventario', async (req, res) => {
  try {
    const result = await db.collection('Inventario').insertOne(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET - Obtener todos los productos en inventario
app.get('/inventario', async (req, res) => {
  try {
    const productos = await db.collection('Inventario').find().toArray();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Obtener un producto en inventario por su ID
app.get('/inventario/:id', async (req, res) => {
  try {
    const producto = await db.collection('Inventario').findOne({ _id: new ObjectId(req.params.id) });
    if (!producto) return res.status(404).json({ message: 'Producto en inventario no encontrado' });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH - Actualizar un producto en inventario por su ID
app.patch('/inventario/:id', async (req, res) => {
  try {
    const result = await db.collection('Inventario').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) return res.status(404).json({ message: 'Producto en inventario no encontrado' });
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Eliminar un producto en inventario por su ID
app.delete('/inventario/:id', async (req, res) => {
  try {
    const result = await db.collection('Inventario').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Producto en inventario no encontrado' });
    res.json({ message: 'Producto en inventario eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*PRODUCTOS 6*/
// POST - Crear un nuevo producto
app.post('/productos', async (req, res) => {
  try {
    const result = await db.collection('Productos').insertOne(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET - Obtener todos los productos
app.get('/productos', async (req, res) => {
  try {
    const productos = await db.collection('Productos').find().toArray();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Obtener un producto por su ID
app.get('/productos/:id', async (req, res) => {
  try {
    const producto = await db.collection('Productos').findOne({ _id: new ObjectId(req.params.id) });
    if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH - Actualizar un producto por su ID
app.patch('/productos/:id', async (req, res) => {
  try {
    const result = await db.collection('Productos').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Eliminar un producto por su ID
app.delete('/productos/:id', async (req, res) => {
  try {
    const result = await db.collection('Productos').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*GASTOS 7*/
// POST - Crear un nuevo registro de gasto
app.post('/gastos', async (req, res) => {
  try {
    const result = await db.collection('Gastos').insertOne(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET - Obtener todos los registros de gastos
app.get('/gastos', async (req, res) => {
  try {
    const gastos = await db.collection('Gastos').find().toArray();
    res.json(gastos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Obtener un registro de gasto por su ID
app.get('/gastos/:id', async (req, res) => {
  try {
    const gasto = await db.collection('Gastos').findOne({ _id: new ObjectId(req.params.id) });
    if (!gasto) return res.status(404).json({ message: 'Registro de gasto no encontrado' });
    res.json(gasto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH - Actualizar un registro de gasto por su ID
app.patch('/gastos/:id', async (req, res) => {
  try {
    const result = await db.collection('Gastos').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) return res.status(404).json({ message: 'Registro de gasto no encontrado' });
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Eliminar un registro de gasto por su ID
app.delete('/gastos/:id', async (req, res) => {
  try {
    const result = await db.collection('Gastos').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Registro de gasto no encontrado' });
    res.json({ message: 'Registro de gasto eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*STOCK 8*/
// POST - Actualizar el stock de un producto
app.post('/stock', async (req, res) => {
  try {
    const result = await db.collection('Stock').insertOne(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET - Obtener todo el stock
app.get('/stock', async (req, res) => {
  try {
    const stock = await db.collection('Stock').find().toArray();
    res.json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Obtener el stock de un producto por su ID
app.get('/stock/:id', async (req, res) => {
  try {
    const stock = await db.collection('Stock').findOne({ _id: new ObjectId(req.params.id) });
    if (!stock) return res.status(404).json({ message: 'Stock no encontrado' });
    res.json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH - Actualizar el stock de un producto por su ID
app.patch('/stock/:id', async (req, res) => {
  try {
    const result = await db.collection('Stock').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) return res.status(404).json({ message: 'Stock no encontrado' });
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Eliminar el stock de un producto por su ID
app.delete('/stock/:id', async (req, res) => {
  try {
    const result = await db.collection('Stock').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Stock no encontrado' });
    res.json({ message: 'Stock eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*COMPRAS 9*/
// POST - Crear una nueva compra
app.post('/compras', async (req, res) => {
  try {
    const result = await db.collection('Compras').insertOne(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET - Obtener todas las compras
app.get('/compras', async (req, res) => {
  try {
    const compras = await db.collection('Compras').find().toArray();
    res.json(compras);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Obtener una compra por su ID
app.get('/compras/:id', async (req, res) => {
  try {
    const compra = await db.collection('Compras').findOne({ _id: new ObjectId(req.params.id) });
    if (!compra) return res.status(404).json({ message: 'Compra no encontrada' });
    res.json(compra);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH - Actualizar una compra por su ID
app.patch('/compras/:id', async (req, res) => {
  try {
    const result = await db.collection('Compras').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) return res.status(404).json({ message: 'Compra no encontrada' });
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Eliminar una compra por su ID
app.delete('/compras/:id', async (req, res) => {
  try {
    const result = await db.collection('Compras').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Compra no encontrada' });
    res.json({ message: 'Compra eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*TIENDAS 10*/

// POST - Crear una nueva tienda
app.post('/tiendas', async (req, res) => {
  try {
    const result = await db.collection('Tienda').insertOne(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET - Obtener todas las tiendas
app.get('/tiendas', async (req, res) => {
  try {
    const tiendas = await db.collection('Tienda').find().toArray();
    res.json(tiendas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Obtener una tienda por su ID
app.get('/tiendas/:id', async (req, res) => {
  try {
    const tienda = await db.collection('Tienda').findOne({ _id: new ObjectId(req.params.id) });
    if (!tienda) return res.status(404).json({ message: 'Tienda no encontrada' });
    res.json(tienda);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH - Actualizar una tienda por su ID
app.patch('/tiendas/:id', async (req, res) => {
  try {
    const result = await db.collection('Tienda').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) return res.status(404).json({ message: 'Tienda no encontrada' });
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Eliminar una tienda por su ID
app.delete('/tiendas/:id', async (req, res) => {
  try {
    const result = await db.collection('Tienda').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Tienda no encontrada' });
    res.json({ message: 'Tienda eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*PUESTOS 11*/
// POST - Crear un nuevo puesto
app.post('/puestos', async (req, res) => {
  try {
    const result = await db.collection('Puesto').insertOne(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET - Obtener todos los puestos
app.get('/puestos', async (req, res) => {
  try {
    const puestos = await db.collection('Puesto').find().toArray();
    res.json(puestos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Obtener un puesto por su ID
app.get('/puestos/:id', async (req, res) => {
  try {
    const puesto = await db.collection('Puesto').findOne({ _id: new ObjectId(req.params.id) });
    if (!puesto) return res.status(404).json({ message: 'Puesto no encontrado' });
    res.json(puesto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATCH - Actualizar un puesto por su ID
app.patch('/puestos/:id', async (req, res) => {
  try {
    const result = await db.collection('Puesto').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) return res.status(404).json({ message: 'Puesto no encontrado' });
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Eliminar un puesto por su ID
app.delete('/puestos/:id', async (req, res) => {
  try {
    const result = await db.collection('Puesto').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Puesto no encontrado' });
    res.json({ message: 'Puesto eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});








// Manejo de errores 404 para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});
