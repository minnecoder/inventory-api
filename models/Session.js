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
    user_Id: {
        type: Sequelize.INTEGER
    },
    role: {
        type: Sequelize.STRING
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