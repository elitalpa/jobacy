require('dotenv').config();

const express = require('express');
const methodOverride = require("method-override");
const connectDB = require('./server/config/db');
const cookieParser = require('cookie-parser');
const { checkUser } = require('./server/middleware/authMiddleware');

const app = express();
const port = 3000 || process.env.PORT;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(cookieParser());

// Connect to Database
connectDB();  

// Static Files
app.use(express.static(__dirname + '/public'));

// Templating Engine
app.set("views", __dirname + "/views");
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./server/routes/auth'));
app.use('/', require('./server/routes/index'));
app.use('/', require('./server/routes/dashboard'));

// Handle 404
app.get('*', checkUser, function(req, res) {
  res.status(404).render('404');
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

module.exports = app;