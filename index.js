const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('./swagger/swagger-compiled.json');

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
const customers = require('./routes/customers');
const orders = require('./routes/orders');
const orderProducts = require('./routes/orderProducts');
const products = require('./routes/products');
const suppliers = require('./routes/suppliers');

app.use('/api/v1/customers', customers);
app.use('/api/v1/orders', orders);
app.use('/api/v1/orderproducts', orderProducts);
app.use('/api/v1/products', products);
app.use('/api/v1/suppliers', suppliers);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
