const router = require("express").Router();
const { json } = require("body-parser");
var session = require("express-session");
const db = require("../services/db.js");

router.get("/id/:id", (req, res) => {
  const { id } = session.id;
  db.query("SELECT * FROM `event` WHERE `event_id`=?", [id])
    .then((results) => {
      const data = results[0];
      res.json({
        eventName: data.name,
        address: data.address,
        date: data.date,
        time: data.time,
        description: data.description,
        status: data.status,
      });
    })
    .catch((err) => {
      res.json({
        message: err,
      });
    });
});

router.get("/user-events", (req, res) => {
  const id  = req.session.user_id;
  console.log(req.session.user_id)
  db.query(
    `
        SELECT *
        FROM event_members
        INNER JOIN \`event\` USING (event_id)
        where user_user_id=?
        `,
    [id]
  ).then((data) => {
    res.json(data);
  });
});

/**
 *  event_id|name|address|date|time|description|status|category|
 */
router.get("/category/all", (req, res) => {
  db.query("SELECT * FROM `event`", [])
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.json({
        message: err,
      });
    });
});

module.exports = router;
