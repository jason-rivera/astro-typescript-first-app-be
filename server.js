require('dotenv').config(); // Load .env file into process.env (if it exists
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require('cors');

//middleware
app.use(express.json());
app.use(cors());

//routes
app.get('/ping', async (req, res) => {
  console.log('hit');
  res.send({ message: `pong` });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
