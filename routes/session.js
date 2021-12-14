const router = require("express").Router();
const { json } = require("body-parser");
const db = require("../services/db.js");
var path = require("path")
const express = require("express");
var session = require("express-session");
const app = express();
app.use(express.static("../public"))

router.post("/attempt", (req, res) => {
  const { username, password } = req.body;
  // TODO: FIX THIS
  if (!username || !password) {
    res.send({
      message: "Invalid input. Please try again."
    })
  }

  db.query("SELECT * FROM user WHERE `username`=? AND `password`=?", [
    username,
    password,
  ]).then((results) => {
    const user = results[0];
    if (
      req.body.username === user.username &&
      req.body.password === user.password
    ) {
      session = req.session;
      session.user_name = username;
      session.user_id = user.user_id;
      session.type = user.type;
      res.redirect("/");
    } else {
      res.send("Invalid username or password");
    }
  });
});

router.get("/logout", (req, res) => {
  if (req.session.user_name) {
    req.session.destroy();
    res.json({message:true})
  }
  res.json({message:false})
});

router.get("/login", (req, res) => {
  if (req.session.user_name) {
    res.redirect("/");
  } else {
    res.sendFile(path.resolve("public/views/login.html"))
  }
});

router.get("/isLogged", (req, res) => {
  if(req.session.user_id) {
    res.json({message: true});
  } else {
    res.json({message: false})
  }
});

router.get("/userType", (req, res) => {
  if(req.session.type) {
    res.json({type: req.session.type});
  } else {
    res.json({message: "user not found"})
  }
})

module.exports = router;
