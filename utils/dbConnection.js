const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });
const db = require('../config/postgres-db');

function initDB() {
    db.authenticate()
        .then(() => console.log('Database connected...'))
        .catch((error) => {
            console.log('Error: ', error);
        });
    return db
}

function getDB() {
    // initDB()
    if (!db) {
        console.error('Database not connected')
    }

    return db
}


module.exports = {
    initDB,
    getDB
}