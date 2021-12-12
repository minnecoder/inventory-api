const Sequelize = require("sequelize")
const db = require("../config/postgres-db")

const User = db.define("Users", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    First_Name: {
        type: Sequelize.STRING
    },
    Last_Name: {
        type: Sequelize.STRING
    },
    Email: {
        type: Sequelize.STRING,
        isEmail: true,
        unique: "compositeIndex"
    },
    Verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    Password: {
        type: Sequelize.STRING,
        min: 8
    },
    Role: {
        type: Sequelize.STRING,
        defaultValue: "user"
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
})

module.exports = User