// Dependencies
// =============================================================
var express = require('express');
var router = express.Router();
var db = require('../models');

// Express Routes
// =============================================================

router.get("/", function (req, res) {
  console.log('user', req.user);
  db.story.findAll({}).then(function (data) {
    var hbsObject = {
      story: data
    };
    res.render('index', hbsObject);
  }).catch(function (err) {
    console.log(err);
  });
});

//Choice
router.get("/choice", function (req, res) {
  db.story.findAll({}).then(function (data) {
    var hbsObject = {
      story: data
    };
    res.render('choice', hbsObject);
  }).catch(function (err) {
    console.log(err);
  });
});

//Write
router.get("/write/", function (req, res) {
  db.story.findAll({}).then(function (data) {
    var hbsObject = {
      story: data,
      user: req.user
    };
    res.render('write', hbsObject);
  }).catch(function (err) {
    console.log(err);
  });
});

// Read
router.get("/read", function (req, res) {
  // retrieve all data from Stories TODO: add the join to authors
  db.story.findAll({}).then(function (data) {
    var hbsObject = {
      story: data
    };
    res.render('read', hbsObject);
  }).catch(function (err) {
    console.log(err);
  });
});


// --- APIs --- //

// Stories APIs
router.get("/api/story-index", function (req, res) {
  console.log("get /api/story-index");
  var query = {};
  if (req.query.userid) {
    query.userid = req.query.userid;
  }
  db.story.findAll({
    where: query,
    //include: [db.user]
  }).then(function (dbStory) {
    res.json(dbStory);
  });
});

router.post("/api/story-index", function (req, res) {
  console.log("post /api/story-index");
  db.story.create(req.body).then(function (dbStory) {
    res.json(dbStory);
  });
});

// Users APIs
router.get("/api/authors", function (req, res) {
  db.user.findAll({
    //include: [db.story]
  }).then(function (dbAuthor) {
    res.json(dbAuthor);
  });
});

router.get("/api/authors/:id", function (req, res) {
  db.user.findOne({
    where: {
      id: req.params.id
    },
    include: [db.story]
  }).then(function (dbAuthor) {
    res.json(dbAuthor);
  });
});

router.post("/api/:user_id/write", function (req, res) {
  db.user.findOne({
    where: { id: user_id },

  }).then(function (dbAuthor) {
    res.json(dbAuthor);
  });
});

module.exports = router;
