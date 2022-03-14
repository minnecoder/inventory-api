import { Model, DataTypes, Sequelize } from 'sequelize'
import { Customer } from '../interfaces/customer.interface'

class Customers extends Model<Customer> implements Customer {
  declare id: number
  declare customerName: string
  declare customerAddress: string
  declare customerCity: string
  declare customerState: string
  declare customerZip: string
  declare customerPhone: string
  declare customerEmail: string
}

export default function (sequelize: Sequelize): typeof Customers {
  Customers.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    customerAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    customerCity: {
      type: DataTypes.STRING,
      allowNull: false
    },
    customerState: {
      type: DataTypes.STRING,
      allowNull: false
    },
    customerZip: {
      type: DataTypes.STRING,
      allowNull: false
    },
    customerPhone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    customerEmail: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Customer',
    timestamps: true
  })
  return Customers
}

