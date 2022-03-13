import { Model, DataTypes, Sequelize } from 'sequelize'
import { Session } from '../interfaces/session.interface'

class Sessions extends Model<Session> implements Sessions {
    declare id: number
    declare sessionToken: string
    declare userId: number
    declare valid: boolean
    declare userAgent: string
    declare ip: string
}

export default function (sequelize: Sequelize): typeof Sessions {
    Sessions.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        sessionToken: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        valid: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        userAgent: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ip: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Sessions',
        timestamps: true
    })
    return Sessions
}
