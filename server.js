require('dotenv').config(); // Load .env file into process.env (if it exists
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require('cors');
const pool = require('./db');

//middleware
app.use(express.json());
app.use(cors());

//routes
app.get('/ping', async (req, res) => {
  res.send({ message: `pong` });
});

app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    const addedUser = await pool.query(
      `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *`,
      [email, password]
    );
    res.send(addedUser.rows[0]);
  } catch (e) {
    console.error(e.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
