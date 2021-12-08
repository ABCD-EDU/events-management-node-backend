const router = require("express").Router();
const { json } = require("body-parser");
const db = require("../services/db.js")

router.get("/:id", (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM `event` WHERE `event_id`=?", [id])
    .then((results) => {
        const data = results[0];
        res.json({
            eventName: data.name,
            address: data.address,
            date: data.date,
            time: data.time,
            description: data.description,
            status: data.status
        });
    })
    .catch((err) => {
        res.json({
            message: err
        });
    });
});

/**
 *  event_id|name|address|date|time|description|status|category|
 */
router.get("/all", (req, res) => {
    db.query("SELECT * FROM `event`", [])
    .then((results) => {
        res.json({
            eventName: results.json,
            address: results.address,
            date: results.date,
            time: results.time,
            description: results.description,
            status: results.status
        });
    })
    .catch((err) => {
        res.json({
            eventName: "results.json",
            address: "results.address",
            date: "results.date",
            time: "results.time",
            description: "results.description",
            status: "results.status"
        });
    })
})

module.exports = router;
