require("dotenv").config();

const config = {
    db: {
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "abcd",
        password: process.env.DB_PASSWORD || "!abcd123",
        database: process.env.DB_NAME || "abcd",
    }
}

module.exports = config;
