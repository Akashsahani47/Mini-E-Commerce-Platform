const pool = require('../config/db');

exports.addProduct = async (req, res) => {
  const { name, price, description, imageurl } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO products (name, price, description, imageurl) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, price, description, imageurl]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
