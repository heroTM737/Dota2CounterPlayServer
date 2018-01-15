var MongoClient = require('mongodb').MongoClient;

var host = "127.0.0.1";
var port = 27017;
var username = "username";
var password = "password";
var dbname = "dbname";
var collection = "collection";

var url = `mongodb://${username}:${password}@${host}:${port}`;

MongoClient.connect(url, function (err, db) {
    if (err) throw err;

    var dbo = db.db(dbname);
    var query = {};
    dbo.collection(collection).find(query).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });

});