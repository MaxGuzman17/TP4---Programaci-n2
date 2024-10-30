const express = require('express');
const cors = require('cors');
const path = require('path'); // Para manejar rutas de archivos
const app = express();
const productosRoutes = require('./routes/productos');
const rubrosRoutes = require('./routes/rubros');

// Habilitar CORS para permitir conexiones entre frontend y backend
app.use(cors());

// Servir archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, '../public')));

// Rutas de la API
app.use('/api/productos', productosRoutes);
app.use('/api/rubros', rubrosRoutes);

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
