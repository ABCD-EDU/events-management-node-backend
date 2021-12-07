const express = require("express");
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const bodyParse = require("body-parser");
const app = express();
const mysql = require("mysql2");

require("dotenv").config();
const port = process.env.PORT || 5000;
const oneDay = 1000 * 60 * 60 * 24;

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
  session=req.session;
  if(session.userid){
      res.send(`Welcome User ${session.userid} <a href=\'/logout'>click to logout</a>`);
  }else
  res.sendFile('views/index.html',{root:__dirname})
});

app.listen(port, () => {
  console.log(`CURRENTLY LISTENING AT PORT:${port}`);
});
