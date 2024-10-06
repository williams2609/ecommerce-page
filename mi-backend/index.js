const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const sequelize = require('./config/database');
const Product = require('./models/product');
const Category = require('./models/Category');

const categoryRoutes = require('./routes/categoryRoutes'); // Asegúrate de que la ruta sea correcta
const productRoutes = require('./routes/productRputes'); // Corrige el nombre del archivo

// Middleware para parsear JSON
app.use(express.json());
app.use(cors());

// Rutas
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);

app.get("/", (req, res) => {
    res.send("Servidor funcionando");
});

// Sincronizar la base de datos y levantar el servidor
sequelize.sync({ force: false }) // Cambia a true si necesitas resetear la base de datos
    .then(() => {
        console.log("Base de datos sincronizada");
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.error('Error al sincronizar la base de datos:', error);
    });