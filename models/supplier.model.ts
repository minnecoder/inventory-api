import { Model, DataTypes, Sequelize } from 'sequelize';
import { Supplier } from '../interfaces/supplier.interface'

class Suppliers extends Model<Supplier> implements Suppliers {
  declare id: number
  declare supplierName: string
  declare supplierAddress: string
  declare supplierCity: string
  declare supplierState: string
  declare supplierZip: string
  declare supplierPhone: number
  declare supplierEmail: string
}

export default function (sequelize: Sequelize): typeof Suppliers {
  Suppliers.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    supplierName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    supplierAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    supplierCity: {
      type: DataTypes.STRING,
      allowNull: false
    },
    supplierState: {
      type: DataTypes.STRING,
      allowNull: false
    },
    supplierZip: {
      type: DataTypes.STRING,
      allowNull: false
    },
    supplierPhone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    supplierEmail: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Suppliers',
    timestamps: true
  })
  return Suppliers
}