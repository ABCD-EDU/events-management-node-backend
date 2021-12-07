require("dotenv").config();

const config = {
    db: {
        host: env.DB_HOST || "localhost",
        user: env.DB_USER || "abcd",
        password: env.DB_PASSWORD || "!abcd123",
        database: env.DB_NAME || "abcd",
    }
}

module.exports = config;