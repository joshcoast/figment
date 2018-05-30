// Dependencies
// =============================================================
var express = require('express');
var router = express.Router();
var models = require('../models');

// Express Routes
// =============================================================



// Each of the below routes just handles the HTML page that the user gets sent to.

// index route loads view.html
router.get("/", function (req, res) {
  console.log('user', req.user);
  //retrieve all data from Stories and the authors from the Authors table
  models.Story.findAll({}).then(function (data) {
    var hbsObject = {
      story: data
    };
    res.render('index', hbsObject);
  }).catch(function (err) {
    console.log(err);
  });
});


// Read route loads read.handlebars
router.get("/read", function (req, res) {
  // retrieve all data from Stories TODO: add the join to authors
  models.Story.findAll({}).then(function (data) {
    var hbsObject = {
      story: data
    };
    res.render('read', hbsObject);
  }).catch(function (err) {
    console.log(err);
  });
});

// index route loads view.html
router.get("/cms", function (req, res) {
  //retrieve all data from Stories and the authors from the Authors table
  models.Story.findAll({
    include: ['Author']
  }).then(function (data) {
    var hbsObject = {
      story: data
    };
    res.render('cms', hbsObject); //this is where you get the other HB "page"
  }).catch(function (err) {
    console.log(err);
  });
});





// // cms route loads cms.html
// router.get("/cms", function(req, res) {
// res.sendFile(path.join(__dirname, "../public/cms.html"));
// });

// // blog route loads blog.html
//router.get("/story-index", function(req, res) {
//res.sendFile(path.join(__dirname, "../public/story-index.html"));
//});

// // authors route loads author-manager.html
//router.get("/authors", function(req, res) {
//res.sendFile(path.join(__dirname, "../public/author-manager.html"));
//});

//export router to be required in server.js



// Choice Landing Page route
router.get("/choice", function (req, res) {
  models.Story.findAll({}).then(function (data) {
    var hbsObject = {
      story: data
    };
    res.render('choice', hbsObject);
  }).catch(function (err) {
    console.log(err);
  });
});


router.get("/write/", function (req, res) {
  models.Story.findAll({}).then(function (data) {
    var hbsObject = {
      story: data,
      user: req.user
    };
    res.render('write', hbsObject);
  }).catch(function (err) {
    console.log(err);
  });
});

router.get("/public/js/write.js"),
  function (req, res) {
    res.render('/public/js/write.js');
  }

router.get("/body/", function (req, res) {
  models.Story.findAll({}).then(function (data) {
    var hbsObject = {
      story: data,
      user: req.user
    };
    res.render('body', hbsObject);
    console.log(hbsObject);
  }).catch(function (err) {
    console.log(err);
  });
});


router.get("/api/story-index", function (req, res) {
  var query = {};
  if (req.query.author_id) {
    query.AuthorId = req.query.author_id;
  }
  // Here we add an "include" property to our options in our findAll query
  // We set the value to an array of the models we want to include in a left outer join
  // In this case, just db.Author
  models.Story.findAll({
    where: query,
    include: [models.Author]
  }).then(function (dbStory) {
    res.json(dbStory);
  });
});

router.get("/api/comments", function (req, res) {
  var query = {};
  if (req.query.author_id) {
    query.AuthorId = req.query.author_id;
  }
  // Here we add an "include" property to our options in our findAll query
  // We set the value to an array of the models we want to include in a left outer join
  // In this case, just db.Author
  models.Comment.findAll({
    where: query
    
  }).then(function (dbStory) {
    res.json(dbStory);
  });
});

router.post("/api/comments", function (req, res) {
  models.Comment.create(req.body).then(function (dbStory) {
    res.json(dbStory);
  });
});

router.get("/api/story-index/:id", function (req, res) {
  // Here we add an "include" property to our options in our findOne query
  // We set the value to an array of the models we want to include in a left outer join
  // In this case, just db.Author
  models.Story.findOne({
    where: {
      id: req.params.id
    },
    include: [models.Author]
  }).then(function (dbStory) {
    res.json(dbStory);
  });
});

router.post("/api/story-index", function (req, res) {
  models.Story.create(req.body).then(function (dbStory) {
    res.json(dbStory);
  });
});

// DELETE route for deleting stories
router.delete("/api/story-index/:id", function (req, res) {
  models.Story.destroy({
    where: {
      id: req.params.id
    }
  }).then(function (dbStory) {
    res.json(dbStory);
  });
});

// PUT route for updating stories
router.put("/api/story-index", function (req, res) {
  models.Story.update(
    req.body, {
      where: {
        id: req.body.id
      }
    }).then(function (dbStory) {
    res.json(dbStory);
  });
});

router.get("/api/authors", function (req, res) {
  // Here we add an "include" property to our options in our findAll query
  // We set the value to an array of the models we want to include in a left outer join
  // In this case, just db.Story
  models.Author.findAll({
    include: [models.Story]
  }).then(function (dbAuthor) {
    res.json(dbAuthor);
  });
});

router.get("/api/authors/:id", function (req, res) {
  // Here we add an "include" property to our options in our findOne query
  // We set the value to an array of the models we want to include in a left outer join
  // In this case, just db.Story
  models.Author.findOne({
    where: {
      id: req.params.id
    },
    include: [models.Story]
  }).then(function (dbAuthor) {
    res.json(dbAuthor);
  });
});

router.post("/api/authors", function (req, res) {
  models.Author.create(req.body).then(function (dbAuthor) {
    res.json(dbAuthor);
  });
});

router.delete("/api/authors/:id", function (req, res) {
  models.Author.destroy({
    where: {
      id: req.params.id
    }
  }).then(function (dbAuthor) {
    res.json(dbAuthor);
  });
});



module.exports = router;