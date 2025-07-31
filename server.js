const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'vatsal@98290',
    database: 'think41'
});

// 1. GET all products
app.get('/api/products', (req, res) => {
    const limit = parseInt(req.query.limit) || 100;

    connection.query('SELECT * FROM products LIMIT ?', [limit], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.status(200).json(results);
    });
});

// 2. GET product by ID
app.get('/api/products/:id', (req, res) => {
    const id = req.params.id;

    connection.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });

        if (results.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        res.status(200).json(results[0]);
    });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});