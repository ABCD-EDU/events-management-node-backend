require("dotenv").config();

const config = {
    db: {
        host: env.DB_HOST || "localhost",
        user: env.DB_USER || "abcd",
        password: env.DB_PASSWORD || "abcd12345",
        database: env.DB_NAME || "abcd",
        table: env.DB_TABLE || "members",
    }
}

module.exports = config;