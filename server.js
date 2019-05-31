
var express = require('express');      // define express variable to include express
var mongoose = require('mongoose');     // define mongoose variable to inclued mongoose
var bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;

var app = express();


const uri = "mongodb+srv://root:<password>@mongoosetest-a4jsa.mongodb.net/test?retryWrites=true";	// enter password of your mongo db setup
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});


/*
//Old simple connection string method
mongoose.connect('mongodb + srv://root:<password>@mongoosetest-a4jsa.mongodb.net/test?retryWrites=true', function (err) {   // enter password of your mongo db setup
    if (err) {
        console.log(err);
    } else {
        console.log("Working fine connected to database mongoose");
    }
});
*/

var UserScheme = new mongoose.Schema({      // Schema is like a blueprint 
    name: String,
    age: Number
})

/* it's something like this 
    mongoose         MongoDB

    userschema------> User       
*/

var User = mongoose.model('User', UserScheme);

//this teaches our express application to read data from user/HTML body
app.use(bodyParser.json());        // accept data in json format 
app.use(bodyParser.urlencoded({ extended: true }));    // kinda middleware to learn how to accept utf-8 characters



app.get('/', function (req, res, next) {
    res.json("Welcome Home");
});

// app.get('/:name', function (req, res, next) {
//     res.json(req.params.name);
// });

/* Checking Mongo Db collections

app.get('/create-user', function (req, res, next) {
    var user = new User();          // object created of User
    user.name = "Yanik Kumar";
    user.age = 21;
    //res.json(user);             // showing the data on localhost but not save to mongoose to save it next line
    user.save(function (err) {
        if (err) next(err);
        res.json(user);
    });
});

*/

// post is a http method ( to test this thing we need to use postman )
app.post('/create-user', function (req, res, next) {        // for post we install npm install body-parse
    var user = new User();
    user.name = req.body.name;
    user.age = req.body.age;
    user.save(function (err) {
        if (err) console.log(err);
        res.json(user);
    });
});

app.listen(3000, function (err) {		// app listening to port 3000
    if (err) {
        console.log(err);
    } else {
        console.log("Running on Port 3000");
    }
});
