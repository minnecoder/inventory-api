import Sequelize from "sequelize"
import { getDB } from '../utils/dbConnection'
import { Product } from "./Product"
import { User } from "./User"

const db = getDB()

export const ProductReview = db.define("Product_Reviews", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ProductId: {
        type: Sequelize.INTEGER,
        references: {
            model: Product,
            key: 'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        },
    },
    UserId: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: "id",
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        },
    },
    Rating: {
        type: Sequelize.FLOAT
    },
    Review_Text: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
})

Product.hasMany(ProductReview)
ProductReview.belongsTo(Product)
User.hasMany(ProductReview)
ProductReview.belongsTo(User)

module.exports = ProductReview