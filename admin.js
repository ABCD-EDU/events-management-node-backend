const express = require("express");
const bodyParse = require("body-parse");
const app = express();

require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(bodyParse.json());
app.use(
    bodyParse.urlencoded({
        extended: true,
    })
);

app.get('/', (req,res) => {
    res.json({
        message: "lmao abcd hello"
    })
})

app.listen(port, () => {
    console.log(`CURRENTLY LISTENING AT PORT:${port}`)
})
app.listen(80, () => {
    console.log(`CURRENTLY LISTENING AT PORT:80`)
})