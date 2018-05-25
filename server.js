const PORT = process.env.PORT || 8080;
const express = require('express')
const app = express()
const passport = require('passport')
const session = require('express-session')
const bodyParser = require('body-parser')
const env = require('dotenv').load()
const exphbs = require('express-handlebars')
const path = require('path');

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

//For BodyParser
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

//For Handlebars
// var directorViews = path.join(__dirname, "views");
// var currentWo = process.cwd() + "/app/views";
// app.set('views', currentWo)
app.engine('hbs', exphbs({
	extname: '.hbs',
	defaultLayout: 'main'
}));
// app.set('view engine', 'hbs');
app.set("views", path.join(__dirname, "./app/views"));
app.set("view engine", "hbs");



// For Passport
app.use(session({
	secret: 'keyboard cat',
	resave: true,
	saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//Models
const models = require("./app/models");

//Routes
const authRoute = require('./app/routes/auth.js')(app, passport);

//load passport strategies
require('./app/config/passport.js')(passport, models.user);

//require the express routes from partials controller-block to set variable routes
var routes = require('./app/controllers/figment_controller.js');
//use the var routes (express routes) when url returns /index
app.use('/', routes);


//syncing our sequlize models and then starting our express app
models.sequelize.sync({ force: false }).then(function () {
	console.log('Nice! Database looks fine')

	app.listen(PORT, function () {
		console.log("listenning on http://localhost:" + PORT);
	});
}).catch((err) => {
	console.log(err, "Something went wrong with the Database Update!")
});