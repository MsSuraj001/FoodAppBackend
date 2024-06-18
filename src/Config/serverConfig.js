const dotenv = require('dotenv');

dotenv.config();


module.exports = {
    PORT : process.env.PORT,
    DB_URL : process.env.DB_URL,
    SECRET_KEY : process.env.JWT_SECRET,
    JWT_EXIPIRY : process.env.JWT_EXIPIRY,
}