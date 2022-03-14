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
    productName: {
      type: DataTypes.STRING,
    },
    productDesc: {
      type: DataTypes.STRING,
    },
    productCost: {
      type: DataTypes.FLOAT,
    },
    productPrice: {
      type: DataTypes.FLOAT,
    },
    onHand: {
      type: DataTypes.INTEGER,
    },
    // When item hits this level a reorder is triggered
    reorderLevel: {
      type: DataTypes.INTEGER,
    },
    // The number of items to order during a reorder
    reorderQty: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Products',
    timestamps: true
  })
  return Products
}

