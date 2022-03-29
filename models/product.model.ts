import { Model, DataTypes, Sequelize } from 'sequelize'
import { Product } from '../interfaces/product.interface'

class Products extends Model<Product> implements Products {
  declare id: number
  declare productName: string
  declare productDesc: string
  declare productCost: number
  declare productPrice: number
  declare onHand: number
  declare reorderLevel: number
  declare reorderQty: number
}

export default function (sequelize: Sequelize): typeof Products {
  Products.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    productDesc: {
      type: DataTypes.STRING,
      allowNull: false
    },
    productCost: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    productPrice: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    onHand: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    // When item hits this level a reorder is triggered
    reorderLevel: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    // The number of items to order during a reorder
    reorderQty: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Products',
    timestamps: true
  })
  return Products
}

