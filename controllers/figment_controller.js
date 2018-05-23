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
  //retrieve all data from Stories and the authors from the Authors table
	models.Story.findAll({
		}).then(function(data){
		var hbsObject = { story: data};
		res.render('index', hbsObject);
		}).catch(function(err){
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
module.exports = router;