
// Dependencies
// =============================================================
const express = require('express');
const router = express.Router();
const db = require('../models');

// HTML Routes
// =============================================================

// Home Landing
router.get("/", function (req, res) {
  console.log('user', req.user);
  db.story.findAll({}).then(function (data) {
    let hbsObject = {
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
router.get("/write", function (req, res) {
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
  db.story.findAll({include: [db.user]}).then(function (data) {
    var hbsObject = {
      story: data,
      user: req.user
    };
    res.render('read', hbsObject);
  }).catch(function (err) {
    console.log(err);
  });
});

router.get("/read/votes", function (req, res) {
  db.story.findAll({
    include: [db.user],
    order: [
      ['votes', 'DESC']
    ],
  }).then(function (data) {
    var hbsObject = {
      story: data,
      user: req.user
    };
    res.render('read', hbsObject);
  }).catch(function (err) {
    console.log(err);
  });
});


// API Routes
// =============================================================

// --- Stories APIs

// Get stories by votes
router.get("/api/story/votes", function (req, res) {
  db.story.findAll({
    order: [
      ['votes', 'DESC']
    ],
    include: [db.user]
  }).then(function (dbStories) {
    res.json(dbStories);
  });
});

// Get stories by creation order
router.get("/api/story", function (req, res) {
  db.story.findAll({
    include: [db.user]
  }).then(function (dbStories) {
    res.json(dbStories);
  });
});

// Post a story
router.post("/api/story-index", function (req, res) {
  console.log(req.body);
  db.story.create({
    user_id: req.user.id,
    title: req.body.title,
    description: req.body.description,
    genre: req.body.genre,
    body: req.body.body,
    votes: req.body.votes
  })
  .then(function(dbStory) {
    res.json(dbStory);
  });
});

// Update A story
router.put("/api/story-index", function(req, res) {
  db.story.update(req.body,
    {
      where: {
        id: req.body.id
      }
    })
    .then(function(dbStory) {
      res.json(dbStory);
    });
});


// -- Users APIs

// Get all useres
router.get("/api/authors", function (req, res) {
  db.user.findAll({
    //include: [db.story]
  }).then(function (dbAuthor) {
    res.json(dbAuthor);
  });
});




module.exports = router;
