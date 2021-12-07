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
      queriedData = results;
  })

  if (queriedData) {
    if (
        req.body.username == queriedUser &&
        req.body.password == queriedPassword
      ) {
        session = req.session;
        session.userid = username;
        res.send(
          `Hey there, welcome ${session.userid} <a href=\'/logout'>click to logout</a>`
        );
      } else {
        res.send("Invalid username or password");
      }
  } else {
      res.send(`User ${username} does not exist.`)
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;