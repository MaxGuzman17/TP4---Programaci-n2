const mysql = require('mysql');

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
    host: 'localhost',      
    user: 'root',          
    password: '3617206Lila',           
    database: 'ecommerce'
});

// Conectar a MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.stack);
        return;
    }
    console.log('Conexión a la base de datos exitosa');
});

module.exports = connection;
