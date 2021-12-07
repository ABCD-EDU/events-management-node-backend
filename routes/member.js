const router = require("express").Router();
const db = require("../services/db.js")

router.get("/:id", (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM `user` WHERE `user_id`=?", [id] ).then((res) => {
    	console.log(res)
    });
})

router.post("/login", (req, res) => {
    const { user, password } = req.params;
    
    db.query("SELECT * FROM `user` WHERE `username`=? AND `password`=?", [user, password]).then((res) => {
        if (res) {
            res.json({
                status: true,
            })
        } else {
            res.json({
                status: false,
            })
        }
    });
})

/**
 * This function returns the list of events that the member has participated in
 */
router.post("/joined/:id", (req, res) => {
    const { id } = req.params;

    db.query("SELECT * FROM event_members WHERE `user_id`=?", [id]).then((res) => {
        console.log(res);
    })
});

module.exports = router;
