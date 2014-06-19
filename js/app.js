App = Ember.Application.create();

App.Router.map(function() {
  this.resource('teams');
  this.resource('players');
});

App.TeamsRoute = Ember.Route.extend({
  model: function () {
    return teams;
  }
});

/* World Cup API json data */
var teams = $.getJSON("http://worldcup.kimonolabs.com/api/teams?sort=name&apikey=ed489eaaa82064ee89efa4fc4efcf42f", function(data){ return data;});


/* Example World Cup API json response

[
  {
    "name": "Costa Rica",
    "logo": "http://cache.images.globalsportsmedia.com/soccer/teams/150x150/477.png",
    "website": "http://www.fedefutbol.com",
    "foundedYear": 1921,
    "address": "Radial Santa Ana Belén\n670-1000\nSan José",
    "homeStadium": "Estadio Nacional de Costa Rica",
    "stadiumCapacity": 35093,
    "group": "D",
    "groupRank": 1,
    "groupPoints": 3,
    "matchesPlayed": 1,
    "wins": 1,
    "losses": 0,
    "draws": 0,
    "goalsFor": 3,
    "goalsAgainst": 1,
    "goalsDiff": "+2",
    "id": "F77B348A-D7AE-4534-8ADA-8E52BEE64744",
    "type": "Team"
  }, ...] */