const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
dotenv.config({ path: './config/config.env' });
app.use(bodyParser.json());

// DB Connection and Test
const db = require('./config/postgres-db');

db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((error) => {
    console.log('Error: ', error);
  });

// Routes

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
