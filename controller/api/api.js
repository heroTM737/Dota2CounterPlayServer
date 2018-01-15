var fs = require('fs');
var _ = require('lodash');
var TM = require('../../lib/tm_nodejs');

var config = require.main.require('./config/config');
var port = config.port;
var host = config.ipAddressList[0];
var base_url = `http://${host}:${port}`;

module.exports = function (app) {
    var heroes_json = fs.readFileSync(__dirname + "/../../data/heroes.json", 'utf8');
    var heroes = JSON.parse(heroes_json);

    var data = heroes.map(function (hero) {
        return {
            name: hero.name,
            localized_name: hero.localized_name,
            image: base_url + hero.image
        }
    });

    app.get("/api/heroes", function (req, res) {
        res.end(JSON.stringify(data));
    });

    app.get("/api/counter", function (req, res) {
        var name = req.query.name;

        var result = {
            target: _.find(data, function (o) {
                return o.name == name;
            }),
            counter_list: getRandomHeroes(data)
        }

        res.end(JSON.stringify(result));
    })

    app.get("/api/alies", function (req, res) {
        var name = req.query.name;

        var result = {
            target: _.find(data, function (o) {
                return o.name == name;
            }),
            alies_list: getRandomHeroes(data)
        }

        res.end(JSON.stringify(result));
    })

    app.get("/api/aliesandcounter", function (req, res) {
        var name = req.query.name;

        var result = {
            target: _.find(data, function (o) {
                return o.name == name;
            }),
            alies_list: getRandomHeroes(data),
            counter_list: getRandomHeroes(data)
        }

        res.end(JSON.stringify(result));
    })
}

function getRandomHeroes(data) {
    var list = [];
    var list_2 = [];
    var random = 0;
    var size = Math.floor(Math.random() * 10 + 1);
    for (var i = 0; i < size; i++) {
        do {
            random = Math.floor(Math.random() * 113);
        } while (_.find(list_2, (o) => {
                return o == random;
            }));

        list_2.push(random);
        list.push(data[random]);
    }

    return list;
}