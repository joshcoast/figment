const PORT = process.env.PORT || 3000;
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

// For Passport
app.use(session({
	secret: 'keyboard cat',
	resave: true,
	saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//For Handlebars
app.set('views', './views')
app.engine('hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main'
}));
app.set('view engine', '.hbs');


//Models
const models = require("./models");

//Routes
const authRoute = require('./routes/auth.js')(app, passport);

//load passport strategies
require('./config/passport.js')(passport, models.user);

//require the express routes from partials controller-block to set variable routes
var routes = require('./controllers/figment_controller.js');
//use the var routes (express routes) when url returns /index
app.use('/', routes);


//syncing our sequlize models and then starting our express app
models.sequelize.sync({ force: true }).then(function () {
	console.log('Nice! Database looks fine')

	app.listen(PORT, function () {
		console.log("listenning on http://localhost:" + PORT);
	});
}).catch((err) => {
	console.log(err, "Something went wrong with the Database Update!")
});