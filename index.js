const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('./swagger/swagger-compiled.json');

const app = express();

app.use(cors());
dotenv.config({ path: './config/config.env' });
app.use(bodyParser.json());
app.use(cookieParser())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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
const productSuppliers = require('./routes/productSuppliers');
const productReviews = require("./routes/productReviews")
const users = require('./routes/users')

app.use('/api/v1/customers', customers);
app.use('/api/v1/orders', orders);
app.use('/api/v1/orderproducts', orderProducts);
app.use('/api/v1/products', products);
app.use('/api/v1/suppliers', suppliers);
app.use('/api/v1/productSuppliers', productSuppliers);
app.use("/api/v1/productreviews", productReviews)
app.use('/api/v1/users', users)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
