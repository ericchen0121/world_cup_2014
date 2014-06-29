App = Ember.Application.create({
  // basic logging
  LOG_TRANSITIONS: true,

  // extremely detailed logging, including all internal steps
  // 'beforeModel', 'model', 'afterModel', redirects, aborted transitions
  // LOG_TRANSITIONS_INTERNAL: true,

  LOG_VIEW_LOOKUPS: true
});

App.Router.map(function() {
  this.resource('teams', function() {
    this.resource('team', { path: ':team_id'});
  });

  this.resource('players');
  this.resource('about');
});


App.IndexRoute = Ember.Route.extend({
  redirect: function () {
    this.transitionTo('players')
  }
});

App.TeamsRoute = Ember.Route.extend({
  model: function () {
    return teams;
  },
});

App.TeamRoute = Ember.Route.extend({
  model: function(params) {
    return team(params.team_id);
  }
});

App.PlayersRoute = Ember.Route.extend({
  model: function() {

    return new Ember.RSVP.hash({
      players: topGoalPlayers,
      inProgressMatch: inProgressMatch
    });
    // return topGoalPlayers;
  }
});

App.AboutRoute = Ember.Route.extend({
  model: function() {
    return [
      {
        year: "2010",
        name: "Thomas Muller",
        image: "images/muller-thomas-img.jpg",
        teamName: "Germany",
        flaglogo: "http://img.fifa.com/images/flags/2/ger.png",
        goals: 5
      },
      {
        year: "2006",
        name: "Miroslav Klose",
        image: "images/klose-miroslav-img.jpg",
        teamName: "Germany",
        flaglogo: "http://img.fifa.com/images/flags/2/ger.png",
        goals: 5
      },
      {
        year: "2002",
        name: "Ronaldo",
        image: "images/ronaldo-img.jpg",
        teamName: "Brazil",
        flaglogo: "http://img.fifa.com/images/flags/2/bra.png",
        goals: 8
      }
      /*,{
        year: "1998",
        name: "Davor Suker",
        image: "http://cache.images.globalsportsmedia.com/soccer/players/150x150/39105.png",
        teamName: "Croatia",
        flaglogo: http://img.fifa.com/images/flags/2/cro.png",
        goals: 6
      }*/
    ];
  }
});

/* google analytics */
App.Router.reopen({
  notifyGoogleAnalytics: function() {
    return ga('send', 'pageview', {
      'page': this.get('url'),
      'title': this.get('url')
    });
  }.on('didTransition')
});


/* World Cup API json data by Kimono */
var worldcupapi = "http://worldcup.kimonolabs.com/api/";

var teams = $.getJSON(worldcupapi + "teams?sort=name&apikey=ed489eaaa82064ee89efa4fc4efcf42f", function(data){
  return addFlagToTeams(data);
});

var team = function(team_id) {
  return $.getJSON(worldcupapi + "teams?id=" + team_id + "&apikey=ed489eaaa82064ee89efa4fc4efcf42f", function(data){

    return addFlagToTeams(data);
  });
};

var topGoalPlayers= $.getJSON(worldcupapi + "players?sort=goals,-1&includes=team,club&apikey=ed489eaaa82064ee89efa4fc4efcf42f", function(data){
  return addFlagToPlayers(data);
});


var inProgressMatch = $.getJSON(worldcupapi + "matches?sort=currentGameMinute&limit=1&apikey=ed489eaaa82064ee89efa4fc4efcf42f", function(data) {
    /* check that the game is in progress */
    if (data.status != "In-progress") {
      data.status = false;
      return data;
    } else {
      return addFlagToMatch(data);
    }
});

var allMatches = $.getJSON(worldcupapi + "matches?apikey=ed489eaaa82064ee89efa4fc4efcf42f", function(data) {

});


// adds FIFA flag logo url to players, teams and matches
var addFlagToPlayers = function(data) {
  for(var i = 0; i < data.length; i++) {
    for(var j = 0; j < teamId.length; j++) {
      if(data[i].teamId === teamId[j].id){
       data[i]['flaglogo'] = "http://img.fifa.com/images/flags/2/" + teamId[j].abbreviation + ".png";
      };
    };
  };
};

var addFlagToTeams = function(data) {
  for(var i = 0; i < data.length; i++) {
    for(var j = 0; j < teamId.length; j++) {
      if(data[i].id === teamId[j].id){
        data[i]['flaglogo'] = "http://img.fifa.com/images/flags/2/" + teamId[j].abbreviation + ".png";
        data[i]['flaglogoBig'] = "http://img.fifa.com/images/flags/5/" + teamId[j].abbreviation + ".png";
      };
    };
  };
};

