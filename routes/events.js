const router = require("express").Router();
const { json } = require("body-parser");
const db = require("../services/db.js")

router.get("/:id", (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM `event` WHERE `event_id`=?", [id]).then((results) => {
        res.json(results);
    });
})

router.get("/all", (req, res) => {
    db.query("SELECT * FROM `event`", []).then((results) => {
        res.json(results);
    })
})

module.exports = router;
