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
    const id = req.session.user_id;
    db.query(
        `
        SELECT *
        FROM event_members
        INNER JOIN \`event\` USING (event_id)
        where user_id=?
        `,
        [id]
    ).then((data) => {
        res.json(data);
    });
});

router.get("/upcoming-events", (req, res) => {
    db.query(
        `
        SELECT * FROM \`event\` WHERE date_start>NOW();
    `,
        []
    ).then((data) => {
        res.json(data);
    });
});

router.get("/my-events", (req, res) => {
    res.redirect("/");
});

/**
 *  event_id|name|address|date|time|description|status|category|
 */
router.get("/category/:category", (req, res) => {
    const { category } = req.params;
    if (req.session.user_id) {
        db.query("SELECT * FROM event WHERE category=?", [category]).then(
            (data) => {
                res.json(data);
            }
        );
    } else {
        res.json({
            message: "User is not logged in",
        });
    }
});

router.post("/join", (req, res) => {
    const { event_id } = req.body;

    db.query("INSERT INTO event_members VALUES (?,?)", [
        event_id,
        req.session.user_id,
    ])
        .then(console.log)
        .catch(console.log);
});

router.post("/leave", (req, res) => {
    const { event_id } = req.body;

    db.query("DELETE FROM event_members WHERE event_id=? AND user_id=?", [
        event_id,
        req.session.user_id,
    ])
        .then(console.log)
        .catch(console.log);
});

router.get("/search", (req, res) => {
    const { search } = req.query
    console.log(search);
    db.query(`SELECT * FROM event WHERE LOWER(event.event_name) like '%${search}%'`)
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
