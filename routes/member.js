const router = require("express").Router();
const db = require("../services/db.js")

router.get("/:id", (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM `user` WHERE `user_id`=?", [id] ).then((results) => {
    	res.json(results)
    });
})

module.exports = router;
