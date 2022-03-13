import { Model, DataTypes, Sequelize } from "sequelize"
import { User } from '../interfaces/user.interface'

class Users extends Model<User> implements Users {
    declare id: number
    declare firstName: string
    declare lastName: string
    declare email: string
    declare verified: boolean
    declare password: string
    declare role: string
}

export default function (sequelize: Sequelize): typeof Users {
    Users.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: "user"
        }
    }, {
        sequelize,
        modelName: 'Users',
        timestamps: true
    })
    return Users
}