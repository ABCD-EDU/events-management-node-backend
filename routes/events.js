const router = require("express").Router();
const { json } = require("body-parser");
const db = require("../services/db.js")

router.get("/id/:id", (req, res) => {
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
router.get("/category/all", (req, res) => {
    db.query("SELECT * FROM `event`", [])
    .then((results) => {
        res.json(results);
    })
    .catch((err) => {
        res.json({
            message: err
        });
    })
})

module.exports = router;
