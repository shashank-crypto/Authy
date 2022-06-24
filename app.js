const express = require('express');
const app = express();
const env = require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const session = require('express-session');

const connection = require('./db/conn');

const createOrganizationTable = require('./db/table/organization');
const createUserTable = require('./db/table/user');
const auth = require('./routes/auth');

const facebookAuth = require('./auth/facebookAuth');
const googleAuth = require('./auth/googleAuth');
const passport = require('passport');
const saveUser = require('./controller/saveUser');
const { reset } = require('nodemon');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
passport.session();

app.use('/auth', auth)

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


//get all users
app.get('/api/users', (req, res) => {
    connection.query('SELECT * FROM users', (err, results) => {
        if (err) return console.log(err);
        console.log(req)
        res.json({"result" : results, "get" : "something"});
    }
    );
}
);


//create new user
app.post('/api/users', async (req, res) => {
    try{
    const {name} = await saveUser(connection, uuidv4(), req.body.name, req.body.email, req.body.authSvc);
    res.json({"result" : name, "post" : "something", "user" : req.user.id});
    }
    catch(err){
        console.log(err);
    }
}
);


app.post('/api/organizations', (req, res) => {
    createOrganizationTable(connection);
    const { name, user } = req.body;
    const id = uuidv4();
    connection.query('INSERT INTO organizations (id, name) VALUES (?, ?)', [id, name], (err, results) => {
        if (err) return console.log(err);
        res.json(results);
    }
    );
    createUserOrgRelation(connection);
}
);


app.listen(port , () => {
    console.log('Server is running on port ' + port);
});
