// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

  // GET route for getting all of the stories
  app.get("/api/stories", function (req, res) {
    // Add sequelize code to find all stories, and return them to the user with res.json
    // findAll returns all entries for a table when used with no options
    db.Story.findAll({}).then(function (dbStory) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbStory);
    });

  });

  // Get route for returning stories of a specific category
  app.get("/api/stories/category/:category", function (req, res) {
    // Add sequelize code to find all stories where the category is equal to req.params.category,
    db.Story.findAll({
      where: {
        category: req.params.category
      }
    }).then(function (dbStory) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbStory);
    });
    // return the result to the user with res.json
  });

  // Get route for retrieving a single story
  app.get("/api/stories/:id", function (req, res) {
    // Add sequelize code to find a single story where the id is equal to req.params.id,
    // return the result to the user with res.json
  });

  // POST route for saving a new story
  app.post("/api/stories", function (req, res) {
    // Add sequelize code for creating a story using req.body,
    // then return the result using res.json
    db.Story.create({
      title: req.body.title,
      body: req.body.body,
      category: req.body.category
    }).then(function (dbStory) {
      res.json(dbStory);
    }).catch(function (err) {
      res.status(400).json(err);
    })
  });

  // DELETE route for deleting stories
  app.delete("/api/stories/:id", function (req, res) {
    // Add sequelize code to delete a story where the id is equal to req.params.id, 
    // then return the result to the user using res.json
  });

  // PUT route for updating stories
  app.put("/api/stories", function (req, res) {
    // Add code here to update a Story using the values in req.body, where the id is equal to
    // req.body.id and return the result to the user using res.json
  });
};