var addFlagToMatch = function(data) {
  for(var j = 0; j < teamId.length; j++) {
    if(data.homeTeamId === teamId[j].id){
      data['homeTeam'] = teamId[j]
      data['homeFlaglogo'] = "http://img.fifa.com/images/flags/2/" + teamId[j].abbreviation + ".png";
    };
    if(data.awayTeamId === teamId[j].id){
      data['awayTeam'] = teamId[j]
      data['awayFlaglogo'] = "http://img.fifa.com/images/flags/2/" + teamId[j].abbreviation + ".png";
    };
  };
};

// in progress
// have array of all dates
var findTodaysMatches = function(data) {
  var today = moment(); // use moment.js library
  for(var i = 0; i < data.length; i++){


  };
// find all dates that match today's date

//get the first six characters of the date field of the match
// store those matches
// show those matches
};

// if in-progress


// to add the flag abbreviation to each team by looking up on the name
// the abbreviation the basis for the addFlag methods
var teamId = [
  {
    "abbreviation": "alg",
    "name": "Algeria",
    "logo": "http://cache.images.globalsportsmedia.com/soccer/teams/150x150/78.png",
    "group": "H",
    "id": "5841CDD6-D35C-4A2C-B063-0DF8529CB433"
  },
  {
    "abbreviation": "arg",
    "name": "Argentina",
    "logo": "http://cache.images.globalsportsmedia.com/soccer/teams/150x150/132.png",
    "group": "F",
    "id": "8DF9E0C5-F49F-4BCC-967D-EC4FF3C945EE"
  },
  {
    "abbreviation": "aus",
    "name": "Australia",
    "logo": "http://cache.images.globalsportsmedia.com/soccer/teams/150x150/156.png",
    "group": "B",
    "id": "16EF7687-2D69-473C-BFE7-B781D67752DC"
  },
  {
    "abbreviation": "bel",
    "name": "Belgium",
    "logo": "http://cache.images.globalsportsmedia.com/soccer/teams/150x150/281.png",
    "group": "H",
    "id": "AEA9A2F1-3A08-4149-96BD-A6F7433F46BA"
  },
  {
    "abbreviation": "bih",
    "name": "Bosnia-Herzegovina",
    "logo": "http://cache.images.globalsportsmedia.com/soccer/teams/150x150/299.png",
    "group": "F",
    "id": "74EA3831-DA4A-4093-B1E3-FD4EB45AA798"
  },
  {
    "abbreviation": "bra",
    "name": "Brazil",
    "logo": "http://cache.images.globalsportsmedia.com/soccer/teams/150x150/349.png",
    "group": "A",
    "id": "09B8CB53-BB56-4B7E-86BD-EC7FC7CEAF33"
  },
  {
    "abbreviation": "cmr",
    "name": "Cameroon",
    "logo": "http://cache.images.globalsportsmedia.com/soccer/teams/150x150/386.png",
    "group": "A",
    "id": "DF25ABB8-37EB-4C2A-8B6C-BDA53BF5A74D"
  },
  {
    "abbreviation": "chi",
    "name": "Chile",
    "logo": "http://cache.images.globalsportsmedia.com/soccer/teams/150x150/424.png",
    "group": "B",
    "id": "9A319800-C80A-4FD9-9679-125D27246FB0"
  },
  {
    "abbreviation": "col",
    "name": "Colombia",
    "logo": "http://cache.images.globalsportsmedia.com/soccer/teams/150x150/473.png",
    "group": "C",
    "id": "AD00D1E4-BA78-41B6-A7DF-E6E102F71042"
  },
  {
    "abbreviation": "crc",
    "name": "Costa Rica",
    "logo": "http://cache.images.globalsportsmedia.com/soccer/teams/150x150/477.png",
    "group": "D",
    "id": "F77B348A-D7AE-4534-8ADA-8E52BEE64744"
  },
  {
    "abbreviation": "civ",
    "name": "Côte d'Ivoire",
    "logo": "http://cache.images.globalsportsmedia.com/soccer/teams/150x150/598.png",
    "group": "C",
    "id": "6B2A7C79-3758-421C-8967-7ABFE1FDC982"
  },
  {
    "abbreviation": "cro",
    "name": "Croatia",
    "logo": "http://cache.images.globalsportsmedia.com/soccer/teams/150x150/514.png",
    "group": "A",
    "id": "A0CD1355-B6FC-48D3-B67B-AF5AA2B2C1E1"
  },
  {
    "abbreviation": "ecu",
    "name": "Ecuador",
    "logo": "http://cache.images.globalsportsmedia.com/soccer/teams/150x150/657.png",
    "group": "E",
    "id": "8BABAAE8-D906-44F7-B784-A828573B35D9"
  },
  {
    "abbreviation": "eng",
    "name": "England",
    "logo": "http://cache.images.globalsportsmedia.com/soccer/teams/150x150/774.png",
    "group": "D",
    "id": "2EFCFEB2-EBF8-4628-B659-B00C49D93811"
  },
  {
    "abbreviation": "fra",
    "name": "France",
    "logo": "http://cache.images.globalsportsmedia.com/soccer/teams/150x150/944.png",
    "group": "E",
    "id": "4F9F018B-C14D-4E73-8145-2E77B8C64E9E"
  },
  {
    "abbreviation": "ger",
    "name": "Germany",
    "logo": "http://cache.images.globalsportsmedia.com/soccer/teams/150x150/1037.png",
    "group": "G",
    "id": "FE173702-5266-4C67-8647-7A6A53ED0DE8"
  },
  {
    "abbreviation": "gha",
    "name": "Ghana",
    "logo": "http://cache.images.globalsportsmedia.com/soccer/teams/150x150/1038.png",
    "group": "G",
    "id": "CCC66F75-7004-46E4-BB31-259B06A42516"
  },
  {
    "abbreviation": "gre",
    "name": "Greece",
    "logo": "http://cache.images.globalsportsmedia.com/soccer/teams/150x150/1091.png",
    "group": "C",
    "id": "38C4D44E-CDA3-40E2-8364-DA27CC190C52"
  },
  {
    "abbreviation": "hon",
    "name": "Honduras",
    "logo": "http://cache.images.globalsportsmedia.com/soccer/teams/150x150/1099.png",
    "group": "E",
    "id": "17E2DCED-76BB-435D-9E96-68D5B3D490FA"
  },
  {
    "abbreviation": "irn",
    "name": "Iran",
    "logo": "http://cache.images.globalsportsmedia.com/soccer/teams/150x150/1178.png",
    "group": "F",
    "id": "A6F97883-74FE-4162-A65E-10B3D94B71A3"
  },
  {
    "abbreviation": "ita",
    "name": "Italy",
    "logo": "http://cache.images.globalsportsmedia.com/soccer/teams/150x150/1318.png",
    "group": "D",
    "id": "B61B25AA-CD8E-4778-AC26-DD08D7851990"
  },
  {
    "abbreviation": "jpn",
    "name": "Japan",
    "logo": "http://cache.images.globalsportsmedia.com/soccer/teams/150x150/1348.png",
    "group": "C",
    "id": "F71A08CF-B3C5-414C-9144-308A5EE6DACC"
  },
  {
    "abbreviation": "kor",
    "name": "Korea Republic",
    "logo": "http://cache.images.globalsportsmedia.com/soccer/teams/150x150/1385.png",
    "group": "H",
    "id": "8D6EAC04-14E9-4026-BF2A-AB81C4F3C529"
  },
  {
    "abbreviation": "mex",
    "name": "Mexico",
    "logo": "http://cache.images.globalsportsmedia.com/soccer/teams/150x150/1497.png",
    "group": "A",
    "id": "E0D48500-EF6D-40AC-A7A0-0F4B5BD59A9D"
  },
  {
    "abbreviation": "ned",
    "name": "Netherlands",
    "logo": "http://cache.images.globalsportsmedia.com/soccer/teams/150x150/1552.png",
    "group": "B",
    "id": "FB6842E6-BB62-450D-98C0-A062610E6518"
  },
  {
    "abbreviation": "nga",
    "name": "Nigeria",
    "logo": "http://cache.images.globalsportsmedia.com/soccer/teams/150x150/1567.png",
    "group": "F",
    "id": "028EDCA8-6D1E-49CC-8442-A7A12E921E09"
  },
  {
    "abbreviation": "por",
    "name": "Portugal",
    "logo": "http://cache.images.globalsportsmedia.com/soccer/teams/150x150/1772.png",
    "group": "G",
    "id": "F5280217-C808-4E1D-BB0E-BF4445687EC5"
  },
  {
    "abbreviation": "rus",
    "name": "Russia",
    "logo": "http://cache.images.globalsportsmedia.com/soccer/teams/150x150/1878.png",
    "group": "H",
    "id": "BBBE6B39-E345-43C7-9E31-A442A866BF60"
  },
  {
    "abbreviation": "esp",
    "name": "Spain",
    "logo": "http://cache.images.globalsportsmedia.com/soccer/teams/150x150/2137.png",
    "group": "B",
    "id": "05A7BADE-915A-4AFB-8C28-702069220E43"
  },
  {
    "abbreviation": "sui",
    "name": "Switzerland",
    "logo": "http://cache.images.globalsportsmedia.com/soccer/teams/150x150/2201.png",
    "group": "E",
    "id": "496A037B-FD32-4917-93E6-335D76C3422C"
  },
  {
    "abbreviation": "usa",
    "name": "United States",
    "logo": "http://cache.images.globalsportsmedia.com/soccer/teams/150x150/2281.png",
    "group": "G",
    "id": "820A471B-4B85-41E8-97A6-BC3063FE78D9"
  },
  {
    "abbreviation": "uru",
    "name": "Uruguay",
    "logo": "http://cache.images.globalsportsmedia.com/soccer/teams/150x150/2300.png",
    "group": "D",
    "id": "088C4113-CEFC-460C-830C-277C148C0CE7"
  }
]