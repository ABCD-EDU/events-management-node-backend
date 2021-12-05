const express = require("express");
const bodyParse = require("body-parser");
const app = express();
const mysql = require("mysql");

require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(bodyParse.json());
app.use(
  bodyParse.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "lmao abcd hello",
  });
});

var con = mysql.createConnection({
  host: "localhost",
  user: "abcd",
  password: "!abcd123",
});

con.connect((res, err) => {
  if (err) {
    throw err;
  }
  console.log("CONNECTED TO ABCD");
});

app.get("/test", (req, res) => {
  con.query("SELECT * FROM user", function (err, result, fields) {
    if (err) throw err;
    
    var jsonArray = []
    result.forEach(element => {
        jsonArray.push({
            user_id: element.user_id,
            username: element.username,
            password: element.password,
            type: element.type
        })
    });

    res.json(JSON.stringify(jsonArray))
  });
});

app.listen(port, () => {
  console.log(`CURRENTLY LISTENING AT PORT:${port}`);
});
app.listen(80, () => {
  console.log(`CURRENTLY LISTENING AT PORT:80`);
});
