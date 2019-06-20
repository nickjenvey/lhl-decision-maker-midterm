"use strict";

const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const form = {};
const dataHelper = require("../data-helpers/helper")();

router.get("/", (req, res) => {
  res.render("index");
});

// to create new poll
router.post("/", (req, res) => {
  dataHelper.parseForm(form, req.body);
  res.redirect(`/${form.id}/admin`);
});

// // to render poll admin page
router.get("/:id/admin", (req, res) => {
  res.render("admin.ejs", { form });
});

// to handle admin requests
router.post("/:id/admin", (req, res) => {

});

// // to render poll user page
// app.get("/:id/user", (req, res) => {

// });

// app.post("/:id/user", (req, res) => {

// });



module.exports = router;
