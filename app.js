require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

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
app.get('/', requireAuth, (req, res) => res.render('home'));
app.get('/myProfile', requireAuth, (req, res) => res.render('myProfile'));
app.use(authRoutes);