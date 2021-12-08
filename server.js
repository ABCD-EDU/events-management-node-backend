const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const bodyParse = require("body-parser");
const mysql = require("mysql2");
var path = require("path")
const cors = require("cors");

require("dotenv").config();
const port = process.env.PORT || 5000;
const oneDay = 1000 * 60 * 60 * 24;

app.use(cors())
app.use(express.static('public'))
app.use(express.static(__dirname));
app.use(sessions({
  secret: "abcd123thisisasecretkey",
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: false,
}))
app.use(cookieParser())
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: true,}));
app.use("/events", require("./routes/events.js"));
app.use("/member", require("./routes/member.js"));
app.use("/session", require("./routes/session.js"));

app.get('/',(req,res) => {
  res.sendFile(path.resolve("public/index.html"))
});

app.listen(port, () => {
  console.log(`CURRENTLY LISTENING AT PORT:${port}`);
});

module.exports = app;