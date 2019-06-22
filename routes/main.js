"use strict";

const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
// const form = {};
const pollStatus = {};
const dataHelper = require("../data-helpers/helper")();

//mailgun stuff
const mailgun = require("mailgun-js");
const DOMAIN = "sandboxd1e993e6d73d4cd1b6a65dd560c26f1f.mailgun.org";
const mg = mailgun({ apiKey: "3560516615680c99ef6a186420f0e606-29b7488f-176e6817", domain: DOMAIN });

//db stuff
const ENV = process.env.ENV || "development";
const knexConfig = require("../knexfile");
const knex = require("knex")(knexConfig[ENV]);

router.get("/", (req, res) => {
  res.render("index");
});

// to create new poll
router.post("/", (req, res) => {
  const form = dataHelper.parseForm(req.body);
  //use mailgun to send poll links to admin
  // sendEmail();
  knex('polls').insert({
    admin_email: form.email,
    question: form.question,
    admin_url: form.admin_url,
    user_url: form.user_url
  }).then(function() {
    return knex.select('id').from('polls').where('admin_url', form.admin_url).first()
      .then(function(data) {
        return knex('selections').insert({
          poll_id: data.id,
          selection_ranking: JSON.stringify(form.options)
        }).then(function() {
          res.redirect(`/${form.admin_url}/admin`);
        });
      });
  })
});

// to render poll admin page
router.get("/:id/admin", (req, res) => {
  let form = {};
  knex.select('admin_email', 'question', 'admin_url', 'user_url', 'selection_ranking')
    .from('polls')
    .join('selections', 'selections.poll_id', '=', 'polls.id')
    .where('admin_url', req.params.id)
    .first()
    .then(function(data) {
      form = data;
      form.id = req.params.id;
      form.options = Object.keys(JSON.parse(form.selection_ranking));
      res.render("admin.ejs", { form });
    });
});

// to handle admin vote
router.post("/:id/admin", (req, res) => {
  const result = req.body.options;
  const selectionRanking = {};
  result.forEach((element) => {
    selectionRanking[element.option] = (result.length - element.rank) / result.length;
  });
  knex.select('id').from('polls').where('admin_url', req.params.id).first().then(function(data) {
    return knex('selections').insert({ poll_id: data.id, selection_ranking: JSON.stringify(selectionRanking) }).then(() => {
      res.send(200);
    });
  });
});

// to handle result
router.get("/:id/result", (req, res) => {
  knex.select('id').from('polls')
    .where('admin_url', req.params.id).orWhere('user_url', req.params.id).first()
    .then(function(data) {
      return knex.select('selection_ranking')
        .from('selections').where('poll_id', data.id)
        .then(function(data) {
          const selections = data.map(element => JSON.parse(element.selection_ranking));
          const options = Object.keys(selections[0]);
          const entries = {};
          options.forEach((element) => {
            let total = 0;
            selections.forEach((key) => {
              total += key[element];
            });
            entries[element] = total;
          });
          const result = Object.entries(entries);
          result.sort((a, b) => {
            return b[1] - a[1];
          })
          res.json(result);
        });
    });
});

// to render poll user page
router.get("/:id", (req, res) => {
  let form = {};
  knex.select('admin_email', 'question', 'admin_url', 'user_url', 'selection_ranking')
    .from('polls')
    .join('selections', 'selections.poll_id', '=', 'polls.id')
    .where('user_url', req.params.id)
    .first()
    .then(function(data) {
      form = data;
      form.id = req.params.id;
      form.options = Object.keys(JSON.parse(form.selection_ranking));
      res.render("user.ejs", { form });
    });
});

//handle user votes
router.post("/:id", (req, res) => {
  const result = req.body.options;
  const selectionRanking = {};
  result.forEach((element) => {
    selectionRanking[element.option] = (result.length - element.rank) / result.length;
  });
  knex.select('id').from('polls').where('user_url', req.params.id).first().then(function(data) {
    return knex('selections').insert({ poll_id: data.id, selection_ranking: JSON.stringify(selectionRanking) }).then(() => {
      res.send(200);
    });
  });
});

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
