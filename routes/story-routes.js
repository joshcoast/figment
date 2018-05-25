// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the stories
  app.get("/api/story-index", function(req, res) {
    var query = {};
    if (req.query.author_id) {
      query.AuthorId = req.query.author_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Story.findAll({
      where: query,
      include: [db.Author]
    }).then(function(dbStory) {
      res.json(dbStory);
    });
  });

  // Get route for retrieving a single story
  app.get("/api/story-index/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Story.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Author]
    }).then(function(dbStory) {
      res.json(dbStory);
    });
  });

  // POST route for saving a new story
  app.post("/api/story-index", function(req, res) {
    db.Story.create(req.body).then(function(dbStory) {
      res.json(dbStory);
    });
  });

  // DELETE route for deleting stories
  app.delete("/api/story-index/:id", function(req, res) {
    db.Story.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbStory) {
      res.json(dbStory);
    });
  });

  // PUT route for updating stories
  app.put("/api/story-index", function(req, res) {
    db.Story.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbStory) {
      res.json(dbStory);
    });
  });
};
