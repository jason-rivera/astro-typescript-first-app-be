require('dotenv').config(); // Load .env file into process.env (if it exists
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require('cors');
const pool = require('./db');
const bcrypt = require('bcrypt');

//middleware
app.use(express.json());
app.use(cors());

//routes//

//register user
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    const addedUser = await pool.query(
      `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *`,
      [email, hashedPassword]
    );

    console.log(addedUser.rows[0]);
    res.send(addedUser.rows[0]);
  } catch (e) {
    console.error(e.message);
  }
});

//login user
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    const match = await bcrypt.compare(password, user.rows[0].password);
    if (match) {
      console.log('Password is correct');
      res.json({ message: 'GOOD' });
    } else {
      console.log('Password is incorrect');
      res.json({ message: 'BAD' });
    }

    // if (err) {
    //   console.error(err);
    //   res
    //     .status(500)
    //     .json({ message: 'There was an error. Please try again' });
    // }
  } catch (e) {
    console.error(e.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
