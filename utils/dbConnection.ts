// import dotenv from 'dotenv';

// dotenv.config({ path: './config/config.env' });
// import db from '../config/postgres-db';

// export function initDB() {
//     db.authenticate()
//         .then(() => console.log('Database connected...'))
//         .catch((error: string) => {
//             console.log('Error: ', error);
//         });
//     return db
// }

// export function getDB() {
//     // initDB()
//     if (!db) {
//         console.error('Database not connected')
//     }

//     return db
// }


// module.exports = {
//     initDB,
//     getDB
// }