const router = require("express").Router();
const { json } = require("body-parser");
const e = require("express");
const db = require("../services/db.js");

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  var queriedUser;
  var queriedPassword;

  var queriedData;
  db.query("SELECT * FROM user WHERE `username`=? AND `password`=?", [username, password]).then((results) => {
	const test = results[0]; 
	  console.log(test)
	console.log(req.body)
	  if (
        req.body.username === test.username &&
        req.body.password === test.password 
      ) {
        session = req.session;
        session.userid = username;
        res.send(
          `Hey there, welcome ${session.userid} <a href=\'/session/logout'>click to logout</a>`
        );
      } else {
        res.send("Invalid username or password");
      }
  })
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
