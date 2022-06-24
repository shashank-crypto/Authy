const express = require('express');
const app = express();
const env = require('dotenv').config();
const session = require('express-session');

const connection = require('./db/conn');

const auth = require('./routes/auth');

const passport = require('passport');
const isLoggedIn = require('./middleware/isLoggedIn');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', auth)
app.use('/api/organizations', isLoggedIn, require('./routes/organization'));

const port = process.env.PORT || 8080;

//connect to database
connection.connect(err => {
    if (err) return console.log(err);
    console.log('Connected to database');
    //create a database
    connection.query('CREATE DATABASE IF NOT EXISTS Authy', (err, result) => {
        if (err) return console.log(err);
        console.log('Database created', result);
    });
});


app.get('/logged', isLoggedIn, (req, res) => {
    res.send('yes');
}
);


app.listen(port , () => {
    console.log('Server is running on port ' + port);
});