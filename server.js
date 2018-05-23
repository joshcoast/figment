var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
var PORT = process.env.PORT || 8080;

//requireing our models for syncing
var db = require("./models");

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));


app.use(methodOverride('_method'));

// Parse application
app.use(bodyParser.urlencoded({ extended: false }));

//register a Handlebars view engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//require the express routes from burgers_controller.js set to variable routes
var routes = require('./controllers/figment_controller.js');
//use the var routes (express routes) when url returns /index
app.use('/', routes);

<<<<<<< HEAD
// Routes
// =============================================================
require("./routes/story-routes.js")(app);
require("./routes/author-api-routes.js")(app);
require("./routes/html-routes.js")(app);
require("./routes/comment-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
=======

//syncing our sequlize models and then starting our express app
db.sequelize.sync({force: true}).then(function(){
	app.listen(PORT, function(){
	console.log("listenning on http://localhost:" + PORT);
});
>>>>>>> fd9e102baefa4225c0a952fe31ae2905a482571c
});


