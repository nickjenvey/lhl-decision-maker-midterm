"use strict";

const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

// // to create new poll
// app.post("/", (req, res) => {

// });

// // to render poll admin page
// app.get("/:id/admin", (req, res) => {

// });

// // to handle admin requests
// app.post("/:id/admin", (req, res) => {

// });

// // to render poll user page
// app.get("/:id/user", (req, res) => {

// });

// app.post("/:id/user", (req, res) => {

      // });



module.exports = router;
