var express = require("express");
var app = express();
var entry = require('./entry');

app.use(express.static('../304CEM-Front-End-David-Lal/HTML'));
//Store all HTML files in folder.
app.use(express.static('../304CEM-Front-End-David-Lal/CSS'));
//Store all CSS files in folder. 
app.use(express.static('../304CEM-Front-End-David-Lal/Images'));
//Store all Images in folder.
app.use(express.static('../304CEM-Front-End-David-Lal/JS'));
//Store all Js in folder.


app.get('/', function(req, res) {
    res.sendFile('index.html');
    //It will find and locate index.html
});

app.get('/index', function(req, res) {
    res.sendFile('index.html');
    //It will find and locate index.html
});

app.get('/Home', function(req, res) {
    res.sendFile('Home.html');
    //It will find and locate Home.html
});

app.get('/Exhibitions', function(req, res) {
    res.sendFile('Exhibitions.html');
    //It will find and locate Exhibitions.html
});

app.get('/login', function(req, res) {
    res.sendFile('Login.html');
    //It will find and locate Login.html
});

app.get('/Member', function(req, res) {
    res.sendFile('Member.html');
    //It will find and locate index.html
});

app.get('/Tickets', function(req, res) {
    res.sendFile('Tickets.html');
    //It will find and locate Tickets.html
});

app.listen(8000);

console.log("Website is running on port 8000");