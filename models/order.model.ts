import { Model, DataTypes, Sequelize } from 'sequelize'
import { Order } from '../interfaces/order.interface'

class Orders extends Model<Order> implements Order {
  declare id: number
  declare customerId: number
  declare orderStatus: string
  declare orderTotal: number

  static associate(models: any) {
    Orders.belongsTo(models.Customers)
  }
}

export default function (sequelize: Sequelize): typeof Orders {
  Orders.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    orderStatus: {
      type: DataTypes.ENUM('created', 'picked', 'shipped', 'delivered', 'rejected', 'backordered', 'returned', 'credited'),
      defaultValue: 'created',
    },
    orderTotal: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Orders',
    timestamps: true
  })
  return Orders
}