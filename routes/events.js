const router = require("express").Router();
const { json } = require("body-parser");
const db = require("../services/db.js")

router.get("/:id", (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM `event` WHERE `event_id`=?", [id]).then((res) => {
        res.json(res);
    });
    console.log(results);
})

router.get("/all", (req, res) => {
    db.query("SELECT * FROM `event`").then((res) => {
        res.json(res);
    })
})

module.exports = router;
