const router = require("express").Router;
const db = require("../services/db.js")

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const results = db.query("SELECT * FROM `events` WHERE `user_id`=?", [id] );
    console.log(results);
})

module.exports = router;