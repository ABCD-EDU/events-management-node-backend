const router = require("express").Router;
const bodyParse = require("body-parser");
const app = express();
const mysql = require("mysql2");
import { query } from "../services/db.js";

router.get("/:id", (req, res) => {
    const { id } = res.params;
    const results = await query("SELECT * FROM `events` WHERE `user_id`=?", [id] );
    console.log(results);
    
    // res.json({

    // })
})

module.exports = router;