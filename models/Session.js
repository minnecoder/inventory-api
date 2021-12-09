const Sequelize = require('sequelize')
const db = require('../config/postgres-db')

const Session = db.define('Sessions', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    session_token: {
        type: Sequelize.STRING
    },
    userId: {
        type: Sequelize.INTEGER
    },
    valid: {
        type: Sequelize.BOOLEAN
    },
    user_agent: {
        type: Sequelize.STRING
    },
    ip: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
})

module.exports = Session