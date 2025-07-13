const pool = require('../db');

exports.createUser = async (username, password) => {
  const res = await pool.query(
    `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id`,
    [username, password]
  );
  return res.rows[0].id;
};

exports.getUserByUsername = async (username) => {
  const res = await pool.query(
    'SELECT * FROM users WHERE username = $1',
    [username]
  );
  return res.rows[0];
};
