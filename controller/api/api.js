var fs = require('fs');
var _ = require('lodash');

var base_url = "http://127.0.0.1:7000";

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
        var target_index = _.findIndex(data, function (o) { return o.name == name; });

        var counter_list = [];
        for (var i = 0; i < 3; i++) {
            var random = Math.round(Math.random() * 113);
            counter_list.push(data[random]);
        }

        var result = {
            target: data[target_index],
            counter_list: counter_list
        }

        res.end(JSON.stringify(result));
    })
}