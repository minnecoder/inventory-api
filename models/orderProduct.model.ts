import { Model, DataTypes, Sequelize } from 'sequelize'
import { OrderProduct } from '../interfaces/orderProduct.interface'

class OrderProducts extends Model<OrderProduct> implements OrderProducts {
  declare id: number
  declare orderId: number
  declare productId: number
  declare quantityOrdered: number
  declare productStatus: string

  static associate(models: any) {
    OrderProducts.hasOne(models.Order)
    OrderProducts.hasMany(models.Product)
  }
}

export default function (sequelize: Sequelize): typeof OrderProducts {
  OrderProducts.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantityOrdered: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productStatus: {
      type: DataTypes.ENUM('created', 'picked', 'shipped', 'delivered', 'rejected', 'backordered', 'returned', 'credited'),
      defaultValue: 'created'
    }
  }, {
    sequelize,
    modelName: 'OrderProducts',
    timestamps: true
  })
  return OrderProducts
}

