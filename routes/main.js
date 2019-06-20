"use strict";

const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const db = {};
const dataHelper = require("../data-helpers/helper")();

router.get("/", (req, res) => {
  res.render("index");
});

// to create new poll
router.post("/", (req, res) => {
  dataHelper.parseForm(db, req.body);
  res.redirect(`/${db.id}/admin`);
});

// // to render poll admin page
router.get("/:id/admin", (req, res) => {
  res.render("admin.ejs", { db });
});

// // to handle admin requests
// app.post("/:id/admin", (req, res) => {

// });

// // to render poll user page
// app.get("/:id/user", (req, res) => {

// });

// app.post("/:id/user", (req, res) => {

// });



module.exports = router;
