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


// API Routes
// =============================================================

// Stories APIs
router.get("/api/story-index", function (req, res) {
  console.log("get /api/story-index");
  var query = {};
  if (req.query.userid) {
    query.userid = req.query.userid;
  }
  db.Story.findAll({
    where: query,
    include: [db.User]
  }).then(function (dbStory) {
    res.json(dbStory);
  });
});

router.post("/api/story-index", function (req, res) {
  console.log(req.body);
  db.story.create({
    user_id: req.user.id,
    title: req.body.title,
    description: req.body.description,
    genre: req.body.genre,
    body: req.body.body
  })
  .then(function(dbStory) {
    res.json(dbStory);
  });
});





// router.get("/api/comments", function (req, res) {
//   var query = {};
//   if (req.query.author_id) {
//     query.AuthorId = req.query.author_id;
//   }
//   // Here we add an "include" property to our options in our findAll query
//   // We set the value to an array of the models we want to include in a left outer join
//   // In this case, just db.Author
//   db.Comment.findAll({
//     where: query
    
//   }).then(function (dbStory) {
//     res.json(dbStory);
//   });
// });

// router.post("/api/comments", function (req, res) {
//   db.Comment.create(req.body).then(function (dbStory) {
//     res.json(dbStory);
//   });
// });

// router.get("/api/story-index/:id", function (req, res) {
//   // Here we add an "include" property to our options in our findOne query
//   // We set the value to an array of the models we want to include in a left outer join
//   // In this case, just db.Author
//   db.Story.findOne({
//     where: {
//       id: req.params.id
//     },
//     include: [db.user]
//   }).then(function (dbStory) {
//     res.json(dbStory);
//   });
// });

// // router.post("/api/story-index", function (req, res) {
// //   const storyBody = {
// //     UserId: req.user.id,
// //     title: req.body.storyTitle,
// //     description: req.body.storyDescription,
// //     genre: req.body.storyGenre,
// //     body: req.body.storyBody
// //   }
// //   db.story.create(req.storyBody).then(function (dbStory) {
// //     res.json(dbStory);
// //   });
// // });

// // Users APIs
// router.get("/api/authors", function (req, res) {
//   db.user.findAll({
//     //include: [db.story]
//   }).then(function (dbAuthor) {
//     res.json(dbAuthor);
//   });
// });

// router.get("/api/authors/:id", function (req, res) {
//   db.user.findOne({
//     where: {
//       id: req.params.id
//     },
//     include: [db.story]
//   }).then(function (dbAuthor) {
//     res.json(dbAuthor);
//   });
// });

// router.post("/api/:user_id/write", function (req, res) {
//   db.user.findOne({
//     where: { id: user_id },

//   }).then(function (dbAuthor) {
//     res.json(dbAuthor);
//   });
// });

module.exports = router;
