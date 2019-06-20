"use strict";

const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const form = {};
const dataHelper = require("../data-helpers/helper")();

//mailgun stuff
const mailgun = require("mailgun-js");
const DOMAIN = "sandboxd1e993e6d73d4cd1b6a65dd560c26f1f.mailgun.org";
const mg = mailgun({ apiKey: "3560516615680c99ef6a186420f0e606-29b7488f-176e6817", domain: DOMAIN });


router.get("/", (req, res) => {
  res.render("index");
});

// to create new poll
router.post("/", (req, res) => {
  dataHelper.parseForm(form, req.body);
  //use mailgun to send poll links to admin
  // sendEmail();
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

const sendEmail = () => {
  const data = {
    from: "Mailgun Sandbox <postmaster@sandboxd1e993e6d73d4cd1b6a65dd560c26f1f.mailgun.org>",
    to: "yynickel@gmail.com",
    subject: "Hello",
    text: `Testing some Mailgun awesomness!\nadmin URL: localhost:8080/${form.id}/admin`
  };
  mg.messages().send(data, function(error, body) {
    console.log(body);
  });
}

module.exports = router;
