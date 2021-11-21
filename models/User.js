const Sequelize = require("sequelize")
const db = require("../config/postgres-db")

const User = db.define("Users", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    User_Name: {
        type: Sequelize.STRING
    },
    Email: {
        type: Sequelize.STRING,
        isEmail: true,
        unique: "compositeIndex"
    },
    Password: {
        type: Sequelize.STRING,
        min: 8
    },
    Role: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
})

module.exports = User