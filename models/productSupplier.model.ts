import { Model, DataTypes, Sequelize } from 'sequelize'
import { ProductSupplier } from '../interfaces/productSupplier.interface'

class ProductSuppliers extends Model<ProductSupplier> implements ProductSuppliers {
  declare id: number
  declare productId: number
  declare supplierId: number
  declare productSupplierNotes: string

  static associate(models: any) {
    ProductSuppliers.hasMany(models.Products)
    ProductSuppliers.hasOne(models.Supplier)
  }
}

export default function (sequelize: Sequelize): typeof ProductSuppliers {
  ProductSuppliers.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    supplierId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    productSupplierNotes: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ProductSuppliers',
    timestamps: true
  })
  return ProductSuppliers

}
