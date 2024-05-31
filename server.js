require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectToMongoDB } = require('./conexionDB'); // Importa la función de conexión
const clientesRoutes = require('./rutas/clientesRutas');
const empleadosRoutes = require('./rutas/empleadosRutas');
const creditosRoutes = require('./rutas/creditosRutas');
const ventasRoutes = require('./rutas/ventasRutas');
const inventarioRoutes = require('./rutas/inventarioRutas');
const productosRoutes = require('./rutas/productosRutas');
const gastosRoutes = require('./rutas/gastosRutas');
const stockRoutes = require('./rutas/stockRutas');
const comprasRoutes = require('./rutas/comprasRutas');
const tiendasRoutes = require('./rutas/tiendasRutas');
const puestosRoutes = require('./rutas/puestosRutas');

const app = express();
app.use(express.json());
app.use(cors());

let db;

(async function() {
  try {
    db = await connectToMongoDB(); // Conecta a MongoDB
    console.log("Connected to MongoDB!");

    // Usa las rutas para cada recurso
    app.use('/clientes', clientesRoutes);
    app.use('/empleados', empleadosRoutes);
    app.use('/creditos', creditosRoutes);
    app.use('/ventas', ventasRoutes);
    app.use('/inventario', inventarioRoutes);
    app.use('/productos', productosRoutes);
    app.use('/gastos', gastosRoutes);
    app.use('/stock', stockRoutes);
    app.use('/compras', comprasRoutes);
    app.use('/tiendas', tiendasRoutes);
    app.use('/puestos', puestosRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
})();
