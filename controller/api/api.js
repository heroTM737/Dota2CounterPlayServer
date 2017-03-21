var fs = require('fs');

var base_url = "http://128.88.242.23:7000";

module.exports = function(app) {
    app.get("/api/heroes", function(req, res) {
        var heroes_json = fs.readFileSync(__dirname + "/../../data/heroes.json", 'utf8');
        var heroes = JSON.parse(heroes_json);

        var data = heroes.map(function(hero) {
            return {
                name: hero.name,
                image: base_url + hero.image
            }
        });

        res.end(JSON.stringify(data));
    })
}