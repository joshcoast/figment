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
    var hbsObject = { story: data };
    res.render('index', hbsObject);
  }).catch(function (err) {
    console.log(err);
  });
});


// Read route loads read.handlebars
router.get("/read", function (req, res) {
  //retrieve all data from Stories TODO: add the join to authors
	models.Story.findAll({}).then(function(data){
		var hbsObject = { story: data};
		res.render('read', hbsObject);
		}).catch(function(err){
			console.log(err);
		});
});

// index route loads view.html
router.get("/cms", function (req, res) {
  //retrieve all data from Stories and the authors from the Authors table
  models.Story.findAll({ include: ['Author'] }).then(function (data) {
    var hbsObject = { story: data };
    res.render('cms', hbsObject); //this is where you get the other HB "page"
  }).catch(function (err) {
    console.log(err);
  });
});





// // cms route loads cms.html
// app.get("/cms", function(req, res) {
//   res.sendFile(path.join(__dirname, "../public/cms.html"));
// });

// // blog route loads blog.html
// app.get("/story-index", function(req, res) {
//   res.sendFile(path.join(__dirname, "../public/story-index.html"));
// });

// // authors route loads author-manager.html
// app.get("/authors", function(req, res) {
//   res.sendFile(path.join(__dirname, "../public/author-manager.html"));
// });

//export router to be required in server.js



// Choice Landing Page route
router.get("/choice", function (req, res) {
	models.Story.findAll({}).then(function(data){
		var hbsObject = { story: data};
		res.render('choice', hbsObject);
		}).catch(function(err){
			console.log(err);
		});
});


router.get("/write/", function (req, res) {
	models.Story.findAll({}).then(function(data){
		var hbsObject = { story: data, user: req.user};
		res.render('write', hbsObject);
		}).catch(function(err){
			console.log(err);
		});
});

router.get("/public/js/write.js"), function (req,res) {
  res.render('/public/js/write.js');
}






module.exports = router;