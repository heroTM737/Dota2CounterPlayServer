var fs = require('fs');

var base_url = "http://128.88.242.23:7000";

module.exports = function (app) {
    var heroes_json = fs.readFileSync(__dirname + "/../../data/heroes.json", 'utf8');
    var heroes = JSON.parse(heroes_json);
    var data = heroes.map(function (hero) {
        return {
            name: hero.name,
            image: base_url + hero.image
        }
    });

    app.get("/api/heroes", function (req, res) {
        res.end(JSON.stringify(data));
    });

    app.get("/api/counter", function (req, res) {
        var name = req.query.name;

        var r1 = Math.round(Math.random() * 113);
        var r2 = Math.round(Math.random() * 113);
        var r3 = Math.round(Math.random() * 113);
        var counter_list = [heroes[r1].name, heroes[r2].name, heroes[r3].name];

        // var counter_list = ["skywrath_mage", "crystal_maiden", "juggernaut", "nevermore", "zuus", "lina", "phantom_assassin", "techies", "terrorblade", "monkey_king"];

        res.end(JSON.stringify(counter_list));
    })
}