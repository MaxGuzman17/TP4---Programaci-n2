const express = require('express');
const router = express.Router();
const connection = require('../db/conexion');

// Ruta para obtener los rubros
router.get('/', (req, res) => {
    connection.query('SELECT Codigo, Descripcion FROM Rubros', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

module.exports = router;
