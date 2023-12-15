require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const cookieParser = require('cookie-parser');
const { checkUser } = require('./middleware/authMiddleware');
const dashboardController = require("./controllers/dashboardController");

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs');

const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));


app.get('*', checkUser);
app.get('/', (req, res) => {
    const locals = {
        title: "Jobacy",
        description: "Keep track of your job applications",
    }
    res.render('home', locals)
});

app.use(authRoutes, dashboardRoutes);