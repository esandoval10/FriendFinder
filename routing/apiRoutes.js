
var friends = require("../app/data/friends");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });
    
    app.post("/api/friends", function(req, res) {
        
        var beffos = {
            name: "",
            photo: "",
            matchScore: Infinity
        };

        var userData = req.body;
        var userScores = userData.scores;
        var diff;

        for(var i = 0; i < friends.length; i++){
            var current = friends[i];
            diff = 0;
            console.log(current.name);

            for(var s = 0; s < current.scores.length; s++){
                var currentScore = current.scores[s];
                var currentUser = userScores[s];

                diff += Math.abs(parseInt(currentUser) - parseInt(currentScore));
            }

            if (diff <= beffos.matchScore) {
                beffos.name = current.name;
                beffos.photo = current.photo;
                beffos.matchScore = diff;
            }
        }

        friends.push(userData);

        res.json(beffos);

    });

}