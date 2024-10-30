const express = require('express');
const router = express.Router();
const connection = require('../db/conexion');

// Ruta para obtener los productos con búsqueda y filtrado
router.get('/', (req, res) => {
    const search = req.query.search || '';
    const rubro = req.query.rubro || '';

    let query = `SELECT pro.Codigo, pro.Descripcion, pro.Precio, pro.URLImagen, rub.Descripcion AS Rubro
                FROM Productos pro
                LEFT JOIN Rubros rub ON rub.Codigo = pro.Rubro
                WHERE pro.Descripcion LIKE ?`;
    let queryParams = [`%${search}%`];

    if (rubro) {
        query += ' AND pro.Rubro = ?';
        queryParams.push(rubro);
    }

    connection.query(query, queryParams, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

module.exports = router;
