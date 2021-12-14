const mysql = require("mysql2/promise");
const config = require("../config");

async function query(sql, params) {
    const connection = await mysql.createConnection(config.db);
    const [results, ] = await connection.execute(sql, params);
    console.log("query attempt")
    return results;
}

async function simpleQuery(sql) {
    const connection = await mysql.createConnection(config.db);
    const [results,] = await connection.query(sql);
    console.log(results)
    return results;
}

module.exports = { query, simpleQuery }