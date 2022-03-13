import { Model, DataTypes, Sequelize } from 'sequelize'
import { ProductReview } from '../interfaces/productReview.interface'

class ProductReviews extends Model<ProductReview> implements ProductReviews {
    declare id: number
    declare productId: number
    declare userId: number
    declare rating: number
    declare reviewText: string

    static associate(models: any) {
        ProductReviews.hasOne(models.Product)
        ProductReviews.hasOne(models.User)
    }
}

export default function (sequelize: Sequelize): typeof ProductReviews {
    ProductReviews.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rating: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        reviewText: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'ProductReview',
        timestamps: true
    })
    return ProductReviews
}

