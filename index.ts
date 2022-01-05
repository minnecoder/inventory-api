// const dotenv = require('dotenv');
const createServer = require('./utils/server')
const checkDB = require('./utils/dbConnection').initDB

const app = createServer();
checkDB()

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
