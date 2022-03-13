import { Sequelize } from "sequelize"
import dotenv from 'dotenv'
import CustomerModel from '../models/customer.model'
import OrderModel from "../models/order.model"
import OrderProductModel from '../models/orderProduct.model'
import ProductModel from '../models/product.model'
import ProductReviewModel from '../models/productReview.model'
import ProductSupplierModel from '../models/productSupplier.model'
import SessionModel from '../models/session.model'
import SupplierModel from '../models/supplier.model'
import UserModel from '../models/user.model'

dotenv.config({ path: `${__dirname}/config.env` })

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PWD,
  {
    host: process.env.POSTGRES_SERVER,
    dialect: 'postgres',
  }
)

sequelize.authenticate()

const DB = {
  Customer: CustomerModel(sequelize),
  Order: OrderModel(sequelize),
  OrderProduct: OrderProductModel(sequelize),
  Product: ProductModel(sequelize),
  ProductReview: ProductReviewModel(sequelize),
  ProductSupplier: ProductSupplierModel(sequelize),
  Session: SessionModel(sequelize),
  Supplier: SupplierModel(sequelize),
  User: UserModel(sequelize),
  sequelize,
  Sequelize
}

export default DB