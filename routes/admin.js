const router = require("express").Router;
const bodyParse = require("body-parser");
const app = express();
const mysql = require("mysql2");
const db = require("../services/db.js")

router.get("/:id", (req, res) => {
    const { id } = res.params;
    const results = db.query("SELECT * FROM `admin` WHERE `user_id`=?", [id] );
    console.log(results);
    
    // res.json({

    // })
})

module.exports = router;