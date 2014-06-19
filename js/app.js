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

/* fixture data */
var teams = $.getJSON("http://worldcup.kimonolabs.com/api/teams?apikey=ed489eaaa82064ee89efa4fc4efcf42f", function(data){ return data;});



/*[{
  id: '1',
  team: 'Brazil',
  group: 'A',
  wins: 1,
  losses: 0,
  ties: 1
},
{
  id: '2',
  team: 'United States',
  group: 'G',
  wins: 1,
  losses: 0,
  ties: 1
}];*/