const express = require("express");
const bodyParse = require("body-parser");
const app = express();
const mysql = require("mysql2");

require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(bodyParse.json());
app.use(
  bodyParse.urlencoded({
    extended: true,
  })
);

app.use("/events", require("./routes/events.js"));
app.use("/admin", require("./routes/admin.js"));
app.use("/member", require("./routes/member.js"));

app.get("/", (req, res) => {
  res.json({
    message: "lmao abcd hello",
  });
});

app.listen(port, () => {
  console.log(`CURRENTLY LISTENING AT PORT:${port}`);
});
