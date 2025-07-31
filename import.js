const fs = require('fs');
const csv = require('csv-parser');
const mysql = require('mysql2');

// Set up MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'vatsal@98290',
    database: 'think41'
});

// Connect to MySQL
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// Read and insert CSV data
fs.createReadStream('products.csv')
    .pipe(csv())
    .on('data', (row) => {
        const {
            id, cost, category, name, brand,
            'retail_price': retailPrice, department,
            'sku': sku, 'distribution_center_id': dcId
        } = row;

        const sql = `INSERT INTO products 
      (id, cost, category, name, brand, retail_price, department, sku, distribution_center_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
            parseInt(id), parseFloat(cost), category, name, brand,
            parseFloat(retailPrice), department, sku, parseInt(dcId)
        ];

        connection.query(sql, values, (err) => {
            if (err) console.error(`Error inserting row with ID ${id}:`, err.message);
        });
    })
    .on('end', () => {
        console.log('CSV import completed.');
        connection.end();
    });