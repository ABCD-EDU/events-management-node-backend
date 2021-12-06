const express = require("express");
const bodyParse = require("body-parser");
const app = express();
const mysql = require("mysql2");

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

const connection = mysql.createConnection({
	host: "localhost",
	user: "abcd",
	password: "!abcd123",
	database: "abcd"
})

app.get("/test", (req, res) => {
	connection.query(
		'SELECT * FROM user',
		function(err, results, fields) {
			res.json(results)
		}
	)
})

app.get("/:id", (req, res) => {
	const {id} = req.params;
	connection.query(
		`SELECT * FROM user WHERE user_id=${id}`,
		function(err, results, fields) {
			res.json(results)
		})
})

app.listen(port, () => {
  console.log(`CURRENTLY LISTENING AT PORT:${port}`);
});
