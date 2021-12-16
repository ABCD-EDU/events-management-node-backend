const router = require("express").Router();
const { json } = require("body-parser");
const admin = require("../utility/admin.js");
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
  if (req.session.type === "member") {
    db.query(
      `
        SELECT *
        FROM event_members
        INNER JOIN \`event\` USING (event_id)
        where user_user_id=?
        `,
      [id]
    ).then((data) => {
      res.json(data);
    });
  } else if (req.session.type === "admin") {
    admin.getAdminEvents(id, res);
  }
});

router.get("/upcoming-events", (req, res) => {
  const id = req.session.user_id;
  if (req.session.type === "member" || req.session.type == null) {
    db.query(
      `
          SELECT * FROM \`event\` WHERE date_start>NOW();
      `,
      []
    ).then((data) => {
      if (req.session.user_id) {
        let results = data;
        for (let i = 0; i < results.length; i++) {
          db.query(
            "SELECT * FROM event_members WHERE user_user_id=? AND event_id=?",
            [req.session.user_id, results[i].event_id]
          )
            .then((event) => {
              if (event.length > 0) {
                results[i]["hasJoined"] = true;
              } else {
                results[i]["hasJoined"] = false;
              }
            })
            .then(() => {
              res.json(results);
            });
        }
      } else {
        res.json(data);
      }
    });
  } else if (req.session.type === "admin") {
    admin.getAdminEventsUpcoming(id, res);
  }
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
    .then(() => {
      res.json({
        message: true,
      });
    })
    .catch(console.log);
});

router.post("/leave", (req, res) => {
  const { event_id } = req.body;

  db.query("DELETE FROM event_members WHERE event_id=? AND user_user_id=?", [
    event_id,
    req.session.user_id,
  ])
    .then(() => {
      res.json({
        message: true,
      });
    })
    .catch(console.log);
});

router.get("/search", (req, res) => {
  const { search } = req.query;
  db.query(
    `SELECT * FROM event WHERE LOWER(event.event_name) like '%${search}%'`
  )
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.json({
        message: err,
      });
    });
});

router.get("/event_data", (req, res) => {
  const id = req.session.eventToEdit;
  console.log("GETTING EVENT DATA ID: " + id)
  db.query(
    `SELECT * FROM event WHERE event_id like '${id}%'`
  )
    .then((results) => {
      console.log(results);
      res.json(results);
    })
    .catch((err) => {
      res.json({
        message: err,
      });
    });
});

router.post("/set_event_id", (req, res) => {
  const { id } = req.body;
  console.log("SET EVENT ID: " + id)
  req.session.eventToEdit = id;
  res.json({
    message: true
  })
});

router.post("/edit", (req, res) => {
  const data = req.body;
  console.log("EDIT: " + JSON.stringify(data))
  // console.log(data)
  admin.sendSimplePostReq(JSON.stringify(data), res);
});

router.post("/create", (req, res) => {
  console.log("create event")
  const user_id = req.session.user_id;
  let data = req.body;
  data["data"]["userID"] = user_id;
  admin.sendSimplePostReq(JSON.stringify(data), res);
});

router.get("/discardEdit", (req, res) => {
  console.log("discard edit")
  req.session.eventToEdit = null;
  // res.redirect("/");
});

router.get("/delete-event", (req, res) => {
  console.log("delet event")
  req.session.eventToEdit = null;
  const user_id = req.session.user_id;
  const data = req.body;
  data["data"]["userID"] = user_id;
  admin.sendSimplePostReq(JSON.stringify(data), res);
});

module.exports = router;
