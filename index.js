const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

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

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Inventory API',
      description: 'Inventory API for e-commerce applications',
    },
    servers: [
      {
        url: 'http://localhost:4000/api/v1',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)));
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
